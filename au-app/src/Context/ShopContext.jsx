import React, { createContext, useState } from 'react';
import all_product from '../data/all_product';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products] = useState(all_product);

  return (
    <ShopContext.Provider value={{ all_product: products }}>
      {children}
    </ShopContext.Provider>
  );
};
