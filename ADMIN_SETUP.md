# Supabase Admin Dashboard Setup Guide

## ✅ What's Been Created

### 1. Frontend Components
- `AdminLogin.jsx` - Email/password authentication
- `AdminDashboard.jsx` - Main dashboard with tabs
- `ProductManager.jsx` - Full CRUD for products
- `CategoryManager.jsx` - Full CRUD for categories
- `CouponManager.jsx` - Full CRUD for coupons
- `admin.css` - Modern, responsive styling

### 2. Configuration Files
- `/src/config/supabase.js` - Supabase client with helper functions
- `.env` - Environment variables with your Supabase credentials
- `supabase-setup.sql` - Complete database setup script

### 3. Routes Added
- `/admin` - Login page
- `/admin/dashboard` - Admin dashboard

---

## 🚀 Setup Steps

### Step 1: Run SQL in Supabase

1. Go to your Supabase project: https://qzmxiigimyexjnlrcwwz.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy all contents from `supabase-setup.sql`
5. Paste and click **"Run"**

This will create:
- ✅ `products` table with RLS policies
- ✅ `coupons` table with RLS policies
- ✅ `categories` table with RLS policies
- ✅ `product-images` storage bucket
- ✅ Default coupons (Seasonal Offer, Offer for Aryan's Pari)

### Step 2: Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **"Add User"** → **"Create new user"**
3. Enter:
   - **Email**: `admin@attirex.com`
   - **Password**: `2026`
   - **Auto Confirm User**: ✅ Enable this
4. Click **"Create User"**

> **Admin Login Credentials (for the website):**
> - Username: `admin`
> - Password: `2026`
> 
> Note: The username "admin" maps to email "admin@attirex.com" in Supabase.

### Step 3: Restart Development Server

The `.env` file was just created, so restart your app:

```bash
# Stop the current server (Ctrl+C)
npm start
```

### Step 4: Access Admin Dashboard

1. Navigate to: **http://localhost:3000/admin**
2. Login with:
   - **Username**: `admin`
   - **Password**: `2026`
3. You should see the admin dashboard with 3 tabs:
   - 📦 Products
   - 🏷️ Categories
   - 🎟️ Coupons

---

## 📋 Admin Dashboard Features

### Product Management
- **View All**: See all products in a grid layout
- **Add Product**: Create new products with:
  - Product ID, name, category, section
  - Price, original price
  - Image URL
  - Description
  - Stock status, trending flag
- **Edit**: Modify existing products
- **Delete**: Remove products

### Category Management
- **View All**: Table view of all categories
- **Add Category**: Create categories with:
  - Name, section (Mens/Womens/Kids)
  - Description, optional image
- **Toggle Status**: Enable/disable categories
- **Edit/Delete**: Full control

### Coupon Management
- **View All**: Table view with all coupons
- **Add Coupon**: Create coupons with:
  - Name, discount amount
  - Description
  - Minimum order value
- **Toggle Status**: Activate/deactivate coupons
- **Edit/Delete**: Manage existing coupons

---

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- **Public users**: Can only READ active data
- **Authenticated admins**: Full CRUD access
- **Storage**: Public read, admin-only upload/delete

---

## 📝 Next Steps

1. **Run the SQL script** in Supabase
2. **Create your admin user**
3. **Restart the server**
4. **Login to /admin**
5. **Start adding products/categories/coupons**

The existing products from `products.js` are still in the frontend code. You can manually add them through the admin dashboard, or I can create a migration script to bulk insert them.

---

## 🆘 Troubleshooting

**Can't login?**
- Make sure SQL script ran successfully
- Verify admin user was created in Supabase Authentication
- Check browser console for errors

**Environment variables not working?**
- Restart development server after creating  `.env`
- Verify `.env` is in project root
- Check values match your Supabase project

**Database errors?**
- Ensure all SQL ran without errors
- Check Supabase logs in Dashboard
- Verify RLS policies are enabled

---

## 🎨 Admin Theme

The admin dashboard uses a modern gradient theme with:
- Purple/indigo gradients
- Responsive design
- Clean tables and forms
- Status badges
- Smooth animations

Ready to manage your e-commerce store! 🎉
