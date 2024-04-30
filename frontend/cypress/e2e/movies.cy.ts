describe("Movie page tests", () => {
  it("Basic movie page test", () => {
    cy.visit("/movies/278");
    cy.location("pathname").should("eq", "/movies/278");
    cy.get("h1").contains("The Shawshank Redemption").should("be.visible");
    cy.get(".movie-data-row>p").first().contains("Frank Darabont").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("R").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".movie-description").contains("Framed in the 1940s for the").should("be.visible");
    cy.get(".current-rating").contains("8.");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
    cy.contains("In theaters").should("be.visible");
    cy.contains("Similar movies").should("be.visible");
    cy.contains("Watch at").should("be.visible");
  });

  it("Second Basic movie page test", () => {
    cy.visit("/movies/13");
    cy.get("h1").contains("Forrest Gump");
    cy.get(".movie-data-row>p").first().contains("Zemeckis").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("PG-13").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".current-rating").contains("8.").should("be.visible");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
    cy.contains("In theaters").should("be.visible");
    cy.contains("Similar movies").should("be.visible");
    cy.contains("Watch at").should("be.visible");
  });

  it("Missing movie page return code", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });
    cy.request("/movies/27832131").then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it("Missing movie page test", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });
    cy.visit("/movies/27832131", { failOnStatusCode: false });
    cy.location("pathname").should("eq", "/movies/27832131");
    cy.get("h2").contains("404").should("be.visible");
  });
});

describe("Logged in movie page tests", () => {
  const email = "moviesTest@test.test";
  const password = "Password1!";

  before(() => {
    cy.register(email, password);
  });

  after(() => {
    cy.deleteUser(email, password);
  });

  it("Logged movie page test", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.get("h1").contains("Forrest Gump");
    cy.get(".movie-data-row>p").first().contains("Zemeckis").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("PG-13").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".current-rating").contains("8.").should("be.visible");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
    cy.contains("In theaters").should("be.visible");
    cy.contains("Similar movies").should("be.visible");
    cy.contains("Watch at").should("be.visible");
    cy.contains("Add to watchlist").should("be.visible");
    cy.contains("Mark as watched").should("be.visible");
    cy.contains("Add to list").should("be.visible");
  });

  it("Logged movie page favorite", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Add to favorites").click();
    cy.contains("Remove from favorites", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Add to favorites", { timeout: 1000 }).should("be.visible");
  });

  it("Logged movie page watchlist", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Add to watchlist").click();
    cy.contains("Remove from watchlist", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Add to watchlist", { timeout: 1000 }).should("be.visible");
  });

  it("Logged movie page favorite", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Mark as watched").click();
    cy.contains("Remove from watched", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Mark as watched", { timeout: 1000 }).should("be.visible");
  });
});
