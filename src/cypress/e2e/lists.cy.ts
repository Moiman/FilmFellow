describe("Movie lists tests", () => {
  const email = "listTest@test.test";
  const password = "Password1!";
  let userId = 0;

  before(() => {
    cy.register(email, password);
    cy.login(email, password);
    cy.request({ url: "/api/auth/session" }).then(res => (userId = res.body.user.id));
  });

  after(() => {
    cy.deleteUser(email, password);
  });

  it("Add list 1", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);
    cy.get(".section").contains("Add new list").click();
    cy.get("dialog input[name='name']").should("be.visible").type("List 1");
    cy.get("dialog button[type='submit']").click();
    cy.get(".section").contains("List 1");
  });

  it("Add list 2 and delete", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);
    cy.get(".section").contains("Add new list").click();
    cy.get("dialog input[name='name']").should("be.visible").type("List 2");
    cy.get("dialog button[type='submit']").click();
    cy.get(".section").contains("List 2").click();
    cy.location("pathname").should("contain", "/lists/");
    cy.get(".section").contains("List 2");
    cy.get(".section button").click();
    cy.location("pathname").should("eq", "/users/" + userId);
    cy.get(".section").last().should("contain", "List 1");
    cy.get(".section").last().should("not.contain", "List 2");
  });

  it("Add movie to list", () => {
    cy.login(email, password);
    cy.visit("/movies/278");
    cy.contains("Add to list").should("be.visible").click();
    cy.get(".dropdown-menu").should("be.visible").contains("List 1").click();
    cy.visit("/users/" + userId);
    cy.get(".section").last().should("contain", "List 1");
  });

  it("Add movie to new list from movie page", () => {
    cy.login(email, password);
    cy.visit("/movies/278");
    cy.contains("Add to list").should("be.visible").click();
    cy.get(".dropdown-menu").should("be.visible").contains("Add to new list").click();
    cy.get("dialog input[name='name']").should("be.visible").type("List 3");
    cy.get("dialog button[type='submit']").click();
    cy.contains("Add to list").should("be.visible").click();
    cy.get(".dropdown-menu").should("be.visible").contains("List 3").click();

    cy.visit("/users/" + userId);
    cy.get(".section").last().should("contain", "List 3");
  });
});
