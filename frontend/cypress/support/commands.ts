/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add("login", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");
      cy.get('input[name="email"]').type(email, { force: true });
      cy.get('input[name="password"]').type(password, { force: true });
      cy.get('button[type="submit"]').click({ force: true });
      cy.wait(1000);
      cy.location("pathname").should("eq", "/");
    },
    {
      validate() {
        cy.request("/api/auth/session").then(res => {
          expect(res.body.user?.email).to.eq(email);
        });
      },
    },
  );
});

Cypress.Commands.add("register", (email, password) => {
  cy.visit("/register");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="username"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("deleteUser", (email, password) => {
  cy.login(email, password);
  cy.request({
    method: "DELETE",
    url: "/api/users/delete",
  });
  cy.then(Cypress.session.clearAllSavedSessions);
});

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
    register(email: string, password: string): void;
    deleteUser(email: string, password: string): void;
  }
}
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
