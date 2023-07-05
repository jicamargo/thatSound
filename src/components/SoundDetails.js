import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiCloudDownload } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import RatingStars from './RatingStars';
import '../css/SoundDetails.css';

const SoundDetails = () => {
  const soundDetails = useSelector((state) => state.soundDetails.soundDetails);
  const loading = useSelector((state) => state.soundDetails.loading);
  const error = useSelector((state) => state.soundDetails.error);
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="sound-details_main">
        <h2>Loading sound details...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sound-details_main">
        Error:
        {error}
      </section>
    );
  }

  if (!soundDetails) {
    return (
      <section className="sound-details_main">
        <h2>Please select a sound to have details</h2>
      </section>
    );
  }

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <section className="sound-details_main">
      <div className="sound-details">
        <div className="sound-details__header">
          <div className="sound-details__header_back_and_download">
            <button type="button" className="sound-details__back-btn" onClick={handleGoBack}>
              <BiArrowBack className="sound-details__back-icon" />
            </button>
            <a href={soundDetails.download} className="sound-details__download" target="_blank" rel="noopener noreferrer">
              <BiCloudDownload className="sound-details__download-icon" />
            </a>
          </div>
          <div className="sound-details__header_title">
            <div className="sound-details__image">
              <img className="waveform__image" src={soundDetails.images.waveform_l} alt="Waveform" />
            </div>
            <div className="sound-details__title">
              {soundDetails.name}
            </div>
          </div>
        </div>
        <div className="sound-details__player">
          <audio controls>
            <track kind="captions" src="path_to_captions_file.vtt" label="Captions" default />
            <source src={soundDetails.previews['preview-hq-mp3']} type="audio/mpeg" />
            <source src={soundDetails.previews['preview-hq-ogg']} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="sound-details__info">
          <p className="sound-details__description">
            {soundDetails.description}
          </p>
          <div className="SoundCard__row_duration_and_rating">
            <p className="soundCard__duration">
              Duration:
              <br />
              {soundDetails.duration.toFixed(1)}
              {' '}
              s
            </p>
            <p className="sound-details__samplerate">
              Sample Rate:
              <br />
              {soundDetails.samplerate}
              {' '}
              Hz
            </p>
            <p className="soundCard__ratings">
              <RatingStars rating={soundDetails.avg_rating} maxRating={5} />
              <span className="soundCard__ratings-label">
                {soundDetails.avg_rating.toFixed(2)}
                {' '}
                (
                {soundDetails.num_ratings}
                {' '}
                ratings)
              </span>
            </p>
          </div>
          <div className="SoundCard__tags">
            <ul>
              {soundDetails.tags.map((tag) => (
                <li key={uuidv4()}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoundDetails;
