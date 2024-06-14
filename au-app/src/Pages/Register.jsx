import React, { useState } from 'react';
import './Register.css'; // Register için CSS dosyası eklendi

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend'e POST isteği gönderme
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Başarılı kayıt durumunda kullanıcıya bilgi ver
        alert('Registration successful! You can now login.');
        // Formu sıfırla
        setUsername('');
        setEmail('');
        setPassword('');
        setError('');
      } else {
        // Hata durumunda hata mesajını göster
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
