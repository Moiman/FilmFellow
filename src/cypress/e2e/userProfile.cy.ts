describe("User profile tests", () => {
  const email = "admin@gmail.com";
  const password = "Adminadmin!½";

  it("Visit profile page", () => {
    cy.login(email, password);
    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h2").contains(email);
  });

  it("Change description", () => {
    cy.login(email, password);
    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get("textarea").clear().type("This is a test!");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("p").contains("This is a test!");
  });

  it("Empty description", () => {
    cy.login(email, password);
    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('textarea[name="description"]').clear();
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("p").contains("has no description");
  });

  it("Change social media handles", () => {
    cy.login(email, password);
    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('input[name="twitter"]').clear().type("twitterUsername");
    cy.get('input[name="instagram"]').clear().type("instagramUsername");
    cy.get('input[name="tiktok"]').clear().type("tiktokUsername");
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("p").contains("twitterUsername");
    cy.get("p").contains("instagramUsername");
    cy.get("p").contains("tiktokUsername");
  });

  it("Empty social media handles", () => {
    cy.login(email, password);
    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h2").contains(email);
    cy.get('button[type="submit"]').contains("Go to settings").click();
    cy.get("h2").contains("Settings");
    cy.get('input[name="twitter"]').clear();
    cy.get('input[name="instagram"]').clear();
    cy.get('input[name="tiktok"]').clear();
    cy.get('button[type="submit"]').contains("Save").click();

    cy.visit("/");
    // Wait for session?
    cy.wait(4000);
    cy.get('a[href*="/users/"]').click();

    cy.get("h3").contains("Social media").should("not.exist");
  });
});
