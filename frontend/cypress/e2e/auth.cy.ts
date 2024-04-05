describe("Api login and register tests", () => {
  const email = "test@test.test";
  const username = "mattiTesti";
  const password = "Password1!";

  it("Login without account", () => {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      body: {
        email: "mattiMuaEiOleOlemassa@matti.ei",
        password: "salasana",
      },
    }).then(res => {
      expect(res.status).to.eq(400);
      console.log(res.body);
      expect(res.body.error).to.exist;
    });
  });

  it("Login with invalid email", () => {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      body: {
        email: "a",
        password: "a",
      },
    }).then(res => {
      expect(res.status).to.eq(400);
      console.log(res.body);
      expect(res.body.error).to.exist;
    });
  });

  it("Register with invalid email", () => {
    cy.request({
      method: "POST",
      url: "/api/register",
      failOnStatusCode: false,
      body: {
        email: "a",
        username: "matti",
        password: "Password1!",
      },
    }).then(res => {
      expect(res.status).to.eq(400);
      console.log(res.body);
      expect(res.body.error).to.exist;
    });
  });

  it("Register", () => {
    cy.request({
      method: "POST",
      url: "/api/register",
      body: {
        email,
        username,
        password,
      },
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.email).to.equal(email);
    });
  });
});
