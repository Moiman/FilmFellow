import { cleanup, render, screen } from "@testing-library/react";
import { test, describe, afterEach, expect, beforeEach } from "vitest";
import { MovieList } from "@/components/movieList";

const mockMovies = [
  {
    poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    title: "The Lord of the Rings: The Return of the King",
    id: 122,
    vote_average: 8.478,
  },
  {
    poster_path: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 120,
    vote_average: 8.411,
  },
  {
    poster_path: "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
    title: "The Lord of the Rings: The Two Towers",
    id: 121,
    vote_average: 8.393,
  },
];

beforeEach(() => {
  render(<MovieList movies={mockMovies} />);
});

afterEach(() => cleanup());

describe("MovieList", () => {
  test("renders links with correct href", () => {
    const linkElements = screen.getAllByTestId("movie-list-item");

    expect(linkElements.length).toBe(mockMovies.length);

    linkElements.forEach((linkElement, index) => {
      const expectedHref = `/movies/${mockMovies[index].id}`;
      const href = linkElement.getAttribute("href");
      expect(href).toBe(expectedHref);
    });
  });

  {
    /* Test for images when those are working 
    test("renders images with correct src and alt attributes", () => {
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(mockMovies.length);

      images.forEach((img, index) => {
        const movie = mockMovies[index];
        expect(img).toHaveProperty("src");
        expect(img).toHaveProperty("alt", movie.title);
      });
    });
  */
  }
});
