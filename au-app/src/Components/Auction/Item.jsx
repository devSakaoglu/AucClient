import React from 'react';
import './Item.css';

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>New Price: ${new_price.toFixed(2)}</p>
      <p>Old Price: ${old_price.toFixed(2)}</p>
    </div>
  );
};

export default Item;
