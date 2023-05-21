import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './MovieForm';
import '@testing-library/jest-dom';

describe('MovieForm', () => {
  const handleSubmitMock = jest.fn();
  const movieInfo = {
    name: 'The Matrix',
    year: '1999-03-31',
    imageUrl: 'https://movie-test/',
    rating: 8.7,
    genre: 'default',
    duration: 136,
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  };

  it('matches snapshot', () => {
    const { container } = render(
      <MovieForm handleSubmit={handleSubmitMock} movieInfo={movieInfo} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the form with movie info', () => {
    const { getByLabelText } = render(
      <MovieForm movieInfo={movieInfo} handleSubmit={handleSubmitMock} handleClose={() => jest.fn()} />
    );
    expect(getByLabelText('TITLE')).toHaveValue(movieInfo.title);
    expect(getByLabelText('Date:')).toHaveValue(movieInfo.year);
    expect(getByLabelText('MOVIE URL')).toHaveValue(movieInfo.imageUrl);
    expect(getByLabelText('RATING')).toHaveValue(movieInfo.rating);
    expect(getByLabelText('GENRE')).toHaveValue(movieInfo.genre);
    expect(getByLabelText('RUNTIME')).toHaveValue(movieInfo.duration);
    expect(getByLabelText('OVERVIEW')).toHaveValue(movieInfo.description);
  });

  it('Should call handleSubmit with form data when submitted', () => {
    const newMovieInfo = {
    name: 'New The Matrix',
    year: '1345-04-14',
    imageUrl: 'https://movie-test/1',
    rating: 3.5,
    genre: 'default',
    duration: 122,
    description: 'This is a new test movie'
    };
    const { getByLabelText, getByRole } = render(<MovieForm handleSubmit={handleSubmitMock} />);
    const titleInput = getByLabelText('TITLE');
    userEvent.type(titleInput, newMovieInfo.title);
    const dateInput = getByLabelText('Date:');
    userEvent.type(dateInput, newMovieInfo.date);
    const movieURLInput = getByLabelText('MOVIE URL');
    userEvent.type(movieURLInput, newMovieInfo.movieURL);
    const ratingInput = getByLabelText('RATING');
    userEvent.type(ratingInput, newMovieInfo.movieRating);
    const genreSelect = getByLabelText('GENRE');
    userEvent.selectOptions(genreSelect, newMovieInfo.genre);
    const runtimeInput = getByLabelText('RUNTIME');
    userEvent.type(runtimeInput, newMovieInfo.runtime);
    const overviewInput = getByLabelText('OVERVIEW');
    userEvent.type(overviewInput, newMovieInfo.overview);
    const submitButton = getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);
    // expect(handleSubmitMock).toHaveBeenCalled();
  });

  it('Should reset the form when cancel button is clicked', () => {
    const { getByLabelText, getByRole } = render(
      <MovieForm movieInfo={movieInfo} handleSubmit={handleSubmitMock} />
    );
    const titleInput = getByLabelText('TITLE');
    userEvent.type(titleInput, 'New Test Movie');
    const cancelButton = getByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);
    expect(titleInput).toHaveValue(movieInfo.title);
  });
});
