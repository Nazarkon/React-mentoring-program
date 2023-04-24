/* eslint-disable no-undef */
import Counter from '../../src/components/Counter/Counter';
import React from 'react';

describe('Counter element behavior', () => {
  let component;

  beforeEach(() => {
    // This code will run before each test case
    component = cy.mount(<Counter defaultValue={2} />);
  });
  it('Counter value should be equal 2', () => {
    component.get('h1').contains('Count: 2');
  });
  it('Counter value should be decrement by 1', () => {
    component.get('div').contains('Decrement').click().get('h1').contains('Count: 1');
  });
  it('Counter value should be increment by 1', () => {
    component.get('div').contains('Increment').click().get('h1').contains('Count: 3');
  });
});
