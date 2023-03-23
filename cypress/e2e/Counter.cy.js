describe('Counter element behavior', () => {
  it('loading passes', () => {
    cy.visit('http://localhost:3000/')
  })
  it('Counter value should be equal 2', () => {
    cy.visit('http://localhost:3000/').get('h1').contains('Count: 2');
  })
  it('Counter value should be decrement by 1', () => {
    cy.visit('http://localhost:3000/')
    .get('div')
    .contains('Decrement')
    .click()
    .get('h1')
    .contains('Count: 1')
  })
  it('Counter value should be increment by 1', () => {
    cy.visit('http://localhost:3000/')
    .get('div')
    .contains('Increment')
    .click()
    .get('h1')
    .contains('Count: 3')
  })
})