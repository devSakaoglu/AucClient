import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ username, onLogout }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    cardExpiry: ''
  });

  useEffect(() => {
    // Simulating an API call to fetch user info
    const fetchUserInfo = async () => {
      // Replace with actual API call
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        cardNumber: '1234 5678 9012 3456',
        cardExpiry: '12/25'
      };
      setUserInfo(userData);
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <Link to='/profile'>Profile</Link>
        <Link to='/offers'>My Offers</Link>
        <Link to='/listings'>My Listings</Link>
        <Link to='/favorites'>My Favorites</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="profile-details">
        <h1>{username}'s Profile</h1>
        <div className="user-info">
          <h2>Personal Information</h2>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
        <div className="card-info">
          <h2>Card Information</h2>
          <p><strong>Card Number:</strong> {userInfo.cardNumber}</p>
          <p><strong>Expiry Date:</strong> {userInfo.cardExpiry}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
