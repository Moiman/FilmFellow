import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("user route", () => {
  it("/users/createuser without values", async () => {

  const response = await request(app)
    .post("/users/createuser")
    .set("Accept", "application/json")
    .send({});
  expect(response.statusCode).toBe(400);
  });

})
