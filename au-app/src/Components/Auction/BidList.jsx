import React from 'react';

const BidList = ({ bids }) => {
  const sortedBids = [...bids].sort((a, b) => b.bidAmount - a.bidAmount);

  return (
    <ul className="bid-list">
      {sortedBids.map((bid, index) => (
        <li key={index}>${bid.bidAmount.toFixed(2)} by {bid.user}</li>
      ))}
    </ul>
  );
};

export default BidList;
