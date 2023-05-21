import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useMatch, useParams } from 'react-router-dom';

import Dialog from '../Dialog/Dialog';
import DialogMessage from '../DialogMessages/DialogMessage';
import MovieForm from '../MovieForm/MovieForm';

import {
  editMovie, getMovieListById, addMovie, deleteMovie,
} from '../../api/movie/controller';

function AddMovieForm() {
  const params = useParams();
  const navigate = useNavigate();
  const matchAddMovie = useMatch('/new');
  const matchEditMovie = useMatch(`/edit/${params.id}`);
  const matchDeleteMovie = useMatch(`/delete/${params.id}`);

  const [editMovieData, setEditMovieData] = useState();

  const selectDialogTitle = () => {
    if (matchEditMovie) return 'EDIT MOVIE';
    if (matchDeleteMovie) return 'DELETE MOVIE';
    if (matchAddMovie) return 'ADD MOVIE';
    return '';
  };

  const handleDialogState = () => {
    navigate(-1);
  };

  const selectDialogMessage = () => {
    if (matchDeleteMovie) return 'Are you sure you want to delete this movie?';
    if (matchAddMovie) return 'The movie has been added to database successfully ';
    return '';
  };

  const handleFormSubmit = async (data) => {
    const ourRequest = axios.CancelToken.source();

    if (matchEditMovie) {
      await editMovie(data, ourRequest)
        .then(() => {
          handleDialogState();
        })
        .catch((e) => {
          console.error(e);
        });
    }
    if (matchAddMovie) {
      await addMovie(data, ourRequest)
        .then((result) => {
          const searchParams = new URLSearchParams(document.location.search);
          const sortBy = searchParams.get('sortBy');
          const genre = searchParams.get('genre');
          navigate(`/movie-details/${result.data.id}?sortBy=${sortBy}&genre=${genre}`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    if (matchDeleteMovie) {
      await deleteMovie(params.id, ourRequest)
        .then(() => {
          handleDialogState();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const getMovieById = async () => {
    const ourRequest = axios.CancelToken.source();

    await getMovieListById(params.id, ourRequest)
      .then((result) => {
        const movieObj = result;
        movieObj.id = +params.id;
        setEditMovieData(movieObj);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (!params.id) return;
    getMovieById();
  }, [params.id]);

  return (
    <>
      {editMovieData || matchAddMovie ? (
        <Dialog title={selectDialogTitle()} handleClose={handleDialogState}>
          {matchDeleteMovie ? (
            <DialogMessage
              isDelete={matchDeleteMovie.pathname.includes('delete')}
              title="CONGRATULATIONS !"
              message={selectDialogMessage()}
              buttonText="Confirm"
              handleConfirm={handleFormSubmit}
            />
          ) : (
            <MovieForm
              handleSubmit={handleFormSubmit}
              handleClose={handleDialogState}
              movieInfo={editMovieData}
            />
          )}
        </Dialog>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}

export default AddMovieForm;
