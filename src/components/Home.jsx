import React, { useState, useEffect } from 'react';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Decode JWT token to get user info (simple implementation)
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload.user);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <div className="home-container">
            <h1>🎉 Welcome to Your Dashboard!</h1>
            <p>
                You have successfully logged into the authentication portal. 
                This is a protected route that only authenticated users can access.
            </p>
            {user && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    borderRadius: '15px',
                    marginTop: '2rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3>👤 User Information</h3>
                    <p>User ID: {user.id}</p>
                    <p>Status: ✅ Authenticated</p>
                </div>
            )}
            <div style={{
                marginTop: '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                maxWidth: '800px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3>🔐 Secure</h3>
                    <p>Your session is protected with JWT authentication</p>
                </div>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3>⚡ Fast</h3>
                    <p>Built with React and modern web technologies</p>
                </div>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2rem',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3>🚀 Modern</h3>
                    <p>Full-stack application with Node.js backend</p>
                </div>
            </div>
        </div>
    );
};

export default Home;