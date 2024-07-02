import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import AuctionDetail from './Pages/AuctionDetail';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Offers from './Components/Sidebar/Offers';
import Listings from './Components/Sidebar/Listings';
import Favorites from './Components/Sidebar/Favorites';

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
          <Route path='/' element={<ShopCategory loggedIn={loggedIn} category="all" banner="/path/to/banner.jpg" />} />
          <Route path='/mens' element={<ShopCategory loggedIn={loggedIn} category="men" banner="/path/to/mens-banner.jpg" />} />
          <Route path='/womens' element={<ShopCategory loggedIn={loggedIn} category="women" banner="/path/to/womens-banner.jpg" />} />
          <Route path='/kids' element={<ShopCategory loggedIn={loggedIn} category="kid" banner="/path/to/kids-banner.jpg" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/auction/:productId' element={<AuctionDetail user={username} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup onLogin={handleLogin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={loggedIn ? <Profile username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path='/offers' element={loggedIn ? <Offers /> : <Navigate to="/login" />} />
          <Route path='/listings' element={loggedIn ? <Listings /> : <Navigate to="/login" />} />
          <Route path='/favorites' element={loggedIn ? <Favorites /> : <Navigate to="/login" />} />
          <Route path='*' element={<Navigate to={loggedIn ? "/" : "/login"} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
