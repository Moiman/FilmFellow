describe("search filter tests", () => {
  it("visit site and confirm sidebar is visible", () => {
    cy.visit("/search");
    cy.location("pathname").should("eq", "/search");
    cy.get(".filter-wrapper").should("be.visible");
  });

  it("test genre filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Genres").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[id="Action"]`).click();
    cy.location("search").should("include", "Action=on");
  });

  it("test release year filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Release year").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=releaseYearMin]`).type("2000");
    cy.location("search").should("include", "releaseYearMin=2000");
    cy.get(`input[name=releaseYearMax]`).type("2020");
    cy.location("search").should("include", "releaseYearMax=2020");
  });

  it("test countries filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Countries").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="Andorra"]`).click();
    cy.location("search").should("include", "Andorra=on");
  });

  it("test languages filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Languages").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="Afar"]`).click();
    cy.location("search").should("include", "Afar=on");
  });

  it("test budget filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Budget").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=budgetMin]`).type("200");
    cy.location("search").should("include", "budgetMin=200");
    cy.get(`input[name=budgetMax]`).type("2000");
    cy.location("search").should("include", "budgetMax=2000");
  });

  it("test movie length filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Movie length").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=movieLength]`).type("200");
    cy.location("search").should("include", "movieLength=200");
  });

  it("test rating filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Rating").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="rating1"]`).click();
    cy.location("search").should("include", "rating1=on");
  });
});