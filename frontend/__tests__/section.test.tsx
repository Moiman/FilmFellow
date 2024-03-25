import { expect, it, afterEach, describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Section } from "@/components/section";

afterEach(() => cleanup());

it("Renders Section component", () => {
  render(
    <Section header="Test Header">
      <div>Test Content</div>
    </Section>,
  );
});

describe("Section header", () => {
  it("Renders header as string", () => {
    render(
      <Section header="Test Header">
        <div>Test Content</div>
      </Section>,
    );
    expect(screen.getByText("Test Header")).toBeDefined();
  });

  it("Renders header as h3 if it's a string", () => {
    render(
      <Section header="Test Header">
        <div>Test Content</div>
      </Section>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBeDefined();
  });

  it("Renders header as React element", () => {
    const headerElement = <h1>Test Header</h1>;

    render(
      <Section header={headerElement}>
        <div>Test Content</div>
      </Section>,
    );
    expect(screen.getByText("Test Header")).toBeDefined();
  });

  it("Renders header as right React element", () => {
    const headerElement = <h1>Test Header</h1>;
    render(
      <Section header={headerElement}>
        <div>Test Content</div>
      </Section>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  });
});

describe("Section content", () => {
  it("Renders content", () => {
    render(
      <Section header="Test Header">
        <div>Test Content</div>
      </Section>,
    );
    expect(screen.getByText("Test Content")).toBeDefined();
  });
});
