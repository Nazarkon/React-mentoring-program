import React from "react";
import "./MovieCard.scss";
import { createMovieItemsList } from '../../../helpers/MovieItemsHelpers'

const MovieCard = ({ imageUrl, name, year, genreList, handleClick }) => {

    return (
        <div className="movie-card-container" onClick={(e) => handleClick(e)}>
            <div className="movie-card-container-image">
                <img className="movie-card-image" alt="film poster" src={imageUrl}/>
            </div>
            <div className="movie-card-container-title">
                <h4 className="movie-card-title">{name}</h4>
                <p className="movie-card-year">{year}</p>
            </div>
            <span className="movie-card-genres">{createMovieItemsList(genreList)}</span>
        </div>
    )
}

export default MovieCard