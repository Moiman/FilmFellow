describe("Api login and register tests", () => {
  const email = "test@test.test";
  const username = "mattiTesti";
  const password = "Password1!";

  after(() => {
    cy.login(email, password);
    cy.request({
      method: "DELETE",
      url: "/api/users/delete",
    });
    Cypress.session.clearAllSavedSessions();
  });

  it("Login without account", () => {
    cy.request({
      method: "POST",
      url: "/api/users/login",
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
      url: "/api/users/login",
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
      url: "/api/users/register",
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
      url: "/api/users/register",
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
const firstNewUser = {
  email: "newuser@gmail.com",
  username: "newuser",
  password: "Password1!",
};
let firstNewUserId = "";
const secondNewUser = {
  email: "secondnewuser@gmail.com",
  username: "secondnewuser",
  password: "Password1!",
};
let secondNewUserId = "";
describe("Register dummy users for tests", () => {
  it("Create 2 dummy users", () => {
    cy.request({ method: "POST", url: "/api/users/register", body: firstNewUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(firstNewUser.email);
        firstNewUserId = response.body.id;
      },
    );
    cy.request({ method: "POST", url: "/api/users/register", body: secondNewUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(secondNewUser.email);
        secondNewUserId = response.body.id;
      },
    );
  });
});
describe("Api update tests", () => {
  it("Try to update user details without authorization", () => {
    const changeUserDetails = {
      username: "something",
      email: "test@testing.com",
      password: "newPassword1!",
    };
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(response => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq("Not Authorized");
    });
  });

  it("Try to update user details with empty body", () => {
    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: {},
    }).should(response => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Missing email, password, username or role");
    });
  });

  it("Try to update user details with faulty values", () => {
    const changeUserDetails = {
      username: "t",
      email: "testing",
      password: "test",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
    });
  });

  it("Try to update other user username than yourself without beign admin", () => {
    const changeUserDetails = {
      username: "something",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${secondNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant change other user details unless admin");
    });
  });

  it("Try to update other user email than yourself without beign admin", () => {
    const changeUserDetails = {
      email: "test@testing.com",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${secondNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant change other user details unless admin");
    });
  });

  it("Try to update other user password than yourself without beign admin", () => {
    const changeUserDetails = {
      password: "newPassword1!",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${secondNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant change other user details unless admin");
    });
  });

  it("Try to update username with false id", () => {
    const changeuserDetails = {
      username: "newusername",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${123456789}`,
      failOnStatusCode: false,
      body: changeuserDetails,
    }).should(res => {
      expect(res.status).to.eq(404);
      expect(res.body.error).to.eq(`Coundnt find user with id ${123456789}`);
    });
  });

  it("Try to change user role without admin role", () => {
    const changeUserDetails = {
      role: "admin",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant change other user details unless admin");
    });
  });

  it("Try to update email to same as someone else already has", () => {
    const changeUserDetails = {
      email: secondNewUser.email,
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(409);
      expect(res.body.error).to.eq("User already exists with that email");
    });
  });

  it("Try to update username to same as someone else already has", () => {
    const changeUserDetails = {
      username: secondNewUser.username,
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(409);
      expect(res.body.error).to.eq("User already exists with that username");
    });
  });

  it("Try to update user with negative id", () => {
    const changeUserDetails = {
      username: secondNewUser.username,
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${-123}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("User id cant be under 1");
    });
  });

  it("Try to update user with character as id", () => {
    const changeUserDetails = {
      username: secondNewUser.username,
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${"abcdef"}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("User id not a number");
    });
  });

  it("Update username, email and password successfully", () => {
    const changedUserDetails = {
      username: "something",
      email: "test@testing.com",
      password: "newPassword1!",
    };

    cy.login(firstNewUser.email, firstNewUser.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update`,
      body: changedUserDetails,
    }).should(res => {
      expect(res.status).to.eq(200);
      expect(res.body.email).to.eq(changedUserDetails.email);
    });
  });
});

describe("Api delete tests", () => {
  const user = { email: "test@testing.com", password: "newPassword1!" };

  it("Try to delete user without authorization", () => {
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${firstNewUserId}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Not Authorized");
    });
  });

  it("Try to delete another user that isnt the session holder", () => {
    cy.login(user.email, user.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${secondNewUserId}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant delete other users unless admin");
    });
  });

  it("Try to delete another user with false id", () => {
    cy.login(user.email, user.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${123456789}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("Cant delete other users unless admin");
    });
  });

  it("Try to delete user with negative id", () => {
    cy.login(user.email, user.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${-123}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("User id cant be under 1");
    });
  });

  it("Try to delete user with character as id", () => {
    cy.login(user.email, user.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${"abcdef"}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("User id not a number");
    });
  });

  it("Delete first dummy user successfully", () => {
    cy.login(user.email, user.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete`,
    }).should(res => {
      expect(res.status).to.eq(200);
    });
    Cypress.session.clearAllSavedSessions();
  });

  it("Delete second dummy user successfully", () => {
    cy.login(secondNewUser.email, secondNewUser.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete`,
    }).should(res => {
      expect(res.status).to.eq(200);
    });
    Cypress.session.clearAllSavedSessions();
  });
});