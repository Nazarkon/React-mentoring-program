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

// styles
import './MovieListPage.scss';

// mocked data
import genreListData from '../../mock/genreData.json';
import sortByOption from '../../mock/sortByOption.json';
import listOfGenres from '../../mock/mockOfAllAvailableGenre.json';

const client = axios.create({
  baseURL: 'http://localhost:4000/movies'
});

const MovieListPage = () => {
  const [genre, setSelectedGenre] = useState(genreListData[0]);
  const [sortType, setSortType] = useState(sortByOption[0].value);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isMovieDetailsOpen, setMovieDetailsOpen] = useState(false);

  const getMovieList = (params) => {
    return new Promise((resolve, reject) => {
      client
        .get('/', { params })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const filterMovieByGenre = async (genre) => {
    setSelectedGenre(genre);
    const params = {};
    if (genre.id !== 'all') {
      params.filter = genre.name;
    }
    getMovieList(params)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortMovie = (type) => {
    setSortType(type);
    const params = {
      sortBy: type
    };

    getMovieList(params)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchMovieByTitleOrGenre = (searchString) => {
    setCurrentSearchValue(searchString);
    const params = {};
    const isSearchByGenre = listOfGenres.includes(searchString.toLowerCase());
    if (isSearchByGenre) {
      params.searchBy = 'genres';
      params.search = searchString;
    }

    if (!isSearchByGenre) {
      params.searchBy = 'title';
      params.search = searchString;
    }

    getMovieList(params)
      .then((data) => {
        setMovieList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const selectMovieDetailsInfo = (id) => {
    getMovieById(id)
      .then((data) => {
        const { poster_path, title, release_date, vote_average, runtime, overview, genres } = data;
        const movieObject = {
          imageUrl: poster_path,
          name: title,
          year: release_date,
          rating: vote_average,
          duration: runtime,
          description: overview,
          genreList: genres
        };
        setSelectedMovie(movieObject);
        setMovieDetailsOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovieList()
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
            <SearchInput onSearch={searchMovieByTitleOrGenre} defaultValue={currentSearchValue} />
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
            currentSelectedType={sortType}
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
