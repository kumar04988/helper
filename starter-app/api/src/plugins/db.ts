import fp from "fastify-plugin";
import { Pool } from "pg";

export const pgClient = fp(async (server) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  await pool.query("SELECT 1");
  server.decorate("pg", pool);

  server.addHook("onClose", async () => {
    await pool.end();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
  }
}
