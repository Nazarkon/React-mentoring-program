describe('MovieListPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display a list of movies', () => {
    cy.get('.movie-page-film-list').should('have.length.greaterThan', 0);
  });

  it('should filter movies by genre', () => {
    cy.get('.movie-page-film-filter').contains('Fantasy').click();
    cy.get('.movie-page-film-list').each((card) => {
      cy.wrap(card).should('include.text', 'Fantasy');
    });
  });

  it('should search movies by title', () => {
    cy.get('.search-input').type('Fifty Shades');
    cy.get('.search-button').first().click();
    cy.get('.movie-card-container').should(
      'include.text',
      'Fifty Shades Freed',
    );
  });

  it('should search movies by genre', () => {
    cy.get('.search-input').type('Fantasy');
    cy.get('.movie-card-container').should('include.text', 'Fantasy');
  });

  it('should display movie details when a movie card is clicked', () => {
    cy.get('.movie-card-container').first().click();
    cy.get('.movie-details-container').should('be.visible');
  });

  it('should close movie details when the search button is clicked', () => {
    cy.get('.movie-card-container').first().click();
    cy.get('.svg-inline--fa').click();
    cy.get('.search-input').should('be.visible');
  });
  it('Should updates query params when selecting genre', () => {
    cy.visit('http://localhost:3000/?sortBy=title&searchString=Fifty+Shades');

    cy.get('.movie-page-film-filter').contains('Fantasy').click();

    cy.url().should('include', 'genre=');
    cy.url().should('include', 'sortBy=title');
  });
});
