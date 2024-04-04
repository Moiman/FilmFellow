import { test, expect, describe, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Sidebar } from "../components/sidebar";

afterEach(() => {
  cleanup();
});

describe("Sidebar", () => {
  test("renders children", () => {
    render(
      <Sidebar>
        <div>Child Component</div>
      </Sidebar>,
    );

    expect(screen.getByText("Child Component")).toBeDefined();
  });

  test("toggles isOpen state when icon button is clicked", () => {
    render(
      <Sidebar>
        <div>Child Component</div>
      </Sidebar>,
    );

    fireEvent.click(screen.getByTestId("toggle-button"));
    expect(screen.queryByText("Child Component")).toBeNull();

    fireEvent.click(screen.getByTestId("toggle-button"));
    expect(screen.queryByText("Child Component")).toBeDefined();
  });
});
