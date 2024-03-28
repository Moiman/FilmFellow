describe("Header tests", () => {
  describe("Navbar tests when screen width > 1024px", () => {
    it("Navigate to home page with navbar", () => {
      cy.visit("/new");
      cy.url().should("eq", Cypress.env("baseUrl") + "/new");
      cy.get('a[href="/"]').click();
      cy.url().should("include", "/");
      cy.get("h1").contains("FilmFellow");
    });

    it("Navigate to New with navbar", () => {
      cy.visit("/");
      cy.url().should("eq", Cypress.env("baseUrl") + "/");
      cy.get('a[href="/new"]').click();
      cy.url().should("include", "/new");
      cy.get("h2").contains("New");
    });

    it("Navigate to Popular with navbar", () => {
      cy.visit("/");
      cy.url().should("eq", Cypress.env("baseUrl") + "/");
      cy.get('a[href="/popular"]').click();
      cy.url().should("include", "/popular");
      cy.get("h2").contains("Popular");
    });

    it("Navigate to Best Rated with navbar", () => {
      cy.visit("/");
      cy.url().should("eq", Cypress.env("baseUrl") + "/");
      cy.get('a[href="/bestrated"]').click();
      cy.url().should("include", "/bestrated");
      cy.get("h2").contains("Best Rated");
    });

    it("Navigate to Login with navbar", () => {
      cy.visit("/");
      cy.url().should("eq", Cypress.env("baseUrl") + "/");
      cy.get('a[href="/login"]').click();
      cy.url().should("include", "/login");
      cy.get("h2").contains("Login");
    });

    it("Test navbar input field", () => {
      cy.visit("/");
      cy.get('input[placeholder="Search..."]').type("Jaws");
      cy.get('[data-cy="search-input"]').should("have.value", "Jaws");
    });
  });

  describe(
    "Navbar tests when screen width < 1024px",
    {
      viewportWidth: 600,
    },
    () => {
      it("Navigate to home page with navbar", () => {
        cy.visit("/new");
        cy.url().should("eq", Cypress.env("baseUrl") + "/new");
        cy.get('a[href="/"]').click();
        cy.url().should("include", "/");
        cy.get("h1").contains("FilmFellow");
      });

      it("Navigate to New with navbar", () => {
        cy.visit("/");
        cy.url().should("eq", Cypress.env("baseUrl") + "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/new"]').click();
        cy.url().should("include", "/new");
        cy.get("h2").contains("New");
      });

      it("Navigate to Popular with navbar", () => {
        cy.visit("/");
        cy.url().should("eq", Cypress.env("baseUrl") + "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/popular"]').click();
        cy.url().should("include", "/popular");
        cy.get("h2").contains("Popular");
      });

      it("Navigate to Best Rated with navbar", () => {
        cy.visit("/");
        cy.url().should("eq", Cypress.env("baseUrl") + "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/bestrated"]').click();
        cy.url().should("include", "/bestrated");
        cy.get("h2").contains("Best Rated");
      });

      it("Navigate to Login with navbar", () => {
        cy.visit("/");
        cy.url().should("eq", Cypress.env("baseUrl") + "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/login"]').click();
        cy.url().should("include", "/login");
        cy.get("h2").contains("Login");
      });

      it("Test navbar input field", () => {
        cy.visit("/");
        cy.get('input[placeholder="Search..."]').type("Jaws");
        cy.get('[data-cy="search-input"]').should("have.value", "Jaws");
      });
    },
  );
});
