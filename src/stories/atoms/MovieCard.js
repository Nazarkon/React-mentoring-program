import React from "react";
import "../assets/styles/MovieCard.scss";

const MovieCard = ({ imageUrl, name, year, genreList }) => {

    const createListOfGenres = () => {
        if(!genreList || !genreList.length) return '-';

        return genreList.join('&');
    }
    return (
        <div className="movie-card-container">
            <div className="movie-card-container-image">
                <img className="movie-card-image" alt="film poster" src={imageUrl}/>
            </div>
            <div className="movie-card-container-title">
                <h4 className="movie-card-title">{name}</h4>
                <p className="movie-card-year">{year}</p>
            </div>
            <span className="movie-card-genres">{createListOfGenres()}</span>
        </div>
    )
}

export default MovieCard