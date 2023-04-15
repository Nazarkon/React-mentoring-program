import React from "react";

import MovieForm from "./MovieForm";

export default {
    title: 'Components/MovieForm',
    component: MovieForm,
    argTypes: {
        movieInfo: {
            content: 'object',
            default: {}
        },
        handleSubmit: {
            action: "clicked"
        }
    },
}

const mockMovieInfo = {
    title: "Film 1",
    releaseDate: '2023-11-12',
    movieURL: 'https://www.overclockers.ua/',
    movieRating: '12.0',
    genre: 'Comedy',
    runtime: '12h',
    overview: 'Lorem Ipsum'
}

const EmptyFormTemplate = (args) => <MovieForm  {...args} />;

const FillWithData = (args) => <MovieForm movieInfo={mockMovieInfo} handleSubmit={args.handleSubmit}/>

export const EmptyForm = EmptyFormTemplate.bind({});
export const FilledForm = FillWithData.bind({});