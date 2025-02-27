import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import '../Pages/ShopCategory.css';
import { instance as axios } from '../api';

axios.defaults.withCredentials = true;

const ShopCategory = ({ loggedIn, banner, category, username }) => {
  const [products, setProducts] = useState([]);
  const { setAllProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setAllProduct(response.data); // Update context with all products
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setAllProduct]);

  const handlePlaceBid = (productId, productOwner) => {
    if (loggedIn) {
      if (productOwner !== username) {
        navigate(`/auction/${productId}`);
      } else {
        alert("You cannot bid on your own product.");
      }
    } else {
      navigate('/login');
    }
  };

  const getRemainingTime = (auctionStartDate, auctionDuration) => {
    const auctionEndDate = new Date(auctionStartDate);
    if (parseInt(auctionDuration, 10) === 0) {
      auctionEndDate.setMinutes(auctionEndDate.getMinutes() + 5);
    } else {
      auctionEndDate.setDate(auctionEndDate.getDate() + parseInt(auctionDuration, 10));
    }

    const now = new Date();
    const timeDifference = auctionEndDate - now;

    if (timeDifference <= 0) {
      return "Auction ended";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  const filteredProducts = category === "all" ? products : products.filter(item => item.category.includes(category));

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of {filteredProducts.length} products
        </p>
     
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <div key={i} className="shopcategory-product">
            <div className="item">
              <img src={`http://localhost:5000/${item.images[0]}`} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                {item.appUser && (
                  <p>Seller: {item.appUser.name} {item.appUser.surname}</p>
                )}
                <p>Newest Price: ${item.maxBidPrice ? item.maxBidPrice.toFixed(2) : 'N/A'}</p>
                {item.old_price && <p>Old Price: ${item.old_price.toFixed(2)}</p>}
                <p className="countdown-timer">
                  {getRemainingTime(item.auctionStartDate, item.auctionDuration)}
                </p>
              </div>
            </div>
            <button onClick={() => handlePlaceBid(item._id, item.appUser)}>Place Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
