const firstDummyUser = {
  email: "dummy@gmail.com",
  username: "dummyuser",
  password: "Password1!",
};
let firstDummyUserId = "";
const secondDummyUser = {
  email: "dummy2@gmail.com",
  username: "dummyuser2",
  password: "Password1!",
};
let secondDummyUserId = "";
describe("Register dummy users for admin user panel tests", () => {
  it("Create dummy users", () => {
    cy.request({ method: "POST", url: "/api/users/register", body: firstDummyUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(firstDummyUser.email);
        firstDummyUserId = response.body.id;
      },
    );

    cy.request({ method: "POST", url: "/api/users/register", body: secondDummyUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(secondDummyUser.email);
        secondDummyUserId = response.body.id;
      },
    );
  });
});

describe("Admin user panel tests", () => {
  it("Try to go to admin user panel without logging in as admin", () => {
    cy.visit("/admin/users");
    cy.location("pathname").should("eq", "/");
  });

  it("Try to go to admin user panel as regular user", () => {
    cy.login(firstDummyUser.email, firstDummyUser.password);
    cy.visit("/admin/users");
    cy.location("pathname").should("eq", "/");
  });

  it("Ban user", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/users");
    cy.get('[data-cy="admin-search-input"]').click().type("dummyuser2");
    cy.get(".admin-panel-content")
      .find(".admin-panel-user-list")
      .should("be.visible")
      .find(".admin-panel-right-side")
      .should("be.visible")
      .find(".dropdown")
      .should("be.visible")
      .click();

    cy.get(".dropdown-menu").find(".dropdown-item").first().click();
    cy.get(".admin-panel-status-suspended").should("exist");
  });

  it("Take ban off from user", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/users");
    cy.get('[data-cy="admin-search-input"]').click().type("dummyuser2");
    cy.get(".admin-panel-content")
      .find(".admin-panel-user-list")
      .should("be.visible")
      .find(".admin-panel-right-side")
      .should("be.visible")
      .find("button")
      .eq(0)
      .should("be.visible")
      .click();
    cy.get(".admin-panel-status-active").should("exist");
  });

  it("Delete user", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/users");
    cy.get('[data-cy="admin-search-input"]').click().type("dummyuser2");
    cy
      .get(".admin-panel-content")
      .find(".admin-panel-user-list")
      .should("be.visible")
      .find(".admin-panel-right-side")
      .should("be.visible")
      .find("button")
      .eq(1)
      .should("be.visible")
      .click(),
      { timeout: 500 };
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Delete Account").click();
    cy.get('[data-cy="admin-search-input"]').clear();
    cy.get(".admin-panel-user-list").should("have.length", 2);
  });

  it("Change user role to admin", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/users");
    cy.get('[data-cy="admin-search-input"]').click().type("dummyuser");
    cy
      .get(".admin-panel-content")
      .find(".admin-panel-user-list")
      .should("be.visible")
      .find(".admin-panel-right-side")
      .should("be.visible")
      .find("button")
      .eq(2)
      .should("be.visible")
      .click(),
      { timeout: 500 };
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Make Admin").click();
    cy.get(".admin-panel-right-side").should("not.exist");
  });
});
