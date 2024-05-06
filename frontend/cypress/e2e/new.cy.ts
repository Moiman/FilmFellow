describe("new page tests", () => {
  it("check if posters visible", () => {
    cy.visit("/new");
    cy.location("pathname").should("eq", "/new");
    cy.wait(500);
    cy.get(".movie-list > a > img").should("be.visible");
  });

  it("test poster link", () => {
    cy.visit("/new");
    cy.location("pathname").should("eq", "/new");
    cy.wait(1000);
    cy.get(".movie-list > a").eq(1).click();
    cy.wait(500);
    cy.location("pathname").should("include", "/movies/");
  });
});
