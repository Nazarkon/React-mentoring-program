import React, { useState, useEffect } from "react";

import "./MovieForm.scss"

import genreList from '../../mock/genreListData.json'

const MovieForm = ({movieInfo , handleSubmit, handleCancel}) => {


        const [title, setTitle] = useState(movieInfo?.title || '');
        const [releaseDate, setReleaseDate] = useState(movieInfo?.releaseDate || '');
        const [movieURL, setMovieURL] = useState(movieInfo?.movieURL || '');
        const [rating, setRating] = useState(movieInfo?.rating || '');
        const [genre, setGenre] = useState(movieInfo?.genre || 'default');
        const [runtime, setRuntime] = useState(movieInfo?.runtime || '');
        const [overview, setOverview] = useState(movieInfo?.overview || '');
        const [formValid, setFormValid] = useState(false);

        useEffect(() => {
            if (
              title !== "" &&
              releaseDate !== "" &&
              movieURL !== "" &&
              rating !== "" &&
              genre !== "default" &&
              runtime !== "" &&
              overview !== ""
            ) {
              setFormValid(true);
            } else {
              setFormValid(false);
            }
          }, [title, releaseDate, movieURL, rating, genre, runtime, overview]);


          const submitForm = (event) => {
            event.preventDefault();
            const formData = {
              title: title,
              releaseDate: releaseDate,
              movieURL: movieURL,
              rating: rating,
              genre: genre,
              runtime: runtime,
              overview: overview
            };
            console.log(formData, 'formData')
            handleSubmit(formData);
          }
        

    return (
        <form className="movie-form-container" onSubmit={(event) => submitForm(event)}>
            <div className="movie-form-container-input">
                <label className="movie-form-label-container movie-form-label-main">
                    <span className="movie-form-label-title">TITLE</span>
                    <input
                    className="movie-form-label-input"
                    type="text"
                    placeholder="Provide title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    />
                </label>
                <label className="movie-form-label-container-second">
                <span className="movie-form-label-title">Date:</span>
                    <input
                    className="movie-form-label-input-second"
                    type="date"
                    placeholder="Select Date"
                    value={releaseDate}
                    onChange={(event) => setReleaseDate(event.target.value)}
                    />
                </label>
            </div>
            <div className="movie-form-container-input">
                <label className="movie-form-label-container movie-form-label-main">
                <span className="movie-form-label-title">MOVIE URL</span>
                    <input
                    className="movie-form-label-input"
                    type="text"
                    placeholder="https://"
                    value={movieURL}
                    onChange={(event) => setMovieURL(event.target.value)}
                    />
                </label>
                <label className="movie-form-label-container">
                <span className="movie-form-label-title">RATING</span>
                    <input
                    className="movie-form-label-input-second"
                    type="text"
                    placeholder="0.0"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    />
                </label>
            </div>
            <div className="movie-form-container-input">
                <label className="movie-form-label-container movie-form-label-main">
                <span className="movie-form-label-title">GENRE</span>
                    <select className="movie-form-label-input" value={genre} onChange={(event) => setGenre(event.target.value)}>
                    {genreList.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                    </select>
                </label>
                <label className="movie-form-label-container">
                <span className="movie-form-label-title">RUNTIME</span>
                    <input
                    className="movie-form-label-input-second"
                    type="text"
                    placeholder="min"
                    value={runtime}
                    onChange={(event) => setRuntime(event.target.value)}
                    />
                </label>
            </div>
                <label className="movie-form-label-container">
                <span className="movie-form-label-title">OVERVIEW</span>
                    <textarea
                    className="movie-form-label-textarea"
                    value={overview}
                    placeholder="Movie description"
                    onChange={(event) => setOverview(event.target.value)}
                    />
                </label>
                <div className="movie-form-container-buttons">
                    <button
                        onClick={handleCancel}
                        className="movie-form-container-button-cancel" 
                        type="button"
                    >Cancel</button>
                    <button
                        disabled={!formValid}
                        className="movie-form-container-button-submit"
                        type="submit"
                    >Submit</button>
                </div>
        </form>
    )
}

export default MovieForm