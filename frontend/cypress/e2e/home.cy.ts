describe("home page tests", () => {
  it("basic home page tests", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get(".movie-list").should("be.visible");
    cy.get(".dropdown-header").click();
    cy.get(".dropdown-menu").should("be.visible");
    cy.get(".dropdown-menu").contains("War").click();
    cy.get(".dropdown").contains("War");
    cy.get(".movie-list").should("be.visible");
  });

  it("test poster link", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get(".movie-list > a").eq(1).click();
    cy.location("pathname").should("include", "/movies/");
  });

  it("test see all link", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("a").contains("See all").click();
    cy.location("pathname").should("eq", "/new");
  });
});
