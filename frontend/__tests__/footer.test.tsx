import { afterAll, beforeAll, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Footer } from "../components/footer";

beforeAll(() => {
  render(<Footer />);
});

afterAll(() => {
  cleanup();
});

it("checks if footer is rendered", () => {
  expect(Footer).toBeDefined();
});

it("checks if link to project GitHub exists", () => {
  const linkElement = screen.getByText("GitHub");
  expect(linkElement).not.toBeNull();
  expect(linkElement).toBeDefined();
});

it("checks if all links have correct href attribute", () => {
  const linkElement = screen.getByText("GitHub");
  expect(linkElement.getAttribute("href")).toBe("https://github.com/Moiman/FilmFellow/");
});
