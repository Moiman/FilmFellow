describe("bestrated page tests", () => {
  it("check if posters visible", () => {
    cy.visit("/bestrated");
    cy.location("pathname").should("eq", "/bestrated");
    cy.wait(500);
    cy.get(".movie-list").should("be.visible");
  });
});
