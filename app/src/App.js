import React, { lazy, Suspense } from 'react';
import './App.scss';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MovieDetails = lazy(() => import('./components/MovieDetails/MovieDetails'));
const AddMovieForm = lazy(() => import('./components/AddMovieForm/AddMovieForm'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route
            path="/movie-details/:id"
            name="movieDetails"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetails />
              </Suspense>
            }
          />
          <Route
            path="/new"
            name="addMovieForm"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AddMovieForm />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
