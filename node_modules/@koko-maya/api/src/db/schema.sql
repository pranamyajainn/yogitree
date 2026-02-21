-- ─── PROPERTY ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS property (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  tagline     TEXT,
  description TEXT,
  address     JSONB NOT NULL DEFAULT '{}',
  phone       TEXT,
  email       TEXT,
  lat         NUMERIC(10,7),
  lng         NUMERIC(10,7),
  ezee_property_id TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ─── MEDIA ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS media (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url       TEXT NOT NULL,
  alt       TEXT DEFAULT '',
  width     INT,
  height    INT,
  mime_type TEXT,
  category  TEXT DEFAULT 'misc',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── ROOM TYPES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS room_type (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  size_sqft   INT,
  max_guests  INT DEFAULT 2,
  bed_type    TEXT,
  description TEXT,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_type_media (
  room_type_id UUID REFERENCES room_type(id) ON DELETE CASCADE,
  media_id     UUID REFERENCES media(id) ON DELETE CASCADE,
  sort_order   INT DEFAULT 0,
  PRIMARY KEY (room_type_id, media_id)
);

-- ─── RATE PLANS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rate_plan (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id  UUID NOT NULL REFERENCES room_type(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  base_price_inr NUMERIC(10,2) NOT NULL,
  meal_plan     TEXT CHECK (meal_plan IN ('EP','CP','MAP','AP')),
  is_active     BOOLEAN DEFAULT true
);

-- ─── AMENITIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS amenity (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  icon        TEXT,
  hours       TEXT,
  is_chargeable BOOLEAN DEFAULT false,
  category    TEXT CHECK (category IN ('room','property'))
);

CREATE TABLE IF NOT EXISTS room_type_amenity (
  room_type_id UUID REFERENCES room_type(id) ON DELETE CASCADE,
  amenity_id   UUID REFERENCES amenity(id) ON DELETE CASCADE,
  PRIMARY KEY (room_type_id, amenity_id)
);

-- ─── OFFERS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS offer (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  summary       TEXT,
  description   TEXT,
  discount_type TEXT CHECK (discount_type IN ('percent','fixed','perk')),
  discount_value NUMERIC(10,2),
  promo_code    TEXT,
  valid_from    DATE,
  valid_until   DATE,
  image_id      UUID REFERENCES media(id),
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ─── TESTIMONIALS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonial (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  title       TEXT,
  body        TEXT NOT NULL,
  rating      INT CHECK (rating BETWEEN 1 AND 5) DEFAULT 5,
  source      TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0
);

-- ─── ATTRACTIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attraction (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  distance_m  INT,
  sort_order  INT DEFAULT 0
);

-- ─── FAQs ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INT DEFAULT 0
);

-- ─── SEO META ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_meta (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path       TEXT UNIQUE NOT NULL,
  title           TEXT,
  description     TEXT,
  og_title        TEXT,
  og_description  TEXT,
  og_image_id     UUID REFERENCES media(id),
  canonical_url   TEXT
);

-- ─── ADMIN USERS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_user (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT CHECK (role IN ('super_admin','content_editor','viewer')),
  mfa_enabled   BOOLEAN DEFAULT false,
  mfa_secret    TEXT,
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ─── BOOKING REFERENCES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS booking_reference (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ezee_booking_id TEXT UNIQUE,
  guest_email     TEXT,
  room_type_id    UUID REFERENCES room_type(id),
  check_in        DATE NOT NULL,
  check_out       DATE NOT NULL,
  adults          INT DEFAULT 1,
  children        INT DEFAULT 0,
  status          TEXT CHECK (status IN ('confirmed','cancelled','modified')) DEFAULT 'confirmed',
  raw_payload     JSONB,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ─── WEBHOOK EVENTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS webhook_event (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source       TEXT NOT NULL,
  event_type   TEXT NOT NULL,
  payload      JSONB NOT NULL,
  processed_at TIMESTAMPTZ,
  error        TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);
