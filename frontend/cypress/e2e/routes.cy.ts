describe("Routes tests", () => {
  it("Visit default page", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get("h1").contains("FilmFellow");
  });

  it("Try to visit 404 page", () => {
    cy.request({ url: "/randompage", failOnStatusCode: false }).its("status").should("equal", 404);
  });
});
