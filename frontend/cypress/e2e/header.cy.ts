describe("Header tests", () => {
  describe("Navbar tests when screen width > 1024px", () => {
    it("Navigate to home page with navbar", () => {
      cy.visit("/new");
      cy.location("pathname").should("eq", "/new");
      cy.get("header").find('a[href="/"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it("Navigate to New with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get("header").find('a[href="/new"]').click();
      cy.location("pathname").should("eq", "/new");
      cy.get("h2").contains("New");
    });

    it("Navigate to Popular with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get("header").find('a[href="/popular"]').click();
      cy.location("pathname").should("eq", "/popular");
      cy.get("h2").contains("Popular");
    });

    it("Navigate to Best Rated with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get("header").find('a[href="/bestrated"]').click();
      cy.location("pathname").should("eq", "/bestrated");
      cy.get("h2").contains("Best Rated");
    });

    it("Navigate to Login with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get("header").find('a[href="/login"]').click();
      cy.location("pathname").should("eq", "/login");
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
        cy.location("pathname").should("eq", "/new");
        cy.get("header").find('a[href="/"]').click();
        cy.location("pathname").should("eq", "/");
      });

      it("Navigate to New with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/new"]').click();
        cy.location("pathname").should("eq", "/new");
        cy.get("h2").contains("New");
      });

      it("Navigate to Popular with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/popular"]').click();
        cy.location("pathname").should("eq", "/popular");
        cy.get("h2").contains("Popular");
      });

      it("Navigate to Best Rated with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/bestrated"]').click();
        cy.location("pathname").should("eq", "/bestrated");
        cy.get("h2").contains("Best Rated");
      });

      it("Navigate to Login with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('[data-cy="menu-icon"]').click();
        cy.get('.dropdown a[href="/login"]').click();
        cy.location("pathname").should("eq", "/login");
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
