-- =============================================
-- ATTIREX E-Commerce Database Setup
-- Run these SQL commands in Supabase SQL Editor
-- =============================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  _id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  section TEXT NOT NULL,
  rating NUMERIC DEFAULT 0,
  gender TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT,
  is_out_of_stock BOOLEAN DEFAULT false,
  description TEXT,
  is_trending BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  discount NUMERIC NOT NULL,
  description TEXT,
  min_order_value NUMERIC DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  section TEXT NOT NULL,
  description TEXT,
  image TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(name, section)
);

-- 3. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Products
-- Public read access
CREATE POLICY "Public read products" ON products 
  FOR SELECT USING (true);

-- Admin write access (authenticated users)
CREATE POLICY "Admin insert products" ON products 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update products" ON products 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete products" ON products 
  FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Create Policies for Coupons
-- Public read only active coupons
CREATE POLICY "Public read active coupons" ON coupons 
  FOR SELECT USING (active = true);

-- Admin full access
CREATE POLICY "Admin insert coupons" ON coupons 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update coupons" ON coupons 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete coupons" ON coupons 
  FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Create Policies for Categories
-- Public read active categories
CREATE POLICY "Public read categories" ON categories 
  FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin insert categories" ON categories 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update categories" ON categories 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete categories" ON categories 
  FOR DELETE USING (auth.role() = 'authenticated');

-- 7. Create Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Create Storage Policies
CREATE POLICY "Public read product images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'product-images' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admin delete product images" 
  ON storage.objects FOR DELETE 
  USING (
    bucket_id = 'product-images' AND 
    auth.role() = 'authenticated'
  );

-- 9. Insert Default Coupons
INSERT INTO coupons (name, discount, description, min_order_value, active)
VALUES 
  ('Seasonal Offer', 100, 'Get a refreshing discount of ₹100 on your orders! Brighten up your shopping.', 0, true),
  ('Offer for Aryan''s Pari', 500, 'Save ₹500 on orders and when you gift a dress to your Pari.', 0, true)
ON CONFLICT DO NOTHING;

-- =============================================
-- ADMIN USER SETUP
-- =============================================
-- After running the above SQL, create admin user:
-- 
-- Method 1: Using Supabase Dashboard (RECOMMENDED)
-- 1. Go to Authentication → Users
-- 2. Click "Add User" → "Create new user"
-- 3. Enter:
--    Email: admin@attirex.com
--    Password: 2026
-- 4. Enable "Auto Confirm User"
-- 5. Click "Create User"
--
-- Website Login Credentials (username-based):
-- Username: admin
-- Password: 2026
-- 
-- Note: Username "admin" maps to email "admin@attirex.com" internally
-- =============================================
