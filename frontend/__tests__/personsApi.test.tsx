import { describe, expect, it } from "vitest";
import { createMocks, createRequest } from "node-mocks-http";
import type { NextRequest } from "next/server";
import { GET as getPersonById } from "@/app/api/persons/[id]/route";

type ApiRequest = NextRequest & ReturnType<typeof createRequest>;

describe("Persons route", () => {
  it("api/persons/:id try to get person data with wrong id", async () => {
    const params = { id: "123456789" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });
    expect(response.status).toBe(404);
  });

  it("api/persons/:id try to get person data with negative id", async () => {
    const params = { id: "-1" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });
    expect(response.status).toBe(400);
  });
  it("api/persons/:id try to get person data with character", async () => {
    const params = { id: "a" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });
    expect(response.status).toBe(400);
  });
  it("api/persons/:id successfully get persondata", async () => {
    const params = { id: "504" };

    const { req } = createMocks<ApiRequest>({
      method: "GET",
    });

    const response = await getPersonById(req, { params });

    const person = await response.json();
    expect(person).toHaveProperty("id");
    expect(person).toHaveProperty("place_of_birth");
    expect(response.status).toBe(200);
  });
});
