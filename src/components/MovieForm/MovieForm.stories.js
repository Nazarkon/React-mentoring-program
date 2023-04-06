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
            action: "clicked",
        },
        handleCancel: {
            action: "clicked"
        }
    },
}

const Template = (args) => <MovieForm  {...args} />;

export const Default = Template.bind({});