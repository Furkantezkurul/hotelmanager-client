import './App.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddHotelzimmer from './components/AddHotelzimmer';
import EditHotelzimmer from './components/EditHotelzimmer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/add-hotelzimmer" element={<AddHotelzimmer/>}></Route>
          <Route path="/edit-hotelzimmer" element={<EditHotelzimmer/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
