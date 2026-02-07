-- =============================================
-- ATTIREX Categories Migration SQL
-- Based on actual product categories
-- =============================================

-- Men's Categories
INSERT INTO categories (name, section, description, active)
VALUES ('Casual', 'Mens', 'Browse our collection of Casual wear for Men', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Formal', 'Mens', 'Browse our collection of Formal wear for Men', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Freestyle', 'Mens', 'Browse our collection of Freestyle wear for Men', true);

-- Women's Categories
INSERT INTO categories (name, section, description, active)
VALUES ('Active Wear', 'Womens', 'Browse our collection of Active Wear for Women', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Dresses', 'Womens', 'Browse our collection of Dresses for Women', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Office Wear', 'Womens', 'Browse our collection of Office Wear for Women', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Casual', 'Womens', 'Browse our collection of Casual wear for Women', true);

INSERT INTO categories (name, section, description, active)
VALUES ('Tops', 'Womens', 'Browse our collection of Tops for Women', true);

-- Kids Categories
INSERT INTO categories (name, section, description, active)
VALUES ('Kids'' fashion', 'Kids', 'Browse our collection of Kids fashion', true);

-- =============================================
-- Total: 9 Categories (3 Men's, 5 Women's, 1 Kids)
-- =============================================
