import React, { useState, useEffect } from 'react';
import { supabaseCoupons } from '../../config/supabase';
import { toast } from 'react-toastify';

const CouponManager = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        discount: 0,
        description: '',
        min_order_value: 0,
        active: true,
    });

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        setLoading(true);
        const { data, error } = await supabaseCoupons.getAll();
        if (error) {
            toast.error('Failed to load coupons');
            console.error(error);
        } else {
            setCoupons(data || []);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingCoupon) {
                const { error } = await supabaseCoupons.update(editingCoupon.id, formData);
                if (error) throw error;
                toast.success('Coupon updated successfully!');
            } else {
                const { error } = await supabaseCoupons.create(formData);
                if (error) throw error;
                toast.success('Coupon created successfully!');
            }

            loadCoupons();
            resetForm();
        } catch (error) {
            toast.error(`Failed: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return;

        setLoading(true);
        const { error } = await supabaseCoupons.delete(id);
        if (error) {
            toast.error('Failed to delete coupon');
            console.error(error);
        } else {
            toast.success('Coupon deleted!');
            loadCoupons();
        }
        setLoading(false);
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        setFormData(coupon);
        setShowForm(true);
    };

    const toggleActive = async (id, currentStatus) => {
        const { error } = await supabaseCoupons.toggle(id, !currentStatus);
        if (error) {
            toast.error('Failed to update coupon status');
        } else {
            toast.success('Status updated!');
            loadCoupons();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            discount: 0,
            description: '',
            min_order_value: 0,
            active: true,
        });
        setEditingCoupon(null);
        setShowForm(false);
    };

    if (loading && coupons.length === 0) {
        return <div className="admin-loading">Loading coupons...</div>;
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Coupon Management</h2>
                <button onClick={() => setShowForm(!showForm)} className="add-btn">
                    {showForm ? 'Cancel' : '+ Add Coupon'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="admin-form">
                    <input
                        type="text"
                        placeholder="Coupon Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <div className="form-row">
                        <input
                            type="number"
                            placeholder="Discount Amount (₹)"
                            value={formData.discount}
                            onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                            required
                            min="0"
                        />
                        <input
                            type="number"
                            placeholder="Min Order Value (₹)"
                            value={formData.min_order_value}
                            onChange={(e) => setFormData({ ...formData, min_order_value: parseFloat(e.target.value) })}
                            min="0"
                        />
                    </div>

                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        required
                    />

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                </form>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Discount</th>
                            <th>Min Order</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td><strong>{coupon.name}</strong></td>
                                <td>₹{coupon.discount}</td>
                                <td>₹{coupon.min_order_value}</td>
                                <td>{coupon.description}</td>
                                <td>
                                    <button
                                        className={`status-badge ${coupon.active ? 'active' : 'inactive'}`}
                                        onClick={() => toggleActive(coupon.id, coupon.active)}
                                    >
                                        {coupon.active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(coupon)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(coupon.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponManager;
