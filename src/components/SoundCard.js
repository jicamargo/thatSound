import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { selectSound, cancelSelection } from '../redux/sounds/soundsSlice';

import '../css/Sounds.css';

function SoundCard({ sound }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSelected = sound.selected;

  const handleSelection = () => {
    if (isSelected) {
      dispatch(cancelSelection(sound.id));
    } else {
      dispatch(selectSound(sound.id));
    }
  };

  const handleSoundNameClick = () => {
    navigate(`/details/${sound.id}`);
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

        {isSelected && <span className="SoundCard__selected-label">Selected</span>}
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
          <div className="SoundCard__selection">
            <button type="button" className="SoundCard__selection-button" onClick={handleSelection}>
              {isSelected ? 'Cancel Reservation' : 'Select sound'}
            </button>
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
