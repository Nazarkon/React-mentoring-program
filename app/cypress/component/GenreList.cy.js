/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import GenreList from '../../src/components/GenreList/GenreList';
import genreList from '../../src/mock/genreData.json';

describe('GenreList', () => {
  let component;

  beforeEach(() => {
    // This code will run before each test case
    component = cy.mount(<GenreList genreList={genreList} currentItem={genreList[0]} />);
  });

  it('Should displays genre list', () => {
    cy.get('.list-container').should('have.length', 1);
    cy.get('.list-container li').should('have.length', genreList.length);

    const capitalizeLetter = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
    genreList.forEach((genre) => {
      cy.get('.list-container li').contains(capitalizeLetter(genre.name)).should('be.visible');
    });
  });
});