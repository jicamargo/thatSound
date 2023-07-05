import React, { useEffect } from 'react';
import './css/App.css';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Sounds from './components/Sounds';
import SoundDetails from './components/SoundDetails';
import About from './components/About';
import Footer from './components/Footer';
import { fetchSounds, saveFilter } from './redux/sounds/soundsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveFilter('music,relax'));
    dispatch(fetchSounds({ query: '' }));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/sounds" />} />
          <Route path="/sounds" element={<Sounds />} />
          <Route path="/details" element={<SoundDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
