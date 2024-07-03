import React, { useState } from 'react';
import './Register.css';
import { instance } from '../api';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    return nameRegex.test(name) && !/\d/.test(name);
  };

  const validatePhone = (phone) => {
    return typeof phone === 'string';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validatePhone(phone) ||
      !validateEmail(email) ||
      !validatePassword(password)
    ) {
      setError('Please check your inputs and try again.');
      return;
    }

    try {
      const response = await instance.post('/signup', {
        firstName,
        lastName,
        phone,
        email,
        password,
      });

      if (response.status === 201) {
        alert('Registration successful! You can now login.');
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setError('');
      } else {
        const errorData = await response.error();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
          required
        />
        <input
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
