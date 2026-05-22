import { describe, it, expect } from "vitest";
import Fastify from "fastify";

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const server = Fastify();
    server.get("/health", async () => ({ status: "ok" }));

    const response = await server.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });
});
