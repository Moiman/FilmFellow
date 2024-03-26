/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("Persons route", () => {
  it("/persons/:id try to get person data with wrong id", async () => {
    const response = await request(app).get(`/persons/${123456789}`);
    expect(response.statusCode).toBe(404);
  });

  it("/persons/:id successfully get persondata", async () => {
    const response = await request(app).get(`/persons/${504}`);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("place_of_birth");
    expect(response.statusCode).toBe(200);
  });
});
