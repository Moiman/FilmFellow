import { cleanup, render, screen } from "@testing-library/react";
import { expect, test, describe, beforeEach, afterEach } from "vitest";

import { ListButton } from "@/components/users/listButton";

const userId = 1;
const list = {
  id: 1,
  name: "Test List",
  movies: [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
  ],
};

beforeEach(() =>
  render(
    <ListButton
      userId={userId}
      list={list}
    />,
  ),
);

afterEach(() => cleanup());

describe("ListButton", () => {
  test("renders list name and movie count", () => {
    expect(screen.getByText(list.name)).toBeDefined();
    expect(screen.getByText(list.movies.length.toString())).toBeDefined();
  });

  test("list have right href", () => {
    const linkElement = screen.getByRole("link");
    const expectedHref = `/users/${userId}/lists/${list.id}`;
    const href = linkElement.getAttribute("href");
    expect(href).toBe(expectedHref);
  });
});
