import React, { useState } from 'react';

const BidForm = ({ onBid }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bidAmount) {
      onBid(parseFloat(bidAmount));
      setBidAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        required
        min="0"
      />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
