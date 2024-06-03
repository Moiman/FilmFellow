describe("Api login and register tests", () => {
  const email = "test@test.test";
  const username = "mattiTesti";
  const password = "Password1!";

  after(() => {
    cy.deleteUser(email, password);
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
const thirdNewUser = {
  email: "thirdnewuser@gmail.com",
  username: "thirdnewuser",
  password: "Password1!",
};
let thirdNewUserId = "";
const admin = {
  email: Cypress.env("adminEmail"),
  password: Cypress.env("adminPassword"),
};
describe("Register dummy users for tests", () => {
  it("Create 3 dummy users", () => {
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
    cy.request({ method: "POST", url: "/api/users/register", body: thirdNewUser, failOnStatusCode: false }).should(
      response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.equal(thirdNewUser.email);
        thirdNewUserId = response.body.id;
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
    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: {},
    }).should(response => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Missing role, banDuration or isActive");
    });
  });

  it("Try to update user details with faulty values", () => {
    const changeUserDetails = {
      role: "super-admin",
      isActive: "extra-true",
      banDuration: "test",
    };

    cy.login(admin.email, admin.password);
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
      expect(res.body.error).to.eq("Not Authorized");
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
      expect(res.body.error).to.eq("Not Authorized");
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
      expect(res.body.error).to.eq("Not Authorized");
    });
  });

  it("Try to update role with false id", () => {
    const changeuserDetails = {
      role: "user",
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${123456789}`,
      failOnStatusCode: false,
      body: changeuserDetails,
    }).should(res => {
      expect(res.status).to.eq(404);
      expect(res.body.error).to.eq("Coundnt find user with id 123456789");
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
      expect(res.body.error).to.eq("Not Authorized");
    });
  });

  it("Try to change user role to something that doesnt exist as admin", () => {
    const changeUserDetails = {
      role: "randomrole",
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${thirdNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error.message).to.eq("Role must be either admin, user or moderator");
    });
  });

  it("Change other user to admin successfully", () => {
    const changeUserDetails = {
      role: "admin",
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${secondNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(200);
      expect(res.body.role).to.eq("admin");
    });
  });

  it("Try to change another admin details as admin", () => {
    const changeAdminDetails = {
      role: "user",
    };
    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${secondNewUserId}`,
      failOnStatusCode: false,
      body: changeAdminDetails,
    }).should(res => {
      expect(res.status).to.eq(403);
      expect(res.body.error).to.eq("Cant change other admin details");
    });
  });

  it("Try to ban user without isActive status value", () => {
    const changeUserDetails = {
      banDuration: 90000,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("Faulty values on ban");
    });
  });

  it("Try to ban user with isActive true and banDuration", () => {
    const changeUserDetails = {
      banDuration: 90000,
      isActive: true,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.eq("Faulty values on ban");
    });
  });

  it("Try to ban user with too small time value", () => {
    const changeUserDetails = {
      banDuration: -1000,
      isActive: false,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.exist;
    });
  });

  it("Try to ban user with too high time value", () => {
    const changeUserDetails = {
      banDuration: 10000000,
      isActive: false,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.exist;
    });
  });

  it("Give user a ban as admin", () => {
    const changeUserDetails = {
      isActive: false,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(200);
      expect(res.body.isActive).to.eq(false);
    });
  });

  it("Try to login as banned user", () => {
    const loginCredentials = {
      email: firstNewUser.email,
      password: firstNewUser.password,
    };

    cy.request({
      method: "POST",
      url: `/api/users/login`,
      failOnStatusCode: false,
      body: loginCredentials,
    }).should(res => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq("You are banned forever");
    });
  });

  it("Unban user", () => {
    const changeUserDetails = {
      isActive: true,
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${firstNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(200);
      expect(res.body.isActive).to.eq(true);
    });
  });

  it("Change user details as admin", () => {
    const changeUserDetails = {
      role: "moderator",
    };

    cy.login(admin.email, admin.password);
    cy.request({
      method: "PUT",
      url: `/api/users/update/${thirdNewUserId}`,
      failOnStatusCode: false,
      body: changeUserDetails,
    }).should(res => {
      expect(res.status).to.eq(200);
      expect(res.body.role).to.eq("moderator");
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
      role: "user",
    };

    cy.login(admin.email, admin.password);
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
      role: "user",
    };

    cy.login(admin.email, admin.password);
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

  it("Try to delete user with false id as admin", () => {
    cy.login(admin.email, admin.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${123456789}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(404);
      expect(res.body.error).to.eq("User not found");
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

  it("Delete user as admin", () => {
    cy.login(admin.email, admin.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${thirdNewUserId}`,
    }).should(res => {
      expect(res.status).to.eq(200);
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

  it("Try to delete another admin as admin", () => {
    cy.login(admin.email, admin.password);
    cy.request({
      method: "DELETE",
      url: `/api/users/delete/${secondNewUserId}`,
      failOnStatusCode: false,
    }).should(res => {
      expect(res.status).to.eq(403);
      expect(res.body.error).to.eq("Cant delete other admins");
    });
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
