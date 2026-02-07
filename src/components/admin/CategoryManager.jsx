import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { toast } from 'react-toastify';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        description: '',
        image: '',
        active: true,
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to load categories');
            console.error(error);
        } else {
            setCategories(data || []);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingCategory) {
                const { error } = await supabase
                    .from('categories')
                    .update({ ...formData, updated_at: new Date().toISOString() })
                    .eq('id', editingCategory.id);
                if (error) throw error;
                toast.success('Category updated successfully!');
            } else {
                const { error } = await supabase
                    .from('categories')
                    .insert([formData]);
                if (error) throw error;
                toast.success('Category created successfully!');
            }

            loadCategories();
            resetForm();
        } catch (error) {
            toast.error(`Failed: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        setLoading(true);
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error('Failed to delete category');
            console.error(error);
        } else {
            toast.success('Category deleted!');
            loadCategories();
        }
        setLoading(false);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData(category);
        setShowForm(true);
    };

    const toggleActive = async (id, currentStatus) => {
        const { error } = await supabase
            .from('categories')
            .update({ active: !currentStatus, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update category status');
        } else {
            toast.success('Status updated!');
            loadCategories();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            section: '',
            description: '',
            image: '',
            active: true,
        });
        setEditingCategory(null);
        setShowForm(false);
    };

    if (loading && categories.length === 0) {
        return <div className="admin-loading">Loading categories...</div>;
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Category Management</h2>
                <button onClick={() => setShowForm(!showForm)} className="add-btn">
                    {showForm ? 'Cancel' : '+ Add Category'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="admin-form">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <select
                        value={formData.section}
                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                        required
                    >
                        <option value="">Select Section</option>
                        <option value="Mens">Mens</option>
                        <option value="Womens">Womens</option>
                        <option value="Kids">Kids</option>
                    </select>

                    <input
                        type="url"
                        placeholder="Image URL (optional)"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />

                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                    />

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {editingCategory ? 'Update Category' : 'Create Category'}
                    </button>
                </form>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td><strong>{category.name}</strong></td>
                                <td>{category.section}</td>
                                <td>{category.description || '-'}</td>
                                <td>
                                    <button
                                        className={`status-badge ${category.active ? 'active' : 'inactive'}`}
                                        onClick={() => toggleActive(category.id, category.active)}
                                    >
                                        {category.active ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(category)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(category.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryManager;
