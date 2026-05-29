-- ─────────────────────────────────────────────────────────────────────────────
-- 003_seed_menu.sql
-- Import all menu categories and items from hardcoded data
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Categories ───────────────────────────────────────────────────────────────
INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Tandoor', 'tandoor', true, 0)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Wrap & Roll', 'wrap-roll', true, 1)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Roti Rasoi', 'roti-rasoi', true, 2)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Sandwiches & Burgers', 'sandwiches-burgers', true, 3)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Pizza', 'pizza', true, 4)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Snacks', 'snacks', true, 5)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Main Course', 'main-course', true, 6)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Maggie', 'maggie', true, 7)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Momo', 'momo', true, 8)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Noodles', 'noodles', true, 9)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Rice', 'rice', true, 10)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Pulao & Biryani', 'pulao-biryani', true, 11)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Italian Pasta', 'italian-pasta', true, 12)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Hotspot Soups', 'hotspot-soups', true, 13)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Combo', 'combo', true, 14)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Combo Ke Sath', 'combo-ke-sath', true, 15)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Beverages', 'beverages', true, 16)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Mojito', 'mojito', true, 17)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Chill & Sip', 'chill-sip', true, 18)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'The Dahi House', 'the-dahi-house', true, 19)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO menu_categories (id, name, slug, is_active, sort_order) VALUES
  (gen_random_uuid(), 'Dessert', 'dessert', true, 20)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

-- ── Menu Items ───────────────────────────────────────────────────────────────
INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Achari Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 180, '/menu/achari-chaap.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Achari Mushroom Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 220, '/menu/achari-mushroom-tikka.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Achari Paneer Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 210, '/menu/achari-paneer-tikka.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Afghani Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 190, '/menu/afghani-chaap.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dahi Ke Sholey', (SELECT id FROM menu_categories WHERE slug='tandoor'), 150, '/menu/dahi-ke-sholey.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Haryali Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 180, '/menu/haryali-chaap.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Haryali Paneer Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 210, '/menu/haryali-paneer-tikka.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Malai Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 180, '/menu/malai-chaap.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Malai Paneer Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 210, '/menu/malai-paneer-tikka.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mushroom Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 220, '/menu/mushroom-tikka.jpeg', true, true, 9)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Stuffed Malai Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 220, '/menu/stuffed-malai-chaap.jpeg', true, true, 10)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Stuffed Tandoori Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 220, '/menu/stuffed-tandoori-chaap.jpeg', true, true, 11)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Masala Chaap', (SELECT id FROM menu_categories WHERE slug='tandoor'), 170, '/menu/tandoori-masala-chaap.jpeg', true, true, 12)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Paneer Tikka', (SELECT id FROM menu_categories WHERE slug='tandoor'), 210, '/menu/tandoori-paneer-tikka.jpeg', true, true, 13)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Platter', (SELECT id FROM menu_categories WHERE slug='tandoor'), 399, '/menu/tandoori-platter.jpeg', true, true, 14)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Afghani Chaap Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 90, '/menu/afghani-chaap-roll.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Mushroom Wrap', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 90, '/menu/chilli-mushroom-wrap.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Paneer Wrap', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 90, '/menu/chilli-paneer-wrap.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Malai Chaap Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 90, '/menu/malai-chaap-roll.png', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 70, '/menu/paneer-roll.png', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Chaap Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 80, '/menu/tandoori-chaap-roll.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Manchurian Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 80, '/menu/veg-manchurian-roll.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Roll', (SELECT id FROM menu_categories WHERE slug='wrap-roll'), 50, '/menu/veg-roll.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Aloo Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 45, '/menu/aloo-naan.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Aloo Paratha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 40, '/menu/aloo-paratha.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Aloo Pyaaz Paratha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 60, '/menu/aloo-pyaaz-paratha.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Amritsari Kulcha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 80, '/menu/amritsari-kulcha.png', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Butter Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 40, '/menu/butter-naan.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Classic Boondi Raita', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 56, '/menu/classic-boondi-raita.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Garlic Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 50, '/menu/garlic-naan.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Lachcha Paratha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 40, '/menu/lachcha-paratha.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Masala Missi Roti', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 35, '/menu/masala-missi-roti.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Missi Roti', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 30, '/menu/missi-roti.jpeg', true, true, 9)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mix Veg Paratha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 70, '/menu/mix-veg-paratha.jpeg', true, true, 10)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mix Veg Raita', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 64, '/menu/mix-veg-raita.jpeg', true, true, 11)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Onion Missi Roti', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 30, '/menu/onion-missi-roti.png', true, true, 12)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 70, '/menu/paneer-naan.jpeg', true, true, 13)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Paratha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 70, '/menu/paneer-paratha.jpeg', true, true, 14)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Plain Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 30, '/menu/plain-naan.jpeg', true, true, 15)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Pudina Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 45, '/menu/pudina-naan.jpeg', true, true, 16)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Rumali Roti', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 10, '/menu/rumali-roti.png', true, true, 17)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Special Pineapple Raita', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 72, '/menu/special-pineapple-raita.jpeg', true, true, 18)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Stuffed Kulcha', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 80, '/menu/stuffed-kulcha.jpeg', true, true, 19)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Stuffed Naan', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 60, '/menu/stuffed-naan.jpeg', true, true, 20)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Plain Roti', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 12, '/menu/tandoori-plain-roti.jpeg', true, true, 21)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tandoori Roti Butter', (SELECT id FROM menu_categories WHERE slug='roti-rasoi'), 15, '/menu/tandoori-roti-butter.jpeg', true, true, 22)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Aloo Sandwich', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 50, '/menu/aloo-sandwich.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Cheese Burger', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 60, '/menu/cheese-burger.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Cheese Corn Sandwich', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 60, '/menu/cheese-corn-sandwich.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Paneer Sandwich', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 70, '/menu/chilli-paneer-sandwich.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Double Patty Burger', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 80, '/menu/double-patty-burger.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Grilled Sandwich', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 70, '/menu/grilled-sandwich.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Burger', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 50, '/menu/veg-burger.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Kurkure Burger', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 90, '/menu/veg-kurkure-burger.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veggie Delight Burger', (SELECT id FROM menu_categories WHERE slug='sandwiches-burgers'), 70, '/menu/veggie-delight-burger.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('American Remix Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/american-remix-pizza.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Capsicum Cheese Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/capsicum-cheese-pizza.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Exotic Veg Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/exotic-veg-pizza.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Farmhouse Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/farmhouse-pizza.png', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Golden Corn Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/golden-corn-pizza.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Margherita Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/margherita-pizza.png', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Onion Capsicum Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/onion-capsicum-pizza.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Tikka Pizza', (SELECT id FROM menu_categories WHERE slug='pizza'), NULL, '/menu/paneer-tikka-pizza.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Cheesy Fries', (SELECT id FROM menu_categories WHERE slug='snacks'), 90, '/menu/cheesy-fries.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Baby Corn', (SELECT id FROM menu_categories WHERE slug='snacks'), 150, '/menu/chilli-baby-corn.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Chaap', (SELECT id FROM menu_categories WHERE slug='snacks'), 90, '/menu/chilli-chaap.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Mushroom', (SELECT id FROM menu_categories WHERE slug='snacks'), 128, '/menu/chilli-mushroom.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Paneer Dry', (SELECT id FROM menu_categories WHERE slug='snacks'), 150, '/menu/chilli-paneer-dry.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Paneer Gravy', (SELECT id FROM menu_categories WHERE slug='snacks'), 160, '/menu/chilli-paneer-gravy.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Potato', (SELECT id FROM menu_categories WHERE slug='snacks'), 90, '/menu/chilli-potato.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Crispy Corn', (SELECT id FROM menu_categories WHERE slug='snacks'), 120, '/menu/crispy-corn.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('French Fries', (SELECT id FROM menu_categories WHERE slug='snacks'), 70, '/menu/french-fries.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Honey Chilli Potato', (SELECT id FROM menu_categories WHERE slug='snacks'), 100, '/menu/honey-chilli-potato.jpeg', true, true, 9)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Peri-Peri Fries', (SELECT id FROM menu_categories WHERE slug='snacks'), 80, '/menu/peri-peri-fries.jpeg', true, true, 10)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Manchurian Dry', (SELECT id FROM menu_categories WHERE slug='snacks'), 120, '/menu/veg-manchurian-dry.jpeg', true, true, 11)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Manchurian Gravy', (SELECT id FROM menu_categories WHERE slug='snacks'), 140, '/menu/veg-manchurian-gravy.jpeg', true, true, 12)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Spring Roll', (SELECT id FROM menu_categories WHERE slug='snacks'), 70, '/menu/veg-spring-roll.jpeg', true, true, 13)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chaap Butter Masala', (SELECT id FROM menu_categories WHERE slug='main-course'), 180, '/menu/chaap-butter-masala.png', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dal Fry', (SELECT id FROM menu_categories WHERE slug='main-course'), 100, '/menu/dal-fry.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dal Handi', (SELECT id FROM menu_categories WHERE slug='main-course'), 110, '/menu/dal-handi.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dal Makhani', (SELECT id FROM menu_categories WHERE slug='main-course'), 180, '/menu/dal-makhani.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dal Tadka', (SELECT id FROM menu_categories WHERE slug='main-course'), 120, '/menu/dal-tadka.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Dum Aloo Kashmiri', (SELECT id FROM menu_categories WHERE slug='main-course'), 200, '/menu/dum-aloo-kashmiri.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Kadhai Chaap', (SELECT id FROM menu_categories WHERE slug='main-course'), 220, '/menu/kadhai-chaap.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Kadhai Paneer', (SELECT id FROM menu_categories WHERE slug='main-course'), 230, '/menu/kadhai-paneer.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Malai Kofta Red Gravy', (SELECT id FROM menu_categories WHERE slug='main-course'), 220, '/menu/malai-kofta-red-gravy.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Matar Mushroom', (SELECT id FROM menu_categories WHERE slug='main-course'), 190, '/menu/matar-mushroom.jpeg', true, true, 9)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Matar Paneer', (SELECT id FROM menu_categories WHERE slug='main-course'), 200, '/menu/matar-paneer.jpeg', true, true, 10)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mix Veg', (SELECT id FROM menu_categories WHERE slug='main-course'), 180, '/menu/mix-veg.jpeg', true, true, 11)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mushroom Do Pyaaza', (SELECT id FROM menu_categories WHERE slug='main-course'), 200, '/menu/mushroom-do-pyaaza.jpeg', true, true, 12)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Bhurji', (SELECT id FROM menu_categories WHERE slug='main-course'), 240, '/menu/paneer-bhurji.jpeg', true, true, 13)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Butter Masala', (SELECT id FROM menu_categories WHERE slug='main-course'), 220, '/menu/paneer-butter-masala.jpeg', true, true, 14)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Do Pyaaza', (SELECT id FROM menu_categories WHERE slug='main-course'), 210, '/menu/paneer-do-pyaaza.jpeg', true, true, 15)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Handi', (SELECT id FROM menu_categories WHERE slug='main-course'), 260, '/menu/paneer-handi.jpeg', true, true, 16)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Lababdar', (SELECT id FROM menu_categories WHERE slug='main-course'), 230, '/menu/paneer-lababdar.jpeg', true, true, 17)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Pasanda', (SELECT id FROM menu_categories WHERE slug='main-course'), 240, '/menu/paneer-pasanda.jpeg', true, true, 18)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Tikka Masala', (SELECT id FROM menu_categories WHERE slug='main-course'), 240, '/menu/paneer-tikka-masala.png', true, true, 19)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Shahi Paneer', (SELECT id FROM menu_categories WHERE slug='main-course'), 220, '/menu/shahi-paneer.png', true, true, 20)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tawa Chaap Curry', (SELECT id FROM menu_categories WHERE slug='main-course'), 220, '/menu/tawa-chaap-curry.jpeg', true, true, 21)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Cheesy Maggie', (SELECT id FROM menu_categories WHERE slug='maggie'), 70, '/menu/cheesy-maggie.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Peri-Peri Maggie', (SELECT id FROM menu_categories WHERE slug='maggie'), 60, '/menu/peri-peri-maggie.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Plain Maggie', (SELECT id FROM menu_categories WHERE slug='maggie'), 40, '/menu/plain-maggie.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veggie Maggie', (SELECT id FROM menu_categories WHERE slug='maggie'), 50, '/menu/veggie-maggie.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Afghani Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 150, '/menu/paneer-afghani-momo.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Fried Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 120, '/menu/paneer-fried-momo.png', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Kurkure Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 130, '/menu/paneer-kurkure-momo.png', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Steamed Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 100, '/menu/paneer-steamed-momo.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Tandoori Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 140, '/menu/paneer-tandoori-momo.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Afghani Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 140, '/menu/veg-afghani-momo.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Fried Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 90, '/menu/veg-fried-momo.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Kurkure Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 100, '/menu/veg-kurkure-momo.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Steamed Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 70, '/menu/veg-steamed-momo.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Tandoori Momo', (SELECT id FROM menu_categories WHERE slug='momo'), 130, '/menu/veg-tandoori-momo.jpeg', true, true, 9)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Garlic Noodles', (SELECT id FROM menu_categories WHERE slug='noodles'), 90, '/menu/chilli-garlic-noodles.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Noodles', (SELECT id FROM menu_categories WHERE slug='noodles'), 100, '/menu/paneer-noodles.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Singapuri Noodles', (SELECT id FROM menu_categories WHERE slug='noodles'), 100, '/menu/singapuri-noodles.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Hakka Noodles', (SELECT id FROM menu_categories WHERE slug='noodles'), 90, '/menu/veg-hakka-noodles.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Noodles', (SELECT id FROM menu_categories WHERE slug='noodles'), 80, '/menu/veg-noodles.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chilli Garlic Fried Rice', (SELECT id FROM menu_categories WHERE slug='rice'), 110, '/menu/chilli-garlic-fried-rice.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Fried Rice', (SELECT id FROM menu_categories WHERE slug='rice'), 130, '/menu/paneer-fried-rice.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Corn Rice', (SELECT id FROM menu_categories WHERE slug='rice'), 120, '/menu/veg-corn-rice.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Fried Rice', (SELECT id FROM menu_categories WHERE slug='rice'), 90, '/menu/veg-fried-rice.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Singapuri Fried Rice', (SELECT id FROM menu_categories WHERE slug='rice'), 120, '/menu/veg-singapuri-fried-rice.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Jeera Rice', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 90, '/menu/jeera-rice.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Kashmiri Pulao', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 130, '/menu/kashmiri-pulao.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mutter Pulao', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 120, '/menu/mutter-pulao.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Steamed Rice', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 80, '/menu/steamed-rice.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Hyderabadi Biryani', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 150, '/menu/veg-hyderabadi-biryani.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Pulao', (SELECT id FROM menu_categories WHERE slug='pulao-biryani'), 120, '/menu/veg-pulao.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mushroom Onion Pasta (Red Sauce)', (SELECT id FROM menu_categories WHERE slug='italian-pasta'), 120, '/menu/mushroom-onion-pasta--red-sauce-.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mushroom Onion Pasta (White Sauce)', (SELECT id FROM menu_categories WHERE slug='italian-pasta'), 120, '/menu/mushroom-onion-pasta--white-sauce-.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Pink Sauce Pasta', (SELECT id FROM menu_categories WHERE slug='italian-pasta'), 130, '/menu/pink-sauce-pasta.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Red Sauce Pasta', (SELECT id FROM menu_categories WHERE slug='italian-pasta'), 100, '/menu/red-sauce-pasta.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('White Sauce Pasta', (SELECT id FROM menu_categories WHERE slug='italian-pasta'), 120, '/menu/white-sauce-pasta.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Hot N Sour Soup', (SELECT id FROM menu_categories WHERE slug='hotspot-soups'), 60, '/menu/hot-n-sour-soup.png', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Manchow Soup', (SELECT id FROM menu_categories WHERE slug='hotspot-soups'), 50, '/menu/manchow-soup.png', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Talumein Soup', (SELECT id FROM menu_categories WHERE slug='hotspot-soups'), 60, '/menu/talumein-soup.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tomato Soup', (SELECT id FROM menu_categories WHERE slug='hotspot-soups'), 50, '/menu/tomato-soup.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Veg Sweet Corn Soup', (SELECT id FROM menu_categories WHERE slug='hotspot-soups'), 50, '/menu/veg-sweet-corn-soup.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('China Town', (SELECT id FROM menu_categories WHERE slug='combo'), 180, '/menu/china-town.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Kungfu Bowl', (SELECT id FROM menu_categories WHERE slug='combo'), 99, '/menu/kungfu-bowl.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Roll''S Roller', (SELECT id FROM menu_categories WHERE slug='combo'), 110, '/menu/roll-s-roller.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Sip-N-Roll', (SELECT id FROM menu_categories WHERE slug='combo'), 110, '/menu/sip-n-roll.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Thaar Roll''S', (SELECT id FROM menu_categories WHERE slug='combo'), 110, '/menu/thaar-roll-s.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chur-Chur Naan Thali', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 110, '/menu/chur-chur-naan-thali.png', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Combo Bowl', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 80, '/menu/combo-bowl.png', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Delight Combo', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 80, '/menu/delight-combo.jpeg', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Malai Chaap + 2 Rumali + Cold Drink', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 180, '/menu/malai-chaap---2-rumali--cold-drink.png', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Masala Chaap + 2 Rumali + Cold Drink', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 170, '/menu/masala-chaap--2-rumali--cold-drink.png', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Paneer Tikka Masala + 2 Rumali + Cold Drink', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 180, '/menu/paneer-tikka-masala---2-rumali--cold-drink.png', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Regular Thali', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 150, '/menu/regular-thali.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Standard Thali', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 100, '/menu/standard-thali.png', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Super Deluxe Thali', (SELECT id FROM menu_categories WHERE slug='combo-ke-sath'), 220, '/menu/super-deluxe-thali.png', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Bisleri', (SELECT id FROM menu_categories WHERE slug='beverages'), NULL, '/images/logo.png', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Coke', (SELECT id FROM menu_categories WHERE slug='beverages'), NULL, '/images/logo.png', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Fanta', (SELECT id FROM menu_categories WHERE slug='beverages'), NULL, '/images/logo.png', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Hot Chocolate Milk', (SELECT id FROM menu_categories WHERE slug='beverages'), 50, '/menu/hot-chocolate-milk.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Hot Coffee', (SELECT id FROM menu_categories WHERE slug='beverages'), 40, '/menu/hot-coffee.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Masala Tea', (SELECT id FROM menu_categories WHERE slug='beverages'), 30, '/menu/masala-tea.png', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Pepsi', (SELECT id FROM menu_categories WHERE slug='beverages'), NULL, '/images/logo.png', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Tea', (SELECT id FROM menu_categories WHERE slug='beverages'), 15, '/menu/tea.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Thums Up', (SELECT id FROM menu_categories WHERE slug='beverages'), NULL, '/images/logo.png', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Blood Orange Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/blood-orange-mojito.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Blue Lagoon Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/blue-lagoon-mojito.png', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Green Apple Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/green-apple-mojito.png', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mango Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/mango-mojito.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Peach Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/peach-mojito.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Pineapple Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/pineapple-mojito.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Strawberry Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/strawberry-mojito.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Virgin Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/virgin-mojito.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Water Melon Mojito', (SELECT id FROM menu_categories WHERE slug='mojito'), 69, '/menu/water-melon-mojito.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Blueberry Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 90, '/menu/blueberry-milk-shake.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Chocolate Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 80, '/menu/chocolate-milk-shake.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Cold Coffee', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 70, '/menu/cold-coffee.png', true, true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Kit-Kat Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 90, '/menu/kit-kat-milk-shake.jpeg', true, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Mango Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 90, '/menu/mango-milk-shake.jpeg', true, true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Oreo Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 80, '/menu/oreo-milk-shake.jpeg', true, true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Pineapple Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 90, '/menu/pine-apple-milk-shake.jpeg', true, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Strawberry Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 90, '/menu/strawberry-milk-shake.jpeg', true, true, 7)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Vanilla Milk Shake', (SELECT id FROM menu_categories WHERE slug='chill-sip'), 70, '/menu/vanilla-milk-shake.jpeg', true, true, 8)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Boondi Raita', (SELECT id FROM menu_categories WHERE slug='the-dahi-house'), 35, '/menu/boondi-raita.jpeg', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Fresh Plain Curd', (SELECT id FROM menu_categories WHERE slug='the-dahi-house'), 30, '/menu/fresh-plain-curd.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Gulab Jamun (Per Pc)', (SELECT id FROM menu_categories WHERE slug='dessert'), 40, '/menu/gulab-jamun--per-pc-.png', true, true, 0)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Special Thandi Kheer', (SELECT id FROM menu_categories WHERE slug='dessert'), 90, '/menu/special-thandi-kheer.jpeg', true, true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (name, category_id, price, image_url, is_vegetarian, is_active, sort_order) VALUES
  ('Sponge Rasgulla (Per Pc)', (SELECT id FROM menu_categories WHERE slug='dessert'), 50, '/menu/sponge-rasgulla--per-pc-.png', true, true, 2)
ON CONFLICT DO NOTHING;

