/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("Movie route", () => {
  it("/movies/:id try to get movie data with wrong id", async () => {
    const response = await request(app).get(`/movies/${123456789}`);
    expect(response.statusCode).toBe(404);
  });

  it("/movies/:id successfully get moviedata", async () => {
    const response = await request(app).get(`/movies/${278}`);
    expect(response.body).toHaveProperty("id");
    expect(response.statusCode).toBe(200);
  });

  it("/movies/:id/reviews try to get movie reviews with wrong id", async () => {
    const response = await request(app).get(`/movies/${123456789}`);
    expect(response.statusCode).toBe(404);
  });

  it("/movies/id/reviews get movie reviews successfully", async () => {
    const response = await request(app).get(`/movies/${278}/reviews`);
    expect(response.body[0]).toHaveProperty("author");
    expect(response.body[0]).toHaveProperty("content");
    expect(response.statusCode).toBe(200);

  });

  it("/movies/?limit=10&type=new&genre=drama test movie endpoint for returning movies with limit 10, type from newest to oldest and genre drama", async () => {
    const response = await request(app).get(`/movies/?limit=10&type=new&genre=drama`);
    expect(response.body.length).toBe(10);
    expect(response.body[0]).toHaveProperty("genres");
    expect(response.statusCode).toBe(200);
  });

  it("/movies/?limit=abcdefg&type=123&genre=123 test movie endpoint with faulty values", async () => {
    const response = await request(app).get(`/movies/?limit=abcdefg&type=123&genre=123`);
    expect(response.body.error).toContain("3 errors occurred");
    expect(response.body.limit).toContain("limit must be a `number` type, but the final value was: `NaN` (cast from the value `\"abcdefg\"`).");
    expect(response.body.type).toContain("Only letters allowed");
    expect(response.body.genre).toContain("Only letters allowed");
    expect(response.statusCode).toBe(400);
  });

  it("/movies/?limit=10&type=new&genre=random test movie endpoint with genre that doesnt exist", async () => {
    const response = await request(app).get(`/movies/?limit=10&type=new&genre=random`);
    expect(response.body.error).toContain("Movies not found");
    expect(response.statusCode).toBe(404);
  });
});
