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

test("Checks if link to project GitHub exists", () => {
  const linkElement = screen.getByText(githubLink.text);
  expect(linkElement).not.toBeNull();
  expect(linkElement).toBeDefined();
});

test("Checks if all links have correct href attribute", () => {
  const linkElement = screen.getByText(githubLink.text);
  expect(linkElement.getAttribute("href")).toBe(githubLink.href);
});
