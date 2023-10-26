/// <reference types="cypress" />

describe("Login form", () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host')+'/login')
  })

  it("error message for missing username/email", () => {
    cy.get('input[name=usernameOrEmail]').clear();
    cy.get('input[name=password]').type('password{enter}');
    cy.contains('div', 'Please provide either username or email')
      .should('be.visible');
  })  

  it("error message for missing pasword", () => {
    cy.get('input[name=usernameOrEmail]').type('administrator{enter}');
    cy.get('input[name=password]').clear();
    cy.contains('div', 'Please provide the password')
      .should('be.visible');
  })

  it("both error messages for missing username/email and pasword", () => {
    cy.get('input[name=usernameOrEmail]').clear();
    cy.get('input[name=password]').clear();
    cy.contains('button', 'Sign in').click();
    cy.contains('div', 'Please provide either username or email')
      .should('be.visible');
    cy.contains('div', 'Please provide the password')
      .should('be.visible');
  })

  it("forgot password link url is correct", () => {
    cy.contains('a', 'Forgot password?')
      .should('have.attr', 'href', '/password-recovery');
  })
  
  it("non existing user", () => {
    cy.get('input[name=usernameOrEmail]').type((Math.round(Math.random()*10000)).toString());
    cy.get('input[name=password]').type('password');
    cy.contains('button', 'Sign in').click();
    cy.contains('div', 'Login failed')
      .should('be.visible');
    cy.contains('div', 'Provided credentials are not valid')
      .should('be.visible');
  })

  it("email not confirmed", () => {
    cy.get('input[name=usernameOrEmail]').type('nonverified@iggalaxy.com');
    cy.get('input[name=password]').type('password');
    cy.contains('button', 'Sign in').click();
    cy.contains('div', 'E-mail address not confirmed')
      .should('be.visible');
    cy.contains('p', 'Please confirm your email address before attempting to log in.')
      .should('be.visible');
    cy.contains('a', 'request another link')
      .should('have.attr', 'href', '/signup/verify/resend');
  })

  it("successful login via username", () => {
    cy.get('input[name=usernameOrEmail]').type('administrator');
    cy.get('input[name=password]').type('password');
    cy.contains('button', 'Sign in').click();
    cy.contains('h1', 'Tournaments')
      .should('be.visible');
  })

  it("successful login via email", () => {
    cy.get('input[name=usernameOrEmail]').type('admin@iggalaxy.com');
    cy.get('input[name=password]').type('password');
    cy.contains('button', 'Sign in').click();  
  })

  it("sign up button url is correct", () => {
    cy.contains('div', 'New to the IGGalaxy?')
      .click()
      .url()
      .should('eq', Cypress.env('host')+'/signup');
  })
})