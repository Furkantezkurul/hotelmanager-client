// AddHotelzimmer.js
import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import HotelzimmerForm from './HotelzimmerForm';

const AddHotelzimmer = () => {
  const [zimmer, setZimmer] = useState({ zimmerNummer: '', zimmerGroesse: 'Einzelzimmer', minibar: false, besetzt: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/v1/hotelzimmer', zimmer);
      navigate('/');
    } catch (error) {
      setError(error.response?.data || "Ein Fehler ist aufgetreten.");
    }
  };

  return <HotelzimmerForm zimmer={zimmer} setZimmer={setZimmer} onSubmit={handleSubmit} error={error} showDeleteButton={false} />;
};

export default AddHotelzimmer;
