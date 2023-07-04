import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { updateSoundDetails } from '../redux/sounds/soundDetailsSlice';
import '../css/Sounds.css';

function SoundCard({ sound }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSoundNameClick = () => {
    dispatch(updateSoundDetails(sound));
    navigate('/details');
  };

  return (
    <article className="SoundCard" data-testid="sound-card">
      <div className="SoundCard__header">
        <button
          type="button"
          className="SoundCard__name"
          onClick={handleSoundNameClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleSoundNameClick();
            }
          }}
        >
          {sound.name}
        </button>
      </div>
      <div className="SoundCard__body">
        {/* <img className="SoundCard__image" src={sound.flickr_images[0]} alt={sound.name} /> */}
        <div className="SoundCard__details">
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SoundCard;
