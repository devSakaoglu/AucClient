import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Components/Auction/Item';
import all_product from '../data/product';
import './Auction.css';

const Auction = () => {
  return (
    <div className="auction">
      <div className="auction-items">
        {all_product.map((product) => (
          <Link key={product.id} to={`/auction/${product.id}`} className="auction-item-link">
            <Item
              image={product.image}
              name={product.name}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Auction;
