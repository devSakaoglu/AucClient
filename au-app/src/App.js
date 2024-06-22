import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Auction from './Pages/Auction';
import AuctionDetail from './Pages/AuctionDetail';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (storedLoggedIn && storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('loggedIn');
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory category="men" banner="/path/to/mens-banner.jpg" />} />
          <Route path='/womens' element={<ShopCategory category="women" banner="/path/to/womens-banner.jpg" />} />
          <Route path='/kids' element={<ShopCategory category="kid" banner="/path/to/kids-banner.jpg" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/auction' element={<Auction />} />
          <Route path='/auction/:productId' element={<AuctionDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup onLogin={handleLogin} />} />
          <Route path='/register' element={<Register />} />
          {loggedIn ? <Navigate to="/" /> : null}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
