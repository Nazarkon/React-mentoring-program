/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './MovieForm';
import '@testing-library/jest-dom'

describe('MovieForm', () => {
  const handleSubmitMock = jest.fn();
  const handleCancelMock = jest.fn();
  const movieInfo = {
    title: 'The Matrix',
    releaseDate: '1999-03-31',
    movieURL: 'https://movie-test/',
    rating: '8.7',
    genre: 'Comedy',
    runtime: '136',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  };

  it("matches snapshot", () => {
    const { container } = render(
      <MovieForm handleSubmit={handleSubmitMock} handleCancel={handleCancelMock} movieInfo={movieInfo} />);
    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    handleSubmitMock.mockClear();
    handleCancelMock.mockClear();
  });

  test('Should renders the form fields', () => {
    const {getByLabelText, getByRole}  =  render(<MovieForm handleSubmit={handleSubmitMock} handleCancel={handleCancelMock} movieInfo={movieInfo} />);
    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/movie url/i)).toBeInTheDocument();
    expect(getByLabelText(/rating/i)).toBeInTheDocument();
    expect(getByLabelText(/genre/i)).toBeInTheDocument();
    expect(getByLabelText(/runtime/i)).toBeInTheDocument();
    expect(getByLabelText(/overview/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('Should submits successfully', async () => {
    const {getByLabelText, getByRole} = render(<MovieForm handleSubmit={handleSubmitMock} handleCancel={handleCancelMock} movieInfo={movieInfo} />);
    userEvent.type(getByLabelText(/title/i), 'Inception');
    userEvent.type(getByLabelText(/date/i), '2010-07-16');
    userEvent.type(getByLabelText(/movie url/i), 'https://movie-test/2');
    userEvent.type(getByLabelText(/rating/i), '8.8');
    userEvent.selectOptions(getByLabelText(/genre/i), 'Comedy');
    userEvent.type(getByLabelText(/runtime/i), '148');
    userEvent.type(getByLabelText(/overview/i), 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.');
    userEvent.click(getByRole('button', { name: /submit/i }));
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('Should clicks cancel button and calls handleCancel', () => {
    const {getByRole} = render(<MovieForm handleSubmit={handleSubmitMock} handleCancel={handleCancelMock} movieInfo={movieInfo} />);
    userEvent.click(getByRole('button', { name: /cancel/i }));
    expect(handleCancelMock).toHaveBeenCalledTimes(1);
  });
});