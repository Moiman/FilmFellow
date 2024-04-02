/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("Auth route", () => {
  const user = {
    username: "",
    email: "",
    id: 0,
  };

  it("/auth/register without values", async () => {
    const response = await request(app).post("/auth/register").send({});
    expect(response.statusCode).toBe(400);
  });

  it("/auth/register with false inputs", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "random.com",
      username: "R",
      password: "random",
    });
    expect(response.statusCode).toBe(400);
  });

  it("/auth/register successfully", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "random@gmail.com",
      username: "Random",
      password: "Randomi!1",
    });
    user.id = response.body.id;
    user.email = response.body.email;
    user.username = response.body.username;

    expect(response.statusCode).toBe(200);
  });

  it("/auth/login try to login with wrong user credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "email@gmail.com",
      password: "Randomi!1",
    });
    expect(response.statusCode).toBe(400);
  });

  it("/auth/login successfully", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "random@gmail.com",
      password: "Randomi!1",
    });
    user.id = response.body.id;
    user.email = response.body.email;
    user.username = response.body.username;
    expect(response.body).toHaveProperty("email");
    expect(response.statusCode).toBe(200);
  });

  it("/auth/update try to update without values", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({});
    expect(response.statusCode).toBe(400);
  });

  it("/auth/update try to update user with false id", async () => {
    const response = await request(app).put(`/auth/update/${123456789}`).send({
      email: "random@gmail.com",
      username: "RandomUser",
      password: "Randomi!1",
    });
    expect(response.statusCode).toBe(404);
  });

  it("/auth/update try to update username to one that already exists", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({
      username: "Random",
    });
    expect(response.statusCode).toBe(409);
  });

  it("/auth/update try to update email to one that already exists", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({
      email: "random@gmail.com",
    });
    expect(response.statusCode).toBe(409);
  });

  it("/auth/update try to change user role with false role that is not supported", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({
      role: "superadmin",
    });
    expect(response.statusCode).toBe(400);
  });

  it("/auth/update try to change user role without admin role", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({
      role: "admin",
    });
    expect(response.statusCode).toBe(400);
  });

  it("/auth/update change user details successfully", async () => {
    const response = await request(app).put(`/auth/update/${user.id}`).send({
      email: "newrandom@gmail.com",
      username: "NewRandomUser",
      password: "NewRandomi!1",
    });
    expect(response.statusCode).toBe(200);
  });

  it("/auth/register with email that already exists", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "newrandom@gmail.com",
      username: "Random",
      password: "Randomi!1",
    });
    expect(response.statusCode).toBe(409);
  });

  it("/auth/delete delete user succeessfully", async () => {
    const response = await request(app).delete(`/auth/delete/${user.id}`);
    expect(response.statusCode).toBe(200);
  });

  it("/auth/delete try to delete user with wrong id", async () => {
    const response = await request(app).delete(`/auth/delete/${123}`);
    expect(response.statusCode).toBe(404);
  });
});
