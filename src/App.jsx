import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './App.css';

function App() {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">🏠 Home</Link>
                        </li>
                        <li>
                            {token ? (
                                <button onClick={handleLogout}>🚪 Logout</button>
                            ) : (
                                <>
                                    <Link to="/register">📝 Register</Link>
                                    <Link to="/login">🔐 Login</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;