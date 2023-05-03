/* eslint-disable no-unused-vars */
import React, { lazy, Suspense, useState } from 'react';
import axios from 'axios';
import './App.scss';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { getMovieList } from './api/movie/controller';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MovieDetails = lazy(() => import('./components/MovieDetails/MovieDetails'));
const AddMovieForm = lazy(() => import('./components/AddMovieForm/AddMovieForm'));
const SearchInput = lazy(() => import('./components/SearchInput/SearchInput'));

function App() {
  // const [movieList, setMovieList] = useState();
  const [searchParams, setSearchParams] = useState();

  const handleSearch = (searchParamsFromUrl) => {
    setSearchParams(searchParamsFromUrl);
    // const ourRequest = axios.CancelToken.source();

    // getMovieList(searchParamsFromUrl, ourRequest)
    //   .then((data) => {
    //     setMovieList(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // return () => {
    //   ourRequest.cancel();
    // };
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListPage searchParamsURL={searchParams} />}>
          <Route
            path="/"
            name="searchInput"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SearchInput onSearch={handleSearch} />
              </Suspense>
            }
          >
            <Route path="/new" name="addFilm" element={<AddMovieForm />}></Route>
            <Route path="/delete/:id" name="deleteFilm" element={<AddMovieForm />}></Route>
            <Route path="/edit/:id" name="editFilm" element={<AddMovieForm />}></Route>
          </Route>
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
