describe("Movie page tests", () => {
  it("Basic movie page test", () => {
    cy.visit("/movies/278");
    cy.location("pathname").should("eq", "/movies/278");
    cy.get("h2").contains("The Shawshank Redemption").should("be.visible");
    cy.get(".movie-data-row>p").first().contains("Frank Darabont").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("R").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".movie-description").contains("Framed in the 1940s for the").should("be.visible");
    cy.get(".current-rating").contains("8.");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
    cy.contains("Similar movies").should("be.visible");
    cy.contains("Watch at").should("be.visible");
  });

  it("Second Basic movie page test", () => {
    cy.visit("/movies/13");
    cy.get("h2").contains("Forrest Gump");
    cy.get(".movie-data-row>p").first().contains("Zemeckis").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("PG-13").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".current-rating").contains("8.").should("be.visible");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
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
    cy.get("h2").contains("Forrest Gump");
    cy.get(".movie-data-row>p").first().contains("Zemeckis").should("be.visible");
    cy.get(".movie-data-row>p").eq(1).contains("1994").should("be.visible");
    cy.get(".movie-data-row>p").eq(2).contains("PG-13").should("be.visible");
    cy.get(".movie-data-row>p").eq(3).contains("2 h 22 min").should("be.visible");
    cy.get(".current-rating").contains("8.").should("be.visible");
    cy.contains("Cast").should("be.visible");
    cy.contains("Crew").should("be.visible");
    cy.contains("Reviews").should("be.visible");
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

  it("Mark as watched", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Mark as watched").click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("be.visible");
    cy.contains("No thanks").click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("not.exist");
    cy.contains("Remove from watched", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Mark as watched").should("be.visible");
  });

  it("Mark as watched and click modal X", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Mark as watched").click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("be.visible");
    cy.get(".modal-title svg").click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("not.exist");
    cy.contains("Remove from watched", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Mark as watched").should("be.visible");
  });

  it("Mark as watched and give stars", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Mark as watched").click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("be.visible");
    cy.get(".modal-content svg").eq(1).click();
    cy.contains("Do you want to rate Forrest Gump", { timeout: 1000 }).should("not.exist");
    cy.get(".movie-rating svg").eq(1).should("have.attr", "fill").should("eq", "#ffc700");
    cy.get(".movie-rating svg").eq(2).should("have.attr", "fill").should("eq", "#eff2f2");
    cy.contains("Remove from watched", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Mark as watched").should("be.visible");
  });

  it("Give stars", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.get(".movie-rating svg").eq(1).should("have.attr", "fill").should("eq", "#eff2f2");
    cy.get(".movie-rating svg").eq(1).click();
    cy.get(".movie-rating svg").eq(1).should("have.attr", "fill").should("eq", "#ffc700");
    cy.get(".movie-rating svg").eq(2).should("have.attr", "fill").should("eq", "#eff2f2");
    cy.contains("Remove from watched", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Mark as watched").should("be.visible");
  });

  it("Add movie to watchlist", () => {
    cy.login(email, password);
    cy.visit("/movies/13");
    cy.contains("Add to watchlist").click();
    cy.contains("Remove from watchlist", { timeout: 1000 }).should("be.visible").click();
    cy.contains("Add to watchlist", { timeout: 1000 }).should("be.visible");
  });
});

describe("Movie crew and cast tests", () => {
  const castMember = { id: 31, name: "Tom Hanks" };
  const crewMember = { id: 24, name: "Robert Zemeckis" };

  it("Movie cast exists and can be navigated to", () => {
    cy.visit("/movies/13");
    cy.get("h2").contains("Forrest Gump");

    cy.contains("h3", "Cast").then($h3 => {
      const $nearestLink = $h3.nextAll("a").first();
      cy.wrap($nearestLink).click();
    });
    cy.location("pathname").should("eq", "/movies/13/cast");

    cy.get(`img[alt="${castMember.name}"]`).click();
    cy.location("pathname").should("eq", `/persons/${castMember.id}`);
    cy.get("h2").contains(`${castMember.name}`);
  });

  it("Movie crew exists and can be navigated to", () => {
    cy.visit("/movies/13");
    cy.get("h2").contains("Forrest Gump");

    cy.contains("h3", "Crew").then($h3 => {
      const $nearestLink = $h3.nextAll("a").first();
      cy.wrap($nearestLink).click();
    });
    cy.location("pathname").should("eq", "/movies/13/crew");

    cy.get(`img[alt="${crewMember.name}"]`).click();
    cy.location("pathname").should("eq", `/persons/${crewMember.id}`);
    cy.get("h2").contains(`${crewMember.name}`);
  });
});

describe("Movie review tests", () => {
  const user = {
    email: "user@gmail.com",
    username: "user",
    password: "Password1!",
  };
  let userId = "";

  after(() => {
    cy.deleteUser(user.email, user.password);
  });

  it("Create user", () => {
    cy.request({ method: "POST", url: "/api/users/register", body: user, failOnStatusCode: false }).should(response => {
      expect(response.status).to.eq(200);
      expect(response.body.email).to.equal(user.email);
      userId = response.body.id;
    });
  });

  it("Test review form header to redirect movie details on click", () => {
    cy.login(user.email, user.password);
    cy.visit("/review/movie/278");
    cy.get(".yellow-name-header").find("a").contains("The Shawshank Redemption").click();

    cy.location("pathname").should("eq", `/movies/278`);
  });

  it("Write review to movie", () => {
    cy.login(user.email, user.password);
    cy.visit("/movies/278");
    cy.get("h2").contains("The Shawshank Redemption");
    cy.get("button").contains("Add review").click();
    cy.location("pathname").should("eq", "/review/movie/278");

    cy.get("textarea").type("Making a test review to a movie");
    cy.get("button[type=submit]").click();

    cy.location("pathname").should("eq", `/`);
  });

  it("Click the username that has written review should redirect to user page", () => {
    cy.login(user.email, user.password);
    cy.visit("/movies/278");
    cy.get("h2").contains("The Shawshank Redemption");
    cy.get(".review-grid-item").find("a").contains(user.username).click();
    cy.location("pathname").should("eq", `/users/${userId}`);
  });

  it("View own written review on userpage", () => {
    cy.login(user.email, user.password);
    cy.visit(`/users/${userId}`);

    cy.get(".review-grid-content").contains("Making a test review to a movie");
  });

  it("Click the moviename where user has written review should redirect to movie page", () => {
    cy.login(user.email, user.password);
    cy.visit(`/users/${userId}`);
    cy.get(".review-thumbnail-header").find("a").first().contains("The Shawshank Redemption").click();

    cy.location("pathname").should("eq", `/movies/278`);
  });

  it("Movie reviews exists and can be navigated to see all reviews", () => {
    cy.login(user.email, user.password);
    cy.visit("/movies/278");
    cy.get("h2").contains("The Shawshank Redemption");

    cy.get(".section-padding").find(".section").eq(2).find("a").contains("See all").click();
    cy.location("pathname").should("eq", "/movies/278/reviews");

    cy.get(".review-grid")
      .find(".review-grid-item")
      .should("be.visible")
      .find("p")
      .contains("Making a test review to a movie");
  });

  it("Delete own review", () => {
    cy.login(user.email, user.password);
    cy.visit("/movies/278");
    cy.get("h2").contains("The Shawshank Redemption");
    cy.location("pathname").should("eq", "/movies/278");
    cy.get(".review-grid")
      .find(".review-grid-item")
      .should("be.visible")
      .find("p")
      .contains("Making a test review to a movie")
      .parent()
      .find("button")
      .click({ force: true });

    cy.contains("Making a test review to a movie").should("not.exist");
  });
});
