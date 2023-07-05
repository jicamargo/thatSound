import React from 'react';
import { useSelector } from 'react-redux';
import SoundCard from './SoundCard';
import SearchSounds from './SearchSounds';
import '../css/Sounds.css';

const Sounds = () => {
  const isLoading = useSelector((state) => state.sounds.loading);
  const sounds = useSelector((state) => state.sounds.sounds);

  if (isLoading) {
    return (
      <section className="sounds_main">
        <section className="sounds__search">
          <SearchSounds />
        </section>
        <h2 className="sounds__title">Sounds</h2>
        <h3>Loading...</h3>
      </section>
    );
  }

  if (!isLoading && sounds.length === 0) {
    return (
      <section className="sounds_main">
        <section className="sounds__search">
          <SearchSounds />
        </section>
        <h2 className="sounds__title">Sounds</h2>
        <p>No Sounds available</p>
      </section>
    );
  }

  return (
    <section className="sounds_main">
      <section className="sounds__search">
        <SearchSounds />
      </section>
      <section className="sounds">
        {sounds.map((sound) => <SoundCard key={sound.id} sound={sound} />)}
      </section>
    </section>
  );
};

export default Sounds;
