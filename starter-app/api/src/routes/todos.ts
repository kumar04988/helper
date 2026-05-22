import { FastifyPluginAsync } from "fastify";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().optional(),
});

export const todoRoutes: FastifyPluginAsync = async (server) => {
  server.get("/", async (request, reply) => {
    const result = await server.pg.query(
      "SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC",
    );
    return result.rows;
  });

  server.post("/", async (request, reply) => {
    const body = todoSchema.parse(request.body);
    const result = await server.pg.query(
      "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING id, title, completed, created_at",
      [body.title, body.completed ?? false],
    );
    reply.code(201);
    return result.rows[0];
  });

  server.patch("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await server.pg.query(
      "UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING id, title, completed, created_at",
      [id],
    );
    if (result.rowCount === 0) {
      return reply.code(404).send({ error: "Todo not found" });
    }
    return result.rows[0];
  });

  server.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await server.pg.query("DELETE FROM todos WHERE id = $1", [id]);
    reply.code(204).send();
  });
};
