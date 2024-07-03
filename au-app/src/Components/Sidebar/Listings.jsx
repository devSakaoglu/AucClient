// src/Components/Sidebar/Listings.jsx
import React, { useState, useEffect } from 'react';
import { instance as axios } from '../../api';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/products/me');
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
      }
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h1>My Listings</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <button onClick={handleAddListing}>Add Listing</button>
      </div>
      <div>
        {listings.map((listing, index) => (
          <div key={index}>
            <img src={`http://localhost:5000/${listing.images[0]}`} alt={listing.name} style={{ width: '100px' }} />
            <p>{listing.name}</p>
            <p>{listing.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
