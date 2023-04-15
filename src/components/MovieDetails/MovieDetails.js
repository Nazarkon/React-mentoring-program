import React from "react";

import "./MovieDetails.scss"
import { createMovieItemsList } from '../../helpers/MovieItemsHelpers'

const MovieDetails = ({movieInfo}) => {

    if(!movieInfo || !Object.entries(movieInfo).length) {
        return <div className="movie-details-error-container">Not Found</div>
    }


    const { imageUrl, name, year, rating, duration, description, genreList } = movieInfo

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
                        <span className="movie-details-genres">{createMovieItemsList(genreList)}</span>
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