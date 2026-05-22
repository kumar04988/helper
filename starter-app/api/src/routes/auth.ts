import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRoutes: FastifyPluginAsync = async (server) => {
  // POST /auth/register
  server.post("/register", async (request, reply) => {
    const body = registerSchema.parse(request.body);

    const existing = await server.pg.query(
      "SELECT id FROM users WHERE email = $1",
      [body.email],
    );
    if ((existing.rowCount ?? 0) > 0) {
      return reply
        .code(409)
        .send({ error: "Email already registered", code: "CONFLICT" });
    }

    const hash = await bcrypt.hash(body.password, 12);
    const result = await server.pg.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
      [body.email, hash],
    );
    reply.code(201);
    return result.rows[0];
  });

  // POST /auth/login
  server.post("/login", async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const result = await server.pg.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [body.email],
    );
    if ((result.rowCount ?? 0) === 0) {
      return reply
        .code(401)
        .send({ error: "Invalid credentials", code: "UNAUTHORIZED" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(body.password, user.password_hash);
    if (!valid) {
      return reply
        .code(401)
        .send({ error: "Invalid credentials", code: "UNAUTHORIZED" });
    }

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );
    return { accessToken };
  });

  // GET /auth/me  (protected)
  server.get(
    "/me",
    { preHandler: [server.authenticate] },
    async (request) => {
      const result = await server.pg.query(
        "SELECT id, email, created_at FROM users WHERE id = $1",
        [request.user.id],
      );
      return result.rows[0];
    },
  );
};
