import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';


const AddHotelzimmer = () => {
  const [zimmerNummer, setZimmerNummer] = useState('');
  const [zimmerGroesse, setZimmerGroesse] = useState('Einzelzimmer');
  const [minibar, setMinibar] = useState(false);
  const [besetzt, setBesetzt] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
        const response = await api.post('/api/v1/hotelzimmer', {
            zimmerNummer,
            zimmerGroesse,
            minibar,
            besetzt
        });
        console.log(response.data);
        navigate('/');
        // Redirect to home screen if successful
        // navigate('/'); // Uncomment this if you're using react-router
    } catch (error) {
        console.error(error.response.data);
        setError(error.response.data); // Set the error message from backend
        // Display error message from backend to the user
    }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-8 bg-white shadow rounded">
      <div className="mb-6">
      {error && <div className="text-red-500">{error}</div>}
        <label htmlFor="zimmerNummer" className="block mb-2 text-sm font-medium text-gray-900">Neus Zimmer</label>
        <input
          type="text"
          id="zimmerNummer"
          value={zimmerNummer}
          onChange={(e) => setZimmerNummer(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Zimmernummer"
          required
        />
      </div>

      <div className="mb-6">
        <span className="block mb-2 text-sm font-medium text-gray-900">Zimmergroesse:</span>
        <div className="flex justify-between mb-4">
  {['Einzelzimmer', 'Doppelzimmer', 'Suite'].map((size) => {
    let bgColor;
    switch (size) {
      case 'Einzelzimmer':
        bgColor = 'bg-blue-200';
        break;
      case 'Doppelzimmer':
        bgColor = 'bg-green-200';
        break;
      case 'Suite':
        bgColor = 'bg-yellow-200';
        break;
      default:
        bgColor = 'bg-gray-200';
    }
    return (
      <button
        type="button"
        key={size}
        onClick={() => setZimmerGroesse(size)}
        className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${zimmerGroesse === size ? bgColor : 'bg-gray-200'} text-black`}
      >
        {size}
      </button>
    );
  })}
</div>
      </div>

      <div className="mb-6">
        <span className="block mb-2 text-sm font-medium text-gray-900">Minibar?</span>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setMinibar(true)}
            className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${minibar ? 'bg-green-200 text-black' : 'bg-green-100 text-black'}`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => setMinibar(false)}
            className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${!minibar ? 'bg-red-200 text-black' : 'bg-red-100 text-black'}`}
          >
            Nein
          </button>
        </div>
      </div>

      <div className="mb-6">
        <span className="block mb-2 text-sm font-medium text-gray-900">Besetzt?</span>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setBesetzt(true)}
            className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${besetzt ? 'bg-green-200 text-black' : 'bg-green-100 text-black'}`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => setBesetzt(false)}
            className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${!besetzt ? 'bg-red-200 text-black' : 'bg-red-100 text-black'}`}
          >
            Nein
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Speichern
        </button>
      </div>
    </form>
  );
};

export default AddHotelzimmer;
