import React, { useState } from "react";

import Dialog from "./Dialog";
import MovieForm from "../MovieForm/MovieForm.js";
import DialogMessage from "../DialogMessages/DialogMessage";

export default {
    title: 'Components/Dialog',
    component: Dialog,
    argTypes: {
        title: {
            control: "text",
            description: "Title of a dialog window"
        },
        handleClick: {
            action: "clicked",
        },
    },
}

const mockedMovieData = {
    title: 'Pulp Fiction',
    releaseDate: '2022-01-01',
    movieURL: 'https://movie-url/example',
    rating: '8.9',
    runtime: '2h 34min', 
    overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra', 
    genre: 'comedy',
}

const TemplateAddMovie = (args) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleSubmit = (data) => {
        console.log(data)
        setIsOpen(!isOpen)
    }
    return (
        <>
        {isOpen && (
            <Dialog  
                title="Add Movie" 
                isOpen={isOpen} 
                handleClose={() => setIsOpen(!isOpen)} 
            >
                <MovieForm  handleSubmit={handleSubmit}/>
            </Dialog>)}
    </>
    );
}
const TemplateEditMovie = (args) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = (data) => {
        console.log(data)
        setIsOpen(!isOpen)
    }

    return (
        <>
        { isOpen && (
        <Dialog  
            title="Edit Movie" 
            handleClose={() => setIsOpen(!isOpen)} 
        >
            <MovieForm  handleSubmit={handleSubmit} movieInfo={mockedMovieData}/>
        </Dialog>
        )}
        </>
    )
}
const TemplateDeleteMovie = (args) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleSubmit = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
        {
            isOpen && (
                <Dialog
                title="DELETE MOVIE" 
                handleClose={() => setIsOpen(!isOpen)}
                >
                    <DialogMessage 
                        message={"Are you sure you want to delete this movie?"}
                        buttonText={'Confirm'}
                        handleConfirm={handleSubmit}
                    />
                </Dialog>
            )
        }
        </>
    )
}

export const AddMovie = TemplateAddMovie.bind({});
export const EditMovie = TemplateEditMovie.bind({});
export const DeleteMovie = TemplateDeleteMovie.bind({});