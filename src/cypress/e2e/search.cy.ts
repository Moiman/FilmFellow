describe("search filter tests", () => {

  it("visit site and confirm sidebar is visible", () => {
    cy.visit("/search");
    cy.location("pathname").should("eq", "/search");
    cy.get(".filter-wrapper").should("be.visible");
  })

  it("test genre filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Genres").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[id="Action"]`).click();
    cy.location('search')
      .should('include', 'Action=on')
  })

  it("test release year filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Release year").click();
    cy.get(".filter-content").should("be.visible");
  })

  it("test countries filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Countries").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[id="Finland"]`).click();
    cy.location('search')
      .should('include', 'Finland=on')
  })

  it("test languages filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Languages").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[id="Finnish"]`).click();
    cy.location('search')
      .should('include', 'Finnish=on')
  })

  it("test budget filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Budget").click();
    cy.get(".filter-content").should("be.visible");
  })

  it("test movie length filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Movie length").click();
    cy.get(".filter-content").should("be.visible");
  })

  it("test rating filter", () => {
    cy.visit("/search");
    cy.get(".filter-title").contains("Rating").click();
    cy.get(".filter-content").should("be.visible");
  })

});

