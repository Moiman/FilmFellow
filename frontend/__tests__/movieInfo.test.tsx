import { expect, test, afterEach } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { MovieInfo } from "@/components/movies/movieInfo";

const mockedMovie = {
  title: "Test Movie",
  directors: ["Director 1", "Director 2"],
  releaseYear: 2022,
  ageRestrictions: "PG-13",
  runtime: 150,
  overview: "This is a test movie overview",
  posterPath: "test_poster.jpg",
  voteAverage: 7.55,
};

afterEach(() => cleanup());

test("renders MovieInfo component with given movie data", () => {
  const { getByText } = render(<MovieInfo movie={mockedMovie} />);

  expect(getByText("Test Movie")).toBeDefined();
  expect(getByText("Directed by Director 1, Director 2")).toBeDefined();
  expect(getByText("2022")).toBeDefined();
  expect(getByText("PG-13")).toBeDefined();
  expect(getByText("2 h 30 min")).toBeDefined();
  expect(getByText("This is a test movie overview")).toBeDefined();
});

test('does not render "Directed by" when directors array is empty', () => {
  const movie = {
    ...mockedMovie,
    directors: [],
  };

  const { queryByText } = render(<MovieInfo movie={movie} />);

  expect(queryByText("Directed by")).toBeNull();
});

test("handles button clicks correctly", () => {
  const { getByText } = render(<MovieInfo movie={mockedMovie} />);
  const markAsWatchedButton = getByText("Mark as watched");
  const addToFavoritesButton = getByText("Add to favorites");
  const addToWatchlistButton = getByText("Add to watchlist");

  fireEvent.click(markAsWatchedButton);
  fireEvent.click(addToFavoritesButton);
  fireEvent.click(addToWatchlistButton);

  expect(getByText("Remove from watched")).toBeDefined();
  expect(getByText("Remove from favorites")).toBeDefined();
  expect(getByText("Remove from watchlist")).toBeDefined();
});

test("renders voteAverage correctly", () => {
  const { getByText } = render(<MovieInfo movie={mockedMovie} />);

  expect(getByText("7.6")).toBeDefined();
});
