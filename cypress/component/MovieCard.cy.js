import MovieCard from "../../src/stories/atoms/MovieCard";

describe('MovieCard', () => {
    const imageUrl = 'Bitmap.png';
    const name = 'Pulp Fiction';
    const year = '2003';
    const genreList = ['Action', 'Adventure'];
  
    beforeEach(() => {
      cy.mount(
        <MovieCard
          imageUrl={imageUrl}
          name={name}
          year={year}
          genreList={genreList}
        />
      );
    });
  
    it('Should displays the movie name and year', () => {
      cy.contains('.movie-card-title', name);
      cy.contains('.movie-card-year', year);
    });
  
    it('Should displays the movie genres', () => {
      const genres = genreList.join('&');
      cy.contains('.movie-card-genres', genres);
    });
  
    it('Should displays the movie image', () => {
      cy.get('.movie-card-image').should('have.attr', 'src', imageUrl);
    });
  });