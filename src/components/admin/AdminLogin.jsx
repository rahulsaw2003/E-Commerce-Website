import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAuth } from '../../config/supabase';
import { toast } from 'react-toastify';
import './admin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Convert username to email format for Supabase
            const email = username.includes('@') ? username : `${username}@attirex.com`;

            const { data, error } = await supabaseAuth.signIn(email, password);

            if (error) {
                toast.error(`Login failed: ${error.message}`);
                console.error('Login error:', error);
                return;
            }

            if (data.user) {
                toast.success('Welcome to Admin Dashboard!');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <h1 className="admin-logo">ATTIREX</h1>
                    <h2>Admin Dashboard</h2>
                    <p>Sign in to manage your e-commerce store</p>
                </div>

                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p>Protected by Supabase Authentication</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
