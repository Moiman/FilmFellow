import { afterAll, beforeAll, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Footer } from "../components/footer";

beforeAll(() => {
  render(<Footer />);
});

afterAll(() => {
  cleanup();
});

const githubLink = { text: "GitHub", href: "https://github.com/Moiman/FilmFellow/" };
const linkElement = screen.getByText(githubLink.text);

it("checks if footer is rendered", () => {
  expect(Footer).toBeDefined();
});

it("checks if link to project GitHub exists", () => {
  expect(linkElement).not.toBeNull();
  expect(linkElement).toBeDefined();
});

it("checks if all links have correct href attribute", () => {
  expect(linkElement.getAttribute("href")).toBe(githubLink.href);
});
