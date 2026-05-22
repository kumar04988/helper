import Fastify from "fastify";
import cors from "@fastify/cors";
import { pgClient } from "./plugins/db";
import { jwtAuth } from "./plugins/jwt";
import { todoRoutes } from "./routes/todos";
import { authRoutes } from "./routes/auth";

const server = Fastify({ logger: true });

server.register(cors, { origin: true });
server.register(pgClient);
server.register(jwtAuth);
server.register(authRoutes, { prefix: "/auth" });
server.register(todoRoutes, { prefix: "/todos" });

server.get("/health", async () => ({ status: "ok" }));

const start = async () => {
  try {
    await server.listen({
      port: Number(process.env.PORT ?? 4000),
      host: "0.0.0.0",
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
