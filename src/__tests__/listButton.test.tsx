import { cleanup, render, screen } from "@testing-library/react";
import { expect, test, describe, beforeEach, afterEach } from "vitest";

import { ListButton } from "@/app/users/[id]/listButton";
import type { getUserLists } from "@/services/listService";

type ListButtonProps = Awaited<ReturnType<typeof getUserLists>>[0];

const list: ListButtonProps = {
  id: 1,
  name: "Test List",
  listMovies: [{ movie: { poster_path: "Movie 1" } }, { movie: { poster_path: "Movie 2" } }],
  _count: {
    listMovies: 2,
  },
};

beforeEach(() => {
  render(<ListButton list={list} />);
});

afterEach(() => cleanup());

describe("ListButton", () => {
  test("renders list name and movie count", () => {
    expect(screen.getByText(list.name)).toBeDefined();
    expect(screen.getByText(list.listMovies.length.toString())).toBeDefined();
  });

  test("list have right href", () => {
    const linkElement = screen.getByRole("link");
    const expectedHref = `/lists/${list.id}`;
    const href = linkElement.getAttribute("href");
    expect(href).toBe(expectedHref);
  });
});
