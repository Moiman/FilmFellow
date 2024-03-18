import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("auth route", () => {
  it("/auth/register without values", async () => {
    const response = await request(app).post("/auth/register").send({});
    expect(response.statusCode).toBe(400);
  });
});
