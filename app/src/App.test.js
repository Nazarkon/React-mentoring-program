import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('Check that all components presented on a page', () => {
  test('Search exist', () => {
    render(<App />);
    const searchTitle = screen.getByText(/FIND YOUR MOVIE/i);
    expect(searchTitle).toBeInTheDocument();
  });

  test('List of items exist', () => {
    render(<App />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});
