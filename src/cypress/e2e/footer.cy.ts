const gitHubHref = "https://github.com/Moiman/FilmFellow/";

describe("Footer tests", () => {
  it("Test footer github link", () => {
    cy.visit("/");
    cy.get(".content").find(".github-link").should("have.attr", "href", gitHubHref);
  });
});
