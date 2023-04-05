/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import MovieCard from "./MovieCard";


describe("MovieCard component", () => {

    const mockData = {
        image: 'Bitmap.png',
        name: 'Pulp Fiction',
        year: '2003',
        genreList: ["Action", "Adventure"]
    }

    it("matches snapshot", () => {
        const { container } = render(
        <MovieCard 
            imageUrl={mockData.image}
            name={mockData.name} 
            year={mockData.year} 
            genreList={mockData.genreList}
        />);
        expect(container).toMatchSnapshot();
      });
    it("Check that component renders movie information correctly", () => {
        const { getByAltText, getByText } = render(
            <MovieCard 
            imageUrl={mockData.image}
            name={mockData.name} 
            year={mockData.year} 
            genreList={mockData.genreList}
        />
        );

        expect(getByAltText("film poster")).toHaveAttribute(
            "src",
            "Bitmap.png"
          );
        
        expect(getByText("Pulp Fiction")).toBeInTheDocument();

        expect(getByText("2003")).toBeInTheDocument();

        expect(getByText("Action&Adventure")).toBeInTheDocument();
        
    });
});