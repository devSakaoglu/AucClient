// Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = ({ username }) => {
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

  return (
    <div>
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
  );
};

export default Profile;
