import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await authService.login(email, password);
            localStorage.setItem('token', res.data.token);
            window.location = '/';
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Welcome Back</h2>
            {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="📧 Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="🔒 Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    minLength="6"
                    required
                />
                <input 
                    type="submit" 
                    value={loading ? "Signing In..." : "Sign In"} 
                    disabled={loading}
                />
            </form>
            <p style={{textAlign: 'center', marginTop: '1rem'}}>
                Don't have an account? <Link to="/register" style={{color: '#667eea', fontWeight: '600'}}>Create Account</Link>
            </p>
        </div>
    );
};

export default Login;