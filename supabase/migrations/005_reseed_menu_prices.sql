-- 005_reseed_menu_prices.sql
-- Update all menu items with correct half + full prices

UPDATE menu_items SET price = 180, price_half = 120
  WHERE name = 'Achari Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 220, price_half = NULL
  WHERE name = 'Achari Mushroom Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 210, price_half = 130
  WHERE name = 'Achari Paneer Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 190, price_half = 130
  WHERE name = 'Afghani Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 150, price_half = NULL
  WHERE name = 'Dahi Ke Sholey' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 180, price_half = 120
  WHERE name = 'Haryali Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 210, price_half = 140
  WHERE name = 'Haryali Paneer Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 180, price_half = 120
  WHERE name = 'Malai Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 210, price_half = 140
  WHERE name = 'Malai Paneer Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 220, price_half = NULL
  WHERE name = 'Mushroom Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 220, price_half = 150
  WHERE name = 'Stuffed Malai Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 220, price_half = 150
  WHERE name = 'Stuffed Tandoori Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 170, price_half = 110
  WHERE name = 'Tandoori Masala Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 210, price_half = 130
  WHERE name = 'Tandoori Paneer Tikka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 399, price_half = NULL
  WHERE name = 'Tandoori Platter' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'tandoor');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Afghani Chaap Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Chilli Mushroom Wrap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Chilli Paneer Wrap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Malai Chaap Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Paneer Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Tandoori Chaap Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Veg Manchurian Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Veg Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'wrap-roll');
UPDATE menu_items SET price = 45, price_half = NULL
  WHERE name = 'Aloo Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Aloo Paratha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Aloo Pyaaz Paratha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Amritsari Kulcha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Butter Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 56, price_half = NULL
  WHERE name = 'Classic Boondi Raita' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Garlic Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Lachcha Paratha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 35, price_half = NULL
  WHERE name = 'Masala Missi Roti' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 30, price_half = NULL
  WHERE name = 'Missi Roti' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Mix Veg Paratha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 64, price_half = NULL
  WHERE name = 'Mix Veg Raita' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 30, price_half = NULL
  WHERE name = 'Onion Missi Roti' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Paneer Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Paneer Paratha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 30, price_half = NULL
  WHERE name = 'Plain Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 45, price_half = NULL
  WHERE name = 'Pudina Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 10, price_half = NULL
  WHERE name = 'Rumali Roti' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 72, price_half = NULL
  WHERE name = 'Special Pineapple Raita' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Stuffed Kulcha' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Stuffed Naan' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 12, price_half = NULL
  WHERE name = 'Tandoori Plain Roti' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 15, price_half = NULL
  WHERE name = 'Tandoori Roti Butter' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'roti-rasoi');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Aloo Sandwich' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Cheese Burger' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Cheese Corn Sandwich' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Chilli Paneer Sandwich' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Double Patty Burger' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Grilled Sandwich' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Veg Burger' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Veg Kurkure Burger' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Veggie Delight Burger' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'sandwiches-burgers');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'American Remix Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Capsicum Cheese Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Exotic Veg Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Farmhouse Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Golden Corn Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Margherita Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Onion Capsicum Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Paneer Tikka Pizza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pizza');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Cheesy Fries' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 150, price_half = 90
  WHERE name = 'Chilli Baby Corn' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 90, price_half = 70
  WHERE name = 'Chilli Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 128, price_half = NULL
  WHERE name = 'Chilli Mushroom' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 150, price_half = 90
  WHERE name = 'Chilli Paneer Dry' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 160, price_half = 100
  WHERE name = 'Chilli Paneer Gravy' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 90, price_half = 70
  WHERE name = 'Chilli Potato' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'Crispy Corn' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'French Fries' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 100, price_half = 80
  WHERE name = 'Honey Chilli Potato' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Peri-Peri Fries' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 120, price_half = 80
  WHERE name = 'Veg Manchurian Dry' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 140, price_half = 90
  WHERE name = 'Veg Manchurian Gravy' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Veg Spring Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'snacks');
UPDATE menu_items SET price = 180, price_half = 110
  WHERE name = 'Chaap Butter Masala' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 100, price_half = 70
  WHERE name = 'Dal Fry' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 110, price_half = 80
  WHERE name = 'Dal Handi' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 180, price_half = 100
  WHERE name = 'Dal Makhani' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 120, price_half = 90
  WHERE name = 'Dal Tadka' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 200, price_half = 120
  WHERE name = 'Dum Aloo Kashmiri' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 220, price_half = 130
  WHERE name = 'Kadhai Chaap' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 230, price_half = 130
  WHERE name = 'Kadhai Paneer' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 220, price_half = 130
  WHERE name = 'Malai Kofta Red Gravy' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 190, price_half = 115
  WHERE name = 'Matar Mushroom' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 200, price_half = 120
  WHERE name = 'Matar Paneer' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 180, price_half = 110
  WHERE name = 'Mix Veg' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 200, price_half = 120
  WHERE name = 'Mushroom Do Pyaaza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 240, price_half = 140
  WHERE name = 'Paneer Bhurji' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 220, price_half = 130
  WHERE name = 'Paneer Butter Masala' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 210, price_half = 120
  WHERE name = 'Paneer Do Pyaaza' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 260, price_half = 150
  WHERE name = 'Paneer Handi' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 230, price_half = 130
  WHERE name = 'Paneer Lababdar' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 240, price_half = 140
  WHERE name = 'Paneer Pasanda' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 240, price_half = 140
  WHERE name = 'Paneer Tikka Masala' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 220, price_half = 130
  WHERE name = 'Shahi Paneer' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 220, price_half = 130
  WHERE name = 'Tawa Chaap Curry' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'main-course');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Cheesy Maggie' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'maggie');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Peri-Peri Maggie' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'maggie');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Plain Maggie' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'maggie');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Veggie Maggie' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'maggie');
UPDATE menu_items SET price = 150, price_half = 110
  WHERE name = 'Paneer Afghani Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 120, price_half = 100
  WHERE name = 'Paneer Fried Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 130, price_half = 110
  WHERE name = 'Paneer Kurkure Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 100, price_half = 80
  WHERE name = 'Paneer Steamed Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 140, price_half = 100
  WHERE name = 'Paneer Tandoori Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 140, price_half = 110
  WHERE name = 'Veg Afghani Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 90, price_half = 60
  WHERE name = 'Veg Fried Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 100, price_half = 70
  WHERE name = 'Veg Kurkure Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 70, price_half = 50
  WHERE name = 'Veg Steamed Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 130, price_half = 90
  WHERE name = 'Veg Tandoori Momo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'momo');
UPDATE menu_items SET price = 90, price_half = 60
  WHERE name = 'Chilli Garlic Noodles' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'noodles');
UPDATE menu_items SET price = 100, price_half = 80
  WHERE name = 'Paneer Noodles' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'noodles');
UPDATE menu_items SET price = 100, price_half = 80
  WHERE name = 'Singapuri Noodles' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'noodles');
UPDATE menu_items SET price = 90, price_half = 60
  WHERE name = 'Veg Hakka Noodles' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'noodles');
UPDATE menu_items SET price = 80, price_half = 50
  WHERE name = 'Veg Noodles' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'noodles');
UPDATE menu_items SET price = 110, price_half = 70
  WHERE name = 'Chilli Garlic Fried Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'rice');
UPDATE menu_items SET price = 130, price_half = 90
  WHERE name = 'Paneer Fried Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'rice');
UPDATE menu_items SET price = 120, price_half = 80
  WHERE name = 'Veg Corn Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'rice');
UPDATE menu_items SET price = 90, price_half = 70
  WHERE name = 'Veg Fried Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'rice');
UPDATE menu_items SET price = 120, price_half = 80
  WHERE name = 'Veg Singapuri Fried Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'rice');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Jeera Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 130, price_half = NULL
  WHERE name = 'Kashmiri Pulao' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'Mutter Pulao' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Steamed Rice' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 150, price_half = NULL
  WHERE name = 'Veg Hyderabadi Biryani' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'Veg Pulao' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'pulao-biryani');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'Mushroom Onion Pasta (Red Sauce)' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'italian-pasta');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'Mushroom Onion Pasta (White Sauce)' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'italian-pasta');
UPDATE menu_items SET price = 130, price_half = NULL
  WHERE name = 'Pink Sauce Pasta' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'italian-pasta');
UPDATE menu_items SET price = 100, price_half = NULL
  WHERE name = 'Red Sauce Pasta' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'italian-pasta');
UPDATE menu_items SET price = 120, price_half = NULL
  WHERE name = 'White Sauce Pasta' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'italian-pasta');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Hot N Sour Soup' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'hotspot-soups');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Manchow Soup' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'hotspot-soups');
UPDATE menu_items SET price = 60, price_half = NULL
  WHERE name = 'Talumein Soup' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'hotspot-soups');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Tomato Soup' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'hotspot-soups');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Veg Sweet Corn Soup' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'hotspot-soups');
UPDATE menu_items SET price = 180, price_half = NULL
  WHERE name = 'China Town' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo');
UPDATE menu_items SET price = 99, price_half = NULL
  WHERE name = 'Kungfu Bowl' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo');
UPDATE menu_items SET price = 110, price_half = NULL
  WHERE name = 'Roll''S Roller' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo');
UPDATE menu_items SET price = 110, price_half = NULL
  WHERE name = 'Sip-N-Roll' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo');
UPDATE menu_items SET price = 110, price_half = NULL
  WHERE name = 'Thaar Roll''S' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo');
UPDATE menu_items SET price = 110, price_half = NULL
  WHERE name = 'Chur-Chur Naan Thali' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Combo Bowl' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Delight Combo' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 180, price_half = NULL
  WHERE name = 'Malai Chaap + 2 Rumali + Cold Drink' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 170, price_half = NULL
  WHERE name = 'Masala Chaap + 2 Rumali + Cold Drink' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 180, price_half = NULL
  WHERE name = 'Paneer Tikka Masala + 2 Rumali + Cold Drink' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 150, price_half = NULL
  WHERE name = 'Regular Thali' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 100, price_half = NULL
  WHERE name = 'Standard Thali' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = 220, price_half = NULL
  WHERE name = 'Super Deluxe Thali' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'combo-ke-sath');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Bisleri' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Coke' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Fanta' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Hot Chocolate Milk' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Hot Coffee' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = 30, price_half = NULL
  WHERE name = 'Masala Tea' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Pepsi' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = 15, price_half = NULL
  WHERE name = 'Tea' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = NULL, price_half = NULL
  WHERE name = 'Thums Up' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'beverages');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Blood Orange Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Blue Lagoon Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Green Apple Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Mango Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Peach Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Pineapple Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Strawberry Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Virgin Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 69, price_half = NULL
  WHERE name = 'Water Melon Mojito' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'mojito');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Blueberry Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Chocolate Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Cold Coffee' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Kit-Kat Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Mango Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 80, price_half = NULL
  WHERE name = 'Oreo Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Pineapple Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Strawberry Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 70, price_half = NULL
  WHERE name = 'Vanilla Milk Shake' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'chill-sip');
UPDATE menu_items SET price = 35, price_half = NULL
  WHERE name = 'Boondi Raita' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'the-dahi-house');
UPDATE menu_items SET price = 30, price_half = NULL
  WHERE name = 'Fresh Plain Curd' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'the-dahi-house');
UPDATE menu_items SET price = 40, price_half = NULL
  WHERE name = 'Gulab Jamun (Per Pc)' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'dessert');
UPDATE menu_items SET price = 90, price_half = NULL
  WHERE name = 'Special Thandi Kheer' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'dessert');
UPDATE menu_items SET price = 50, price_half = NULL
  WHERE name = 'Sponge Rasgulla (Per Pc)' AND category_id = (SELECT id FROM menu_categories WHERE slug = 'dessert');
