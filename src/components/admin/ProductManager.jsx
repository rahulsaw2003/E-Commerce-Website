import React, { useState, useEffect } from 'react';
import { supabaseProducts, supabaseCategories } from '../../config/supabase';
import { toast } from 'react-toastify';
import ProductFormModal from './ProductFormModal';

const ProductManager = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Filter & Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSection, setSelectedSection] = useState('all');
    const [selectedStock, setSelectedStock] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [allProducts, searchQuery, selectedCategory, selectedSection, selectedStock, sortBy]);

    const loadProducts = async () => {
        setLoading(true);
        const { data, error } = await supabaseProducts.getAll();
        if (error) {
            toast.error('Failed to load products');
            console.error(error);
        } else {
            setAllProducts(data || []);
        }
        setLoading(false);
    };

    const loadCategories = async () => {
        const { data } = await supabaseCategories.getAll();
        if (data) {
            setCategories(data);
        }
    };

    const applyFiltersAndSort = () => {
        let filtered = [...allProducts];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Section filter
        if (selectedSection !== 'all') {
            filtered = filtered.filter(p => p.section === selectedSection);
        }

        // Stock filter
        if (selectedStock !== 'all') {
            if (selectedStock === 'in-stock') {
                filtered = filtered.filter(p => !p.is_out_of_stock);
            } else if (selectedStock === 'out-of-stock') {
                filtered = filtered.filter(p => p.is_out_of_stock);
            }
        }

        // Sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price-high':
                filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'name-asc':
                filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            case 'name-desc':
                filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (_id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabaseProducts.delete(_id);
        if (error) {
            toast.error('Failed to delete product');
            console.error(error);
        } else {
            toast.success('Product deleted!');
            loadProducts();
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleModalSave = () => {
        loadProducts();
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedSection('all');
        setSelectedStock('all');
        setSortBy('newest');
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    if (loading && allProducts.length === 0) {
        return <div className="admin-loading">Loading products...</div>;
    }

    const stats = {
        total: allProducts.length,
        inStock: allProducts.filter(p => !p.is_out_of_stock).length,
        outOfStock: allProducts.filter(p => p.is_out_of_stock).length,
        trending: allProducts.filter(p => p.is_trending).length
    };

    return (
        <div className="manager-container">
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                product={editingProduct}
                onSave={handleModalSave}
            />

            <div className="manager-header">
                <div>
                    <h2>Product Management</h2>
                    <p className="manager-subtitle">
                        Showing {currentProducts.length} of {filteredProducts.length} products
                    </p>
                </div>
                <button onClick={handleAddProduct} className="add-btn">
                    + Add Product
                </button>
            </div>

            {/* Stats Summary */}
            <div className="product-stats">
                <div className="stat-item">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-item stat-success">
                    <span className="stat-value">{stats.inStock}</span>
                    <span className="stat-label">In Stock</span>
                </div>
                <div className="stat-item stat-warning">
                    <span className="stat-value">{stats.outOfStock}</span>
                    <span className="stat-label">Out of Stock</span>
                </div>
                <div className="stat-item stat-purple">
                    <span className="stat-value">{stats.trending}</span>
                    <span className="stat-label">Trending</span>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="filters-container">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Sections</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                </select>

                <select
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Stock Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>

                <button onClick={clearFilters} className="clear-filters-btn">
                    Clear Filters
                </button>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {currentProducts.length === 0 ? (
                    <div className="no-products">
                        <p>No products found matching your filters.</p>
                    </div>
                ) : (
                    currentProducts.map((product) => (
                        <div key={product.id} className="product-admin-card">
                            <div className="product-image-wrapper">
                                <img src={product.image} alt={product.name} />
                                {product.is_out_of_stock && (
                                    <span className="stock-badge out-of-stock">Out of Stock</span>
                                )}
                                {product.is_trending && (
                                    <span className="trending-badge">🔥 Trending</span>
                                )}
                            </div>
                            <div className="product-admin-info">
                                <h3>{product.name}</h3>
                                <p className="product-category">{product.category} | {product.section}</p>
                                <p className="product-price">₹{product.price?.toLocaleString()}</p>
                                <div className="product-actions">
                                    <button onClick={() => handleEdit(product)} className="edit-btn">
                                        ✏️ Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="delete-btn">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        ← Previous
                    </button>

                    <div className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductManager;
