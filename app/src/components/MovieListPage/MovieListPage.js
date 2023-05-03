/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  useSearchParams,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  useMatch
} from 'react-router-dom';

// components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GenreList from '../GenreList/GenreList';
import SelectFilter from '../SelectFilter/SelectFilter';
import MovieCard from '../MovieCard/MovieCard';
import { getMovieList } from '../../api/movie/controller';

// styles
import './MovieListPage.scss';

// mocked data
import genreListData from '../../mock/genreData.json';
import sortByOption from '../../mock/sortByOption.json';

const MovieListPage = ({ searchParamsURL }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortBy: sortByOption[0].value
  });

  const location = useLocation();

  const navigate = useNavigate();

  const params = useParams();

  const matchMovieDetails = useMatch(`/movie-details/${params.id}`);

  const [genre, setSelectedGenre] = useState(genreListData[0]);
  const [movieList, setMovieList] = useState([]);

  const handleNavigationEdit = async (id) => {
    navigate(`/edit/${id}${location.search}`);
  };
  const handleNavigationDelete = (id) => {
    navigate(`/delete/${id}${location.search}`);
  };
  const handleNavigationAddMovie = () => {
    navigate(`/new${location.search}`);
  };

  const [navigationList] = useState([
    {
      id: '1',
      name: 'Edit',
      action: handleNavigationEdit
    },
    {
      id: '2',
      name: 'Delete',
      action: handleNavigationDelete
    }
  ]);

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

  useEffect(() => {
    if (searchParamsURL) {
      setSearchParams(searchParamsURL);
    }
  }, [searchParamsURL]);

  useEffect(() => {
    if (!searchParams.get('genre')) {
      handleQueryUpdate('genre', 'all');
    }
  }, []);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const searchParamsFromUrl = {
      ...searchParams,
      ...Object.fromEntries(searchParams.entries())
    };

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
      <Header handleClick={handleNavigationAddMovie} />
      <div className="movie-page-container">
        <div
          className={
            matchMovieDetails
              ? 'movie-page-search-color-background'
              : 'movie-page-search-image-background'
          }
        >
          <Outlet />
        </div>
        <div>
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
                navigationList={navigationList}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieListPage;
