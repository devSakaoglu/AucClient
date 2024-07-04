// src/Pages/ProfileLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './ProfileLayout.css';

const ProfileLayout = ({ onLogout }) => {
  return (
    <div className="profile-layout">
      <div className="profile-sidebar">
        <NavLink to="/profile" end activeClassName="active">Profile</NavLink>
        {/* <NavLink to="/profile" end className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink> */}
        <NavLink to="/profile/offers" activeClassName="active">My Bids</NavLink>
        <NavLink to="/profile/listings" activeClassName="active">Listed Products</NavLink>
        <NavLink to="/profile/reserved-products" activeClassName="active">Reserved Products</NavLink>
        {/* <NavLink to="/profile/favorites" activeClassName="active">My Favorites</NavLink> */}
        {/* <button onClick={onLogout}>Logout</button> */}
      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
