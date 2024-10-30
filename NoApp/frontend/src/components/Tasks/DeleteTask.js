import React, { useState } from 'react';
import './DeleteTask.css';
import axios from 'axios';

const DeleteTask = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setMessage('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://NoApp-backend.cloud-stacks.com/api/register', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred during registration');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://NoApp-backend.cloud-stacks.com/api/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Invalid username or password');
        }
    };

    return (
        <div className="user-auth-container">
            <header className="header">
                <h1>User Registration and Login</h1>
            </header>
            <div className="tabs">
                <button className={activeTab === 'register' ? 'active' : ''} onClick={() => handleTabChange('register')}>Register</button>
                <button className={activeTab === 'login' ? 'active' : ''} onClick={() => handleTabChange('login')}>Login</button>
            </div>
            <div className="form-container">
                {message && <p>{message}</p>}
                {activeTab === 'register' && (
                    <form className="register-form" onSubmit={handleRegister}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Submit</button>
                        <a href="#resend-verification">Resend Verification Email</a>
                    </form>
                )}
                {activeTab === 'login' && (
                    <form className="login-form" onSubmit={handleLogin}>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Submit</button>
                        <a href="#forgot-password">Forgot Password</a>
                    </form>
                )}
            </div>
            <footer className="footer">
                <a href="#terms">Terms and Conditions</a>
                <a href="#privacy">Privacy Policy</a>
            </footer>
        </div>
    );
};

export default DeleteTask;
