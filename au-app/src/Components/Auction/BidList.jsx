import React from 'react';

const BidList = ({ bids }) => {
  return (
    <ul className="bid-list">
      {bids.map((bid, index) => (
        <li key={index}>${bid.bidAmount.toFixed(2)} by {bid.user}</li>
      ))}
    </ul>
  );
};

export default BidList;
