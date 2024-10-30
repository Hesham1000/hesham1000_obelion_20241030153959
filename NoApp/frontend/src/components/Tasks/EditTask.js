import React, { useState } from 'react';
import './EditTask.css';
import axios from 'axios';

const EditTask = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleTabSwitch = (isRegisterTab) => {
    setIsRegister(isRegisterTab);
    setEmail('');
    setUsername('');
    setPassword('');
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = isRegister 
        ? await axios.post('https://NoApp-backend.cloud-stacks.com/api/register', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        : await axios.post('https://NoApp-backend.cloud-stacks.com/api/login', { username, password }, { headers: { 'Content-Type': 'application/json' } });
      
      setMessage(response.data.message);
      if (!isRegister) {
        // Redirect to dashboard after successful login
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="edit-task-container">
      <header className="header">
        <h1>User Registration and Login</h1>
      </header>
      <div className="tabs">
        <button className={`tab ${isRegister ? 'active' : ''}`} onClick={() => handleTabSwitch(true)}>
          Register
        </button>
        <button className={`tab ${!isRegister ? 'active' : ''}`} onClick={() => handleTabSwitch(false)}>
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {isRegister ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Submit</button>
            <a href="#" className="additional-link">Resend Verification Email</a>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Submit</button>
            <a href="#" className="additional-link">Forgot Password</a>
          </>
        )}
      </form>
      {message && <p className="message">{message}</p>}
      <footer className="footer">
        <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default EditTask;
