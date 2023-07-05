import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaSistrix } from 'react-icons/fa';
import RatingStars from './RatingStars';
import '../css/Sounds.css';
import '../css/SoundCard.css';
import { updateSoundDetails } from '../redux/sounds/soundDetailsSlice';

function SoundCard({ sound }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSoundNameClick = () => {
    dispatch(updateSoundDetails(sound));
    navigate('/details');
  };

  return (
    <article className="SoundCard" data-testid="sound-card">
      <button
        type="button"
        className="SoundCard__header"
        onClick={handleSoundNameClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleSoundNameClick();
          }
        }}
      >
        <div className="SoundCard__name">
          {sound.name}
          <div className="SoundCard__name-icon-cnt">
            <FaSistrix className="SoundCard__name-icon" />
          </div>
        </div>
      </button>
      <div className="SoundCard__body">
        <div className="SoundCard__details">
          <div className="SoundCard__row_duration_and_rating">
            <p className="soundCard__duration">
              Duration:
              <br />
              {sound.duration.toFixed(1)}
              s
            </p>
            <p className="soundCard__ratings">
              <RatingStars rating={sound.avg_rating} maxRating={5} />
              <span className="soundCard__ratings-label">
                {sound.avg_rating.toFixed(2)}
                {' '}
                (
                {sound.num_ratings}
                {' '}
                ratings)
              </span>
            </p>
          </div>
          <div className="SoundCard__tags">
            <ul>
              {sound.tags.map((tag) => (
                <li key={uuidv4()}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

SoundCard.propTypes = {
  sound: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    samplerate: PropTypes.number.isRequired,
    avg_rating: PropTypes.number.isRequired,
    num_ratings: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SoundCard;
