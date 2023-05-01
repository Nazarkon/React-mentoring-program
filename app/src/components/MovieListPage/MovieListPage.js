/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSearchParams, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';

// components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchInput from '../SearchInput/SearchInput';
import GenreList from '../GenreList/GenreList';
import SelectFilter from '../SelectFilter/SelectFilter';
import MovieCard from '../MovieCard/MovieCard';
import Dialog from '../Dialog/Dialog';
import DialogMessage from '../DialogMessages/DialogMessage';
import MovieForm from '../MovieForm/MovieForm';
import { isGenreExist } from '../../helpers/MovieItemsHelpers';
import {
  getMovieList,
  addMovie,
  deleteMovie,
  getMovieListById,
  editMovie
} from '../../api/movie/controller';

// styles
import './MovieListPage.scss';

// mocked data
import genreListData from '../../mock/genreData.json';
import sortByOption from '../../mock/sortByOption.json';

const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortBy: sortByOption[0].value
  });

  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const [genre, setSelectedGenre] = useState(genreListData[0]);
  const [movieList, setMovieList] = useState([]);
  const [isMovieDetailsOpen, setMovieDetailsOpen] = useState(false);
  const [isNewMovieListOpen, setNewMovieListOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [editMovieData, setEditMovieData] = useState({});

  const handleEdit = (id) => {
    const ourRequest = axios.CancelToken.source();
    getMovieListById(id, ourRequest)
      .then((result) => {
        const movieObj = result;
        movieObj['id'] = id;
        setEditMovieData(movieObj);
        setIsEditDialog(!isEditDialog);
        setIsDialogOpen(!isDialogOpen);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const handleDelete = (id) => {
    setIsEditDialog(false);
    setIsDeleteDialog(true);
    setIsDialogOpen(!isDialogOpen);
    handleDialogConfirm(id);
  };

  const handleDialogConfirm = async (id) => {
    const ourRequest = axios.CancelToken.source();
    await deleteMovie(id, ourRequest)
      .then(() => {
        console.log('DELETED');
        setIsDialogOpen(!isDialogOpen);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleFormSubmit = async (data) => {
    const ourRequest = axios.CancelToken.source();
    if (!data) {
      setIsDialogOpen(!isDialogOpen);
    }

    if (isEditDialog) {
      await editMovie(data, ourRequest)
        .then((result) => {
          setIsEditDialog(!isEditDialog);
          setIsDialogOpen(!isDialogOpen);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    if (!isEditDialog) {
      await addMovie(data, ourRequest)
        .then((result) => {
          setIsDialogOpen(!isDialogOpen);
          navigate(`/movie-details/${result.data.id}`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const [navigationList] = useState([
    {
      id: '1',
      name: 'Edit',
      action: handleEdit
    },
    {
      id: '2',
      name: 'Delete',
      action: handleDelete
    }
  ]);

  const handleQueryUpdate = (key, value) => {
    setSearchParams((prevParams) => {
      prevParams.set(key, value);
      return prevParams;
    });
  };

  const handleDialogState = () => {
    setIsDialogOpen(!isDialogOpen);
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
      handleQueryUpdate('genre', searchString.toLowerCase());
      setSelectedGenre({ id: searchString.toLowerCase(), name: searchString, is_active: true });
    }

    if (!isGenreExist(searchString)) {
      setSelectedGenre({ id: 'all', name: 'All', is_active: true });
    }
    handleQueryUpdate('searchString', searchString);
  };

  const selectDialogTitle = () => {
    if (isEditDialog) return 'EDIT MOVIE';
    if (isDeleteDialog) return 'DELETE MOVIE';
    if (!isDeleteDialog) return 'ADD MOVIE';
  };
  const selectDialogMMessage = () => {
    if (isDeleteDialog) return 'Are you sure you want to delete this movie?';
    if (!isDeleteDialog) return 'The movie has been added to database successfully ';
  };

  useEffect(() => {
    if (location.pathname.includes('new')) setNewMovieListOpen(true);
    if (!location.pathname.includes('new')) setNewMovieListOpen(false);
  }, [location]);

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
      {isDialogOpen && (
        <Dialog title={selectDialogTitle()} handleClose={handleDialogState}>
          {isDeleteDialog ? (
            <DialogMessage
              isDelete={isDeleteDialog}
              title={'CONGRATULATIONS !'}
              message={selectDialogMMessage()}
              buttonText={'Confirm'}
              handleConfirm={() => {
                setIsDeleteDialog(false);
                setIsDialogOpen(!isDialogOpen);
              }}
            />
          ) : (
            <MovieForm handleSubmit={handleFormSubmit} movieInfo={editMovieData} />
          )}
        </Dialog>
      )}
      <Header
        isMovieDetailsOpen={isMovieDetailsOpen}
        handleClose={() => setMovieDetailsOpen(false)}
        handleClick={handleDialogState}
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
            <Outlet />
          ) : (
            <SearchInput
              onSearch={searchMovieByTitleOrGenre}
              defaultValue={searchParams.get('searchString')}
            />
          )}
        </div>
        <div>
          {isNewMovieListOpen ? null : (
            <>
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
                    handleClick={() => setMovieDetailsOpen(true)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieListPage;
