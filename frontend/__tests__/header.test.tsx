import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Header, Links } from "../components/header";

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

  it("checks if search input is rendered", () => {
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).not.toBeNull();
    expect(searchInput).toBeDefined();
  });
});

describe("Placeholder search input", () => {
  it("checks if search input is empty by default", () => {
    const searchInput = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(searchInput.value).toBe("");
  });

  it("checks if search input value changes correctly", () => {
    const searchInput = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "testing" } });
    expect(searchInput.value).toBe("testing");
  });
});
