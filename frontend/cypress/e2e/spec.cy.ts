describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
  });
});
