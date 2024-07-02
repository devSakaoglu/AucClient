import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import profile_icon from '../Assets/profile_icon.png';
import { instance } from '../../api';

const Navbar = ({ loggedIn, onLogout, username }) => {
  const [menu, setMenu] = useState("shop");

  const handleLogout = async () => {
    try {
      await instance.post('/logout', {});
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='Logo' />
        <p>Auction House</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop{menu === "shop" ? <hr /> : null}</Link></li>
        <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men{menu === "mens" ? <hr /> : null}</Link></li>
        <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women{menu === "womens" ? <hr /> : null}</Link></li>
        <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids{menu === "kids" ? <hr /> : null}</Link></li>
        <li onClick={() => { setMenu("auction") }}><Link style={{ textDecoration: 'none' }} to='/auction'>Auction{menu === "auction" ? <hr /> : null}</Link></li>
      </ul>
      <div className="nav-login-cart">
        {loggedIn ? (
          <div className='user-dropdown'>
            <img src={profile_icon} alt='Profile' className='profile-icon' />
            <span>{username}</span>
            <div className='user-dropdown-content'>
              <Link to='/profile'>Profile</Link>
              <Link to='/offers'>My Offers</Link>
              <Link to='/listings'>My Listings</Link>
              <Link to='/favorites'>My Favorites</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
       
      </div>
    </div>
  );
};

export default Navbar;
