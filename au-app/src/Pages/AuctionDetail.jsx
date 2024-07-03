// src/Pages/AuctionDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { instance as axios } from '../api';
import './AuctionDetail.css';

const AuctionDetail = ({ user }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [rating, setRating] = useState(0);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBid = async () => {
    try {
      const response = await axios.post(`/bids/${productId}`, { bidPrice: bidAmount });
      if (response.status === 200) {
        setBids([...bids, { bidPrice: bidAmount, user }]);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const highestBid = bids.reduce((max, bid) => (bid.bidPrice > max ? bid.bidPrice : max), product?.new_price || 0);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="auction-detail">
      <div className="product-detail">
        <div className="product-image">
          <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Starting Price: ${product.new_price ? product.new_price.toFixed(2) : 'N/A'}</p>
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
              user !== product.appUser ? (
                <>
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <button onClick={handleBid}>Place Bid</button>
                  {/* <button className="message-seller-btn">Message Seller</button> */}
                </>
              ) : (
                <p>You cannot bid on your own product.</p>
              )
            ) : (
              <p>Please <Link to="/login">login</Link> to place a bid.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
