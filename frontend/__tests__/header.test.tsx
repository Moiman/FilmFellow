import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Header, Links } from "@/components/header";
import { SessionProvider } from "next-auth/react";

beforeAll(() => {
  render(
    <SessionProvider session={null}>
      <Header />
    </SessionProvider>,
  );
});

afterAll(() => {
  cleanup();
});

describe("Header rendering", () => {
  test("Checks if header is rendered", () => {
    expect(Header).toBeDefined();
  });

  test("Checks if all nav links are rendered", () => {
    Links.forEach(({ text }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).not.toBeNull();
      expect(linkElement).toBeDefined();
    });
  });

  test("Checks if all links have correct href attribute", () => {
    Links.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement.getAttribute("href")).toBe(href);
    });
  });

  test("Checks if search input is rendered", () => {
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).not.toBeNull();
    expect(searchInput).toBeDefined();
  });
});

describe("Placeholder search input", () => {
  test("Checks if search input is empty by default", () => {
    const searchInput = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(searchInput.value).toBe("");
  });

  test("Checks if search input value changes correctly", () => {
    const searchInput = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "testing" } });
    expect(searchInput.value).toBe("testing");
  });
});
