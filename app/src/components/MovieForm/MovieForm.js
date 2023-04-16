import React from 'react';
import PropTypes from 'prop-types';

import './MovieForm.scss';

import genreList from '../../mock/genreListData.json';

const MovieForm = ({ movieInfo, handleSubmit }) => {
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    console.log(data, 'data');
    handleSubmit(data);
  };

  const handleFormReset = (event) => {
    event.preventDefault();
    event.target.form.reset();
    console.log('reset');
    handleSubmit();
  };

  return (
    <form className="movie-form-container" onSubmit={handleSubmitForm}>
      <div className="movie-form-container-input">
        <label className="movie-form-label-container movie-form-label-main">
          <span className="movie-form-label-title">TITLE</span>
          <input
            className="movie-form-label-input"
            id="title"
            name="title"
            type="text"
            placeholder="Provide title"
            defaultValue={movieInfo.title}
          />
        </label>
        <label className="movie-form-label-container-second">
          <span className="movie-form-label-title">Date:</span>
          <input
            className="movie-form-label-input-second"
            id="date"
            type="date"
            name="date"
            placeholder="Select Date"
            defaultValue={movieInfo.releaseDate}
          />
        </label>
      </div>
      <div className="movie-form-container-input">
        <label className="movie-form-label-container movie-form-label-main">
          <span className="movie-form-label-title">MOVIE URL</span>
          <input
            className="movie-form-label-input"
            type="text"
            id="movieURL"
            name="movieURL"
            placeholder="https://"
            defaultValue={movieInfo.movieURL}
          />
        </label>
        <label className="movie-form-label-container">
          <span className="movie-form-label-title">RATING</span>
          <input
            className="movie-form-label-input-second"
            type="text"
            id="movieRating"
            name="movieRating"
            placeholder="0.0"
            defaultValue={movieInfo.movieRating}
          />
        </label>
      </div>
      <div className="movie-form-container-input">
        <label className="movie-form-label-container movie-form-label-main">
          <span className="movie-form-label-title">GENRE</span>
          <select
            className="movie-form-label-input"
            id="genre"
            name="genre"
            defaultValue={movieInfo.genre}
          >
            {genreList.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <label className="movie-form-label-container">
          <span className="movie-form-label-title">RUNTIME</span>
          <input
            className="movie-form-label-input-second"
            type="text"
            name="runtime"
            id="runtime"
            placeholder="min"
            defaultValue={movieInfo.runtime}
          />
        </label>
      </div>
      <label className="movie-form-label-container">
        <span className="movie-form-label-title">OVERVIEW</span>
        <textarea
          id="overview"
          name="overview"
          className="movie-form-label-textarea"
          defaultValue={movieInfo.overview}
          placeholder="Movie description"
        />
      </label>
      <div className="movie-form-container-buttons">
        <button
          className="movie-form-container-button-cancel"
          type="reset"
          onClick={handleFormReset}
        >
          Cancel
        </button>
        <button className="movie-form-container-button-submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

MovieForm.propTypes = {
  movieInfo: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default MovieForm;

MovieForm.defaultProps = {
  movieInfo: {
    title: '',
    releaseDate: '',
    movieURL: '',
    movieRating: '',
    genre: '',
    runtime: '',
    overview: ''
  }
};
