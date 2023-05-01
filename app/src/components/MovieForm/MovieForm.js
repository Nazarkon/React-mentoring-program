import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './MovieForm.scss';

import genreList from '../../mock/genreListData.json';

const MovieForm = ({ movieInfo, handleSubmit }) => {
  const handleSubmitForm = (values) => {
    const movieObj = values;
    if (movieInfo.id) {
      movieObj['id'] = movieInfo.id;
    }
    handleSubmit(movieObj);
  };

  const handleFormReset = () => {
    handleSubmit();
  };

  const initialValue = {
    title: movieInfo.name || '',
    movieURL: movieInfo.imageUrl || '',
    releaseDate: movieInfo.year || '2020-12-29',
    movieRating: movieInfo.rating || 0,
    genre: movieInfo.genreList || '',
    runtime: movieInfo.duration || 0,
    overview: movieInfo.description || ''
  };

  const movieFormSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    movieURL: Yup.string().url('Invalid movie URL').required('Movie URL is required'),
    releaseDate: Yup.date().required('Date required'),
    movieRating: Yup.number()
      .typeError('Rating must be a number')
      .min(0, 'Rating must be at least 0')
      .max(10, 'Rating cannot be more than 10')
      .required('Runtime is required'),
    genre: Yup.string().required('Genre is required'),
    runtime: Yup.number()
      .typeError('Runtime must be a number')
      .integer('Runtime must be a whole number')
      .required('Runtime is required'),
    overview: Yup.string().required('Overview is required')
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={movieFormSchema}
      onSubmit={handleSubmitForm}
    >
      {({ isSubmitting }) => (
        <Form className="movie-form-container">
          <div className="movie-form-container-input">
            <label className="movie-form-label-container movie-form-label-main">
              <span className="movie-form-label-title">TITLE</span>
              <Field
                className="movie-form-label-input"
                id="title"
                name="title"
                type="text"
                placeholder="Provide title"
              />
              <ErrorMessage name="title" component="div" className="movie-form-error-message" />
            </label>
            <label className="movie-form-label-container-second">
              <span className="movie-form-label-title">Date:</span>
              <Field
                className="movie-form-label-input-second"
                id="date"
                type="date"
                name="date"
                placeholder="Select Date"
              />
              <ErrorMessage name="date" component="div" className="movie-form-error-message" />
            </label>
          </div>
          <div className="movie-form-container-input">
            <label className="movie-form-label-container movie-form-label-main">
              <span className="movie-form-label-title">MOVIE URL</span>
              <Field
                className="movie-form-label-input"
                type="text"
                id="movieURL"
                name="movieURL"
                placeholder="https://"
              />
              <ErrorMessage name="movieURL" component="div" className="movie-form-error-message" />
            </label>
            <label className="movie-form-label-container">
              <span className="movie-form-label-title">RATING</span>
              <Field
                className="movie-form-label-input-second"
                type="number"
                id="movieRating"
                name="movieRating"
                placeholder="0.0"
              />
              <ErrorMessage
                name="movieRating"
                component="div"
                className="movie-form-error-message"
              />
            </label>
          </div>
          <div className="movie-form-container-input">
            <label className="movie-form-label-container movie-form-label-main">
              <span className="movie-form-label-title">GENRE</span>
              <Field as="select" className="movie-form-label-input" id="genre" name="genre">
                {genreList.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="genre" component="div" className="movie-form-error-message" />
            </label>
            <label className="movie-form-label-container">
              <span className="movie-form-label-title">RUNTIME</span>
              <Field
                className="movie-form-label-input-second"
                type="number"
                name="runtime"
                id="runtime"
                placeholder="min"
              />
              <ErrorMessage name="runtime" component="div" className="movie-form-error-message" />
            </label>
          </div>
          <label className="movie-form-label-container">
            <span className="movie-form-label-title">OVERVIEW</span>
            <Field
              as="textarea"
              id="overview"
              name="overview"
              className="movie-form-label-textarea"
              placeholder="Movie description"
            />
            <ErrorMessage name="overview" component="div" className="movie-form-error-message" />
          </label>
          <div className="movie-form-container-buttons">
            <button
              className="movie-form-container-button-cancel"
              type="reset"
              onClick={handleFormReset}
            >
              Cancel
            </button>
            <button
              className="movie-form-container-button-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
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
