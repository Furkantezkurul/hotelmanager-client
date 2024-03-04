import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';

const Home = () => {

  const navigate = useNavigate();

  const [hotelzimmer, setHotelzimmer] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [minibarFilter, setMinibarFilter] = useState('');
  const [occupancyFilter, setOccupancyFilter] = useState('');


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

  const filteredHotelzimmer = hotelzimmer
    .filter((zimmer) => zimmer.zimmerNummer.startsWith(searchQuery))
    .filter((zimmer) => roomTypeFilter ? zimmer.zimmerGroesse === roomTypeFilter : true)
    .filter((zimmer) => {
      if (minibarFilter === 'minibar') return zimmer.minibar;
      if (minibarFilter === 'keineMinibar') return !zimmer.minibar;
      return true;
    })
    .filter((zimmer) => {
      if (occupancyFilter === 'besetzt') return zimmer.besetzt;
      if (occupancyFilter === 'frei') return !zimmer.besetzt;
      return true;
    });

  //navigate to AddHotelzimmer onclick
  const handleAddClick = () => {
    navigate('/add-hotelzimmer');
  };


  //navigate to the room you want to edit, passing zimmerNummer as state
  const handleEditClick = (zimmerNummer) => {
    navigate('/edit-hotelzimmer', { state: { zimmerNummer } });
  };



  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Suche Hotelzimmer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <Filter
        roomTypeFilter={roomTypeFilter}
        setRoomTypeFilter={setRoomTypeFilter}
        minibarFilter={minibarFilter}
        setMinibarFilter={setMinibarFilter}
        occupancyFilter={occupancyFilter}
        setOccupancyFilter={setOccupancyFilter}
      />
      <div className="space-y-2">
        {filteredHotelzimmer.map((zimmer, index) => (
          <div key={index} className="grid grid-cols-[1fr,1fr,1fr,1fr,auto] gap-4 items-center bg-white shadow rounded p-3">
            <span className="font-semibold text-xl">Zimmer {zimmer.zimmerNummer}</span>

            <span className={`badge rounded-lg text-lg p-2 ${zimmer.zimmerGroesse === 'Einzelzimmer' ? 'bg-blue-200' : zimmer.zimmerGroesse === 'Doppelzimmer' ? 'bg-green-200' : 'bg-yellow-200'}`}>
              {zimmer.zimmerGroesse}
            </span>

            <span className={`badge rounded-lg text-lg p-2 ${zimmer.minibar ? 'bg-green-200' : 'bg-red-200'}`}>
              {!zimmer.minibar && <text>keine</text>} Minibar
            </span>

            <span className={`badge rounded-lg text-lg p-2 ${zimmer.besetzt ? 'bg-red-200' : 'bg-green-200'}`}>
              {zimmer.besetzt ? <text>Besetzt</text> : <text>Frei</text>}
            </span>

            <button onClick={() => handleEditClick(zimmer.zimmerNummer)} className="bg-gray-200 p-2 rounded text-gray-700 w-10 max-w-xs">  <FontAwesomeIcon icon={faPenToSquare} /></button>
          </div>
        ))}
      </div>
      <button onClick={handleAddClick} className="fixed bottom-4 right-40 bg-blue-500 text-white p-4 rounded-full shadow-lg text-xl">Neus Zimmer erstellen +</button>
    </div>
  );
};

export default Home;
