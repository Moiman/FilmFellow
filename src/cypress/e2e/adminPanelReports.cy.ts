const reportDummyUser = {
  email: "reportdummy@gmail.com",
  username: "reportdummyuser",
  password: "Password1!",
};
let reportDummyUserId = "";

describe("Register dummy user for admin report panel tests", () => {
  it("Create dummy user", () => {
    cy.request({ method: "POST", url: "/api/users/register", body: reportDummyUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(reportDummyUser.email);
        reportDummyUserId = response.body.id;
      },
    );
  });
});

describe("Admin report panel tests", () => {
  it("Try to go to admin report panel without logging in as admin", () => {
    cy.visit("/admin/reports");
    cy.location("pathname").should("eq", "/");
  });

  it("Try to go to admin report panel as regular user", () => {
    cy.login(reportDummyUser.email, reportDummyUser.password);
    cy.visit("/admin/reports");
    cy.location("pathname").should("eq", "/");
  });

  it("Try to submit empty report", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit(`/users/${reportDummyUserId}`);
    cy.contains("button", "Report").click();
    cy.location("pathname").should("eq", `/report/user/${reportDummyUserId}`);
    cy.get("button[type=submit]").click();
    cy.get("#about:invalid").should("have.length", 1);
  });

  it("Write report about another user", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit(`/users/${reportDummyUserId}`);
    cy.contains("button", "Report").click();
    cy.location("pathname").should("eq", `/report/user/${reportDummyUserId}`);
    cy.get("textarea").type("Making a test report of user");
    cy.get("button[type=submit]").click();
  });

  it("Ban user from the admin report panel", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(".admin-panel-reports-grid").find(".dropdown").should("be.visible").click();

    cy.get(".dropdown-menu").find(".dropdown-item").first().click();
    cy.get(".admin-panel-status-suspended").should("exist");
  });

  it("Take ban off from user in the admin report panel", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(".admin-panel-reports-grid").find("button").contains("Lift Ban").click();
    cy.get(".admin-panel-status-active").should("exist");
  });

  it("Mark report as done", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(".admin-panel-reports-grid").find('input#checkbox[type="checkbox"]').click();
    cy.get('input#checkbox[type="checkbox"]').should("be.checked");
  });

  it("Unmark report", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(".admin-panel-reports-grid").find('input#checkbox[type="checkbox"]').click();
    cy.get('input#checkbox[type="checkbox"]').should("not.be.checked");
  });

  it("Click reporter username to view reporter profile", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.contains("admin").click();
    cy.location("pathname").should("eq", `/users/1`);
  });

  it("Click target username to view target profile", () => {
    const href = `/users/${reportDummyUserId}`;
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(`a[href="${href}"]`).click();
    cy.location("pathname").should("eq", `/users/${reportDummyUserId}`);
  });

  it("Delete report", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/reports");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy.get(".admin-panel-reports-grid").contains("button", "Delete").click();
    cy.get(".admin-panel-reports-grid").should("have.length", 0);
  });
  it("Delete user", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/admin/users");
    cy.get('[data-cy="admin-search-input"]').click().type(reportDummyUser.username);
    cy
      .get(".admin-panel-content")
      .find(".admin-panel-user-list")
      .should("be.visible")
      .find(".admin-panel-user-buttons")
      .should("be.visible")
      .find("button")
      .eq(1)
      .should("be.visible")
      .click(),
      { timeout: 500 };
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Delete account").click();
    cy.get(".admin-panel-user-list").should("have.length", 0);
  });
});