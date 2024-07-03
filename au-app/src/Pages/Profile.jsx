import React, { useState, useEffect } from 'react';
import { instance as axios } from '../api';

const Profile = ({ username }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me');
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <div className="user-info">
        <h2>Personal Information</h2>
        <p><strong>First Name:</strong> {userInfo.name}</p>
        <p><strong>Last Name:</strong> {userInfo.surname}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
