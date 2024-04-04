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
import { POST as register } from "@/app/api/register/route";
import { POST as login } from "@/app/api/login/route";
import { DELETE as deleteUser } from "@/app/api/delete/[id]/route";
import { PUT as updateUser } from "@/app/api/update/[id]/route";
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
  it("/movies/?limit=10&type=new&genre=drama test movie endpoint for returning movies with limit 10, type from newest to oldest and genre drama", async () => {
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
  it("/movies/?limit=15&type=popular&genre=drama test movie endpoint for returning movies with limit 15, type most popular first and genre drama", async () => {
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
  it("/movies/?limit=20&type=bestrated&genre=drama test movie endpoint for returning movies with limit 20, type highest rated first and genre drama", async () => {
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

  it("/movies/?limit=abcdefg&type=123&genre=123 test movie endpoint with faulty values", async () => {
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

  it("/movies/?limit=10&type=new&genre=random test movie endpoint with genre that doesnt exist", async () => {
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
  it("/persons/:id try to get person data with wrong id", async () => {
    const params = { id: "123456789" };

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });
    expect(response.status).toBe(404);
  });

  it("/persons/:id successfully get persondata", async () => {
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

describe("Auth route", () => {
  const user = {
    username: "",
    email: "",
    id: 0,
  };

  it("/auth/register without values", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: {},
    });

    const response = await register(req);
    expect(response.status).toBe(400);
  });

  it("/auth/register with false inputs", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "random.com", username: "R", password: "random" },
    });
    const response = await register(req);
    expect(response.status).toBe(400);
  });

  it("/auth/register successfully", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "random@gmail.com", username: "Random", password: "Randomi!1" },
    });
    const response = await register(req);
    // console.log(response);
    const registeredUser = await response.json();
    console.log(registeredUser);
    user.id = registeredUser.id;
    user.email = registeredUser.email;
    user.username = registeredUser.username;
    expect(response.status).toBe(200);
  });
  /*
  it("/auth/login try to login with wrong user credentials", async () => {
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "email@gmail.com", password: "Randomi!1" },
    });
    const response = await login(req, res);

    expect(response.status).toBe(400);
  });

  it("/auth/login successfully", async () => {

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "random@gmail.com", password: "Randomi!1" },
    });
    const response = await login(req, res);
    const loggedInUser = await response.json();
    user.id = loggedInUser.id;
    user.email = loggedInUser.email;
    user.username = loggedInUser.username;
    expect(loggedInUser).toHaveProperty("email");
    expect(response.status).toBe(200);
  });

  it("/auth/update try to update without values", async () => {
    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: {},
    });

    const response = await updateUser(req, {params});
    expect(response.status).toBe(400);
  });

  it("/auth/update try to update user with false id", async () => {

    const params = { id: "123456789" };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "random@gmail.com", username: "RandomUser", password: "Randomi!1" },
    });

    const response = await updateUser(req, { params });
    expect(response.status).toBe(404);
  });

  it("/auth/update try to update username to one that already exists", async () => {
    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { username: "Random" },
    });

    const response = await updateUser(req, { params });
    expect(response.status).toBe(409);
  });

  it("/auth/update try to update email to one that already exists", async () => {
    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "random@gmail.com" },
    });

    const response = await updateUser(req, { params });
    expect(response.status).toBe(409);
  });

  it("/auth/update try to change user role with false role that is not supported", async () => {
    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { role: "superadmin" },
    });

    const response = await updateUser(req, { params });
    expect(response.status).toBe(400);
  });

  it("/auth/update try to change user role without admin role", async () => {
    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { role: "admin" },
    });

    const response = await updateUser(req, { params });
    expect(response.status).toBe(400);
  });

  it("/auth/update change user details successfully", async () => {

    const params = { id: user.id.toString() };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "newrandom@gmail.com", username: "NewRandomUser", password: "NewRandomi!1" },
    });

    const response = await updateUser(req, { params });
    const updatedUser = await response.json();
    expect(response.status).toBe(200);
    expect(updatedUser.email).toEqual("newrandom@gmail.com")
  });

  it("/auth/register with email that already exists", async () => {

    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "POST",
      body: { email: "newrandom@gmail.com", username: "Random", password: "Randomi!1" },
    });
    const response = await register(req, res);
    expect(response.status).toBe(409);
  });

  it("/auth/delete delete user succeessfully", async () => {
    const params = {id: user.id.toString()}
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "DELETE"
    });
    const response = await deleteUser(req, {params});
    expect(response.status).toBe(200);
  });

  it("/auth/delete try to delete user with wrong id", async () => {
    const params = { id: "123456789" };
    const { req, res } = createMocks<ApiRequest, APiResponse>({
      method: "DELETE",
    });
    const response = await deleteUser(req, { params });
    expect(response.status).toBe(404);
  });
  */
});
