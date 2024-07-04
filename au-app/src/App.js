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
import { ShopProvider } from './Context/ShopContext';
import ReservedProducts from './Components/Sidebar/ReservedProducts';

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
    <ShopProvider>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} username={username} />
        <Routes>
          <Route path='/' element={<ShopCategory category="all" banner="/path/to/banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/vintage' element={<ShopCategory category="Vintage" banner="/path/to/vintage-banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/electronics' element={<ShopCategory category="Electronics" banner="/path/to/electronics-banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/fashion' element={<ShopCategory category="Fashion" banner="/path/to/fashion-banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/jewelry' element={<ShopCategory category="Jewelry" banner="/path/to/jewelry-banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/books' element={<ShopCategory category="Books" banner="/path/to/books-banner.jpg" loggedIn={loggedIn} username={username} />} />
          <Route path='/art' element={<ShopCategory category="Art" banner="/path/to/art-banner.jpg" loggedIn={loggedIn} username={username} />} />
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
            <Route path="reserved-products" element={<ReservedProducts />} />
          </Route>
          <Route path='*' element={<Navigate to={loggedIn ? "/" : "/login"} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
