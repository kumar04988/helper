import { describe, it, expect } from "vitest";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

describe("todo schema", () => {
  it("accepts a valid todo", () => {
    expect(todoSchema.parse({ title: "Buy milk" })).toEqual({ title: "Buy milk" });
  });

  it("rejects an empty title", () => {
    expect(() => todoSchema.parse({ title: "" })).toThrow();
  });

  it("accepts optional completed flag", () => {
    const result = todoSchema.parse({ title: "Test", completed: true });
    expect(result.completed).toBe(true);
  });
});

describe("register schema", () => {
  it("accepts valid credentials", () => {
    const result = registerSchema.parse({ email: "user@example.com", password: "secret123" });
    expect(result.email).toBe("user@example.com");
  });

  it("rejects an invalid email", () => {
    expect(() =>
      registerSchema.parse({ email: "not-an-email", password: "secret123" }),
    ).toThrow();
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(() =>
      registerSchema.parse({ email: "user@example.com", password: "short" }),
    ).toThrow();
  });
});
