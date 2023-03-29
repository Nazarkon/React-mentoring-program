import React from "react";

import "../assets/styles/MovieDetails.scss"

const MovieDetails = ({movieInfo}) => {

    const { imageUrl, name, year, rating, duration, description, genreList } = movieInfo

    const createListOfGenres = () => {
        if(!genreList || !genreList.length) return '-';

        return genreList.join('&');
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-container-image">
                <img className="movie-card-image" alt="film poster" src={imageUrl}/>
            </div>
                <div className="movie-details-container-description">
                    <div className="movie-details-description-title">
                        <h4 className="movie-details-name">{name}</h4>
                        <span className="movie-details-rating">{rating}</span>
                    </div>
                        <span className="movie-details-genres">{createListOfGenres()}</span>
                    <div className="movie-details-container-subtitle">
                        <span className="movie-details-year">{year}</span>
                        <span className="movie-details-duration">{duration}</span>
                    </div>
                    <p className="movie-details-description">{description}</p>
                </div>
        </div>
    )
}

export default MovieDetails