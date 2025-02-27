import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance as axios } from '../../api';
import list_icon from '../Assets/5252484.jpg';
import './Listings.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [startPrice, setStartPrice] = useState('');
  const [auctionDuration, setAuctionDuration] = useState('');
  const navigate = useNavigate();

  const categories = ['Vintage', 'Electronics', 'Fashion', 'Jewelry', 'Books', 'Art', 'Music Instruments'];
  const auctionDurations = Array.from({ length: 16 }, (_, i) => i); // Generates numbers from 0 to 15

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/products/me/:status');
        if (response.status === 200) {
          setListings(response.data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleAddListing = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('images', image);
    formData.append('startPrice', startPrice);
    formData.append('auctionDuration', auctionDuration);

    try {
      const response = await axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setListings([...listings, response.data.newProduct]);
        setName('');
        setCategory('');
        setImage(null);
        setStartPrice('');
        setAuctionDuration('');
      }
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteListing = async (id) => {
    try {
      const response = await axios.delete(`/products/${id}`);
      if (response.status === 200) {
        setListings(listings.filter(listing => listing._id !== id));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error('Error deleting listing:', error);
      }
    }
  };

  const handleNavigate = (id) => {
    navigate(`/auction/${id}`);
  };

  return (
    <div className="listings-container">
      <h1>My Listings</h1>
      <div className="listing-form-container">
        <div className="listing-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={auctionDuration}
            onChange={(e) => setAuctionDuration(e.target.value)}
            required
          >
            <option value="" disabled>Select Auction Duration</option>
            {auctionDurations.map((duration) => (
              <option key={duration} value={duration}>{duration} days</option>
            ))}
          </select>
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            placeholder="Starting Price"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <button type="button" onClick={handleAddListing}>Add Listing</button>
        </div>
        <img src={list_icon} alt="List Icon" className="list-icon" />
      </div>
      <div className="listings-grid">
        {listings.map((listing, index) => (
          <div 
            key={index} 
            className="listing-item"
            onClick={() => handleNavigate(listing._id)}
          >
            <img src={`http://localhost:5000/${listing.images[0]}`} alt={listing.name} />
            <p>{listing.name}</p>
            <p>{listing.category.join(', ')}</p>
            <button 
              className="delete-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteListing(listing._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
