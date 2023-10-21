/// <reference types="cypress" />

describe("Landing page", () => {
  it("should have all core elements", () => {
    cy.visit(Cypress.env('host'));
    // header nav
    cy.get('a').find('svg')
      .should('be.visible');
    cy.contains('a', 'Home')
      .should('be.visible')
      .and('have.attr', 'href', '/');
    cy.contains('a', 'News')
      .should('be.visible')
      .and('have.attr', 'href', '/news');
    cy.contains('a', 'Log In')
      .should('be.visible')
      .and('have.attr', 'href', '/login');
    cy.contains('a', 'Sign Up')
      .should('be.visible')
      .and('have.attr', 'href', '/signup');
    // header
    cy.get('[data-cy=aut-l-header-title]')
      .should('be.visible')
      .and('have.text', 'Embrace the Unexpected.Unite the Unknown.');
    cy.get('[data-cy=aut-b-sign-up]')
      .should('be.visible')
      .and('have.attr', 'href', '/signup');
    cy.get('[data-cy=aut-b-learn-more]')
      .should('be.visible');
    cy.get('[data-cy=aut-b-log-in]')
      .should('be.visible')
      .and('have.attr', 'href', '/login');
    // beta
    cy.get('[data-cy=aut-a-beta-bullets]')
      .should('be.visible');
    cy.get('[data-cy=aut-l-beta-header]')
      .should('be.visible')
      .and('have.text', 'Exclusive Access to our Beta Platform');
    cy.get('[data-cy=aut-b-beta-sign-up]')
      .should('be.visible')
      .and('have.attr', 'href', '/signup');
    // alpha
    cy.get('[data-cy=aut-l-alpha-header]')
      .should('be.visible')
      .and('have.text', 'Alpha Launch Initiated');
    cy.get('[data-cy=aut-l-alpha-subheader]')
      .should('be.visible')
      .and('have.text', 'Build your profile as a Galactican to participate in tournaments, challenge friends and be part of our valued community.')
    cy.get('[data-cy=aut-a-alpha-image]')
      .should('be.visible');
    // barriers
    cy.get('[data-cy=aut-l-barriers-header]')
      .should('be.visible')
      .and('have.text', 'The Barriers');
    cy.get('[data-cy=aut-a-barriers-bullets]')
      .should('be.visible');
    // solution
    cy.get('[data-cy=aut-l-solution-header]')
      .should('be.visible')
      .and('have.text', 'The Solution');
    cy.get('[data-cy=aut-a-solution-bullets]')
      .should('be.visible');
    // news
    cy.get('[data-cy=aut-l-latest-news-header]')
      .should('be.visible')
      .and('have.text', 'Latest News');
    cy.get('[data-cy=aut-b-view-all-news]')
      .should('be.visible')
      .and('have.attr', 'href', '/news');
    // community
    cy.get('[data-cy=aut-l-sign-up-header]')
      .should('be.visible')
      .and('have.text', 'Join our Community');
    cy.get('[data-cy=aut-l-sign-up-subheader]')
      .should('be.visible')
      .and('have.text', `Build a profile of victories over your opponents in various games.`);
    cy.get('[data-cy=aut-b-community-sign-up]')
      .should('be.visible')
      .and('have.attr', 'href', '/signup');
  })
})

describe("Core scenarios", () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host')+'/');
  })

  it("search for a player and send invite to join the team", () => {
    cy.login('teamOwner', 'password');
    cy.visit(Cypress.env('host')+'/');
    cy.get('[data-cy=aut-b-header-user]')
      .should('be.visible');
    cy.get('[data-cy=aut-b-my-team]').click();
    cy.get('[data-cy=aut-b-search-players]').click();
    cy.get('[data-cy=aut-b-invite-to-join]')
      .should('have.length.greaterThan', 1);
    cy.get('[data-cy=aut-i-search]').type('OtherPlayer4');
    cy.get('[data-cy=aut-b-invite-to-join]')
      .should('have.length', 1);
    cy.get('[data-cy=aut-b-invite-to-join]').click()
      .should('have.text', 'Invite has been issued!')
    cy.logout();
  })

  it("accept pending invite to join the team", () => {
    cy.login('otherPlayer4', 'password');
    cy.visit(Cypress.env('host')+'/');
    cy.get('[data-cy=aut-b-header-user]')
      .should('be.visible')
      .click();
    cy.get('[data-cy=aut-b-teams]')
      .should('be.visible');
    cy.get('[data-cy=aut-b-my-team-offers]').click();
    cy.contains('button', 'Accept')
      .should('have.length.greaterThan', 0)
      .click({force:true});
    cy.get('[data-cy=aut-b-my-team]')
      .should('be.visible');
    cy.logout();
  })

  it("leave the team", () => {
    cy.login('otherPlayer4', 'password');
    cy.visit(Cypress.env('host')+'/');
    cy.get('[data-cy=aut-b-my-team]')
      .should('be.visible')
      .click();
    cy.get('[data-cy=aut-b-more-options]').click();
    cy.get('[data-cy=aut-b-leave-team]').click();
    cy.contains('div', 'Are you sure you want to leave the team?')
      .should('be.visible');
    cy.contains('button', 'Cancel')
      .should('be.visible');
    cy.contains('button', 'Leave Team')
      .should('be.visible')
      .click();
    cy.url()
      .should('eq', Cypress.env('host')+'/');
    cy.get('[data-cy=aut-b-teams]')
      .should('be.visible');
    cy.logout();
  })
})