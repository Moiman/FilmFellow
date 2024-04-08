import { describe, expect, it } from "vitest";
import { createMocks, createRequest } from "node-mocks-http";
import type { NextRequest } from "next/server";

import { GET as getMovieById } from "@/app/api/movies/[id]/route";
import { GET as getMovieReviewsById } from "@/app/api/movies/[id]/reviews/route";
import { GET as getMoviesByQuery } from "@/app/api/movies/route";
import type { MovieResponse } from "@/services/movieService";

type ApiRequest = NextRequest & ReturnType<typeof createRequest>;

describe("/api/movies/id", () => {
  it("Get movie by id successfully", async () => {
    const params = { id: "278" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getMovieById(req, { params });
    expect(response.status).toBe(200);
    const movie = await response.json();
    expect(movie.id).toEqual(278);
  });
  it("Try to get movie by wrong id", async () => {
    const params = { id: "123456789" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getMovieById(req, { params });
    expect(response.status).toBe(404);
  });
});

describe("/api/movies/id/reviews", () => {
  it("Get movie reviews by id successfully", async () => {
    const params = { id: "278" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getMovieReviewsById(req, { params });
    expect(response.status).toBe(200);
    const movieReviews = await response.json();
    expect(movieReviews[0].movie.id).toEqual(278);
    expect(movieReviews[0]).toHaveProperty("content");
    expect(movieReviews[0]).toHaveProperty("author");
  });
  it("Try to get movie reviews by wrong id", async () => {
    const params = { id: "123456789" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getMovieReviewsById(req, { params });
    expect(response.status).toBe(404);
  });
});

describe("/api/movies/?limit&genre&type", () => {
  it("api/movies/?limit=10&type=new&genre=drama test movie endpoint for returning movies with limit 10, type from newest to oldest and genre drama", async () => {
    const { req } = createMocks<ApiRequest>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=10&&type=new&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = (await response.json()) as MovieResponse[];
    expect(moviesWithQuery.length).toBe(10);
    expect(moviesWithQuery[0]).toHaveProperty("genres");
    const sortedMoviesByReleaseDate = moviesWithQuery.toSorted((a, b) => {
      return new Date(b.release_date!).getTime() - new Date(a.release_date!).getTime();
    });
    expect(sortedMoviesByReleaseDate[0].id).toEqual(moviesWithQuery[0].id);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });
  it("api/movies/?limit=15&type=popular&genre=drama test movie endpoint for returning movies with limit 15, type most popular first and genre drama", async () => {
    const { req } = createMocks<ApiRequest>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=15&&type=popular&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = (await response.json()) as MovieResponse[];
    expect(moviesWithQuery.length).toBe(15);
    expect(moviesWithQuery[0]).toHaveProperty("genres");
    const sortMoviesByPopularity = moviesWithQuery.toSorted((a, b) => b.popularity - a.popularity);
    expect(sortMoviesByPopularity[0].release_date).toEqual(moviesWithQuery[0].release_date);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });
  it("api/movies/?limit=20&type=bestrated&genre=drama test movie endpoint for returning movies with limit 20, type highest rated first and genre drama", async () => {
    const { req } = createMocks<ApiRequest>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=20&&type=bestrated&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = (await response.json()) as MovieResponse[];
    expect(moviesWithQuery.length).toBe(20);
    expect(moviesWithQuery[0]).toHaveProperty("genres");
    const sortMoviesByHighestRating = moviesWithQuery.toSorted((a, b) => b.vote_average - a.vote_average);
    expect(sortMoviesByHighestRating[0].id).toEqual(moviesWithQuery[0].id);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });

  it("api/movies/?limit=abcdefg&type=123&genre=123 test movie endpoint with faulty values", async () => {
    const { req } = createMocks<ApiRequest>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=abcdefg&type=123&genre=123`,
    });
    const response = await getMoviesByQuery(req);
    const moviesWithQuery = await response.json();
    expect(moviesWithQuery.error.message).toEqual("3 errors occurred");
    expect(moviesWithQuery.error.errors).toContain(
      'limit must be a `number` type, but the final value was: `NaN` (cast from the value `"abcdefg"`).',
    );
    expect(moviesWithQuery.error.errors).toContain("Only letters allowed");
    expect(response.status).toBe(400);
  });

  it("api/movies/?limit=10&type=new&genre=random test movie endpoint with genre that doesnt exist", async () => {
    const { req } = createMocks<ApiRequest>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=10&type=new&genre=random`,
    });
    const response = await getMoviesByQuery(req);
    const moviesWithQuery = await response.json();
    expect(moviesWithQuery.error).toContain("Movies not found");
    expect(response.status).toBe(404);
  });
});
