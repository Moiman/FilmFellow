const personData = {
  id: 947,
  biography:
    "Hans Florian Zimmer (born September 12th, 1957) is a German composer and record producer. Since the 1980s, he has composed music for over 150 films. His works include The Lion King, for which he won Academy Award for Best Original Score in 1994, the Pirates of the Caribbean series, The Thin Red Line, Gladiator, The Last Samurai, The Dark Knight Trilogy, Inception, and Interstellar. Zimmer spent the early part of his career in the United Kingdom before moving to the United States. He is the head of the film music division at DreamWorks studios and works with other composers through the company that he founded, Remote Control Productions.  Zimmer's works are notable for integrating electronic music sounds with traditional orchestral arrangements. He has received fourGrammy Awards, three Classical BRIT Awards, two Golden Globes, and an Academy Award. He was also named on the list of Top 100 Living Geniuses, published by The Daily Telegraph.",
  birthday: "1957-09-12T00:00:00.000Z",
  deathday: null,
  homepage: "https://hans-zimmer.com",
  name: "Hans Zimmer",
  profile_path: "/tpQnDeHY15szIXvpnhlprufz4d.jpg",
};

beforeEach(() => {
  cy.visit("/persons/" + personData.id);
});

describe("Person Page", () => {
  it("renders without errors", () => {
    cy.get("main").should("exist");
  });

  it("displays person information correctly", () => {
    cy.get(".person-info h1").contains(personData.name);
    cy.get(".person-birthday").contains(new Date(personData.birthday).getFullYear());
    cy.get(".person-description").contains(personData.biography.split(".", 1)[0]);
  });

  it("displays the homepage correctly", () => {
    cy.get(".person-website a").should("have.attr", "href", personData.homepage);
    cy.get(".person-website a").contains("Homepage");
  });

  it("navigates to See all movies page and back", () => {
    cy.contains("Known for...").should("be.visible");

    cy.contains("See all").click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/persons/" + personData.id + "/movies");

    cy.contains(personData.name).click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/persons/" + personData.id);
  });
});
