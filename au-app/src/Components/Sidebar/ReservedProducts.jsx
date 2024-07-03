// src/Components/Sidebar/ReservedProducts.jsx

import React, { useState, useEffect } from 'react';
import { instance as axios } from '../../api';
import StripeCheckout from 'react-stripe-checkout';
import './ReservedProducts.css';

const ReservedProducts = () => {
  const [reservedProducts, setReservedProducts] = useState([]);

  useEffect(() => {
    const fetchReservedProducts = async () => {
      try {
        const response = await axios.get('/reserved-products');
        if (response.status === 200) {
          setReservedProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching reserved products:', error);
      }
    };

    fetchReservedProducts();
  }, []);

  const handleToken = async (token, product) => {
    try {
      const response = await axios.post('/transactions', {
        productId: product._id,
        price: product.maxBidPrice,
        token: token.id,
      });
      if (response.status === 201) {
        alert('Payment successful');
        // Optionally, update the product status or remove it from the list
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h1>Reserved Products</h1>
      <div className="reserved-products-grid">
        {reservedProducts.length > 0 ? (
          reservedProducts.map((product, index) => (
            <div key={index} className="reserved-product-item">
              <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Price: ${product.maxBidPrice}</p>
              <StripeCheckout
                token={(token) => handleToken(token, product)}
                stripeKey="your_PUBLISHABLE_stripekey"
                amount={product.maxBidPrice * 100} // Stripe expects the amount in cents
                currency="USD"
                name="Auction House"
                description={`Payment for ${product.name}`}
                image={`http://localhost:5000/${product.images[0]}`}
                shippingAddress
                billingAddress
              >
                <button className="pay-button">Pay</button>
              </StripeCheckout>
            </div>
          ))
        ) : (
          <p>No reserved products.</p>
        )}
      </div>
    </div>
  );
};

export default ReservedProducts;
