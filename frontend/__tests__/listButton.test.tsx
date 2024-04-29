import { cleanup, render, screen } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";

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

const { useRouter, mockedRouterPush } = vi.hoisted(() => {
  const mockedRouterPush = vi.fn();
  return {
    useRouter: () => ({ push: mockedRouterPush }),
    mockedRouterPush,
  };
});

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter,
  };
});

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

  test("navigates to list page when clicked", () => {
    screen.getByText(list.name).click();
    expect(mockedRouterPush).toHaveBeenCalledWith(`/users/${userId}/lists/${list.id}`);
  });
});
