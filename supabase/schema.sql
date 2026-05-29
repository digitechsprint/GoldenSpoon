-- ============================================================
-- Golden Spoon Restaurant - Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL > New query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ──────────────────────────────────────────
-- SEO PAGES
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(255) UNIQUE NOT NULL,
  page_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(500),
  canonical_url VARCHAR(500),
  no_index BOOLEAN DEFAULT FALSE,
  schema_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- MENU CATEGORIES
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- MENU ITEMS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(500),
  is_vegetarian BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- BLOG POSTS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(500),
  author VARCHAR(255) DEFAULT 'Golden Spoon',
  category VARCHAR(255),
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  og_image VARCHAR(500),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- BOOKINGS / RESERVATIONS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  booking_date DATE NOT NULL,
  booking_time TIME,
  guests INTEGER DEFAULT 2,
  status VARCHAR(50) DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- SITE SETTINGS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- AUTO-UPDATE updated_at TRIGGER
-- ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER seo_pages_updated_at BEFORE UPDATE ON seo_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER menu_categories_updated_at BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ──────────────────────────────────────────
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read SEO, menu, and published blog posts
CREATE POLICY "Public read seo_pages" ON seo_pages FOR SELECT USING (true);
CREATE POLICY "Public read menu_categories" ON menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (is_published = true);

-- Authenticated admin can do everything
CREATE POLICY "Admin full access seo_pages" ON seo_pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access menu_categories" ON menu_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access menu_items" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert bookings (to make reservations)
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Public can read site settings
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- ──────────────────────────────────────────
-- SUPABASE STORAGE BUCKETS
-- ──────────────────────────────────────────
-- Run these in Supabase Dashboard > Storage, or via the JS client:
-- supabase.storage.createBucket('menu-images', { public: true })
-- supabase.storage.createBucket('blog-images', { public: true })

-- ──────────────────────────────────────────
-- SEED: DEFAULT SEO PAGES
-- ──────────────────────────────────────────
INSERT INTO seo_pages (page_slug, page_name, title, meta_description, meta_keywords, og_title, og_description, og_image)
VALUES
  ('/', 'Home', 'Golden Spoon Restaurant | Best Indian Restaurant in Noida', 'Golden Spoon Restaurant in Noida offers authentic Indian cuisine - Tandoor, Wraps, Rotis & more. Book a table today!', 'Indian restaurant Noida, best restaurant Noida, Golden Spoon restaurant, tandoor, North Indian food', 'Golden Spoon Restaurant | Best Indian Food in Noida', 'Authentic Indian cuisine in the heart of Noida. Tandoor, Wraps, Rotis & more.', '/images/logo.png'),
  ('/about', 'About', 'About Golden Spoon Restaurant | Our Story & Values', 'Learn about Golden Spoon Restaurant - our culinary journey, values, and commitment to authentic Indian flavours in Noida.', 'about Golden Spoon restaurant, Indian cuisine story, Noida restaurant', 'About Golden Spoon Restaurant', 'Our story, our passion for authentic Indian food.', '/images/logo.png'),
  ('/menu', 'Menu', 'Our Menu | Golden Spoon Restaurant Noida', 'Explore our full menu: Tandoor, Wrap & Roll, Roti Rasoi, Sandwiches & Burgers. Fresh ingredients, authentic recipes.', 'restaurant menu Noida, tandoor menu, Indian food menu, wrap roll', 'Golden Spoon Full Menu | Indian Cuisine', 'Explore tandoor, wraps, rotis, sandwiches and more.', '/images/logo.png'),
  ('/blog', 'Blog', 'Food Blog | Golden Spoon Restaurant', 'Recipes, food tips and stories from the Golden Spoon kitchen. Explore our food blog.', 'food blog, Indian recipes, restaurant blog, Golden Spoon', 'Golden Spoon Food Blog', 'Recipes, tips and stories from our kitchen.', '/images/logo.png'),
  ('/contact', 'Contact', 'Contact Golden Spoon Restaurant | Book a Table', 'Contact Golden Spoon Restaurant in Noida or book a table. Address: Sector 8, Noida. Phone: 9217014763.', 'contact Golden Spoon, book table Noida, restaurant reservation', 'Contact Us | Golden Spoon Restaurant', 'Reserve a table or get in touch with us.', '/images/logo.png'),
  ('/chefs', 'Chefs', 'Meet Our Chefs | Golden Spoon Restaurant', 'Meet the talented chefs behind Golden Spoon Restaurant. Masters of authentic Indian cuisine.', 'Golden Spoon chefs, Indian chef Noida, restaurant chefs', 'Our Chefs | Golden Spoon Restaurant', 'Meet the masters behind our authentic flavours.', '/images/logo.png'),
  ('/faqs', 'FAQs', 'FAQs | Golden Spoon Restaurant', 'Frequently asked questions about Golden Spoon Restaurant - hours, location, reservations, and more.', 'Golden Spoon FAQ, restaurant hours, reservations', 'FAQs | Golden Spoon Restaurant', 'Your questions answered.', '/images/logo.png'),
  ('/services', 'Services', 'Services | Golden Spoon Restaurant', 'Catering, private dining, and event services at Golden Spoon Restaurant, Noida.', 'catering Noida, private dining, restaurant events', 'Our Services | Golden Spoon Restaurant', 'Catering, private dining and events.', '/images/logo.png'),
  ('/image-gallery', 'Gallery', 'Photo Gallery | Golden Spoon Restaurant', 'Browse photos of our restaurant, dishes, and events at Golden Spoon, Noida.', 'restaurant gallery, food photos, Golden Spoon photos', 'Photo Gallery | Golden Spoon Restaurant', 'A visual feast from our kitchen and dining room.', '/images/logo.png'),
  ('/testimonial', 'Testimonials', 'Customer Reviews | Golden Spoon Restaurant', 'Read what our guests say about Golden Spoon Restaurant. Authentic reviews from happy customers in Noida.', 'Golden Spoon reviews, restaurant reviews Noida, customer feedback', 'Customer Reviews | Golden Spoon Restaurant', 'What our guests say about us.', '/images/logo.png')
ON CONFLICT (page_slug) DO NOTHING;

-- ──────────────────────────────────────────
-- SEED: DEFAULT MENU CATEGORIES
-- ──────────────────────────────────────────
INSERT INTO menu_categories (name, slug, description, image_url, sort_order)
VALUES
  ('Tandoor', 'tandoor', 'Authentic clay oven delicacies', '/menu/tandoori-platter.jpeg', 1),
  ('Wrap & Roll', 'wrap-roll', 'Fresh wraps and rolls', '/menu/paneer-roll.png', 2),
  ('Roti Rasoi', 'roti-rasoi', 'Traditional Indian breads and curries', '/menu/roti-sabji.jpg', 3),
  ('Sandwiches & Burgers', 'sandwiches-burgers', 'Gourmet sandwiches and burgers', '/menu/veg-burger.jpg', 4),
  ('Beverages', 'beverages', 'Refreshing drinks and juices', '/menu/juice.jpg', 5)
ON CONFLICT (slug) DO NOTHING;

-- ──────────────────────────────────────────
-- ORDERS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(30) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  order_type VARCHAR(20) DEFAULT 'takeaway', -- dine-in | takeaway | delivery
  table_number VARCHAR(20),
  delivery_address TEXT,
  payment_method VARCHAR(10) NOT NULL, -- upi | cod
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending | paid | failed
  utr_number VARCHAR(100),
  order_status VARCHAR(20) DEFAULT 'pending', -- pending | confirmed | preparing | ready | delivered | cancelled
  subtotal DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- ORDER ITEMS
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  item_id UUID,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update trigger for orders
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public can insert orders (to place orders)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Public can read their own orders (by order number — no auth needed for status check)
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');

-- ──────────────────────────────────────────
-- SEED: DEFAULT SITE SETTINGS (UPI etc.)
-- ──────────────────────────────────────────
INSERT INTO site_settings (key, value, description)
VALUES
  ('upi_id', '', 'UPI ID for payments (e.g. goldenspoon@paytm)'),
  ('upi_name', 'Golden Spoon Restaurant', 'Merchant name shown in UPI apps'),
  ('upi_qr_image', '', 'URL to your UPI QR code image (upload to Supabase Storage)'),
  ('ordering_enabled', 'true', 'Enable/disable online ordering'),
  ('min_order_amount', '0', 'Minimum order amount in rupees (0 = no minimum)')
ON CONFLICT (key) DO NOTHING;

-- ──────────────────────────────────────────
-- HOW TO CREATE ADMIN USER
-- ──────────────────────────────────────────
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" > "Create new user"
-- 3. Enter your admin email and password
-- 4. That's it! Use these credentials to log into /admin
-- ──────────────────────────────────────────
