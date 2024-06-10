import React, { useState } from 'react';
import Item from '../Components/Auction/Item';
import BidForm from '../Components/Auction/BidForm';
import BidList from '../Components/Auction/BidList';
import data_product from '../data/product';
import './Auction.css';

const Auction = () => {
  const [bids, setBids] = useState([]);

  const handleBid = (productId, bidAmount) => {
    setBids([...bids, { productId, bidAmount, user: 'CurrentUser' }]);
  };

  return (
    <div className="auction">
      {data_product.map((product) => {
        const highestBid = bids
          .filter(bid => bid.productId === product.id)
          .reduce((max, bid) => (bid.bidAmount > max ? bid.bidAmount : max), product.new_price);

        return (
          <div key={product.id} className="product">
            <Item
              image={product.image}
              name={product.name}
              new_price={highestBid}
              old_price={product.old_price}
            />
            <BidForm
              productId={product.id}
              onBid={handleBid}
            />
            <BidList
              bids={bids.filter(bid => bid.productId === product.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Auction;
