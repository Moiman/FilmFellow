describe("popular page tests", () => {
  it("check if posters visible", () => {
    cy.visit("/popular");
    cy.location("pathname").should("eq", "/popular");
    cy.wait(500);
    cy.get(".movie-list > a > img").should("be.visible");
  });

  it("test genre selection", () => {
    cy.visit("/popular");
    cy.location("pathname").should("eq", "/popular");
    cy.get(".movie-list").should("be.visible");
    cy.get(".dropdown-header").click();
    cy.get(".dropdown-menu").should("be.visible");
    cy.get(".dropdown-menu").contains("War").click();
    cy.get(".dropdown").contains("War");
    cy.get(".movie-list").should("be.visible");
  });

  it("test poster link", () => {
    cy.visit("/popular");
    cy.location("pathname").should("eq", "/popular");
    cy.wait(1000);
    cy.get(".movie-list > a").eq(1).click();
    cy.wait(500);
    cy.location("pathname").should("include", "/movies/");
  });
});
