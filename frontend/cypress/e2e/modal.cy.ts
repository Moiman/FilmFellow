describe("Modal tests", () => {
  it("Open modal", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing");
    cy.contains("button", "Open 1").click();
    cy.get("dialog").should("exist");
  });

  it("Close modal from X", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing");
    cy.contains("button", "Open 1").click();
    cy.get(".modal-title").within(() => {
      cy.get("svg").click();
    });
    cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
  });

  it("Close modal from btn", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing?showModal=1");
    cy.get(".modal-content").within(() => {
      cy.get(".ok").click();
    });
    cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
  });
});
