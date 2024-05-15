describe("Routes tests", () => {
  it("Visit default page", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("main").contains("New Movies");
  });

  it("Try to visit 404 page", () => {
    cy.request({ url: "/randompage", failOnStatusCode: false }).its("status").should("equal", 404);
  });
});
