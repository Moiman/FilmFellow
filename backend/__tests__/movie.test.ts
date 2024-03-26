/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: string[];
}

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
    const response = await request(app).get(`/movies/${123456789}/reviews`);
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
    const responseBody = response.body as Movie[];
    const sortMoviesByReleaseDate = responseBody.sort((a, b) => {
      return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    });
    expect(sortMoviesByReleaseDate[0].release_date).toEqual(response.body[0].release_date);
    expect(response.body[0].genres).toContain("Drama");
    expect(response.statusCode).toBe(200);
  });

  it("/movies/?limit=15&type=popular&genre=drama test movie endpoint for returning movies with limit 15, type most popular first and genre drama", async () => {
    const response = await request(app).get(`/movies/?limit=15&type=popular&genre=drama`);
    expect(response.body.length).toBe(15);
    expect(response.body[0]).toHaveProperty("genres");
    const responseBody = response.body as Movie[];
    const sortMoviesByPopularity = responseBody.sort((a, b) => a.popularity - b.popularity);
    expect(sortMoviesByPopularity[0].popularity).toEqual(response.body[0].popularity);
    expect(response.body[0].genres).toContain("Drama");
    expect(response.statusCode).toBe(200);
  });

  it("/movies/?limit=20&type=bestrated&genre=drama test movie endpoint for returning movies with limit 20, type highest rated first and genre drama", async () => {
    const response = await request(app).get(`/movies/?limit=20&type=bestrated&genre=drama`);
    expect(response.body.length).toBe(20);
    expect(response.body[0]).toHaveProperty("genres");
    const responseBody = response.body as Movie[];
    const sortMoviesByHighestRating = responseBody.sort((a, b) => a.vote_average - b.vote_average);
    expect(sortMoviesByHighestRating[0].vote_average).toEqual(response.body[0].vote_average);
    expect(response.body[0].genres).toContain("Drama");
    expect(response.statusCode).toBe(200);
  });

  it("/movies/?limit=abcdefg&type=123&genre=123 test movie endpoint with faulty values", async () => {
    const response = await request(app).get(`/movies/?limit=abcdefg&type=123&genre=123`);
    expect(response.body.error).toContain("3 errors occurred");
    expect(response.body.limit).toContain(
      'limit must be a `number` type, but the final value was: `NaN` (cast from the value `"abcdefg"`).',
    );
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
