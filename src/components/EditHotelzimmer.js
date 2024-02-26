import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const EditHotelzimmer = () => {
    console.log("EditHotelzimmer component is rendering");

    const [zimmer, setZimmer] = useState({ zimmerNummer: '', zimmerGroesse: '', minibar: false, besetzt: false });
    const [error, setError] = useState('');

    const location = useLocation();
    const zimmerNummer = location.state?.zimmerNummer; // Accessing zimmerNummer from the passed state

    //const { zimmerNummer } = useParams(); // Get the room number from the URL
    const navigate = useNavigate();
  
    // Fetch the room details when the component mounts

    useEffect(() => {
      const fetchRoomDetails = async () => {
        try {
            console.log("Trying to fetch data");
          const response = await api.get(`/api/v1/hotelzimmer/${zimmerNummer}`);
          console.log(response.data);
          setZimmer(response.data);
        } catch (error) {
          console.error(error.response?.data || "An error occurred while fetching the room details.");
          setError(error.response?.data || "An error occurred.");
        }
      };
      fetchRoomDetails();
    }, [zimmerNummer]); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear any existing errors
      try {
          // PUT endpoint to update the room details
          const response = await api.put(`/api/v1/hotelzimmer/${zimmer.zimmerNummer}`, {
              ...zimmer,
          });
          console.log(response.data);
          navigate('/');
      } catch (error) {
          console.error(error.response?.data);
          setError(error.response?.data); // Display error from backend
      }
  };

  const handleDelete = async () => {
    if (window.confirm("Sind Sie sich sicher, dass Sie dieses Zimmer löschen wollen?")) {
      try {
        await api.delete(`/api/v1/hotelzimmer/${zimmer.zimmerNummer}`);
        navigate('/'); // Navigate back to the home page or another relevant page
      } catch (error) {
        console.error("Failed to delete the hotel room:", error);
        setError(error.response?.data || "Failed to delete the hotel room. Please try again.");
      }
    }
  };
  

    if (zimmer.zimmerNummer === "") {
        return <div>Loading...</div>;
      }
  

    return (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-8 bg-white shadow rounded">
              {error && <div className="mb-4 text-red-500">{error}</div>}
              <div className="mb-6">
                <label htmlFor="zimmerNummer" className="block mb-2 text-sm font-medium text-gray-900">Zimmernummer</label>
                <input
                  type="text"
                  id="zimmerNummer"
                  value={zimmer.zimmerNummer}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
          
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Zimmergröße</label>
                <div className="flex space-x-2">
                  {['Einzelzimmer', 'Doppelzimmer', 'Suite'].map((groesse) => (
                    <button
                      key={groesse}
                      type="button"
                      onClick={() => setZimmer({ ...zimmer, zimmerGroesse: groesse })}
                      className={`py-2 px-4 text-sm rounded-lg ${zimmer.zimmerGroesse === groesse ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                      {groesse}
                    </button>
                  ))}
                </div>
              </div>
          
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Minibar</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setZimmer({ ...zimmer, minibar: true })}
                    className={`py-2 px-4 text-sm rounded-lg ${zimmer.minibar ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setZimmer({ ...zimmer, minibar: false })}
                    className={`py-2 px-4 text-sm rounded-lg ${!zimmer.minibar ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    Nein
                  </button>
                </div>
              </div>
          
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Besetzt</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setZimmer({ ...zimmer, besetzt: true })}
                    className={`py-2 px-4 text-sm rounded-lg ${zimmer.besetzt ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setZimmer({ ...zimmer, besetzt: false })}
                    className={`py-2 px-4 text-sm rounded-lg ${!zimmer.besetzt ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    Nein
                  </button>
                </div>
              </div>
          
              <div className="flex justify-end">
              <button onClick={handleDelete}
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Löschen
      </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Speichern
                </button>
              </div>
            </form>
          );
      
};

export default EditHotelzimmer;
