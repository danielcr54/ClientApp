// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (usernameOrEmail, password) => {
  cy.request({
    body: {
      password: password,
      usernameOrEmail: usernameOrEmail
    },
    method: 'POST',
    url: Cypress.env('api_host')+'/auth/login'
  })
  .then((response) => {
    window.localStorage.setItem('session_data', JSON.stringify(response.body));
  })
})

Cypress.Commands.add('logout', () => {
  window.localStorage.clear();
  cy.visit(Cypress.env('host')+'/');
})