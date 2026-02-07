import React, { useState, useEffect } from 'react';
import { supabaseProducts, supabaseCategories, supabaseStorage } from '../../config/supabase';
import { toast } from 'react-toastify';
import './ProductFormModal.css';

const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        category: '',
        section: 'Mens',
        price: '',
        image: '',
        is_out_of_stock: false,
        is_trending: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
        if (product) {
            setFormData(product);
            setImagePreview(product.image);
            setUploadMethod('url');
            setImageFile(null);
        } else {
            resetForm();
        }
    }, [product]);

    const loadCategories = async () => {
        const { data, error } = await supabaseCategories.getAll();
        if (!error && data) {
            setCategories(data.sort((a, b) => a.name.localeCompare(b.name)));
        }
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            category: '',
            section: 'Mens',
            price: '',
            image: '',
            is_out_of_stock: false,
            is_trending: false
        });
        setImageFile(null);
        setImagePreview('');
        setUploadMethod('url');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Update preview when URL changes
        if (name === 'image' && uploadMethod === 'url') {
            setImagePreview(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageFile = async () => {
        if (!imageFile) return null;

        setUploading(true);
        try {
            // Create unique filename
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            // Upload to Supabase storage
            const { error: uploadError } = await supabaseStorage.uploadImage(imageFile, filePath);
            if (uploadError) throw uploadError;

            // Get public URL
            const publicUrl = supabaseStorage.getPublicUrl(filePath);
            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.category || !formData.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate image - either URL or file must be provided
        if (uploadMethod === 'url' && !formData.image) {
            toast.error('Please provide an image URL');
            return;
        }

        if (uploadMethod === 'file' && !imageFile && !formData.image) {
            toast.error('Please select an image file');
            return;
        }

        setLoading(true);

        try {
            let imageUrl = formData.image;

            // Upload image file if user selected file upload method
            if (uploadMethod === 'file' && imageFile) {
                imageUrl = await uploadImageFile();
                if (!imageUrl) throw new Error('Failed to upload image');
            }

            const dataToSave = {
                ...formData,
                image: imageUrl,
                price: parseFloat(formData.price)
            };

            if (product) {
                // Update existing product
                const { error } = await supabaseProducts.update(product._id, dataToSave);
                if (error) throw error;
                toast.success('Product updated successfully!');
            } else {
                // Create new product
                const newProduct = {
                    ...dataToSave,
                    _id: `prod-${Date.now()}`
                };
                const { error } = await supabaseProducts.create(newProduct);
                if (error) throw error;
                toast.success('Product created successfully!');
            }

            if (onSave) onSave();
            handleClose();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
                    <button className="modal-close" onClick={handleClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">
                                Product Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">
                                Category <span className="required">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="section">
                                Section <span className="required">*</span>
                            </label>
                            <select
                                id="section"
                                name="section"
                                value={formData.section}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Mens">Mens</option>
                                <option value="Womens">Womens</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">
                                Price (₹) <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            Product Image <span className="required">*</span>
                        </label>

                        {/* Upload method toggle */}
                        <div className="upload-method-toggle">
                            <button
                                type="button"
                                className={`toggle-btn ${uploadMethod === 'url' ? 'active' : ''}`}
                                onClick={() => setUploadMethod('url')}
                            >
                                🔗 URL
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn ${uploadMethod === 'file' ? 'active' : ''}`}
                                onClick={() => setUploadMethod('file')}
                            >
                                📤 Upload
                            </button>
                        </div>

                        {/* URL Input */}
                        {uploadMethod === 'url' && (
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                                required={uploadMethod === 'url'}
                            />
                        )}

                        {/* File Upload */}
                        {uploadMethod === 'file' && (
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input"
                                />
                                <label htmlFor="imageFile" className="file-input-label">
                                    <span className="file-icon">📁</span>
                                    <span className="file-text">
                                        {imageFile ? imageFile.name : 'Choose an image file'}
                                    </span>
                                </label>
                                {imageFile && (
                                    <div className="file-info">
                                        <span className="file-size">
                                            {(imageFile.size / 1024).toFixed(2)} KB
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-row checkbox-row">
                        <div className="form-checkbox">
                            <input
                                type="checkbox"
                                id="is_out_of_stock"
                                name="is_out_of_stock"
                                checked={formData.is_out_of_stock}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="is_out_of_stock">Out of Stock</label>
                        </div>

                        <div className="form-checkbox">
                            <input
                                type="checkbox"
                                id="is_trending"
                                name="is_trending"
                                checked={formData.is_trending}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="is_trending">Trending 🔥</label>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading || uploading}
                        >
                            {loading || uploading ? (
                                <>
                                    <span className="spinner"></span>
                                    {uploading ? 'Uploading...' : (product ? 'Updating...' : 'Creating...')}
                                </>
                            ) : (
                                product ? 'Update Product' : 'Create Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
