import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MovieCard.scss';
import { createMovieItemsList } from '../../helpers/MovieItemsHelpers';

const MovieCard = ({ id, imageUrl, name, year, genreList, handleClick }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <div className="movie-card-container" onClick={() => handleClick(id)}>
      <div className="movie-card-container-image">
        {imageLoadError ? (
          <div className="movie-card-error" alt="error" src={'../../assets/images/404-error.png'} />
        ) : (
          <img
            className="movie-card-image"
            alt="film poster"
            src={imageUrl}
            onError={handleImageError}
          />
        )}
      </div>
      <div className="movie-card-container-title">
        <h4 className="movie-card-title">{name}</h4>
        <p className="movie-card-year">{year}</p>
      </div>
      <span className="movie-card-genres">{createMovieItemsList(genreList)}</span>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  genreList: PropTypes.array.isRequired,
  handleClick: PropTypes.func
};

export default MovieCard;
