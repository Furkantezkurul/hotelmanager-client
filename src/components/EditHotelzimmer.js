// EditHotelzimmer.js
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import HotelzimmerForm from './HotelzimmerForm';

const EditHotelzimmer = () => {
  const [zimmer, setZimmer] = useState({ zimmerNummer: '', zimmerGroesse: '', minibar: false, besetzt: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const zimmerNummer = location.state?.zimmerNummer;

  useEffect(() => {
    if (zimmerNummer) {
      const fetchRoomDetails = async () => {
        try {
          const response = await api.get(`/api/v1/hotelzimmer/${zimmerNummer}`);
          setZimmer(response.data);
        } catch (error) {
          setError("Ein Fehler ist aufgetreten beim Abrufen der Zimmernummer.");
        }
      };
      fetchRoomDetails();
    }
  }, [zimmerNummer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/api/v1/hotelzimmer/${zimmer.zimmerNummer}`, zimmer);
      navigate('/');
    } catch (error) {
      setError("Ein Fehler ist aufgetreten beim Aktualisieren des Zimmers.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Sind Sie sicher, dass Sie dieses Zimmer löschen möchten?")) {
      try {
        await api.delete(`/api/v1/hotelzimmer/${zimmer.zimmerNummer}`);
        navigate('/');
      } catch (error) {
        setError("Ein Fehler ist aufgetreten beim Löschen des Zimmers.");
      }
    }
  };

  return <HotelzimmerForm zimmer={zimmer} setZimmer={setZimmer} onSubmit={handleSubmit} error={error} showDeleteButton={true} onDelete={handleDelete} />;
};

export default EditHotelzimmer;
