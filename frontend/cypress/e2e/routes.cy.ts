describe("Routes tests", () => {
  it("visit default page", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get("h1").contains("FilmFellow");
  });
  it("try to visit 404 page", () => {
    cy.request({ url: "/randompage", failOnStatusCode: false }).its("status").should("equal", 404);
  });
  it("Navigate to defaultpage with navbar", () => {
    cy.visit("/new");
    cy.url().should("eq", Cypress.env("baseUrl") + "/new");
    cy.get('a[href="/"]').click();
    cy.url().should("include", "/");
    cy.get("h1").contains("FilmFellow");
  });
  it("Navigate to new with navbar", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get('a[href="/new"]').click();
    cy.url().should("include", "/new");
    cy.get("h2").contains("New");
  });
  it("Navigate to popular with navbar", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get('a[href="/popular"]').click();
    cy.url().should("include", "/popular");
    cy.get("h2").contains("Popular");
  });
  it("Navigate to bestrated with navbar", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get('a[href="/bestrated"]').click();
    cy.url().should("include", "/bestrated");
    cy.get("h2").contains("Best Rated");
  });
  it("Navigate to login with navbar", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get('a[href="/login"]').click();
    cy.url().should("include", "/login");
    cy.get("h2").contains("Login");
  });
  it("Test navbar input field", () => {
    cy.visit("/");
    cy.get('input[placeholder="Search..."]').type("Jaws");
    cy.get('[data-cy="search-input"]').should("have.value", "Jaws");
  });
});
