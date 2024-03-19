import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Header, Links } from "../components/Header";

beforeAll(() => {
  render(<Header />);
});

afterAll(() => {
  cleanup();
});

describe("Header rendering", () => {
  it("checks if header is rendered", () => {
    expect(Header).toBeDefined();
  });

  it("checks if all nav links are rendered", () => {
    Links.forEach(({ text }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).not.toBeNull();
      expect(linkElement).toBeDefined();
    });
  });

  it("checks if all links have correct href attribute", () => {
    Links.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement.getAttribute("href")).toBe(href);
    });
  });
});
