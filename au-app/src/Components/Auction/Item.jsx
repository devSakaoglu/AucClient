import React from 'react';
import './Item.css';

const Item = ({ image, name, new_price, old_price }) => {
  return (
    <div className='item'>
      <img src={image} alt={name} />
      <p>{name}</p>
      <div className="item-price">
        <div className="item-price-new">
          ${new_price.toFixed(2)}
        </div>
        <div className="item-price-old">
          ${old_price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Item;
