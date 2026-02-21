# Yogi Tree Resort — Hotel Website

A high-performance, accessible boutique hotel website for Yogi Tree Resort, Morjim, North Goa.

**Stack:** Astro 4 + Preact Islands · Fastify API · Vanilla CSS · PostgreSQL · Redis · eZee Booking Engine

---

## Quick Start

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [pnpm 9+](https://pnpm.io/) (`npm install -g pnpm`)
- PostgreSQL 16 (local or Railway)
- Redis 7 (local or Railway)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure environment
```bash
cp .env.example apps/web/.env
cp .env.example apps/api/.env
# Fill in real values (DB, Redis, eZee keys, email provider)
```

### 3. Set up the database
```bash
# Create the database
createdb koko_maya

# Run schema (from the spec)
psql $DATABASE_URL < apps/api/src/db/schema.sql

# Seed development data
psql $DATABASE_URL < apps/api/src/db/seed.sql
```

### 4. Start development servers
```bash
# Start API (terminal 1)
cd apps/api && node --watch src/index.js

# Start Astro web app (terminal 2)
cd apps/web && npx astro dev
```

The web app starts at **http://localhost:4321** and the API at **http://localhost:3001**.

---

## Project Structure

```
koko-maya-resort/
├── apps/
│   ├── web/                  # Astro 4 frontend
│   │   ├── src/
│   │   │   ├── components/   # Astro components
│   │   │   │   ├── GlobalNav.astro
│   │   │   │   ├── Footer.astro
│   │   │   │   ├── HeroCarousel.astro
│   │   │   │   ├── BookingBar.astro
│   │   │   │   ├── RoomsSection.astro
│   │   │   │   ├── DiningSection.astro
│   │   │   │   ├── OffersSection.astro
│   │   │   │   ├── FacilitiesSection.astro
│   │   │   │   ├── TestimonialsSection.astro
│   │   │   │   ├── NewsletterAndContact.astro
│   │   │   │   └── CookieBanner.astro
│   │   │   ├── layouts/
│   │   │   │   └── BaseLayout.astro  # SEO head, GTM, nav, footer
│   │   │   ├── pages/
│   │   │   │   ├── index.astro       # Home page
│   │   │   │   └── 404.astro
│   │   │   └── styles/
│   │   │       ├── tokens.css        # Design tokens (colors, type, spacing)
│   │   │       └── global.css        # Reset, utilities, components
│   │   └── public/
│   │       └── robots.txt
│   └── api/                  # Fastify REST API
│       └── src/
│           ├── index.js      # Server entry + all routes
│           └── db/
│               └── seed.sql  # All real resort data
├── .env.example
└── package.json              # pnpm workspace root
```

---

## Pages to Build Next

These pages need to be added as Astro files in `apps/web/src/pages/`:

| Page | File | Priority |
|------|------|----------|
| Room List | `rooms/index.astro` | High |
| Room Detail | `rooms/[slug].astro` | High |
| Booking | `book/index.astro` (eZee widget embed) | High |
| Dining | `dining/index.astro` | Medium |
| Offers List | `offers/index.astro` | Medium |
| Offer Detail | `offers/[slug].astro` | Medium |
| Gallery | `gallery/index.astro` | Medium |
| Contact | `contact/index.astro` | Medium |
| FAQ | `faq/index.astro` | Low |
| Privacy Policy | `privacy-policy/index.astro` | Low |
| Terms | `terms/index.astro` | Low |

---

## Key Configuration

### eZee Booking Widget
Replace the following in `book/index.astro` (not yet scaffolded):
```html
<!-- eZee widget embed -->
<script src="https://live.ipms247.com/booking/book-rooms-[YOUR_PROPERTY_ID].js"></script>
```

### GTM
Replace `GTM-XXXXXXX` in `BaseLayout.astro` with your real GTM container ID.

### Domain
Replace all occurrences of `yourdomain.com` with your actual domain.

---

## Environment Variables

See `.env.example` for all required variables. Key ones:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `EZEE_API_KEY` | eZee API key for availability queries |
| `EZEE_WEBHOOK_SECRET` | HMAC secret for webhook verification |
| `EMAIL_API_KEY` | Postmark / SES key for contact form emails |

---

## Build for Production
```bash
# Build web app
cd apps/web && npx astro build

# API runs as Node process (deploy to Railway, Fly.io, etc.)
cd apps/api && node src/index.js
```

---

## Specification Documents
Full technical specification in `/brain/54acf397-e267-404d-acfa-551d9fd0f8fc/`:
- `spec_part1_ia_architecture.md` — IA, components inventory, architecture decisions
- `spec_part2_data_frontend.md` — DB DDL, OpenAPI spec, design system
- `spec_part3_integration_launch.md` — eZee integration, SEO, testing, security, launch plan
