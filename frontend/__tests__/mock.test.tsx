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
import { NextRequest, NextResponse } from "next/server";

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
    expect(movie.id).toEqual(278)
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
  it("/movies/?limit=10&type=new&genre=drama test movie endpoint for returning movies with limit 10, type from newest to oldest and genre drama", async () => {

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
      url: "http://localhost:3000/api/movies?limit=5&genre=drama&type=new",
      params: {
        limit: "10",
        type: "new",
        genre: "drama"
      },
      query: {
        limit: "10",
        type: "new",
        genre: "drama"
      }

    });
    console.log(req)
    const response = await getMoviesByQuery(req);
    console.log(await response.json());
    expect(response.status).toBe(200);
    const moviesWithQuery = await response.json();
    console.log(moviesWithQuery)
  });
  it("/movies/?limit=15&type=popular&genre=drama test movie endpoint for returning movies with limit 15, type most popular first and genre drama", async () => {
    const params = { id: "123456789" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getMoviesByQuery(req);
    expect(response.status).toBe(404);
  });
  it("/movies/?limit=20&type=bestrated&genre=drama test movie endpoint for returning movies with limit 20, type highest rated first and genre drama", async () => {
    const params = { id: "123456789" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getMoviesByQuery(req);
    expect(response.status).toBe(404);
  });
});
