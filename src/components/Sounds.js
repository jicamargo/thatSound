import React from 'react';
import { useSelector } from 'react-redux';
import SoundCard from './SoundCard';
import SearchSounds from './SearchSounds';

const Sounds = () => {
  const isLoading = useSelector((state) => state.sounds.loading);
  const sounds = useSelector((state) => state.sounds.sounds);
  const query = useSelector((state) => state.sounds.query);

  if (isLoading) {
    return (
      <section className="sounds">
        <header>
          <SearchSounds />
          <h2>Sounds</h2>
          <p>Loading...</p>
        </header>
      </section>
    );
  }

  if (!isLoading && sounds.length === 0) {
    return (
      <section className="sounds">
        <SearchSounds />
        <h2>Sounds</h2>
        <p>No Sounds available</p>
      </section>
    );
  }

  return (
    <section className="sounds">
      <SearchSounds />
      <h2>
        Sounds for query:
        {' '}
        {query}
      </h2>
      {sounds.map((sound) => <SoundCard key={sound.id} sound={sound} />)}
    </section>
  );
};

export default Sounds;
