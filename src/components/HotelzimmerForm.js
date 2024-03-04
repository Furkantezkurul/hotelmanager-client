//Hotelzimmerform.js
//Reusable component used for Add- and EditHotelzimmer

import React from 'react';

const HotelzimmerForm = ({ zimmer, setZimmer, onSubmit, error, showDeleteButton, onDelete }) => {
  const handleFieldChange = (field, value) => {
    setZimmer((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto my-10 p-8 bg-white shadow rounded">
        {/* Shows error messsages at the top of the form */}
      {error && <div className="mb-4 text-red-500">{error}</div>}
       {/* Input for Zimmernummer, readonly when editing a Room */}
      <div className="mb-6">
        <label htmlFor="zimmerNummer" className="block mb-2 text-sm font-medium text-gray-900">Zimmernummer</label>
        <input
          type="text"
          id="zimmerNummer"
          value={zimmer.zimmerNummer}
          onChange={(e) => handleFieldChange('zimmerNummer', e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          readOnly={showDeleteButton}
        />
      </div>

        {/* Selection of Roomsize */}
      <div className="mb-6">
        <label htmlFor="zimmerGroesse" className="block mb-2 text-sm font-medium text-gray-900">Zimmergröße</label>
        <select
          id="zimmerGroesse"
          value={zimmer.zimmerGroesse}
          onChange={(e) => handleFieldChange('zimmerGroesse', e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Einzelzimmer">Einzelzimmer</option>
          <option value="Doppelzimmer">Doppelzimmer</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

         {/* Select whether the Room has a Minibar or not */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">Minibar?</label>
        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={() => handleFieldChange('minibar', true)}
            className={`py-2 px-4 rounded-lg ${zimmer.minibar ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => handleFieldChange('minibar', false)}
            className={`py-2 px-4 rounded-lg ${!zimmer.minibar ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Nein
          </button>
        </div>
      </div>

         {/* Select whether the Room is occupied or not */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">Besetzt?</label>
        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={() => handleFieldChange('besetzt', true)}
            className={`py-2 px-4 rounded-lg ${zimmer.besetzt ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => handleFieldChange('besetzt', false)}
            className={`py-2 px-4 rounded-lg ${!zimmer.besetzt ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Nein
          </button>
        </div>
      </div>

 {/* Delete and Submit Button, Delete button is only visible when editing a room */}
      <div className="flex justify-between">
        {showDeleteButton && (
          <button onClick={onDelete}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Löschen
          </button>
        )}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Speichern
        </button>
      </div>
    </form>
  );
};

export default HotelzimmerForm;
