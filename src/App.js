import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Sounds from './components/Sounds';
import SoundDetails from './components/SoundDetails';
import { fetchSounds, saveFilter } from './redux/sounds/soundsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveFilter('music,relax'));
    dispatch(fetchSounds({ query: '' }));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Sounds />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/details/:soundId" element={<SoundDetails />} />
        <Route path="/about" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
