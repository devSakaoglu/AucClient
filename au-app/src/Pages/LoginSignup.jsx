import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './LoginSignup.css';
import { instance as axios } from '../api';

const LoginSignup = ({ onLogin }) => {
  const [email, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        onLogin(data.appUser.name); // Make sure data contains the necessary user information
        setRedirect(true);
      } else {
        const errorData = response.data;
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
        <div className="register-link-container">
          <span>New User?</span>
          <Link to="/register" className="register-button">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
