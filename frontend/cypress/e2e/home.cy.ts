describe("home page tests", () => {
  it("basic home page tests", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
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
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.wait(1000);
    cy.get(".poster-list > a").eq(1).click();
    cy.wait(500);
    cy.location("pathname").should("eq", "/movies/");
  });

  it("test see all link", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.wait(1000);
    cy.get("a").contains("See all").click();
    cy.location("pathname").should("eq", "/new");
  });
});
