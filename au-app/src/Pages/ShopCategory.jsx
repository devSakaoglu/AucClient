import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from '../Components/Auction/Item';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import '../Pages/ShopCategory.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const ShopCategory = ({ loggedIn, banner, category }) => {
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/me')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (category === item.category || category === "all") {
            return (
              <div key={i} className="shopcategory-product">
                <Item
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
                {loggedIn ? (
                  <Link to={`/auction/${item.id}`}>
                    <button>Place Bid</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button>Place Bid</button>
                  </Link>
                )}
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
