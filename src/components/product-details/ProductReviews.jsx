import React, { useState, useEffect } from 'react';
import { supabaseReviews } from '../../config/supabase';
import { StarRoundedIcon } from 'assets';
import './ProductReviews.css';

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });

    useEffect(() => {
        if (productId) {
            loadReviews();
        }
    }, [productId]);

    const loadReviews = async () => {
        setLoading(true);
        const { data, error } = await supabaseReviews.getByProduct(productId);

        if (!error && data) {
            setReviews(data);
            calculateStats(data);
        }
        setLoading(false);
    };

    const calculateStats = (reviewsData) => {
        if (reviewsData.length === 0) {
            setStats({
                averageRating: 0,
                totalReviews: 0,
                distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            });
            return;
        }

        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let totalRating = 0;

        reviewsData.forEach(review => {
            distribution[review.rating]++;
            totalRating += review.rating;
        });

        setStats({
            averageRating: (totalRating / reviewsData.length).toFixed(1),
            totalReviews: reviewsData.length,
            distribution
        });
    };

    const renderStars = (rating, filled = false) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarRoundedIcon
                    key={i}
                    className={`review-star ${i <= rating ? 'filled' : 'empty'}`}
                />
            );
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="product-reviews-section">
                <h2 className="reviews-title">Customer Reviews</h2>
                <div className="reviews-loading">Loading reviews...</div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="product-reviews-section">
                <h2 className="reviews-title">Customer Reviews</h2>
                <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-reviews-section">
            <h2 className="reviews-title">Customer Reviews</h2>

            {/* Reviews Summary */}
            <div className="reviews-summary">
                <div className="summary-left">
                    <div className="average-rating">
                        <span className="rating-number">{stats.averageRating}</span>
                        <div className="rating-stars">
                            {renderStars(Math.round(stats.averageRating))}
                        </div>
                    </div>
                    <p className="total-reviews">{stats.totalReviews} reviews</p>
                </div>

                <div className="summary-right">
                    {[5, 4, 3, 2, 1].map(rating => {
                        const percentage = stats.totalReviews > 0
                            ? (stats.distribution[rating] / stats.totalReviews) * 100
                            : 0;
                        return (
                            <div key={rating} className="rating-distribution">
                                <span className="rating-label">{rating} ⭐</span>
                                <div className="rating-bar">
                                    <div
                                        className="rating-bar-fill"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="rating-count">{stats.distribution[rating]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="review-user">
                                <div className="user-avatar">
                                    {review.user_email.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-info">
                                    <span className="user-name">
                                        {review.user_email.split('@')[0]}
                                    </span>
                                    <span className="review-date">
                                        {formatDate(review.created_at)}
                                    </span>
                                </div>
                            </div>
                            <div className="review-rating">
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <div className="review-content">
                            <p>{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
