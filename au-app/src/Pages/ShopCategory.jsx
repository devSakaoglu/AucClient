import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Auction/Item';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import '../Pages/ShopCategory.css'

const ShopCategory = (props) => {
  const { all_product, addBid } = useContext(ShopContext);

  const handlePlaceBid = (productId) => {
    const bidAmount = parseFloat(prompt('Enter your bid amount:'));
    if (bidAmount && !isNaN(bidAmount)) {
      addBid(productId, bidAmount);
      alert('Bid placed successfully!');
    } else {
      alert('Please enter a valid bid amount.');
    }
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
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
          if (props.category === item.category) {
            return (
              <div key={i} className="shopcategory-product">
                <Item
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
                <button onClick={() => handlePlaceBid(item.id)}>Place Bid</button>
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
