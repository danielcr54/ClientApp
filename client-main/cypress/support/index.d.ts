/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Saves access-token in local storage to auth the user
     * @example
     * cy.login('administartor','password')
     */
    login(usernameOrPassword: string, password: string): Chainable<any>

    /**
     * Clear window.localStorage and go to HomePage
     * @example
     * cy.logout()
     */
    logout(): Chainable<any>
  }
}