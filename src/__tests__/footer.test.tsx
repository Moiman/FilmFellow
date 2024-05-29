import { afterAll, beforeAll, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer";

const githubLink = { text: "GitHub", href: "https://github.com/Moiman/FilmFellow/" };

beforeAll(() => {
  render(<Footer />);
});

afterAll(() => {
  cleanup();
});

test("Checks if footer is rendered", () => {
  expect(Footer).toBeDefined();
});

test("renders GitHub link with the correct href", () => {
  const githubLink = screen.getByRole("link", { name: "GitHub" });
  expect(githubLink).toHaveProperty("href", "https://github.com/Moiman/FilmFellow/");
});

test("renders The Movie Database logo with the correct href and alt text", () => {
  const tmdbLink = screen.getByRole("link", { name: /the movie database/i });
  expect(tmdbLink).toHaveProperty("href", "https://www.themoviedb.org/");
  const tmdbImage = screen.getByAltText("The Movie Database");
  expect(tmdbImage).toHaveProperty("src", expect.stringContaining("/logos/tmdb_logo.svg"));
});
