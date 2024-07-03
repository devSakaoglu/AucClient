import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { instance as axios } from '../api';
import './AuctionDetail.css';

const AuctionDetail = ({ user }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

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

  const handleBid = async () => {
    if (user._id === product.appUser._id) {
      alert("You cannot bid on your own product.");
      return;
    }

    try {
      const response = await axios.post(`/bids/${productId}`, { bidPrice: bidAmount });
      if (response.status === 200) {
        const newBid = { bidPrice: bidAmount, appUser: { name: user.name, surname: user.surname } };
        setBids([newBid, ...bids]);
        setBidAmount('');

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
      console.error('Error placing bid:', error);
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
          <p>{product.description}</p>
          <p>Starting Price: ${product.startPrice ? product.startPrice.toFixed(2) : 'N/A'}</p>
          <p>Highest Bid: ${highestBid.toFixed(2)}</p>
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
