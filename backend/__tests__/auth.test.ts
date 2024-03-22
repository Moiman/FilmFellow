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

  it("/auth/register with email that already exists", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "random@gmail.com",
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
