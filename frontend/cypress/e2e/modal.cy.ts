describe("Modal tests", () => {
  it("open modal", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing");
    cy.get('a[href="?showModal=1"]').click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/testing?showModal=1");
    cy.get("dialog").should("exist");
  });

  it("close modal from X", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing?showModal=1");
    cy.get(".modal-title").within(() => {
      cy.get("a").click();
    });
    cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
  });

  it("close modal from btn", () => {
    cy.visit(Cypress.env("baseUrl") + "/testing?showModal=1");
    cy.get(".modal-content").within(() => {
      cy.get("a").click();
    });
    cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
  });
});
