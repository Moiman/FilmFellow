describe("Registration tests", () => {
  it("Try to register new user without username, email, password", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Username is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("Confirm password is required").should("be.visible");
  });
  it("Successfully register user", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('input[name="retypepassword"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("Sign Out");
    cy.get("button").contains("Sign Out").click();
  });

  it("Try to register new user with email that already exists", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('input[name="username"]').type("testuser123");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('input[name="retypepassword"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.contains("User already exists with that email").should("be.visible");
  });

  it("Try to register new user with username that already exists", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="email"]').type("testemail@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('input[name="retypepassword"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.contains("User already exists with that username").should("be.visible");
  });
});

describe("Login tests", () => {
  it("Try to login without email, password", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required", { timeout: 1000 }).should("be.visible");
    cy.contains("Password is required", { timeout: 1000 }).should("be.visible");
  });
  it("Try to login with false username / password", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="email"]').type("any@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.contains("Credentials doesnt match").should("be.visible");
  });
  it("Successfully login user", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("Sign Out");
    cy.get("button").contains("Sign Out").click();
  });
});

describe("Test Links in login && register", () => {
  it("Try Cant login link on loginpage", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get(".section-wrapper")
      .find(".section-content")
      .should("be.visible")
      .find(".form-route-change")
      .should("be.visible")
      .find(".form-route-change-link-style")
      .should("be.visible")
      .contains("Cant login?")
      .click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
  });
  it("Try register link on loginpage", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get(".section-wrapper")
      .find(".section-content")
      .should("be.visible")
      .find(".form-route-change")
      .should("be.visible")
      .find(".form-route-change-link-style")
      .should("be.visible")
      .contains("Register")
      .click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
  });
  it("Try login link on registerpage", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get(".section-wrapper")
      .find(".section-content")
      .should("be.visible")
      .find(".form-route-change")
      .should("be.visible")
      .find(".form-route-change-link-style")
      .should("be.visible")
      .contains("Login")
      .click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
  });
});

describe("Login form and register form show password test", () => {
  it("Should show password on login form as text", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="password"]').type("Password1!");
    cy.get(".section-wrapper")
      .find(".section-content")
      .should("be.visible")
      .find(".form-group")
      .should("be.visible")
      .find(".form-group-icon")
      .should("be.visible")
      .click();
    cy.get('input[type="text"]').should("be.visible");
  });
  it("Should show password on register form as text", () => {
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/register");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('input[name="retypepassword"]').type("Password1!");
    cy.get('[data-cy="show-password"]').click();
    cy.get('[data-cy="show-retypepassword"]').click();
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="retypepassword"]').should("be.visible");
  });
});

describe("Protected route tests", () => {
  it("Visit protected route without authorization", () => {
    cy.request({ url: "/api/testing", failOnStatusCode: false }).should(response => {
      expect(response.status).to.eq(401);
    });
  });
  it("Visit protected route with authorization", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("Sign Out");
    cy.request({ url: "/api/testing", failOnStatusCode: false }).should(response => {
      expect(response.status).to.eq(200);
    });
  });
  it("Try to go to register page as logged in user", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("Sign Out");
    cy.visit("/register");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get("button").contains("Sign Out").click();
  });
  it("Try to go to login page as logged in user", () => {
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/login");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password1!");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("Sign Out");
    cy.visit("/login");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
    cy.get("button").contains("Sign Out").click();
  });
});
