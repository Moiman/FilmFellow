describe("popular page tests", () => {
  it("check if posters visible", () => {
    cy.visit("/popular");
    cy.location("pathname").should("eq", "/popular");
    cy.wait(500);
    cy.get(".movie-list").should("be.visible");
  });
});
