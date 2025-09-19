import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await authService.register(name, email, password);
            localStorage.setItem('token', res.data.token);
            window.location = '/';
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Account</h2>
            {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="👤 Full Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
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
                    placeholder="🔒 Password (min 6 characters)"
                    name="password"
                    value={password}
                    onChange={onChange}
                    minLength="6"
                    required
                />
                <input 
                    type="submit" 
                    value={loading ? "Creating Account..." : "Create Account"} 
                    disabled={loading}
                />
            </form>
            <p style={{textAlign: 'center', marginTop: '1rem'}}>
                Already have an account? <Link to="/login" style={{color: '#667eea', fontWeight: '600'}}>Sign In</Link>
            </p>
        </div>
    );
};

export default Register;