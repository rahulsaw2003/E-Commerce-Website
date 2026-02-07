import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAuth } from '../../config/supabase';
import DashboardOverview from './DashboardOverview';
import ProductManager from './ProductManager';
import CouponManager from './CouponManager';
import CategoryManager from './CategoryManager';
import OrderManager from './OrderManager';
import ReviewManager from './ReviewManager';
import { toast } from 'react-toastify';
import './admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { user, error } = await supabaseAuth.getUser();

            if (error || !user) {
                toast.error('Please login to access admin dashboard');
                navigate('/admin');
                return;
            }

            setUser(user);
        } catch (error) {
            console.error('Auth check error:', error);
            navigate('/admin');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await supabaseAuth.signOut();
            toast.success('Logged out successfully');
            navigate('/admin');
        } catch (error) {
            toast.error('Logout failed');
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-left">
                    <h1 className="admin-dashboard-title">ATTIREX Admin</h1>
                    <p className="admin-user-info">
                        {user?.email}
                    </p>
                </div>
                <button onClick={handleLogout} className="admin-logout-btn">
                    Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    📊 Dashboard
                </button>
                <button
                    className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    📦 Products
                </button>
                <button
                    className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    🛒 Orders
                </button>
                <button
                    className={`admin-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ⭐ Reviews
                </button>
                <button
                    className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    🏷️ Categories
                </button>
                <button
                    className={`admin-tab ${activeTab === 'coupons' ? 'active' : ''}`}
                    onClick={() => setActiveTab('coupons')}
                >
                    🎟️ Coupons
                </button>
            </div>

            {/* Content Area */}
            <div className="admin-content">
                {activeTab === 'dashboard' && <DashboardOverview />}
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'orders' && <OrderManager />}
                {activeTab === 'reviews' && <ReviewManager />}
                {activeTab === 'categories' && <CategoryManager />}
                {activeTab === 'coupons' && <CouponManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
