"""A-Designs backend API tests - covers leads, auth, admin endpoints."""
import os
import io
import csv
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://premium-portfolio-103.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@a-designs.ca"
ADMIN_PASSWORD = "ADesigns2025!"


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api_client):
    r = api_client.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    return r.json()["access_token"]


@pytest.fixture(scope="session")
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# ----- Health -----
def test_health(api_client):
    r = api_client.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


# ----- Public leads -----
class TestLeadsPublic:
    def test_create_lead_201(self, api_client):
        payload = {
            "name": "TEST_Sharwen",
            "business_name": "TEST_Bright Harbour",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "902-555-0123",
            "industry": "Cleaning Company",
            "subject": "Free Consultation",
            "message": "Hi A-Designs, please reach out about a new site.",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["id"] and isinstance(d["id"], str)
        assert d["status"] == "new"
        assert d["email"] == payload["email"]
        assert d["created_at"]

    def test_create_lead_invalid_email_422(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={
            "name": "X", "business_name": "Y", "email": "not-an-email",
            "phone": "902-555-0123", "industry": "Cleaning Company",
            "message": "Hello there"
        })
        assert r.status_code == 422

    def test_create_lead_invalid_phone_422(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/leads", json={
            "name": "X", "business_name": "Y", "email": "a@b.com",
            "phone": "abc!!", "industry": "Cleaning Company",
            "message": "Hello there"
        })
        assert r.status_code == 422


# ----- Auth -----
class TestAuth:
    def test_login_success(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200, r.text
        d = r.json()
        assert "access_token" in d and len(d["access_token"]) > 20
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"
        assert "password_hash" not in d["user"]
        assert "_id" not in d["user"]

    def test_login_wrong_pwd_401(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code == 401

    def test_login_unknown_user_401(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/auth/login", json={"email": "noone@x.com", "password": "wrong"})
        assert r.status_code == 401


# ----- Admin leads endpoints -----
class TestAdminLeads:
    def test_list_leads_unauth_401(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/admin/leads")
        assert r.status_code == 401

    def test_list_leads_ok(self, api_client, admin_headers):
        # ensure at least 1 lead
        api_client.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_AdminList", "business_name": "TEST_Biz",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "902-989-4072", "industry": "Barbershop",
            "message": "Looking for a website refresh."
        })
        r = api_client.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers)
        assert r.status_code == 200
        d = r.json()
        assert "count" in d and "leads" in d
        assert isinstance(d["leads"], list)
        assert d["count"] >= 1

    def test_search_filters(self, api_client, admin_headers):
        token_str = f"TEST_UNIQ_{uuid.uuid4().hex[:10]}"
        api_client.post(f"{BASE_URL}/api/leads", json={
            "name": token_str, "business_name": "TEST_SearchBiz",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "902 989 4072", "industry": "Hair Salon",
            "message": "Search me please."
        })
        r = api_client.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers, params={"q": token_str})
        assert r.status_code == 200
        d = r.json()
        assert d["count"] >= 1
        assert any(token_str in l["name"] for l in d["leads"])

        r = api_client.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers, params={"industry": "Hair Salon"})
        assert r.status_code == 200
        assert all(l["industry"] == "Hair Salon" for l in r.json()["leads"])

        r = api_client.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers, params={"status": "new"})
        assert r.status_code == 200
        assert all(l["status"] == "new" for l in r.json()["leads"])

    def test_stats(self, api_client, admin_headers):
        r = api_client.get(f"{BASE_URL}/api/admin/leads/stats", headers=admin_headers)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "total" in d and "recent_7d" in d
        assert set(d["by_status"].keys()) == {"new", "contacted", "qualified", "archived"}
        assert isinstance(d["by_industry"], dict)

    def test_patch_status_and_invalid(self, api_client, admin_headers):
        # create
        r = api_client.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Patch", "business_name": "TEST_B",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "9029894072", "industry": "Roofing Company",
            "message": "Patch me please."
        })
        lid = r.json()["id"]
        r2 = api_client.patch(f"{BASE_URL}/api/admin/leads/{lid}", headers=admin_headers, json={"status": "qualified"})
        assert r2.status_code == 200, r2.text
        assert r2.json()["status"] == "qualified"

        # invalid status
        r3 = api_client.patch(f"{BASE_URL}/api/admin/leads/{lid}", headers=admin_headers, json={"status": "foo"})
        assert r3.status_code == 422

        # verify persistence
        r4 = api_client.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers, params={"q": "TEST_Patch"})
        assert any(l["id"] == lid and l["status"] == "qualified" for l in r4.json()["leads"])

    def test_delete_lead(self, api_client, admin_headers):
        r = api_client.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Del", "business_name": "TEST_B",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "9029894072", "industry": "Restaurant / Cafe",
            "message": "Please delete me."
        })
        lid = r.json()["id"]
        r2 = api_client.delete(f"{BASE_URL}/api/admin/leads/{lid}", headers=admin_headers)
        assert r2.status_code == 204
        # verify gone
        r3 = api_client.patch(f"{BASE_URL}/api/admin/leads/{lid}", headers=admin_headers, json={"status": "new"})
        assert r3.status_code == 404

    def test_export_csv(self, api_client, admin_headers):
        r = api_client.get(f"{BASE_URL}/api/admin/leads/export", headers=admin_headers)
        assert r.status_code == 200
        assert "text/csv" in r.headers.get("content-type", "")
        assert "attachment" in r.headers.get("content-disposition", "").lower()
        reader = csv.reader(io.StringIO(r.text))
        rows = list(reader)
        assert rows[0] == ["id","created_at","name","business_name","email","phone","industry","website_url","subject","status","message"]


# ----- Cleanup -----
@pytest.fixture(scope="session", autouse=True)
def cleanup(api_client):
    yield
    try:
        r = api_client.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        if r.status_code != 200:
            return
        h = {"Authorization": f"Bearer {r.json()['access_token']}"}
        leads = api_client.get(f"{BASE_URL}/api/admin/leads", headers=h, params={"q": "TEST_"}).json().get("leads", [])
        for l in leads:
            api_client.delete(f"{BASE_URL}/api/admin/leads/{l['id']}", headers=h)
    except Exception:
        pass
