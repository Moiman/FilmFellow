describe("Login tests && protected route", () => {
  it("Visit protected route without authorization", () => {
    cy.request({ url: "/api/testing", failOnStatusCode: false }).should(response => {
      expect(response.status).to.eq(400);
    });
  });

  it("Visit protected route with authorization", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get("button").contains("Sign Out");
    cy.request({ url: "/api/testing", failOnStatusCode: false }).should(response => {
      expect(response.status).to.eq(200);
    });
  });
});
