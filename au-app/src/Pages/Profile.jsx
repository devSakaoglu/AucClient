import React, { useState, useEffect } from 'react';
import { instance as axios } from '../api';
import './Profile.css';

const Profile = ({ username }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: ''
  });
  const [address, setAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    city: '',
    street: '',
    country: '',
    description: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/me', { withCredentials: true });
        if (response.status === 200) {
          setUserInfo(response.data);
          setAddress(response.data.Addresses || null);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleAddAddress = async () => {
    try {
      const response = await axios.post('/addresses', newAddress, { withCredentials: true });
      if (response.status === 201) {
        setAddress(response.data);
        setNewAddress({ city: '', street: '', country: '', description: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      const response = await axios.patch(`/addresses/${editAddressId}`, newAddress, { withCredentials: true });
      if (response.status === 200) {
        setAddress(response.data);
        setNewAddress({ city: '', street: '', country: '', description: '' });
        setShowAddForm(false);
        setEditAddressId(null);
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`/addresses/${addressId}`, { withCredentials: true });
      if (response.status === 200) {
        setAddress(null);
        setShowAddForm(true);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditAddressId(address._id);
    setShowAddForm(true);
  };

  return (
    <div className="profile-container">
      <h1>{username}'s Profile</h1>
      <div className="user-info">
        <h2>Personal Information</h2>
        <p><strong>First Name:</strong> {userInfo.name}</p>
        <p><strong>Last Name:</strong> {userInfo.surname}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
      </div>
      <div className="address-info">
        <div className="address-header">
          <h2>Addresses</h2>
          {!address && (
            <button className="add-address-button" onClick={() => {
              setNewAddress({ city: '', street: '', country: '', description: '' });
              setShowAddForm(true);
            }}>
              + Add New Address
            </button>
          )}
        </div>
        {showAddForm && (
          <div className="address-form">
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="description"
              value={newAddress.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <button onClick={editAddressId ? handleUpdateAddress : handleAddAddress}>
              {editAddressId ? 'Update Address' : 'Add Address'}
            </button>
          </div>
        )}
        {address && (
          <div className="address-list">
            <div className="address-item">
              <p>{address.street}</p>
              <p>{address.city} / {address.country}</p>
              <p>{address.description}</p>
              <button className="delete-button" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
              <button className="edit-button" onClick={() => handleEditAddress(address)}>Edit Address</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
