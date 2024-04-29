describe("home page tests", () => {
  it("basic home page tests", () => {
    cy.visit("/home");
    cy.url().should("eq", Cypress.env("baseUrl") + "/home");
    cy.wait(500);
    cy.get(".poster-list").should("be.visible");
    cy.get(".dropdown-header").click();
    cy.get(".dropdown-menu").should("be.visible");
    cy.get(".dropdown-menu").contains("War").click();
    cy.wait(1000);
    cy.get(".dropdown").contains("War");
    cy.get(".poster-list").should("be.visible");
  });

  it("test poster link", () => {
    cy.visit("/home");
    cy.url().should("eq", Cypress.env("baseUrl") + "/home");
    cy.wait(1000);
    cy.get(".poster-list > a").eq(1).click();
    cy.wait(500);
    cy.url().should("include", Cypress.env("baseUrl") + "/movies/");
  });

  it("test see all link", () => {
    cy.visit("/home");
    cy.url().should("eq", Cypress.env("baseUrl") + "/home");
    cy.wait(1000);
    cy.get("a").contains("See all").click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/new")
  })
});