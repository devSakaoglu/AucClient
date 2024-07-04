import React from 'react';
import './Navbar.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import profile_icon from '../Assets/profile_icon.png';
import { instance } from '../../api';

const Navbar = ({ loggedIn, onLogout, username }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await instance.post('/logout', {});
      onLogout();
      navigate('/'); // Logout sonrası anasayfaya yönlendir
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRefresh = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/' onClick={handleRefresh}>
          <img src={logo} alt='Logo' />
          <p>Auction House</p>
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={handleRefresh}
          >
            Shop
          </NavLink>
        </li>
        <li className="category-dropdown">
          <span>Categories</span>
          <div className="dropdown-content">
            <NavLink to="/vintage" className={({ isActive }) => (isActive ? 'active' : '')}>Vintage</NavLink>
            <NavLink to="/electronics" className={({ isActive }) => (isActive ? 'active' : '')}>Electronics</NavLink>
            <NavLink to="/fashion" className={({ isActive }) => (isActive ? 'active' : '')}>Fashion</NavLink>
            <NavLink to="/jewelry" className={({ isActive }) => (isActive ? 'active' : '')}>Jewelry</NavLink>
            <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>Books</NavLink>
            <NavLink to="/art" className={({ isActive }) => (isActive ? 'active' : '')}>Art</NavLink>
            <NavLink to="/music-instruments" className={({ isActive }) => (isActive ? 'active' : '')}>Music Instruments</NavLink>
          </div>
        </li>
      </ul>
      <div className="nav-login-cart">
        {loggedIn ? (
          <div className='user-dropdown'>
            <Link to='/profile'>
              <img src={profile_icon} alt='Profile' className='profile-icon' />
            </Link>
            <span>{username}</span>
            <div className='user-dropdown-content'>
              <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
              <NavLink to='/profile/offers' className={({ isActive }) => (isActive ? 'active' : '')}>My Bids</NavLink>
              <NavLink to='/profile/listings' className={({ isActive }) => (isActive ? 'active' : '')}>Listed Products</NavLink>
              <NavLink to='/profile/reserved-products' className={({ isActive }) => (isActive ? 'active' : '')}>Reserved Products</NavLink>
              {/* <NavLink to='/profile/favorites' className={({ isActive }) => (isActive ? 'active' : '')}>My Favorites</NavLink> */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to='/login'>
            <button className="login-button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
