import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ username, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="profile-container">
      <h1>{username}'s Profile</h1>
      <div className="profile-sidebar">
        <Link to='/offers'>My Offers</Link>
        <Link to='/listings'>My Listings</Link>
        <Link to='/favorites'>My Favorites</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
