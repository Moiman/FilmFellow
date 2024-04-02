/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect, describe, it } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("Route handler test", () => {
  it("/randomroute it should return 404 on route that doesnt exist", async () => {
    const response = await request(app).get("/randomroute");
    expect(response.statusCode).toBe(404);
  });
  it("/ should return 200 on valid address", async () => {
    const response = await request(app).get(`/movies/${278}`);
    expect(response.statusCode).toBe(200);
  });
});
