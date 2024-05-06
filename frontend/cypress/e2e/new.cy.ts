describe("new page tests", () => {
  it("check if posters visible", () => {
    cy.visit("/new");
    cy.location("pathname").should("eq", "/new");
    cy.wait(500);
    cy.get(".movie-list").should("be.visible");
  });
});
