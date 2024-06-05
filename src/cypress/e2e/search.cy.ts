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
    cy.get(`input[id="Action"]`).should("be.checked");
  });

  it("test release year filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Release year").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=releaseYearMin]`).type("2000");
    cy.get(`input[name=releaseYearMax]`).type("2020");
    cy.get(`input[name=releaseYearMin]`).should("have.value", "2000");
    cy.get(`input[name=releaseYearMax]`).should("have.value", "2020");
  });

  it("test countries filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Countries").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="Andorra"]`).click();
    cy.get(`input[name="Andorra"]`).should("be.checked");
  });

  it("test languages filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Languages").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="Afar"]`).click();
    cy.get(`input[name="Afar"]`).should("be.checked");
  });

  it("test budget filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Budget").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=budgetMin]`).type("200");
    cy.get(`input[name=budgetMax]`).type("2000");
    cy.get(`input[name=budgetMin]`).should("have.value", "200");
    cy.get(`input[name=budgetMax]`).should("have.value", "2000");
  });

  it("test movie length filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Movie length").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=movieLength]`).type("200");
    cy.get(`input[name=movieLength]`).should("have.value", "200");
  });

  it("test rating filter", () => {
    cy.visit("/search");
    cy.get(".filter-header").contains("Rating").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name="rating1"]`).click();
    cy.get(`input[name="rating1"]`).should("be.checked");
  });
});
