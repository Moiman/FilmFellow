import { getServerSession } from "next-auth";
import { vi } from "vitest";
import {type Mock} from "vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";


vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

describe("Mock Test", () => {
  it("Logged in user", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "testemail@gmail.com", username: "testuser", role: "guest", id: 1 },
    };

    (getServerSession as Mock).mockReturnValueOnce([mockSession, false]);

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>,
    );
      const button = screen.getByRole("button", { name: "Sign Out" });
    expect(screen.getByRole("heading", {level: 4, name: "FilmFellow" })).toBeDefined();
    expect(button).toBeDefined();
  });
})
