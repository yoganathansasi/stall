-- Sasi Maligai Kadai Database Schema

-- Drop tables if they exist
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS grocery_highlights;
DROP TABLE IF EXISTS customer_reviews;

-- 1. Contact Submissions Table (kept for schema consistency, though form is removed in UI)
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Menu Items (Tea, Beverages, Snacks)
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- 'tea', 'beverages', 'snacks'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Grocery Highlights (Maligai items)
CREATE TABLE grocery_highlights (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- 'spices', 'staples', 'beverages', 'daily'
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Customer Reviews Table
CREATE TABLE customer_reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Menu Items (Exact Sasi Tea Shop menu & photographed items)
INSERT INTO menu_items (category, name, description, price) VALUES
('tea', 'Single Tea (சிங்கிள் டீ)', 'Freshly brewed hot milk tea, single serving.', 10.00),
('tea', 'Cup Tea (கப் டீ)', 'A large comforting cup of hot milk tea.', 20.00),
('tea', 'Single Coffee (சிங்கிள் காபி)', 'South Indian style chicory-coffee milk blend, single serving.', 12.00),
('tea', 'Full Coffee (புல் காபி)', 'A full hot cup of South Indian style coffee.', 25.00),
('beverages', 'Single Boost (சிங்கிள் பூஸ்ட்)', 'Warm milk mixed with delicious chocolate Boost powder, single serving.', 15.00),
('beverages', 'Full Boost (புல் பூஸ்ட்)', 'Full comforting cup of warm chocolate Boost milk.', 20.00),
('beverages', 'Single Horlicks (சிங்கிள் ஹார்லிக்ஸ்)', 'Nutritious warm milk blended with Horlicks malt powder, single serving.', 15.00),
('beverages', 'Full Horlicks (புல் ஹார்லிக்ஸ்)', 'Full hot cup of nutritious malted Horlicks milk.', 20.00),
('beverages', 'Sukku Malli Milk (சுக்குமல்லி பால்)', 'Healthy warm milk infused with dry ginger (sukku) and coriander (malli) seeds.', 15.00),
('tea', 'Black Tea (பிளாக் டீ)', 'Strong, hot brewed black tea without milk.', 5.00),
('tea', 'Black Coffee (பிளாக் காபி)', 'Fresh, hot brewed black coffee without milk.', 5.00),
('tea', 'Lemon Tea (லெமன் டீ)', 'Zesty and refreshing brewed hot tea with fresh lemon squeeze.', 10.00),
('snacks', 'Soft Tea Buns (3 Pcs)', 'Freshly baked soft buns, perfect to dip in your tea. Three pieces serving.', 10.00),
('snacks', 'Crispy Tea Rusks (3 Pcs)', 'Golden baked crispy rusks, perfect for tea dipping. Three pieces serving.', 10.00),
('snacks', 'Salt Biscuits (1 Pc)', 'Light and crunchy salt biscuit, single piece.', 2.00),
('snacks', 'Spicy Local Mixture', 'Savory local South Indian mixture containing fried lentils, curry leaves, and spices.', 50.00),
('snacks', 'Crispy Murukku & Savories', 'Traditional crunchy fried savory snacks direct from local bakers.', 50.00);

-- Seed Data for Grocery Highlights (Maligai Essentials matching Photo 5)
INSERT INTO grocery_highlights (name, description, category) VALUES
('Premium Cooking Rice (அரிசி)', 'High-grade, clean daily cooking rice bags, selected for taste and texture.', 'staples'),
('Fine White Sugar (சர்க்கரை)', 'Pure, fine white sugar bags for sweets, tea, and daily kitchen use.', 'staples'),
('Quality Paruppu & Dals (பருப்பு)', 'Essential lentils including Toor dal, Urad dal, and Moong dal for healthy cooking.', 'staples'),
('Wheat Flour Atta (கோடி)', 'Fresh, finely ground wheat flour bags for soft rotis and chapatis.', 'staples'),
('Maggi Instant Noodles (மேகி)', 'Quick, delicious, and convenient Maggi noodle packs, a favorite for kids.', 'staples'),
('Bathing & Laundry Soaps (சோப்பு)', 'Leading brands of bathing soaps (Lux, Lifebuoy) and cleaning soaps (Rin) on our shelves.', 'daily'),
('Daily Fresh Shampoo Sachets (ஷாம்பு)', 'Convenient single-use sachets of top shampoo brands (Clinic Plus, Chik) for clean hair care.', 'daily'),
('Packaged Biscuits (பிஸ்கட்)', 'Popular sweet and salty biscuit brands (Parle-G, Marie Gold) perfect for tea pairings.', 'daily');

-- Seed Data for Customer Reviews (Tamil names & exact shop items)
INSERT INTO customer_reviews (name, rating, comment) VALUES
('Karthikeyan', 5, 'My morning starts at Sasi tea shop. Their hot cup tea and soft tea buns (3 for ₹10) are the perfect combination. I also buy tea rusks and salt biscuits for my home.'),
('Selvaraj', 5, 'Very convenient super market provisions. We get high quality rice, sugar, and paruppu here. The bathing soaps and daily shampoo sachets are always stocked.'),
('Meenakshi', 5, 'Best shop in Jolarpet! My kids love their Maggi packets and sweet biscuits, and the spicy mixture and crispy murukkus (₹50) are excellent evening snacks.'),
('Anbarasan', 4, 'The single coffee and Boost here have an authentic taste. Friendly service and quick shopping for daily wheat flour atta and household essentials.');
