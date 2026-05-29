-- ─────────────────────────────────────────────────────────────────────────────
-- 001_core_tables.sql
-- Core tables: menu, orders, bookings, blog, seo, settings
-- Run this BEFORE 002_page_content.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Menu Categories ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_categories (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT    NOT NULL,
  slug        TEXT    UNIQUE NOT NULL,
  description TEXT,
  image_url   TEXT,
  sort_order  INT     NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Menu Items ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id             UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id    UUID    REFERENCES menu_categories(id) ON DELETE SET NULL,
  name           TEXT    NOT NULL,
  description    TEXT,
  price          NUMERIC(10,2),
  image_url      TEXT,
  is_vegetarian  BOOLEAN NOT NULL DEFAULT true,
  is_featured    BOOLEAN NOT NULL DEFAULT false,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  sort_order     INT     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Orders ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number      TEXT    UNIQUE NOT NULL,
  customer_name     TEXT    NOT NULL,
  customer_phone    TEXT    NOT NULL,
  customer_email    TEXT,
  order_type        TEXT    NOT NULL CHECK (order_type IN ('takeaway','dine-in','delivery')),
  table_number      TEXT,
  delivery_address  TEXT,
  payment_method    TEXT    NOT NULL CHECK (payment_method IN ('upi','cod')),
  payment_status    TEXT    NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed')),
  utr_number        TEXT,
  order_status      TEXT    NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending','confirmed','preparing','ready','delivered','cancelled')),
  subtotal          NUMERIC(10,2) NOT NULL DEFAULT 0,
  total             NUMERIC(10,2) NOT NULL DEFAULT 0,
  special_instructions TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Order Items ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id    UUID    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id     UUID    REFERENCES menu_items(id) ON DELETE SET NULL,
  item_name   TEXT    NOT NULL,
  quantity    INT     NOT NULL DEFAULT 1,
  unit_price  NUMERIC(10,2) NOT NULL,
  subtotal    NUMERIC(10,2) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Bookings ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT    NOT NULL,
  email           TEXT,
  phone           TEXT    NOT NULL,
  guests          INT     NOT NULL DEFAULT 2,
  booking_date    DATE    NOT NULL,
  booking_time    TEXT    NOT NULL,
  occasion        TEXT,
  special_requests TEXT,
  status          TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Blog Posts ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT    NOT NULL,
  slug         TEXT    UNIQUE NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  cover_image  TEXT,
  author_name  TEXT    DEFAULT 'Golden Spoon',
  category     TEXT,
  tags         TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── SEO Pages (legacy, kept for compatibility) ────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_pages (
  id               UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug        TEXT    UNIQUE NOT NULL,
  title            TEXT,
  meta_description TEXT,
  meta_keywords    TEXT,
  og_title         TEXT,
  og_description   TEXT,
  og_image         TEXT,
  no_index         BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Site Settings ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  key           TEXT    UNIQUE NOT NULL,
  value         TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
  ('upi_id',    ''),
  ('upi_name',  'Golden Spoon Restaurant'),
  ('upi_qr_image', '')
ON CONFLICT (key) DO NOTHING;

-- ── RLS Policies ──────────────────────────────────────────────────────────────
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;

-- Public can read menu, blog, seo, settings
DROP POLICY IF EXISTS "public read menu_categories" ON menu_categories;
DROP POLICY IF EXISTS "public read menu_items"      ON menu_items;
DROP POLICY IF EXISTS "public read blog_posts"      ON blog_posts;
DROP POLICY IF EXISTS "public read seo_pages"       ON seo_pages;
DROP POLICY IF EXISTS "public read site_settings"   ON site_settings;
DROP POLICY IF EXISTS "public insert orders"        ON orders;
DROP POLICY IF EXISTS "public insert order_items"   ON order_items;
DROP POLICY IF EXISTS "public insert bookings"      ON bookings;
DROP POLICY IF EXISTS "auth all menu_categories"    ON menu_categories;
DROP POLICY IF EXISTS "auth all menu_items"         ON menu_items;
DROP POLICY IF EXISTS "auth all orders"             ON orders;
DROP POLICY IF EXISTS "auth all order_items"        ON order_items;
DROP POLICY IF EXISTS "auth all bookings"           ON bookings;
DROP POLICY IF EXISTS "auth all blog_posts"         ON blog_posts;
DROP POLICY IF EXISTS "auth all seo_pages"          ON seo_pages;
DROP POLICY IF EXISTS "auth all site_settings"      ON site_settings;

CREATE POLICY "public read menu_categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "public read menu_items"      ON menu_items      FOR SELECT USING (true);
CREATE POLICY "public read blog_posts"      ON blog_posts      FOR SELECT USING (is_published = true);
CREATE POLICY "public read seo_pages"       ON seo_pages       FOR SELECT USING (true);
CREATE POLICY "public read site_settings"   ON site_settings   FOR SELECT USING (true);

-- Public can insert orders and bookings
CREATE POLICY "public insert orders"        ON orders       FOR INSERT WITH CHECK (true);
CREATE POLICY "public insert order_items"   ON order_items  FOR INSERT WITH CHECK (true);
CREATE POLICY "public insert bookings"      ON bookings     FOR INSERT WITH CHECK (true);

-- Authenticated users can do everything
CREATE POLICY "auth all menu_categories"    ON menu_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all menu_items"         ON menu_items      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all orders"             ON orders          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all order_items"        ON order_items     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all bookings"           ON bookings        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all blog_posts"         ON blog_posts      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all seo_pages"          ON seo_pages       FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth all site_settings"      ON site_settings   FOR ALL USING (auth.role() = 'authenticated');
