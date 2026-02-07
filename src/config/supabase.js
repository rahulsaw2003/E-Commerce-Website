import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export const supabaseAuth = {
    // Sign in with email and password
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Get current session
    getSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    },

    // Get current user
    getUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    // Listen to auth state changes
    onAuthStateChange: (callback) => {
        return supabase.auth.onAuthStateChange(callback);
    },
};

// Helper functions for products
export const supabaseProducts = {
    // Get all products
    getAll: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Get single product
    getById: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('_id', id)
            .single();
        return { data, error };
    },

    // Create product
    create: async (product) => {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();
        return { data, error };
    },

    // Update product
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('products')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('_id', id)
            .select();
        return { data, error };
    },

    // Delete product
    delete: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .delete()
            .eq('_id', id);
        return { data, error };
    },
};

// Helper functions for categories
export const supabaseCategories = {
    // Get all categories
    getAll: async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });
        return { data, error };
    },

    // Get single category
    getById: async (id) => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('_id', id)
            .single();
        return { data, error };
    },

    // Create category
    create: async (category) => {
        const { data, error } = await supabase
            .from('categories')
            .insert([category])
            .select();
        return { data, error };
    },

    // Update category
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('categories')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('_id', id)
            .select();
        return { data, error };
    },

    // Delete category
    delete: async (id) => {
        const { data, error } = await supabase
            .from('categories')
            .delete()
            .eq('_id', id);
        return { data, error };
    },
};

// Helper functions for coupons
export const supabaseCoupons = {
    // Get all active coupons
    getActive: async () => {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('active', true);
        return { data, error };
    },

    // Get all coupons (admin)
    getAll: async () => {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Create coupon
    create: async (coupon) => {
        const { data, error } = await supabase
            .from('coupons')
            .insert([coupon])
            .select();
        return { data, error };
    },

    // Update coupon
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('coupons')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
        return { data, error };
    },

    // Delete coupon
    delete: async (id) => {
        const { data, error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', id);
        return { data, error };
    },

    // Toggle coupon active status
    toggle: async (id, active) => {
        const { data, error } = await supabase
            .from('coupons')
            .update({ active, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
        return { data, error };
    },
};

// Helper functions for storage
export const supabaseStorage = {
    // Upload image
    uploadImage: async (file, path) => {
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false,
            });
        return { data, error };
    },

    // Get public URL
    getPublicUrl: (path) => {
        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(path);
        return data.publicUrl;
    },

    // Delete image
    deleteImage: async (path) => {
        const { data, error } = await supabase.storage
            .from('product-images')
            .remove([path]);
        return { data, error };
    },
};

// Helper functions for orders
export const supabaseOrders = {
    // Get all orders
    getAll: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Get single order
    getById: async (id) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();
        return { data, error };
    },

    // Create order
    create: async (order) => {
        const { data, error } = await supabase
            .from('orders')
            .insert([order])
            .select();
        return { data, error };
    },

    // Update order
    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('orders')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
        return { data, error };
    },

    // Update order status
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
        return { data, error };
    },

    // Get orders by user
    getByUser: async (userId) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Get orders by status
    getByStatus: async (status) => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false });
        return { data, error };
    },
};

// Helper functions for order items
export const supabaseOrderItems = {
    // Create order items
    create: async (orderItems) => {
        const { data, error } = await supabase
            .from('order_items')
            .insert(orderItems)
            .select();
        return { data, error };
    },

    // Get items by order ID
    getByOrderId: async (orderId) => {
        const { data, error } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', orderId);
        return { data, error };
    },
};

// Helper functions for reviews
export const supabaseReviews = {
    // Get all reviews
    getAll: async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Get reviews by product
    getByProduct: async (productId) => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', productId)
            .eq('status', 'approved')
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Get reviews by status
    getByStatus: async (status) => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Create review
    create: async (review) => {
        const { data, error } = await supabase
            .from('reviews')
            .insert([review])
            .select();
        return { data, error };
    },

    // Update review status
    updateStatus: async (id, status) => {
        const { data, error } = await supabase
            .from('reviews')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
        return { data, error };
    },

    // Delete review
    delete: async (id) => {
        const { data, error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);
        return { data, error };
    },
};

