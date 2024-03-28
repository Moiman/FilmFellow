"use client";

import { expect, test, describe, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Dropdown } from "@/components/dropdown";

afterEach(() => cleanup());

const defaultHeaderText = "Choose one";

describe("Dropdown component", () => {
  test("Renders with default props when optional props are not provided", () => {
    const { getByText, queryByText } = render(
      <Dropdown>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Dropdown>,
    );

    expect(getByText(defaultHeaderText)).toBeDefined();
    expect(queryByText("Option 1")).toBeNull();

    fireEvent.click(getByText(defaultHeaderText));
    expect(getByText("Option 1")).toBeDefined();
    expect(getByText("Option 2")).toBeDefined();
    expect(getByText("Option 3")).toBeDefined();

    fireEvent.click(getByText(defaultHeaderText));
    expect(queryByText("Option 1")).toBeNull();
  });

  test("Renders custom button correctly", () => {
    const customButton = <button>Custom Button</button>;

    const { getByText, queryByText } = render(
      <Dropdown button={customButton}>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Dropdown>,
    );

    expect(queryByText(defaultHeaderText)).toBeNull();
    expect(getByText("Custom Button")).toBeDefined();

    fireEvent.click(getByText("Custom Button"));
    expect(getByText("Option 1")).toBeDefined();
  });

  test("Dropdown opens and closes properly", async () => {
    const { getByText, queryByText } = render(
      <Dropdown>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Dropdown>,
    );

    fireEvent.click(getByText(defaultHeaderText));
    expect(getByText("Option 1")).toBeDefined();

    fireEvent.click(getByText(defaultHeaderText));
    expect(queryByText("Option 1")).toBeNull();
  });
});
