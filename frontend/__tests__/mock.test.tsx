import { getServerSession } from "next-auth";
import { vi } from "vitest";
import { type Mock } from "vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { createMocks, createRequest, createResponse } from "node-mocks-http";
import { GET as getMovieById } from "@/app/api/movies/[id]/route";
import { GET as getMovieReviewsById } from "@/app/api/movies/[id]/reviews/route";
import { GET as getMoviesByQuery } from "@/app/api/movies/route";
import { GET as getPersonById } from "@/app/api/persons/[id]/route";
import { NextRequest, NextResponse } from "next/server";

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
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: string[];
}

type ApiRequest = NextRequest & ReturnType<typeof createRequest>;
type APiResponse = NextResponse & ReturnType<typeof createResponse>;

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

describe("Mock Test", () => {
  it("Show sign out button when mocking session", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "testemail@gmail.com", username: "testuser", role: "user", id: 1 },
    };

    (getServerSession as Mock).mockReturnValueOnce([mockSession, false]);

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>,
    );
    const button = screen.getByRole("button", { name: "Sign Out" });
    expect(screen.getByRole("heading", { level: 4, name: "FilmFellow" })).toBeDefined();
    expect(button).toBeDefined();
  });
});

describe("/api/movies/id", () => {
  it("Get movie by id successfully", async () => {
    const params = { id: "278" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getMovieById(req, { params });
    expect(response.status).toBe(200);
    const movie = await response.json();
    expect(movie.id).toEqual(278);
  });
  it("Try to get movie by wrong id", async () => {
    const params = { id: "123456789" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getMovieById(req, { params });
    expect(response.status).toBe(404);
  });
});

describe("/api/movies/id/reviews", () => {
  it("Get movie reviews by id successfully", async () => {
    const params = { id: "278" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
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

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getMovieReviewsById(req, { params });
    expect(response.status).toBe(404);
  });
});

describe("/api/movies/?limit&genre&type", () => {
  it("api/movies/?limit=10&type=new&genre=drama test movie endpoint for returning movies with limit 10, type from newest to oldest and genre drama", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=10&&type=new&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = await response.json();
    const responseBody = moviesWithQuery as Movie[];
    expect(responseBody.length).toBe(10);
    expect(responseBody[0]).toHaveProperty("genres");
    const sortMoviesByReleaseDate = responseBody.sort((a, b) => {
      return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    });
    expect(sortMoviesByReleaseDate[0].release_date).toEqual(moviesWithQuery[0].release_date);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });
  it("api/movies/?limit=15&type=popular&genre=drama test movie endpoint for returning movies with limit 15, type most popular first and genre drama", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=15&&type=popular&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = await response.json();
    const responseBody = moviesWithQuery as Movie[];
    expect(responseBody.length).toBe(15);
    expect(responseBody[0]).toHaveProperty("genres");
    const sortMoviesByPopularity = responseBody.sort((a, b) => a.popularity - b.popularity);
    expect(sortMoviesByPopularity[0].release_date).toEqual(moviesWithQuery[0].release_date);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });
  it("api/movies/?limit=20&type=bestrated&genre=drama test movie endpoint for returning movies with limit 20, type highest rated first and genre drama", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=20&&type=bestrated&genre=drama`,
    });
    const response = await getMoviesByQuery(req);

    const moviesWithQuery = await response.json();
    const responseBody = moviesWithQuery as Movie[];
    expect(responseBody.length).toBe(20);
    expect(responseBody[0]).toHaveProperty("genres");
    const sortMoviesByHighestRating = responseBody.sort((a, b) => a.vote_average - b.vote_average);
    expect(sortMoviesByHighestRating[0].release_date).toEqual(moviesWithQuery[0].release_date);
    expect(moviesWithQuery[0].genres).toContain("Drama");
    expect(response.status).toBe(200);
  });

  it("api/movies/?limit=abcdefg&type=123&genre=123 test movie endpoint with faulty values", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
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
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
      url: `${process.env.NEXTAUTH_URL}/api/movies?limit=10&type=new&genre=random`,
    });
    const response = await getMoviesByQuery(req);
    const moviesWithQuery = await response.json();
    expect(moviesWithQuery.error).toContain("Movies not found");
    expect(response.status).toBe(404);
  });
});

describe("Persons route", () => {
  it("api/persons/:id try to get person data with wrong id", async () => {
    const params = { id: "123456789" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });
    expect(response.status).toBe(404);
  });

  it("api/persons/:id successfully get persondata", async () => {
    const params = { id: "504" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });

    const person = await response.json();
    expect(person).toHaveProperty("id");
    expect(person).toHaveProperty("place_of_birth");
    expect(response.status).toBe(200);
  });
});
