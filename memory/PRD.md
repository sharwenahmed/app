# A-Designs — Product Requirements & Build Log

## Original problem statement
Build **A-Designs**, a premium web design agency website that feels like a combination of Apple, Framer, Linear, Stripe, Vercel, and Wix Studio. Position it as a Halifax-based studio serving local businesses (restaurants, cafes, barbers, hair salons, roofing, cleaning, service businesses).

The website must function as:
1. Agency website  2. Portfolio website  3. Interactive demo showcase
All inside a single website.

## User confirmed choices (literal)
- **Contact form leads** → MongoDB + simple admin dashboard with search/filter/export (no external email provider).
- **Demo gallery imagery** → high-quality Unsplash + premium device mockups & UI previews.
- **Pricing** → "Starting at" pricing, no fixed prices, Growth tier highlighted.
- **Free Consultation CTA** → scroll to contact section and prefill subject "Free Consultation". Form fields: Name, Business Name, Phone, Email, Industry, Website URL (optional), Project Details.
- **Real contact info** → Halifax, Nova Scotia, Canada · 902-989-4072 · sharwen.ahmed@yahoo.com · https://www.instagram.com/adesignshalifax/. Phone clickable on mobile. Future-proof for swapping a custom domain email later.

## Architecture

### Backend (`/app/backend/server.py`)
- FastAPI + Motor (async MongoDB) on port 8001 (Supervisor managed).
- All routes prefixed with `/api`.
- **Public**: `GET /api/`, `GET /api/health`, `POST /api/leads`, `GET/POST /api/status`.
- **Auth**: `POST /api/auth/login` (JWT bearer, 7-day expiry), `GET /api/auth/me`.
- **Admin (Bearer required)**: `GET /api/admin/leads` (q, industry, status filters), `GET /api/admin/leads/stats`, `PATCH /api/admin/leads/{id}` (status), `DELETE /api/admin/leads/{id}`, `GET /api/admin/leads/export` (CSV).
- Idempotent admin seeding on startup from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env.
- bcrypt password hashing, PyJWT HS256 tokens.
- Mongo indexes: `users.email` unique, `leads.email/industry/status/created_at`.

### Frontend (`/app/frontend/src/`)
- React 19 + React Router 7.
- Tailwind + Shadcn UI + Framer Motion + Lenis smooth scroll.
- Fonts: **Outfit** (display) + **Manrope** (body) via Google Fonts.
- Pages:
  - `/` — HomePage with all sections (Nav, Hero, WhyModern, WhyADesigns, DemoGallery, BeforeAfter, Services, Process, Pricing, About, FAQ, FinalCTA, Contact, Footer).
  - `/admin/login` — admin login.
  - `/admin` — lead dashboard with stats, search, filters, status dropdown, delete, detail drawer, CSV export.
- Deep purple aurora theme, glassmorphism, gradient borders, scroll reveals, parallax mockups.
- Demo Gallery: 5 industry tabs × 4 concepts each (20 total) rendered as desktop browser + mobile phone mockups containing a real-looking mini-website per concept.
- Before/After: custom drag-to-compare slider.
- SEO: Open Graph + Twitter cards, JSON-LD ProfessionalService schema, sitemap.xml, robots.txt.

## What's implemented (2026-06-15)
- [x] Backend auth + leads APIs + CSV export
- [x] Idempotent admin seed (`admin@a-designs.ca` / `ADesigns2025!`)
- [x] All 12 sections of homepage
- [x] 20 industry demo concepts in interactive desktop + mobile mockups
- [x] Before/After drag slider
- [x] Pricing with highlighted Growth tier, "Starting at" prices
- [x] Multi-field contact form with zod validation, success/error states, prefill via CustomEvent
- [x] Admin dashboard with stats, filters, status updates, delete, CSV export, lead detail drawer
- [x] Mobile-first responsive nav with clickable phone & Instagram
- [x] SEO meta, OG tags, JSON-LD, sitemap, robots

## Backlog (P1/P2)
- P1: Add a real lead-notification email (Resend / SendGrid) once domain email is ready.
- P1: Add per-concept "View live preview" full-page mockup modal.
- P2: Add light/dark toggle option (currently dark-only).
- P2: Add testimonials carousel once real clients provided.
- P2: Bundle a sitemap generator that reflects future blog posts.

## Test credentials
See `/app/memory/test_credentials.md`.
