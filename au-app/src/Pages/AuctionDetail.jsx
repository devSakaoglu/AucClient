import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BidForm from '../Components/Auction/BidForm';
import BidList from '../Components/Auction/BidList';
import data_product from '../data/product';
import './AuctionDetail.css';

const AuctionDetail = ({ user }) => {
  const { productId } = useParams();
  const product = data_product.find(p => p.id === parseInt(productId));
  const [bids, setBids] = useState([]);
  const [rating, setRating] = useState(0);

  const handleBid = (bidAmount) => {
    setBids([...bids, { bidAmount, user }]);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const highestBid = bids.reduce((max, bid) => (bid.bidAmount > max ? bid.bidAmount : max), product.new_price);

  return (
    <div className="auction-detail">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Starting Price: ${product.new_price.toFixed(2)}</p>
          <p>Highest Bid: ${highestBid.toFixed(2)}</p>
          <div className="rating">
            <h3>Rate this product:</h3>
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={index < rating ? 'star filled' : 'star'}
                onClick={() => handleRating(index + 1)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <div className="button-group">
            {user ? (
              <>
                <BidForm onBid={handleBid} />
                <button className="message-seller-btn">Message Seller</button>
              </>
            ) : (
              <p>Please <Link to="/login">login</Link> to place a bid or message the seller.</p>
            )}
          </div>
        </div>
      </div>
      <BidList bids={bids} />
    </div>
  );
};

export default AuctionDetail;
