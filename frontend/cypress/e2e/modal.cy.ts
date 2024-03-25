describe("Modal tests", () => {
    it("open modal", () => {
        cy.visit(Cypress.env("baseUrl") + "/testing");
        cy.contains("modal").click();
        cy.url().should("eq", Cypress.env("baseUrl") + "/testing?showModal=y");
        cy.get("dialog").should("exist");
    });
    it("close modal from X", () => {
        cy.visit(Cypress.env("baseUrl") + "/testing?showModal=y");
        cy.get(".modal-title").within(() => {
            cy.get("a").click();
        });
        cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
    });
    it("close modal from btn", () => {
        cy.visit(Cypress.env("baseUrl") + "/testing?showModal=y");
        cy.get(".modal-btn").within(() => {
            cy.get("a").click();
        });
        cy.url().should("eq", Cypress.env("baseUrl") + "/testing");
    })
});
