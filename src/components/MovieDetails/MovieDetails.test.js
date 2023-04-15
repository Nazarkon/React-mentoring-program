/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import MovieDetails from "./MovieDetails";

describe("MovieDetails component", () => {

    const mockMovieInfo = {
        imageUrl: 'Bitmap.png',
        name: 'Pulp Fiction',
        year: '2003',
        rating: '8.9',
        duration: '2h 34min', 
        description: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra', 
        genreList: ['Action', 'Adventure']
    }

    it("Matches snapshot", () => {
        const { container } = render(
        <MovieDetails 
            movieInfo={mockMovieInfo}
        />);
        expect(container).toMatchSnapshot();
      });
      it("Check that component renders movie information correctly", () => {
        const { getByAltText, getByText } = render(
            <MovieDetails 
            movieInfo={mockMovieInfo}
            />
        );

        expect(getByAltText("film poster")).toHaveAttribute(
            "src",
            "Bitmap.png"
          );
        
        expect(getByText("Pulp Fiction")).toBeInTheDocument();

        expect(getByText("2003")).toBeInTheDocument();

        expect(getByText("Action&Adventure")).toBeInTheDocument();
      })
})