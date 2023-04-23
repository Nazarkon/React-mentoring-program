/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams, Outlet, useParams } from 'react-router-dom';

// components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchInput from '../SearchInput/SearchInput';
import GenreList from '../GenreList/GenreList';
import SelectFilter from '../SelectFilter/SelectFilter';
import MovieCard from '../MovieCard/MovieCard';
import { isGenreExist } from '../../helpers/MovieItemsHelpers';
import { getMovieList } from '../../api/movie/controller';

// styles
import './MovieListPage.scss';

// mocked data
import genreListData from '../../mock/genreData.json';
import sortByOption from '../../mock/sortByOption.json';

const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortBy: sortByOption[0].value
  });

  const params = useParams();

  const [genre, setSelectedGenre] = useState(genreListData[0]);
  const [movieList, setMovieList] = useState([]);
  const [isMovieDetailsOpen, setMovieDetailsOpen] = useState(false);

  const handleQueryUpdate = (key, value) => {
    setSearchParams((prevParams) => {
      prevParams.set(key, value);
      return prevParams;
    });
  };

  const filterMovieByGenre = (genre) => {
    setSelectedGenre(genre);
    searchParams.delete('searchString');
    handleQueryUpdate('genre', genre.name);
  };

  const sortMovie = (type) => {
    handleQueryUpdate('sortBy', type);
  };

  const searchMovieByTitleOrGenre = (searchString) => {
    if (isGenreExist(searchString)) {
      setSelectedGenre({ id: searchString.toLowerCase(), name: searchString, is_active: true });
    }

    if (!isGenreExist(searchString)) {
      setSelectedGenre({ id: 'all', name: 'All', is_active: true });
    }
    searchParams.delete('genre');
    handleQueryUpdate('searchString', searchString);
  };

  const selectMovieDetailsInfo = (id) => {
    setMovieDetailsOpen(true);
  };

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const searchParamsFromUrl = {
      ...searchParams,
      ...Object.fromEntries(searchParams.entries())
    };

    if (params.id) {
      setMovieDetailsOpen(true);
    }
    setSelectedGenre({
      id: searchParams.get('genre'),
      name: searchParams.get('genre'),
      is_active: false
    });

    getMovieList(searchParamsFromUrl, ourRequest)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ourRequest.cancel();
    };
  }, [searchParams]);

  return (
    <>
      <Header
        isMovieDetailsOpen={isMovieDetailsOpen}
        handleClose={() => setMovieDetailsOpen(false)}
      />
      <div className="movie-page-container">
        <div
          className={
            isMovieDetailsOpen
              ? 'movie-page-search-color-background'
              : 'movie-page-search-image-background'
          }
        >
          {isMovieDetailsOpen ? (
            // <MovieDetails movieInfo={selectedMovie} />
            <Outlet />
          ) : (
            <SearchInput
              onSearch={searchMovieByTitleOrGenre}
              defaultValue={searchParams.get('searchString')}
            />
          )}
        </div>
        <div className="movie-page-film-filter">
          <GenreList
            genreList={genreListData}
            currentItem={genre}
            updateList={filterMovieByGenre}
          />
          <SelectFilter
            filterOptions={sortByOption}
            currentSelectedType={searchParams.get('sortBy')}
            onChange={sortMovie}
          />
        </div>
        <div className="movie-page-film-counter">
          <strong>{movieList.length}</strong> movies found
        </div>
        <div className="movie-page-film-list">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              name={movie.title}
              year={movie.release_date}
              genreList={movie.genres}
              handleClick={selectMovieDetailsInfo}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieListPage;
