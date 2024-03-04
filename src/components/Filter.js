// Filter.js
import React from 'react';

const Filter = ({ roomTypeFilter, setRoomTypeFilter, minibarFilter, setMinibarFilter, occupancyFilter, setOccupancyFilter }) => {
  return (
    <div className="flex gap-4 items-center mt-2">
      {/* Room Type Filter */}
      <select
        className="block appearance-none w-2/3 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={roomTypeFilter}
        onChange={(e) => setRoomTypeFilter(e.target.value)}
      >
        <option value="">Alle Zimmerarten</option>
        <option value="Einzelzimmer">Einzelzimmer</option>
        <option value="Doppelzimmer">Doppelzimmer</option>
        <option value="Suite">Suite</option>
      </select>

      {/* Minibar Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setMinibarFilter((prev) => (prev !== "minibar" ? "minibar" : ""))}
          className={`py-2 px-4 rounded-lg ${minibarFilter === "minibar" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Minibar
        </button>
        <button
          onClick={() => setMinibarFilter((prev) => (prev !== "keineMinibar" ? "keineMinibar" : ""))}
          className={`py-2 px-4 rounded-lg ${minibarFilter === "keineMinibar" ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Keine Minibar
        </button>
      </div>

      {/* Occupancy Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setOccupancyFilter((prev) => (prev !== "besetzt" ? "besetzt" : ""))}
          className={`py-2 px-4 rounded-lg ${occupancyFilter === "besetzt" ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Besetzt
        </button>
        <button
          onClick={() => setOccupancyFilter((prev) => (prev !== "frei" ? "frei" : ""))}
          className={`py-2 px-4 rounded-lg ${occupancyFilter === "frei" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Frei
        </button>
      </div>
    </div>
  );
};

export default Filter;
