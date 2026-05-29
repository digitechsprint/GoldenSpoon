-- ─────────────────────────────────────────────────────────────────────────────
-- 002_page_content.sql
-- Full CMS: page content + site-wide content + enhanced SEO
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop old seo_pages if migrating (content now lives in page_content.seo)
-- Keep it for now for backwards compatibility; server merges both.

-- ── page_content ─────────────────────────────────────────────────────────────
-- One row per page. `content` is a free-form JSONB blob the admin edits.
-- `seo` stores all SEO fields (replaces seo_pages for new pages).
CREATE TABLE IF NOT EXISTS page_content (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          TEXT          UNIQUE NOT NULL,          -- '/', '/about', '/contact', etc.
  page_title    TEXT          NOT NULL,                 -- human label in admin
  content       JSONB         NOT NULL DEFAULT '{}',    -- all section content
  seo           JSONB         NOT NULL DEFAULT '{}',    -- title, desc, keywords, og, schema, head
  is_published  BOOLEAN       NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_page_content_updated_at ON page_content;
CREATE TRIGGER trg_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── site_content ──────────────────────────────────────────────────────────────
-- Key-value store for site-wide content: nav logo, footer text, social links,
-- contact info, etc. Admin can edit all of these.
CREATE TABLE IF NOT EXISTS site_content (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key   TEXT          UNIQUE NOT NULL,
  content_value TEXT,
  content_type  TEXT          NOT NULL DEFAULT 'text',  -- text | image | html | json
  label         TEXT,                                    -- human label for admin
  section       TEXT          NOT NULL DEFAULT 'global', -- 'header','footer','contact', etc.
  sort_order    INT           NOT NULL DEFAULT 0,
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_site_content_updated_at ON site_content;
CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Seed default page_content rows ───────────────────────────────────────────
INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/', 'Home', '{
  "hero": {
    "badge": "Golden Spoon Restaurant, Noida",
    "title": "Dining in Noida,\nMade Memorable",
    "description": "At Golden Spoon Restaurant, Noida, every meal is prepared with care, served with warmth, and designed to leave a lasting impression. From everyday cravings to special occasions, we make dining feel easy, flavorful, and inviting.",
    "cta_text": "Book A Table",
    "cta_link": "/contact",
    "image": "/images/anual.png"
  },
  "about": {
    "badge": "About Us",
    "title": "A Passion for Authentic Flavours",
    "description": "Golden Spoon is Noida''s favourite destination for authentic Indian cuisine. From sizzling tandoor to crispy wraps and hearty rotis, every dish is cooked with love and served fresh.",
    "image": "/images/about-us-image.jpg",
    "video_url": ""
  },
  "why_choose": {
    "badge": "Why Choose Us",
    "title": "The Golden Spoon Difference",
    "items": [
      {"icon": "fas fa-fire", "title": "Fresh Tandoor Daily", "description": "Our tandoor burns fresh every morning for authentic smoky flavours."},
      {"icon": "fas fa-leaf", "title": "Pure Vegetarian", "description": "100% vegetarian kitchen — every ingredient sourced fresh."},
      {"icon": "fas fa-clock", "title": "Fast Service", "description": "Quick preparation without compromising on taste or quality."},
      {"icon": "fas fa-star", "title": "5-Star Taste", "description": "Recipes passed down through generations, perfected for you."}
    ]
  },
  "stats": [
    {"number": "10+", "label": "Years of Experience"},
    {"number": "5000+", "label": "Happy Customers"},
    {"number": "100+", "label": "Menu Items"},
    {"number": "4.8★", "label": "Google Rating"}
  ],
  "gallery_badge": "Our Gallery",
  "gallery_title": "A Feast for the Eyes",
  "testimonials_badge": "Customer Love",
  "testimonials_title": "What Our Guests Say"
}',
'{
  "title": "Golden Spoon Restaurant | Authentic Indian Cuisine in Noida",
  "meta_description": "Experience authentic Indian cuisine at Golden Spoon Restaurant, Noida. Tandoor, wraps, rotis, curries and more. Order online or book a table today.",
  "meta_keywords": "restaurant noida, indian food noida, tandoor noida, order food online noida, golden spoon restaurant",
  "og_title": "Golden Spoon Restaurant — Dining in Noida Made Memorable",
  "og_description": "Fresh tandoor, crispy wraps, and rich curries. Visit Golden Spoon Restaurant in Noida or order online.",
  "og_image": "/images/golden-spoon-logo.png",
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Golden Spoon Restaurant",
    "image": "/images/golden-spoon-logo.png",
    "address": {"@type": "PostalAddress", "addressLocality": "Noida", "addressRegion": "UP", "addressCountry": "IN"},
    "servesCuisine": "Indian",
    "priceRange": "₹₹",
    "telephone": "",
    "url": ""
  }
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/about', 'About Us', '{
  "header": {"title": "About Us", "breadcrumb": "About Us"},
  "story": {
    "badge": "Our Story",
    "title": "Born from a Love of Indian Cooking",
    "description": "Golden Spoon Restaurant was founded with one simple mission: to bring the authentic flavours of Indian home cooking to the streets of Noida. Every recipe has been perfected over years of passion and dedication.",
    "image": "/images/about-us-image.jpg"
  },
  "values": {
    "badge": "Our Values",
    "title": "What We Stand For",
    "items": [
      {"icon": "fas fa-heart", "title": "Made with Love", "description": "Every dish is prepared fresh, cooked to order with the finest ingredients."},
      {"icon": "fas fa-leaf", "title": "Pure Veg", "description": "Strictly vegetarian kitchen — no compromise on purity."},
      {"icon": "fas fa-users", "title": "Community First", "description": "We are proud to serve the Noida community every single day."}
    ]
  },
  "team_badge": "Our Team",
  "team_title": "The Faces Behind the Flavours"
}',
'{
  "title": "About Us | Golden Spoon Restaurant Noida",
  "meta_description": "Learn the story behind Golden Spoon Restaurant — authentic Indian cuisine in Noida, crafted with passion and served with warmth.",
  "og_title": "About Golden Spoon Restaurant | Noida",
  "og_description": "Discover the story, values, and team behind Golden Spoon — Noida''s favourite vegetarian Indian restaurant."
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/menu', 'Menu', '{
  "header": {"title": "Our Menu", "breadcrumb": "Menu"},
  "badge": "Taste the Best",
  "title": "Our Special Menu",
  "description": "Enjoy the unique dishes from the Golden Spoon restaurant that only our restaurant has."
}',
'{
  "title": "Menu | Golden Spoon Restaurant Noida",
  "meta_description": "Explore the full menu at Golden Spoon Restaurant — tandoor, wraps, rotis, curries, snacks, beverages and more. Order online today.",
  "meta_keywords": "golden spoon menu, tandoor noida, paneer dishes noida, wraps noida, vegetarian restaurant menu"
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/contact', 'Contact', '{
  "header": {"title": "Contact Us", "breadcrumb": "Contact Us"},
  "badge": "Get In Touch",
  "title": "Visit Us or Reach Out",
  "address": "Golden Spoon Restaurant, Noida, Uttar Pradesh, India",
  "phone": "+91 XXXXXXXXXX",
  "email": "info@goldenspoon.in",
  "hours": "Mon–Sun: 11:00 AM – 11:00 PM",
  "map_embed": "",
  "form_title": "Book a Table",
  "form_description": "Reserve your table in advance and we will have everything ready for you."
}',
'{
  "title": "Contact & Reservations | Golden Spoon Restaurant Noida",
  "meta_description": "Contact Golden Spoon Restaurant in Noida — book a table, get directions, or reach out. We are open 7 days a week."
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/services', 'Services', '{
  "header": {"title": "Our Services", "breadcrumb": "Services"},
  "badge": "What We Offer",
  "title": "More Than Just a Restaurant",
  "items": [
    {"icon": "fas fa-utensils", "title": "Dine In", "description": "A warm, inviting atmosphere for family meals and special occasions.", "image": "/images/services-1.jpg"},
    {"icon": "fas fa-motorcycle", "title": "Home Delivery", "description": "Fresh, hot food delivered to your door across Noida.", "image": "/images/services-2.jpg"},
    {"icon": "fas fa-box", "title": "Takeaway", "description": "Order online and pick up your meal in minutes — no waiting.", "image": "/images/services-3.jpg"},
    {"icon": "fas fa-birthday-cake", "title": "Catering", "description": "Let us handle the food for your next event or celebration.", "image": "/images/services-4.jpg"}
  ]
}',
'{
  "title": "Services | Golden Spoon Restaurant Noida",
  "meta_description": "Golden Spoon Restaurant offers dine-in, home delivery, takeaway, and catering services in Noida."
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/order', 'Order Online', '{
  "header": {"title": "Order Online", "breadcrumb": "Order Online"},
  "badge": "Golden Spoon Kitchen",
  "title": "Choose From Our Menu",
  "description": "Fresh, hot and made to order. Add items to your cart and checkout in minutes."
}',
'{
  "title": "Order Online | Golden Spoon Restaurant Noida",
  "meta_description": "Order fresh Indian food online from Golden Spoon Restaurant, Noida. Tandoor, wraps, rotis, curries and more — delivered to your door."
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/checkout', 'Checkout', '{
  "header": {"title": "Checkout", "breadcrumb": "Checkout"}
}',
'{
  "title": "Checkout | Golden Spoon Restaurant",
  "no_index": true
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/blog', 'Blog', '{
  "header": {"title": "Our Blog", "breadcrumb": "Blog"},
  "badge": "From Our Kitchen",
  "title": "Stories, Recipes & News"
}',
'{
  "title": "Blog | Golden Spoon Restaurant Noida",
  "meta_description": "Read the latest stories, recipes, and news from Golden Spoon Restaurant, Noida."
}')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO page_content (slug, page_title, content, seo) VALUES

('/faqs', 'FAQs', '{
  "header": {"title": "FAQs", "breadcrumb": "FAQs"},
  "badge": "Got Questions?",
  "title": "Frequently Asked Questions"
}',
'{
  "title": "FAQs | Golden Spoon Restaurant Noida",
  "meta_description": "Answers to common questions about Golden Spoon Restaurant — reservations, ordering, allergens, opening hours and more."
}')

ON CONFLICT (slug) DO NOTHING;

-- ── Seed default site_content rows ───────────────────────────────────────────
INSERT INTO site_content (content_key, content_value, content_type, label, section, sort_order) VALUES
('header.logo',         '/images/golden-spoon-logo.png', 'image', 'Header Logo',       'header',  1),
('header.phone',        '+91 XXXXXXXXXX',               'text',  'Header Phone',       'header',  2),
('header.email',        'info@goldenspoon.in',          'text',  'Header Email',       'header',  3),
('footer.tagline',      'Golden Spoon Restaurant — Authentic Indian Cuisine in Noida.', 'text', 'Footer Tagline', 'footer', 1),
('footer.address',      'Noida, Uttar Pradesh, India',  'text',  'Footer Address',     'footer',  2),
('footer.phone',        '+91 XXXXXXXXXX',               'text',  'Footer Phone',       'footer',  3),
('footer.email',        'info@goldenspoon.in',          'text',  'Footer Email',       'footer',  4),
('footer.copyright',    '© 2025 Golden Spoon Restaurant. All rights reserved.', 'text', 'Copyright Text', 'footer', 5),
('social.facebook',     '#',                            'text',  'Facebook URL',       'social',  1),
('social.instagram',    'https://www.instagram.com/golden_spoon_restaurrant', 'text', 'Instagram URL', 'social', 2),
('social.whatsapp',     '',                             'text',  'WhatsApp Number',    'social',  3),
('contact.address',     'Golden Spoon Restaurant, Noida, UP, India', 'text', 'Restaurant Address', 'contact', 1),
('contact.phone',       '+91 XXXXXXXXXX',               'text',  'Phone Number',       'contact', 2),
('contact.email',       'info@goldenspoon.in',          'text',  'Email Address',      'contact', 3),
('contact.hours',       'Mon–Sun: 11:00 AM – 11:00 PM', 'text', 'Opening Hours',      'contact', 4),
('contact.map_embed',   '',                             'html',  'Google Maps Embed',  'contact', 5),
('site.name',           'Golden Spoon Restaurant',      'text',  'Site Name',          'global',  1),
('site.tagline',        'Authentic Indian Cuisine in Noida', 'text', 'Site Tagline',   'global',  2),
('site.default_og_image', '/images/golden-spoon-logo.png', 'image', 'Default OG Image', 'global', 3),
('site.google_analytics', '',                          'text',  'GA Measurement ID',  'global',  4),
('site.favicon',        '/images/logo.png',             'image', 'Favicon',            'global',  5)
ON CONFLICT (content_key) DO NOTHING;

-- ── RLS: allow public read, authenticated write ───────────────────────────────
ALTER TABLE page_content  ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read page_content"  ON page_content;
DROP POLICY IF EXISTS "auth write page_content"   ON page_content;
DROP POLICY IF EXISTS "public read site_content"  ON site_content;
DROP POLICY IF EXISTS "auth write site_content"   ON site_content;

CREATE POLICY "public read page_content"  ON page_content FOR SELECT USING (true);
CREATE POLICY "auth write page_content"   ON page_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "public read site_content"  ON site_content FOR SELECT USING (true);
CREATE POLICY "auth write site_content"   ON site_content FOR ALL USING (auth.role() = 'authenticated');
