// src/Context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import all_product from '../data/product';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(all_product);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addBid = (productId, bidAmount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, new_price: bidAmount } : product
      )
    );
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, products, addBid }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
