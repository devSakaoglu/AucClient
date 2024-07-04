import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { instance as axios } from '../api';
import './AuctionDetail.css';

const AuctionDetail = ({ user }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
          const bidResponses = response.data.bids.map(bid => ({
            bidPrice: bid.bidPrice,
            appUser: { name: bid.appUser.name, surname: bid.appUser.surname }
          }));
          setBids(bidResponses);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const auctionEndTime = new Date(product.auctionStartDate);
      const duration = parseInt(product.auctionDuration, 10);

      if (duration === 0) {
        auctionEndTime.setMinutes(auctionEndTime.getMinutes() + 5);
      } else {
        auctionEndTime.setDate(auctionEndTime.getDate() + duration);
      }

      const updateRemainingTime = () => {
        const now = new Date();
        const timeDifference = auctionEndTime - now;

        if (timeDifference <= 0) {
          setRemainingTime("Auction ended");
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      };

      const timerId = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(timerId);
    }
  }, [product]);

  const handleBid = async () => {
    if (user._id === product.appUser._id) {
      setErrorMessage("You cannot bid on your own product.");
      return;
    }

    try {
      const response = await axios.post(`/bids/${productId}`, { bidPrice: bidAmount });
      if (response.status === 200) {
        const newBid = { bidPrice: bidAmount, appUser: { name: user.name, surname: user.surname } };
        setBids([newBid, ...bids]);
        setBidAmount('');
        setErrorMessage('');

        // Fetch updated product and bids
        const updatedProductResponse = await axios.get(`/products/${productId}`);
        if (updatedProductResponse.status === 200) {
          setProduct(updatedProductResponse.data);
          const updatedBidResponses = updatedProductResponse.data.bids.map(bid => ({
            bidPrice: bid.bidPrice,
            appUser: { name: bid.appUser.name, surname: bid.appUser.surname }
          }));
          setBids(updatedBidResponses);
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error placing bid:', error);
      }
    }
  };

  const highestBid = bids.reduce((max, bid) => (bid.bidPrice > max ? bid.bidPrice : max), product?.startPrice || 0);

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
          <p>Seller: {product.appUser.name} {product.appUser.surname}</p>
          <p>{product.description}</p>
          <p>Starting Price: ${product.startPrice ? product.startPrice.toFixed(2) : 'N/A'}</p>
          <p>Highest Bid: ${highestBid.toFixed(2)}</p>
          <p>Auction Ends In: <span className="countdown-timer">{remainingTime}</span></p>
          <p className="product-status">{product.productStatus}</p>
          <div className="button-group">
            {user ? (
              <>
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <button onClick={handleBid}>Place Bid</button>
              </>
            ) : (
              <p>Please <Link to="/login">login</Link> to place a bid.</p>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <div className="bids-list">
        <h3>Bids:</h3>
        {bids.length > 0 ? (
          bids.map((bid, index) => (
            <div key={index} className="bid-item">
              <p>Bid: ${bid.bidPrice}</p>
              <p>By: {bid.appUser.name} {bid.appUser.surname}</p>
            </div>
          ))
        ) : (
          <p>No bids yet.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;
