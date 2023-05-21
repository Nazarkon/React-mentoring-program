import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieListById } from '../../api/movie/controller';

import './MovieDetails.scss';
import { createMovieItemsList } from '../../helpers/MovieItemsHelpers';

function MovieDetails() {
  const [movieInfo, setMovieInfo] = useState();

  const { id } = useParams();

  useEffect(() => {
    getMovieListById(id)
      .then((data) => {
        setMovieInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="movie-details-container">
      <div className="movie-details-container-image">
        <img className="movie-card-image" alt="film poster" src={movieInfo?.imageUrl} />
      </div>
      <div className="movie-details-container-description">
        <div className="movie-details-description-title">
          <h4 className="movie-details-name">{movieInfo?.name}</h4>
          <span className="movie-details-rating">{movieInfo?.rating}</span>
        </div>
        <span className="movie-details-genres">{createMovieItemsList(movieInfo?.genreList)}</span>
        <div className="movie-details-container-subtitle">
          <span className="movie-details-year">{movieInfo?.year}</span>
          <span className="movie-details-duration">{movieInfo?.duration}</span>
        </div>
        <p className="movie-details-description">{movieInfo?.description}</p>
      </div>
    </div>
  );
}

// MovieDetails.propTypes = {
//   movieInfo: PropTypes.object.isRequired
// };
export default MovieDetails;
