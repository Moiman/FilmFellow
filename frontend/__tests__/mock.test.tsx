import { Session, getServerSession } from "next-auth";
import { vi } from "vitest";
import {type Mock} from "vitest";
import { describe, test, expect, beforeAll, afterAll, beforeEach, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/header";
import { SessionProvider, useSession } from "next-auth/react";
import { headers } from "next/headers";
import { POST } from "@/app/api/login/route";
import {GET} from "@/app/api/testing/route";

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

describe("Mock Test", () => {
  it("Logged in user", async () => {
    const mockSession = {
      expires: "1",
      user: { email: "testemail@gmail.com", username: "testuser", role: "guest" },
    };

    (getServerSession as Mock).mockReturnValueOnce([mockSession, false]);

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>,
    );

    expect(screen.getByRole("heading", {level: 4, name: "FilmFellow" })).toBeDefined();
  });

  it("api/testing endpoint", async () => {

        const response = await fetch( "http://localhost:3000/api/testing", {
          method: "GET",
          // headers: {
         //    Accept: "application/json",
         //    "Content-Type": "application/json",
         //  },
         // headers: headers()
        });
        expect(response.status).toBe(200);

  });
})
