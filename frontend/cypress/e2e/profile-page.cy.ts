describe("Profile page tests", () => {
  const newUser = {
    email: "newuser@gmail.com",
    username: "newuser",
    password: "Password1!",
  };
  let newUserId = "";

  it("Register new user for profile page testing", () => {
    cy.request({
      method: "POST",
      url: "/api/users/register",
      body: {
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      },
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.email).to.equal(newUser.email);
      newUserId = res.body.id;
    });
  });

  it("Try to go to profile page without logging in", () => {
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.url().should("eq", Cypress.env("baseUrl") + "/");
  });

  it("Go to profile page as logged in user", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".section-header").contains("Settings");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change username in the profile page without value", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change username in the profile page to something that doesnt meet the requirements", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').type("1");
    cy.get('button[type="submit"]').click();
    cy.contains("Username too short, minimum length is 2").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change username in the profile page as existing one", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').type(newUser.username);
    cy.get('button[type="submit"]').click();
    cy.contains("User already exists with that username").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Change username successfully in the profile page", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .first()
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="username"]').type("newUsername");
    cy.get('button[type="submit"]').click();
    cy.contains("newUsername").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change email in the profile page without value", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change email in the profile page as existing one", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('button[type="submit"]').click();
    cy.contains("User already exists with that email").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Change email successfully in the profile page", () => {
    cy.login(newUser.email, newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(1)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="email"]').type("newEmail@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.contains("newUsername").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change password in the profile page without value", () => {
    cy.login("newEmail@gmail.com", newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('button[type="submit"]').click();
    cy.get("input:invalid").should("have.length", 1);
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Try to change password in the profile page to something that doesnt meet the requirements", () => {
    cy.login("newEmail@gmail.com", newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="password"]').type("newpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Password requires atleast 1 capital character").should("be.visible");
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Change password succeessfully in the profile page", () => {
    cy.login("newEmail@gmail.com", newUser.password);
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(2)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.get('input[name="password"]').type("Newpassword1!");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", Cypress.env("baseUrl") + "/profile");
  });

  it("Delete user confirmation modal in the profile page and press cancel", () => {
    cy.login("newEmail@gmail.com", "Newpassword1!");
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(3)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.wait(500);
    cy.url().should("eq", Cypress.env("baseUrl") + `/profile?showModal=${newUserId}`);
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Cancel").click();
    cy.url().should("eq", Cypress.env("baseUrl") + `/profile`);
  });

  it("Delete user confirmation modal in the profile page and successfully delete user", () => {
    cy.login("newEmail@gmail.com", "Newpassword1!");
    cy.visit(Cypress.env("baseUrl") + "/profile");
    cy.get(".profile-card-right")
      .find(".profile-card-content-divider")
      .first()
      .should("be.visible")
      .find(".profile-card-element")
      .eq(3)
      .should("be.visible")
      .find("button")
      .should("be.visible")
      .click();
    cy.wait(500);
    cy.url().should("eq", Cypress.env("baseUrl") + `/profile?showModal=${newUserId}`);
    cy.get("dialog").should("exist");
    cy.get(".modal-box").find(".modal-content").contains("button", "Delete Account").click();
    cy.url().should("eq", Cypress.env("baseUrl") + `/`);
    cy.contains("Login").should("be.visible");
    cy.contains("Register").should("be.visible");
  });
});
