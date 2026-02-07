import React, { useState, useEffect } from 'react';
import { supabaseProducts } from '../../config/supabase';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashboardOverview.css';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalRevenue: 0,
        outOfStock: 0,
        trending: 0
    });
    const [categoryData, setCategoryData] = useState([]);
    const [sectionData, setSectionData] = useState([]);
    const [priceRangeData, setPriceRangeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        const { data: products, error } = await supabaseProducts.getAll();

        if (error) {
            console.error('Failed to load products:', error);
            setLoading(false);
            return;
        }

        if (products) {
            // Calculate stats
            const totalProducts = products.length;
            const totalRevenue = products.reduce((sum, p) => sum + (p.price || 0), 0);
            const outOfStock = products.filter(p => p.is_out_of_stock).length;
            const trending = products.filter(p => p.is_trending).length;

            setStats({ totalProducts, totalRevenue, outOfStock, trending });

            // Category distribution
            const categoryCount = {};
            products.forEach(p => {
                categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
            });
            const categoryChartData = Object.entries(categoryCount)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 8); // Top 8 categories
            setCategoryData(categoryChartData);

            // Section distribution (Mens/Womens/Kids)
            const sectionCount = {};
            products.forEach(p => {
                sectionCount[p.section] = (sectionCount[p.section] || 0) + 1;
            });
            const sectionChartData = Object.entries(sectionCount)
                .map(([name, value]) => ({ name, value }));
            setSectionData(sectionChartData);

            // Price range distribution
            const priceRanges = [
                { range: '₹500-₹700', min: 500, max: 700, count: 0 },
                { range: '₹700-₹900', min: 700, max: 900, count: 0 },
                { range: '₹900-₹1100', min: 900, max: 1100, count: 0 },
                { range: '₹1100-₹1300', min: 1100, max: 1300, count: 0 },
                { range: '₹1300-₹1500', min: 1300, max: 1500, count: 0 }
            ];

            products.forEach(p => {
                const price = p.price || 0;
                priceRanges.forEach(range => {
                    if (price >= range.min && price <= range.max) {
                        range.count++;
                    }
                });
            });

            setPriceRangeData(priceRanges.map(({ range, count }) => ({ range, count })));
        }

        setLoading(false);
    };

    const COLORS = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-overview">
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-card-primary">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3>Total Products</h3>
                        <p className="stat-value">{stats.totalProducts}</p>
                        <span className="stat-label">products in inventory</span>
                    </div>
                </div>

                <div className="stat-card stat-card-success">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Total Value</h3>
                        <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
                        <span className="stat-label">inventory value</span>
                    </div>
                </div>

                <div className="stat-card stat-card-warning">
                    <div className="stat-icon">📉</div>
                    <div className="stat-content">
                        <h3>Out of Stock</h3>
                        <p className="stat-value">{stats.outOfStock}</p>
                        <span className="stat-label">items unavailable</span>
                    </div>
                </div>

                <div className="stat-card stat-card-purple">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-content">
                        <h3>Trending</h3>
                        <p className="stat-value">{stats.trending}</p>
                        <span className="stat-label">hot items</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="charts-grid">
                {/* Category Distribution */}
                <div className="chart-card">
                    <h3 className="chart-title">Top Categories</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Section Distribution (Pie Chart) */}
                <div className="chart-card">
                    <h3 className="chart-title">Products by Section</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={sectionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry) => `${entry.name}: ${entry.value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {sectionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Price Range Distribution */}
                <div className="chart-card chart-card-wide">
                    <h3 className="chart-title">Price Range Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={priceRangeData}>
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#7C3AED"
                                fillOpacity={1}
                                fill="url(#colorCount)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button className="action-btn action-btn-primary">
                        <span className="action-icon">➕</span>
                        <span>Add Product</span>
                    </button>
                    <button className="action-btn action-btn-secondary">
                        <span className="action-icon">📊</span>
                        <span>View Reports</span>
                    </button>
                    <button className="action-btn action-btn-secondary">
                        <span className="action-icon">🏷️</span>
                        <span>Manage Categories</span>
                    </button>
                    <button className="action-btn action-btn-secondary">
                        <span className="action-icon">🎟️</span>
                        <span>Create Coupon</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
