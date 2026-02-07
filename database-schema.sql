-- ================================
-- SUPABASE DATABASE SCHEMA
-- New Tables for E-Commerce Features  
-- ================================

-- ============ REVIEWS TABLE ============
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT REFERENCES products(_id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  admin_reply TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster product review lookups
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- ============ ORDERS TABLE ============
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  -- shipping_address structure: { street, city, state, zipCode, country }
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod', 'card', 'upi', 'wallet')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster order lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============ ORDER ITEMS TABLE ============
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(_id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster order item lookups
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============ COMMENTS ============
-- Reviews: Stores customer reviews and ratings for products
-- Orders: Stores customer order information
-- Order Items: Stores individual products within each order

-- ============ SAMPLE DATA (Optional - for testing) ============

-- Sample Reviews
INSERT INTO reviews (product_id, user_name, user_email, rating, comment, is_approved)
VALUES 
  ('prod-001', 'John Doe', 'john@example.com', 5, 'Excellent quality! Fits perfectly.', true),
  ('prod-001', 'Jane Smith', 'jane@example.com', 4, 'Good product, fast delivery.', true),
  ('prod-002', 'Mike Wilson', 'mike@example.com', 5, 'Love this! Highly recommended.', true)
ON CONFLICT DO NOTHING;

-- Sample Orders (commented out - uncomment to add test data)
-- INSERT INTO orders (order_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, status, payment_method, payment_status)
-- VALUES 
--   ('ORD-2026-001', 'Alice Johnson', 'alice@example.com', '+919876543210', 
--    '{"street":"123 Main St","city":"Mumbai","state":"Maharashtra","zipCode":"400001","country":"India"}',
--    2500.00, 'delivered', 'upi', 'completed'),
--   ('ORD-2026-002', 'Bob Williams', 'bob@example.com', '+919876543211',
--    '{"street":"456 Park Ave","city":"Delhi","state":"Delhi","zipCode":"110001","country":"India"}',
--    1800.00, 'processing', 'cod', 'pending');

-- Sample Order Items (commented out - uncomment to add test data)
-- INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
-- VALUES
--   ((SELECT id FROM orders WHERE order_id = 'ORD-2026-001'), 'prod-001', 'Black Jacket', 1, 1500.00),
--   ((SELECT id FROM orders WHERE order_id = 'ORD-2026-001'), 'prod-002', 'Henley Shirt', 1, 1000.00),
--   ((SELECT id FROM orders WHERE order_id = 'ORD-2026-002'), 'prod-003', 'Cargo Shorts', 2, 900.00);
