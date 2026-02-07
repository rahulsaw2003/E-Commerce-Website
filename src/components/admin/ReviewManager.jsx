import React, { useState, useEffect } from 'react';
import { supabaseReviews } from '../../config/supabase';
import { toast } from 'react-toastify';
import './ReviewManager.css';

const ReviewManager = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    useEffect(() => {
        filterReviews();
    }, [reviews, selectedStatus]);

    const loadReviews = async () => {
        setLoading(true);
        const { data, error } = await supabaseReviews.getAll();
        if (error) {
            toast.error('Failed to load reviews');
            console.error(error);
        } else {
            setReviews(data || []);
        }
        setLoading(false);
    };

    const filterReviews = () => {
        if (selectedStatus === 'all') {
            setFilteredReviews(reviews);
        } else {
            setFilteredReviews(reviews.filter(r => r.status === selectedStatus));
        }
    };

    const handleApprove = async (id) => {
        const { error } = await supabaseReviews.updateStatus(id, 'approved');
        if (error) {
            toast.error('Failed to approve review');
        } else {
            toast.success('Review approved!');
            loadReviews();
        }
    };

    const handleReject = async (id) => {
        const { error } = await supabaseReviews.updateStatus(id, 'rejected');
        if (error) {
            toast.error('Failed to reject review');
        } else {
            toast.success('Review rejected');
            loadReviews();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        const { error } = await supabaseReviews.delete(id);
        if (error) {
            toast.error('Failed to delete review');
        } else {
            toast.success('Review deleted');
            loadReviews();
        }
    };

    const renderStars = (rating) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'review-status-pending';
            case 'approved':
                return 'review-status-approved';
            case 'rejected':
                return 'review-status-rejected';
            default:
                return '';
        }
    };

    const stats = {
        total: reviews.length,
        pending: reviews.filter(r => r.status === 'pending').length,
        approved: reviews.filter(r => r.status === 'approved').length,
        rejected: reviews.filter(r => r.status === 'rejected').length,
        avgRating: reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0
    };

    if (loading) {
        return <div className="admin-loading">Loading reviews...</div>;
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div>
                    <h2>Review Management</h2>
                    <p className="manager-subtitle">
                        Showing {filteredReviews.length} of {reviews.length} reviews
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="review-stats">
                <div className="review-stat-item">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total Reviews</span>
                </div>
                <div className="review-stat-item stat-pending">
                    <span className="stat-value">{stats.pending}</span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="review-stat-item stat-approved">
                    <span className="stat-value">{stats.approved}</span>
                    <span className="stat-label">Approved</span>
                </div>
                <div className="review-stat-item stat-rejected">
                    <span className="stat-value">{stats.rejected}</span>
                    <span className="stat-label">Rejected</span>
                </div>
                <div className="review-stat-item stat-rating">
                    <span className="stat-value">{stats.avgRating} ⭐</span>
                    <span className="stat-label">Avg Rating</span>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="status-tabs">
                {['all', 'pending', 'approved', 'rejected'].map(status => (
                    <button
                        key={status}
                        className={`status-tab ${selectedStatus === status ? 'active' : ''}`}
                        onClick={() => setSelectedStatus(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {status !== 'all' && ` (${reviews.filter(r => r.status === status).length})`}
                    </button>
                ))}
            </div>

            {/* Reviews Grid */}
            <div className="reviews-grid">
                {filteredReviews.length === 0 ? (
                    <div className="no-reviews">
                        <p>No reviews found for this status.</p>
                    </div>
                ) : (
                    filteredReviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="review-rating">
                                    <span className="stars">{renderStars(review.rating)}</span>
                                    <span className="rating-num">({review.rating}/5)</span>
                                </div>
                                <span className={`review-status ${getStatusColor(review.status)}`}>
                                    {review.status}
                                </span>
                            </div>

                            <div className="review-body">
                                <div className="review-info">
                                    <strong className="product-id">Product: {review.product_id}</strong>
                                    <span className="review-author">By: {review.user_email}</span>
                                    <span className="review-date">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="review-comment">
                                    <p>{review.comment || 'No comment provided'}</p>
                                </div>
                            </div>

                            <div className="review-actions">
                                {review.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="approve-btn"
                                        >
                                            ✓ Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(review.id)}
                                            className="reject-btn"
                                        >
                                            ✕ Reject
                                        </button>
                                    </>
                                )}
                                {review.status !== 'pending' && (
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="delete-review-btn"
                                    >
                                        🗑️ Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewManager;
