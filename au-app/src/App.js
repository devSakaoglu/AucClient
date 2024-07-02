// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import ShopCategory from './Pages/ShopCategory';
import AuctionDetail from './Pages/AuctionDetail';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register';
import ProfileLayout from './Pages/ProfileLayout';
import Profile from './Pages/Profile';
import Offers from './Components/Sidebar/Offers';
import Listings from './Components/Sidebar/Listings';
import Favorites from './Components/Sidebar/Favorites';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
    localStorage.removeItem('username');
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} username={username} />
        <Routes>
          <Route path='/' element={<ShopCategory category="all" banner="/path/to/banner.jpg" />} />
          <Route path='/mens' element={<ShopCategory category="men" banner="/path/to/mens-banner.jpg" />} />
          <Route path='/womens' element={<ShopCategory category="women" banner="/path/to/womens-banner.jpg" />} />
          <Route path='/kids' element={<ShopCategory category="kid" banner="/path/to/kids-banner.jpg" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/auction/:productId' element={<AuctionDetail user={username} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup onLogin={handleLogin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={loggedIn ? <ProfileLayout onLogout={handleLogout} /> : <Navigate to="/login" />}>
            <Route index element={<Profile username={username} />} />
            <Route path='offers' element={<Offers />} />
            <Route path='listings' element={<Listings />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
          <Route path='*' element={<Navigate to={loggedIn ? "/" : "/login"} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
