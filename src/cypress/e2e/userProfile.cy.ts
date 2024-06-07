describe("User profile tests", () => {
  const email = "profileUpdateTest@test.test";
  const password = "testingPassword123!";
  let userId = 0;

  before(() => {
    cy.register(email, password);
    cy.login(email, password);
    cy.request({ url: "/api/auth/session" }).then(res => (userId = res.body.user.id));
  });

  after(() => {
    cy.deleteUser(email, password);
  });

  it("Visit profile page", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
  });

  it("Change description", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get("textarea").clear().type("This is a test!");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/users/" + userId);

    cy.get("p").contains("This is a test!");
  });

  it("Empty description", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('textarea[name="description"]').clear();
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/users/" + userId);

    cy.get("p").contains("has no description");
  });

  it("Invalid description", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get("textarea").clear().type("This is a description with >* special characters.");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.get("p").contains("Description contains invalid characters");
  });

  it("Empty social media usernames", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('input[name="twitter"]').clear();
    cy.get('input[name="instagram"]').clear();
    cy.get('input[name="tiktok"]').clear();
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/users/" + userId);

    cy.get("h3").contains("Social media").should("not.exist");
  });

  it("Change social media usernames", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('input[name="twitter"]').clear().type("twusername");
    cy.get('input[name="instagram"]').clear().type("igusername");
    cy.get('input[name="tiktok"]').clear().type("ttusername");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/users/" + userId);

    cy.get("p").contains("twusername");
    cy.get("p").contains("igusername");
    cy.get("p").contains("ttusername");
  });

  it("Invalid social media usernames", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('input[name="twitter"]').clear().type("user@name");
    cy.get('input[name="instagram"]').clear().type("user!name");
    cy.get('input[name="tiktok"]').clear().type("user.name!");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.get("p").contains(
      "Twitter username can only contain letters, numbers, and underscores, with a maximum length of 15 characters",
    );
    cy.get("p").contains(
      "Instagram username can only contain numbers, letters, and periods, with a maximum length of 30 characters",
    );
    cy.get("p").contains(
      "TikTok username can only contain letters, numbers, periods, and underscores, with a maximum length of 24 characters",
    );
  });

  it("Add friend", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/users/" + userId);

    cy.get(".profile-info").contains("button", "Add to friends").click();
    cy.get(".profile-info").should("contain", "Remove friend");
  });

  it("Added friend should be seen on own profile", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    // cy.visit("/");
    cy.visit("/users/1");
    // cy.get("*[aria-label='Profile']").click({ force:true });
    cy.location("pathname").should("eq", `/users/1`);
    cy.get(".profile-friend-list")
      .find(".friends-wrapper")
      .should("be.visible")
      .children()
      .find("a")
      .last()
      .should("have.attr", "href", `/users/${userId}`);
  });

  it("Mutual friendship should show different classname on friend", () => {
    cy.login(email, password);
    cy.visit("/users/1");

    cy.get(".profile-info").contains("button", "Add to friends").click();
    cy.get(".profile-info").should("contain", "Remove friend");
    cy.get(".profile-friend-list")
      .find(".friends-wrapper")
      .should("be.visible")
      .children()
      .should("have.class", "button-friend-mutual");
  });

  it("Remove friend", () => {
    cy.login(Cypress.env("adminEmail"), Cypress.env("adminPassword"));
    cy.visit("/users/" + userId);

    cy.get(".profile-info").contains("button", "Remove friend").click();
    cy.get(".profile-info").should("contain", "Add to friends");
    cy.get(".profile-friend-list").find(".friends-wrapper").should("be.visible").children().should("have.length", 1);
  });

  it("Check user friends on show all friend list", () => {
    cy.login(email, password);
    cy.visit("/users/" + userId);

    cy.get(".friends-title").find("a").contains("See all").click();
    cy.location("pathname").should("eq", `/users/${userId}/friends`);
    cy.get(".section-header").find("h2").should("exist").find("a").should("have.attr", "href", `/users/${userId}`);
    cy.get(".person-list").children().find("p").contains("admin");
  });
});
