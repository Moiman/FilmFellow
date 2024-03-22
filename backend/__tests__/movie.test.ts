/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("Movie route", () => {
  it("/movies/id try to get movie data with wrong id", async () => {
    const response = await request(app).get(`/movies/${123456789}`);
    expect(response.statusCode).toBe(404);
  });
  it("/movies/id successfully get moviedata", async () => {
    const response = await request(app).get(`/movies/${278}`);
    expect(response.body).toHaveProperty("id");
    expect(response.statusCode).toBe(200);
  });
  it("/movies/id/reviews try to get movie reviews with wrong id", async () => {
    const response = await request(app).get(`/movies/${123456789}`);
    expect(response.statusCode).toBe(404);
  });
  it("/movies/id/reviews get movie reviews successfully", async () => {
    const response = await request(app).get(`/movies/${278}/reviews`);
    expect(response.body[0]).toHaveProperty("author");
    expect(response.body[0]).toHaveProperty("content");
    expect(response.statusCode).toBe(200);

  });
});
