import GenreList from "../../src/stories/components/GenreList/GenreList";
import genreList from "../../src/mock/genreData.json"

describe('GenreList', () => {
    let component;

    beforeEach(() => {
        // This code will run before each test case
        component = cy.mount(<GenreList genreList={genreList} currentItem={genreList[0]}/>)
    })

    it('Should displays genre list', () => {
        cy.get('.list-container').should('have.length', 1);
        cy.get('.list-container li').should('have.length', genreList.length);
        genreList.forEach((genre) => {
          cy.get('.list-container li')
            .contains(genre.name)
            .should('be.visible');
        });
      });
})