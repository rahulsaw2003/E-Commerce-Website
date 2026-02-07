-- =============================================
-- Fix Categories Schema
-- Allow same category name for different sections
-- =============================================

-- Step 1: Drop the old unique constraint on name
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_name_key;

-- Step 2: Add a composite unique constraint on (name, section)
-- This allows "Casual" for Mens AND "Casual" for Womens
ALTER TABLE categories ADD CONSTRAINT categories_name_section_unique UNIQUE (name, section);

-- =============================================
-- Now you can have:
-- - "Casual" for "Mens"
-- - "Casual" for "Womens"
-- - "Casual" for "Kids"
-- =============================================
