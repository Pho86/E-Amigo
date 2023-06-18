
describe('create post, leads to login because test has no account', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('a[href*="createpost"]').first().click()
    cy.url().should('include', '/api/auth/signin')
  })
})

describe('click the post number 20, make sure it redirects to the post, and find a comment, click the comment and make sure it paths to correct user', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('[id$=post20]').click()
    cy.url().should('include', '/post/20')
    cy.get('[id$=comment78] > div > div > a').click()
    cy.url().should('include', '/profile/clfvs1zno0000tfpoxl4ffsdq')
    cy.get('[id$=post23]').click()
    cy.get('a').first().click()
    cy.url().should('include', '/profile/clfvs1zno0000tfpoxl4ffsdq')
  })
})


export { }