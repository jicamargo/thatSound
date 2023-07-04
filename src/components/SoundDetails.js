import React from 'react';
import { useParams } from 'react-router-dom';

const SoundDetails = () => {
  const {
    soundId,
  } = useParams();

  return (
    <div>
      <h2>Sound Details</h2>
      <p>
        Sound ID:
        { soundId }
      </p>
    </div>
  );
};

export default SoundDetails;
