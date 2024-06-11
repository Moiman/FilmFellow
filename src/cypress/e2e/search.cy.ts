describe("search filter tests", () => {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("visit site and confirm sidebar is visible", () => {
    cy.location("pathname").should("eq", "/search");
    cy.get(".filter-wrapper").should("be.visible");
  });

  it("test genre filter", () => {
    cy.get(".filter-header").contains("Genres").click();
    cy.get(".filter-content").should("be.visible");
    cy.get("p").contains("Horror").parent().children("input").click().should("be.checked");
    cy.get(`a[href="/movies/539"]`).should("exist");
  });

  it("test release year filter", () => {
    cy.get(".filter-header").contains("Release year").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=releaseYearMin]`).type("1992");
    cy.get(`input[name=releaseYearMax]`).type("1994");
    cy.get(`input[name=releaseYearMin]`).should("have.value", "1992");
    cy.get(`input[name=releaseYearMax]`).should("have.value", "1994");
    cy.get(`a[href="/movies/424"]`).should("exist");
  });

  it("test countries filter", () => {
    cy.get(".filter-header").contains("Countries").click();
    cy.get(".filter-content").should("be.visible");
    cy.get("p").contains("Ecuador").parent().children("input").click().should("be.checked");
    cy.get(`a[href="/movies/644479"]`).should("exist");
  });

  it("test languages filter", () => {
    cy.get(".filter-header").contains("Languages").click();
    cy.get(".filter-content").should("be.visible");
    cy.get("p").contains("Turkish").parent().children("input").click().should("be.checked");
    cy.get(`a[href="/movies/637920"]`).should("exist");
  });

  it("test budget filter", () => {
    cy.get(".filter-header").contains("Budget").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=budgetMin]`).type("500000");
    cy.get(`input[name=budgetMax]`).type("1000000");
    cy.get(`input[name=budgetMin]`).should("have.value", "500000");
    cy.get(`input[name=budgetMax]`).should("have.value", "1000000");
    cy.get(`a[href="/movies/539"]`).should("exist");
  });

  it("test movie length filter", () => {
    cy.get(".filter-header").contains("Movie length").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=movieLengthMin]`).type("120");
    cy.get(`input[name=movieLengthMin]`).should("have.value", "120");
    cy.get(`input[name=movieLengthMax]`).type("121");
    cy.get(`input[name=movieLengthMax]`).should("have.value", "121");
    cy.get(`a[href="/movies/670"]`).should("exist");
  });

  it("test rating filter", () => {
    cy.get(".filter-header").contains("Rating").click();
    cy.get(".filter-content").should("be.visible");
    cy.get(`input[name=ratingMin]`).type("8.2");
    cy.get(`input[name=ratingMin]`).should("have.value", "8.2");
    cy.get(`input[name=ratingMax]`).type("8.2");
    cy.get(`input[name=ratingMax]`).should("have.value", "8.2");
    cy.get(`a[href="/movies/315162"]`).should("exist");
  });

  it("test searchbar", () => {
    cy.get(".admin-searchbar").type("Lord of the rings");
    cy.get("img").should("have.length.at.least", 3);
  });
});
