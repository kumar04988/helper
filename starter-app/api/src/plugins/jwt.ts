import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user: { id: string; email: string };
  }
}

export const jwtAuth = fp(async (server) => {
  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const header = request.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
        return reply
          .code(401)
          .send({ error: "Missing or malformed token", code: "UNAUTHORIZED" });
      }
      try {
        const token = header.slice(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
          sub: string;
          email: string;
        };
        request.user = { id: payload.sub, email: payload.email };
      } catch {
        return reply
          .code(401)
          .send({ error: "Invalid or expired token", code: "UNAUTHORIZED" });
      }
    },
  );
});
