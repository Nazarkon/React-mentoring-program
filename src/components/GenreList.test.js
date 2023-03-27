import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import GenreList from "./GenreList";
import genreList from "../mock/genreData.json"

describe("Check GenreList element behavior", () => {
    test("Check that component renders all genres passed in props", () => {
        render(<GenreList genreList={genreList} currentItem={genreList[0]}/>)
        genreList.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument()
        })
    })

    test("Check that component highlights a selected genre passed in props", () => {
        const selectedGenre = genreList[0]
        render(<GenreList genreList={genreList} currentItem={selectedGenre}/>)

        const selectedGenreElement = screen.getByText(selectedGenre.name);

        expect(selectedGenreElement).toHaveClass("item-light")
    })

    test("Check that after a click event on a genre button component calls onChange callback and passes correct genre in arguments", () => {
        const selectedGenre = genreList[0]
        const onClick = jest.fn();
        render(<GenreList genreList={genreList} currentItem={selectedGenre} updateList={onClick}/>)

        const genreElement = screen.getByText('Comedy');

        fireEvent.click(genreElement)

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith({"id": "comedy", "is_active": false, "name": "Comedy"});
    })
})