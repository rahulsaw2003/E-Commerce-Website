import React, { useState, useEffect } from 'react';
import { supabaseOrders, supabaseOrderItems } from '../../config/supabase';
import { toast } from 'react-toastify';
import './OrderManager.css';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [orders, selectedStatus]);

    const loadOrders = async () => {
        setLoading(true);
        const { data, error } = await supabaseOrders.getAll();
        if (error) {
            toast.error('Failed to load orders');
            console.error(error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const filterOrders = () => {
        if (selectedStatus === 'all') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(o => o.status === selectedStatus));
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const { error } = await supabaseOrders.updateStatus(orderId, newStatus);
        if (error) {
            toast.error('Failed to update order status');
            console.error(error);
        } else {
            toast.success(`Order status updated to ${newStatus}`);
            loadOrders();
        }
    };

    const handleViewDetails = async (order) => {
        setSelectedOrder(order);
        // Load order items
        const { data, error } = await supabaseOrderItems.getByOrderId(order.id);
        if (!error && data) {
            setOrderItems(data);
        }
        setShowOrderModal(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'shipped':
                return 'status-shipped';
            case 'delivered':
                return 'status-delivered';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
    };

    if (loading) {
        return <div className="admin-loading">Loading orders...</div>;
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div>
                    <h2>Order Management</h2>
                    <p className="manager-subtitle">
                        Showing {filteredOrders.length} of {orders.length} orders
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="order-stats">
                <div className="order-stat-item">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total Orders</span>
                </div>
                <div className="order-stat-item stat-pending">
                    <span className="stat-value">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="order-stat-item stat-processing">
                    <span className="stat-value">{stats.processing}</span>
                    <span className="stat-label">Processing</span>
                </div>
                <div className="order-stat-item stat-shipped">
                    <span className="stat-value">{stats.shipped}</span>
                    <span className="stat-label">Shipped</span>
                </div>
                <div className="order-stat-item stat-delivered">
                    <span className="stat-value">{stats.delivered}</span>
                    <span className="stat-label">Delivered</span>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="status-tabs">
                {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                    <button
                        key={status}
                        className={`status-tab ${selectedStatus === status ? 'active' : ''}`}
                        onClick={() => setSelectedStatus(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {status !== 'all' && ` (${orders.filter(o => o.status === status).length})`}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="table-container">
                {filteredOrders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found for this status.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <span className="order-id">#{order.id.slice(0, 8)}</span>
                                    </td>
                                    <td>
                                        <div className="customer-info">
                                            <strong>{order.user_email}</strong>
                                            <small>{order.user_id}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <strong className="amount">₹{order.total_amount.toLocaleString()}</strong>
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`status-select ${getStatusColor(order.status)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="view-btn"
                                        >
                                            👁️ View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
                    <div className="modal-container order-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Order Details</h2>
                            <button className="modal-close" onClick={() => setShowOrderModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-detail-section">
                                <h3>Order Information</h3>
                                <div className="detail-row">
                                    <span className="detail-label">Order ID:</span>
                                    <span className="detail-value">#{selectedOrder.id}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Customer:</span>
                                    <span className="detail-value">{selectedOrder.user_email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status:</span>
                                    <span className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Total Amount:</span>
                                    <span className="detail-value amount">₹{selectedOrder.total_amount.toLocaleString()}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Order Date:</span>
                                    <span className="detail-value">{new Date(selectedOrder.created_at).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="order-detail-section">
                                <h3>Shipping Address</h3>
                                <div className="address-box">
                                    {selectedOrder.shipping_address && (
                                        <>
                                            <p>{selectedOrder.shipping_address.name}</p>
                                            <p>{selectedOrder.shipping_address.address}</p>
                                            <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.pincode}</p>
                                            <p>Phone: {selectedOrder.shipping_address.phone}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="order-detail-section">
                                <h3>Order Items</h3>
                                <table className="items-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.product_name}</td>
                                                <td>{item.quantity}</td>
                                                <td>₹{item.price.toLocaleString()}</td>
                                                <td>₹{(item.quantity * item.price).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManager;
