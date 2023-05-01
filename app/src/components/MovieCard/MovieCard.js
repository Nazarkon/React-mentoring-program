import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DotsMenu from '../DotsMenu/DotsMenu';
import './MovieCard.scss';
import { createMovieItemsList } from '../../helpers/MovieItemsHelpers';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, imageUrl, name, year, genreList, handleClick, navigationList }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <div className="movie-card-container">
      <div className="movie-card-container-image">
        <div className="movie-card-container-menu">
          {navigationList && (
            <DotsMenu
              navigationList={navigationList}
              movieID={id}
              className="movie-card-container-menu"
            />
          )}
        </div>
        <Link to={`/movie-details/${id}`}>
          <>
            {imageLoadError ? (
              <div
                onClick={handleClick}
                className="movie-card-error"
                alt="error"
                src={'../../assets/images/404-error.png'}
              />
            ) : (
              <img
                onClick={handleClick}
                className="movie-card-image"
                alt="film poster"
                src={imageUrl}
                onError={handleImageError}
              />
            )}
          </>
        </Link>
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
  handleClick: PropTypes.func,
  navigationList: PropTypes.array
};

export default MovieCard;
