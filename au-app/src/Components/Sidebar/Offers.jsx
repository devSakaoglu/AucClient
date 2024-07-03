import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance as axios } from '../../api'; // Doğru yolu kontrol edin
import './Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/bids/me');
        if (response.status === 200) {
          setOffers(response.data);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const handleNavigate = (productId) => {
    navigate(`/auction/${productId}`);
  };

  return (
    <div className="offers-container">
      <h1>My Offers</h1>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <div 
              key={index} 
              className="offer-item"
              onClick={() => handleNavigate(offer.product._id)}
            >
              {offer.product && offer.product.images && (
                <img src={`http://localhost:5000/${offer.product.images[0]}`} alt={offer.product.name} />
              )}
              <p>{offer.product ? offer.product.name : 'Unknown Product'}</p>
              <p>Bid: ${offer.bidPrice}</p>
            </div>
          ))
        ) : (
          <p>No offers yet.</p>
        )}
      </div>
    </div>
  );
}

export default Offers;
