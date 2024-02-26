import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const Home = () => {
  const [hotelzimmer, setHotelzimmer] = useState([]);

  //Gets alls Hotelzimmer and sorts them by their number 
  const getHotelzimmer = async () => {
    try {
      const response = await api.get("/api/v1/hotelzimmer");
      const sortedData = response.data.sort((a, b) => {
        return parseInt(a.zimmerNummer) - parseInt(b.zimmerNummer);
      });
      setHotelzimmer(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  //Gets all Hotelzimmer when the page loads 
  useEffect(() => {
    getHotelzimmer();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Suche Hotelzimmer"
        />
      </div>
      <div className="space-y-2">
        {hotelzimmer.map((zimmer, index) => (
         <div key={index} className="grid grid-cols-[1fr,1fr,1fr,1fr,auto] gap-4 items-center bg-white shadow rounded p-3">
            <span className="font-semibold text-xl">Zimmer {zimmer.zimmerNummer}</span>
             
            <span className={`badge rounded-lg text-lg p-2 ${zimmer.zimmerGroesse === 'Einzelzimmer' ? 'bg-blue-200' : zimmer.zimmerGroesse === 'Doppelzimmer' ? 'bg-green-200' : 'bg-yellow-200'}`}>
              {zimmer.zimmerGroesse}
            </span>
           
            <span className={`badge rounded-lg text-lg p-2 ${zimmer.minibar ? 'bg-green-200' : 'bg-red-200'}`}>
              {!zimmer.minibar && <text>keine</text> } Minibar
            </span>
          
            <span className={`badge rounded-lg text-lg p-2 ${zimmer.besetzt ? 'bg-red-200' : 'bg-green-200'}`}>
              {zimmer.besetzt ? <text>Besetzt</text> : <text>Frei</text>  } 
            </span>
           
            <button className="bg-gray-200 p-2 rounded text-gray-700 w-10 max-w-xs">  <FontAwesomeIcon icon={faPenToSquare} /></button>
          </div>
        ))}
      </div>
      <button className="fixed bottom-4 right-40 bg-blue-500 text-white p-4 rounded-2xl shadow-lg text-xl">+</button>
    </div>
  );
};

export default Home;
