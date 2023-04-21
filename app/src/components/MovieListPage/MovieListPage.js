/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useDebugValue } from 'react';
import axios from 'axios';

// components
import Header from '../Header/Header';
import SearchInput from '../SearchInput/SearchInput';
import GenreList from '../GenreList/GenreList';
import SelectFilter from '../SelectFilter/SelectFilter';
import MovieCard from '../MovieCard/MovieCard';
import MovieDetails from '../MovieDetails/MovieDetails';
import { isGenreExist } from '../../helpers/MovieItemsHelpers';
import { getMovieList, getMovieListById } from '../../api/movie/controller';

// styles
import './MovieListPage.scss';

// mocked data
import genreListData from '../../mock/genreData.json';
import sortByOption from '../../mock/sortByOption.json';

const MovieListPage = () => {
  const [genre, setSelectedGenre] = useState(genreListData[0]);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isMovieDetailsOpen, setMovieDetailsOpen] = useState(false);
  const [queryPayload, setQueryPayload] = useState({
    sortBy: sortByOption[0].value,
    filter: '',
    searchBy: '',
    searchString: ''
  });

  const handleQueryUpdate = (key, value) => {
    setQueryPayload((prevPayload) => ({
      ...prevPayload,
      [key]: value
    }));
  };

  const filterMovieByGenre = (genre) => {
    console.log(genre);
    setSelectedGenre(genre);
    handleQueryUpdate('genre', genre);
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
    handleQueryUpdate('genre', '');
    handleQueryUpdate('searchString', searchString);
  };

  const selectMovieDetailsInfo = (id) => {
    getMovieListById(id)
      .then((data) => {
        setSelectedMovie(data);
        setMovieDetailsOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    getMovieList(queryPayload, ourRequest)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      ourRequest.cancel();
    };
  }, [queryPayload]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    getMovieList(queryPayload, ourRequest)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <MovieDetails movieInfo={selectedMovie} />
          ) : (
            <SearchInput
              onSearch={searchMovieByTitleOrGenre}
              defaultValue={queryPayload.searchString}
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
            currentSelectedType={queryPayload.sortBy}
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
    </>
  );
};

export default MovieListPage;
