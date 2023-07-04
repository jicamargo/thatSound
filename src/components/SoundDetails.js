import React from 'react';
import { useSelector } from 'react-redux';

const SoundDetails = () => {
  const soundDetails = useSelector((state) => state.soundDetails.soundDetails);
  const loading = useSelector((state) => state.soundDetails.loading);
  const error = useSelector((state) => state.soundDetails.error);

  if (loading) {
    return <div>Loading sound details...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (!soundDetails) {
    return <div>Please select a sound to have its details</div>;
  }

  return (
    <div className="sound-details">
      <h2 className="sound-details__title">{soundDetails.name}</h2>
      <div className="sound-details__image">
        <img src={soundDetails.images.waveform_m} alt="Waveform" />
      </div>
      <div className="sound-details__player">
        <audio controls>
          <track kind="captions" src="path_to_captions_file.vtt" label="Captions" default />
          <source src={soundDetails.previews['preview-hq-mp3']} type="audio/mpeg" />
          <source src={soundDetails.previews['preview-hq-ogg']} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <a href={soundDetails.download} className="sound-details__download" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
      <div className="sound-details__info">
        <p className="sound-details__description">
          {soundDetails.description}
        </p>
        <p className="sound-details__tags">
          Tags:
          {' '}
          {soundDetails.tags.join(', ')}
        </p>
        <p className="sound-details__duration">
          Duration:
          {' '}
          {soundDetails.duration}
          s
        </p>
        <p className="sound-details__samplerate">
          Sample Rate:
          {' '}
          {soundDetails.samplerate}
          {' '}
          Hz
        </p>
        <p className="sound-details__ratings">
          Average Rating:
          {' '}
          {soundDetails.avg_rating}
          {' '}
          (Based on
          {' '}
          {soundDetails.num_ratings}
          {' '}
          ratings)
        </p>
      </div>
    </div>
  );
};

export default SoundDetails;
