describe("Header tests", () => {
  describe("Navbar tests when screen width > 1024px", () => {
    it("Navigate to home page with navbar", () => {
      cy.visit("/new");
      cy.location("pathname").should("eq", "/new");
      cy.get('header a[href="/"]').click();
      cy.location("pathname").should("eq", "/");
    });

    it("Navigate to New with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get('header a[href="/new"]').click();
      cy.location("pathname").should("eq", "/new");
      cy.get("main h2").contains("New");
    });

    it("Navigate to Popular with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get('header a[href="/popular"]').click();
      cy.location("pathname").should("eq", "/popular");
      cy.get("main h2").contains("Popular");
    });

    it("Navigate to Best Rated with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get('header a[href="/bestrated"]').click();
      cy.location("pathname").should("eq", "/bestrated");
      cy.get("main h2").contains("Best Rated");
    });

    it("Navigate to Login with navbar", () => {
      cy.visit("/");
      cy.location("pathname").should("eq", "/");
      cy.get('header a[href="/login"]').click();
      cy.location("pathname").should("eq", "/login");
      cy.get("main h2").contains("Login");
    });

    it("Test navbar input field", () => {
      cy.visit("/");
      cy.get('header input[placeholder="Search..."]').type("Jaws");
      cy.get('header [data-cy="search-input"]').should("have.value", "Jaws");
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
        cy.get('header a[href="/"]').click();
        cy.location("pathname").should("eq", "/");
      });

      it("Navigate to New with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('header [data-cy="menu-icon"]').click();
        cy.get('header .dropdown a[href="/new"]').click();
        cy.location("pathname").should("eq", "/new");
        cy.get("main h2").contains("New");
      });

      it("Navigate to Popular with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('header [data-cy="menu-icon"]').click();
        cy.get('header .dropdown a[href="/popular"]').click();
        cy.location("pathname").should("eq", "/popular");
        cy.get("main h2").contains("Popular");
      });

      it("Navigate to Best Rated with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('header [data-cy="menu-icon"]').click();
        cy.get('header .dropdown a[href="/bestrated"]').click();
        cy.location("pathname").should("eq", "/bestrated");
        cy.get("main h2").contains("Best Rated");
      });

      it("Navigate to Login with navbar", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");
        cy.get('header [data-cy="menu-icon"]').click();
        cy.get('header .dropdown a[href="/login"]').click();
        cy.location("pathname").should("eq", "/login");
        cy.get("main h2").contains("Login");
      });

      it("Test navbar input field", () => {
        cy.visit("/");
        cy.get('header input[placeholder="Search..."]').type("Jaws");
        cy.get('header [data-cy="search-input"]').should("have.value", "Jaws");
      });
    },
  );
});
