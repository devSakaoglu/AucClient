// src/Pages/ShopCategory.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
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

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((item, i) => {
          if (category === item.category || category === "all") {
            return (
              <div key={i} className="shopcategory-product">
                <div className="item">
                  <img src={`http://localhost:5000/${item.images[0]}`} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>New Price: ${item.new_price ? item.new_price.toFixed(2) : 'N/A'}</p>
                    {item.old_price && <p>Old Price: ${item.old_price.toFixed(2)}</p>}
                  </div>
                </div>
                <button onClick={() => handlePlaceBid(item._id, item.appUser)}>Place Bid</button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
