from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import io
import csv
import logging
import uuid
import re
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response, Query
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator

# -----------------------------------------------------------------------------
# Configuration & DB
# -----------------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
db_name = os.environ["DB_NAME"]
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

JWT_ALGORITHM = "HS256"
JWT_EXPIRY_MINUTES = 60 * 24 * 7  # 7 days


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRY_MINUTES),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


# -----------------------------------------------------------------------------
# App + Router
# -----------------------------------------------------------------------------
app = FastAPI(title="A-Designs API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("a-designs")


# -----------------------------------------------------------------------------
# Models
# -----------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    business_name: str = Field(..., min_length=1, max_length=160)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=40)
    industry: str = Field(..., min_length=1, max_length=80)
    website_url: Optional[str] = Field(default=None, max_length=300)
    subject: Optional[str] = Field(default="General Inquiry", max_length=120)
    message: str = Field(..., min_length=5, max_length=4000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        # allow digits, spaces, +, -, parentheses
        if not re.match(r"^[0-9+()\-\s]{5,40}$", v.strip()):
            raise ValueError("Invalid phone number")
        return v.strip()


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_name: str
    email: str
    phone: str
    industry: str
    website_url: Optional[str] = None
    subject: str = "General Inquiry"
    message: str
    status: str = "new"  # new | contacted | qualified | archived
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def check_status(cls, v: str) -> str:
        allowed = {"new", "contacted", "qualified", "archived"}
        if v not in allowed:
            raise ValueError(f"status must be one of {allowed}")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


# -----------------------------------------------------------------------------
# Auth dependency
# -----------------------------------------------------------------------------
async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header[7:].strip()
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Not authorized")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# -----------------------------------------------------------------------------
# Public Routes
# -----------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "A-Designs API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c.get("timestamp"), str):
            c["timestamp"] = datetime.fromisoformat(c["timestamp"])
    return checks


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    logger.info("New lead from %s (%s)", lead.business_name, lead.email)
    return lead


# -----------------------------------------------------------------------------
# Auth Routes
# -----------------------------------------------------------------------------
@api_router.post("/auth/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(user["id"], user["email"])
    safe_user = {k: v for k, v in user.items() if k not in ("password_hash", "_id")}
    return TokenResponse(access_token=token, user=safe_user)


@api_router.get("/auth/me")
async def me(current=Depends(get_current_admin)):
    return current


# -----------------------------------------------------------------------------
# Admin Routes
# -----------------------------------------------------------------------------
@api_router.get("/admin/leads")
async def list_leads(
    current=Depends(get_current_admin),
    q: Optional[str] = Query(default=None, description="Search text"),
    industry: Optional[str] = Query(default=None),
    status: Optional[str] = Query(default=None),
    limit: int = Query(default=200, le=1000),
):
    query: dict = {}
    if industry:
        query["industry"] = industry
    if status:
        query["status"] = status
    if q:
        regex = {"$regex": re.escape(q), "$options": "i"}
        query["$or"] = [
            {"name": regex},
            {"business_name": regex},
            {"email": regex},
            {"phone": regex},
            {"message": regex},
        ]
    leads = (
        await db.leads.find(query, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    return {"count": len(leads), "leads": leads}


@api_router.get("/admin/leads/stats")
async def lead_stats(current=Depends(get_current_admin)):
    total = await db.leads.count_documents({})
    by_status = {}
    for s in ["new", "contacted", "qualified", "archived"]:
        by_status[s] = await db.leads.count_documents({"status": s})
    by_industry_cursor = db.leads.aggregate(
        [{"$group": {"_id": "$industry", "count": {"$sum": 1}}}]
    )
    by_industry = {}
    async for row in by_industry_cursor:
        by_industry[row["_id"]] = row["count"]
    # last 7 days
    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    recent = await db.leads.count_documents({"created_at": {"$gte": week_ago}})
    return {
        "total": total,
        "recent_7d": recent,
        "by_status": by_status,
        "by_industry": by_industry,
    }


@api_router.patch("/admin/leads/{lead_id}")
async def update_lead_status(
    lead_id: str,
    payload: LeadStatusUpdate,
    current=Depends(get_current_admin),
):
    result = await db.leads.update_one(
        {"id": lead_id}, {"$set": {"status": payload.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    updated = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    return updated


@api_router.delete("/admin/leads/{lead_id}", status_code=204)
async def delete_lead(lead_id: str, current=Depends(get_current_admin)):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return Response(status_code=204)


@api_router.get("/admin/leads/export")
async def export_leads_csv(current=Depends(get_current_admin)):
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(10000)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        [
            "id",
            "created_at",
            "name",
            "business_name",
            "email",
            "phone",
            "industry",
            "website_url",
            "subject",
            "status",
            "message",
        ]
    )
    for ld in leads:
        writer.writerow(
            [
                ld.get("id", ""),
                ld.get("created_at", ""),
                ld.get("name", ""),
                ld.get("business_name", ""),
                ld.get("email", ""),
                ld.get("phone", ""),
                ld.get("industry", ""),
                ld.get("website_url", "") or "",
                ld.get("subject", ""),
                ld.get("status", ""),
                (ld.get("message", "") or "").replace("\n", " ").strip(),
            ]
        )
    output.seek(0)
    filename = f"a-designs-leads-{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# -----------------------------------------------------------------------------
# Startup: seed admin & indexes
# -----------------------------------------------------------------------------
@app.on_event("startup")
async def startup_event():
    try:
        await db.leads.create_index("email")
        await db.leads.create_index("industry")
        await db.leads.create_index("status")
        await db.leads.create_index("created_at")
        await db.users.create_index("email", unique=True)
    except Exception as e:
        logger.warning("Index creation: %s", e)

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@a-designs.ca").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "ADesigns2025!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        user_doc = {
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "A-Designs Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.users.insert_one(user_doc)
        logger.info("Seeded admin user: %s", admin_email)
    else:
        # Keep hash in sync if env password changes
        if not verify_password(admin_password, existing["password_hash"]):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}},
            )
            logger.info("Updated admin password from env: %s", admin_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# -----------------------------------------------------------------------------
# Wire up
# -----------------------------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
