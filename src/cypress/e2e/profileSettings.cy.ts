describe("Profile page tests", () => {
  const newUser = {
    email: "newuser@gmail.com",
    username: "newuser",
    password: "Password1!",
  };

  const newEmail = "newMail@gmail.com";
  const newPassword = "Newpassword1!";

  before("Register new user for profile page testing", () => {
    cy.register(newUser.email, newUser.password);
  });

  it("Try to go to profile page without logging in", () => {
    cy.visit("/settings");
    cy.location("pathname").should("eq", "/");
  });

  it("Go to profile page as logged in user", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".section-header").contains("Settings");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change username in the profile page without value", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').clear();
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change username in the profile page to something that doesnt meet the requirements", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').clear();
    cy.get('input[name="username"]').type("1");
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains("Username too short, minimum length is 2").should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change username in the profile page as existing one", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').clear();
    cy.get('input[name="username"]').type(newUser.email);
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains("Can't change username to same as you already have").should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Change username successfully in the profile page", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').clear();
    cy.get('input[name="username"]').type(newUser.username);
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains(newUser.username).should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change email in the profile page without value", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="email"]').clear();
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change email in the profile page as existing one", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains("Can't change email to same as you already have").should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Change email successfully in the profile page", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type(newEmail);
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains(newEmail).should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change password in the profile page without value", () => {
    cy.login(newEmail, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.location("pathname").should("eq", "/settings");
  });

  it("Try to change password in the profile page to something that doesnt meet the requirements", () => {
    cy.login(newEmail, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="password"]').type("newpassword");
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.contains("Password requires atleast 1 capital character").should("be.visible");
    cy.location("pathname").should("eq", "/settings");
  });

  it("Change password succeessfully in the profile page", () => {
    cy.login(newEmail, newUser.password);
    cy.visit("/settings");
    cy.get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="password"]').type(newPassword);
    cy.get('.profile-settings-input>button[type="submit"]').click();
    cy.location("pathname").should("eq", "/settings");
  });

  it("Delete user confirmation modal in the profile page and press cancel", () => {
    cy.login(newEmail, newPassword);
    cy.visit("/settings");
    cy
      .get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(3)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click(),
      { timeout: 500 };
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Cancel").click();
    cy.location("pathname").should("eq", "/settings");
  });

  it("Delete user confirmation modal in the profile page and successfully delete user", () => {
    cy.login(newEmail, newPassword);
    cy.visit("/settings");
    cy
      .get(".profile-settings-right")
      .find(".profile-settings-divider")
      .first()
      .should("be.visible")
      .find(".profile-settings-wrapper")
      .eq(3)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click(),
      { timeout: 500 };
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Delete Account").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Login").should("be.visible");
    cy.contains("Register").should("be.visible");
  });
});
