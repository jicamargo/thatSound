import React from 'react';
import PropTypes from 'prop-types';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

function RatingStars({ rating, maxRating }) {
  const filledStars = Math.round(rating);
  const emptyStars = maxRating - filledStars;

  return (
    <div className="RatingStars">
      {[...Array(filledStars)].map(() => (
        <MdStar key={uuidv4()} className="RatingStars__star-filled" />
      ))}
      {[...Array(emptyStars)].map(() => (
        <MdStarBorder key={uuidv4()} className="RatingStars__star-empty" />
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
};

export default RatingStars;
