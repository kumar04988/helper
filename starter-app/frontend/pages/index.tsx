import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Todo = { id: number; title: string; completed: boolean };

const todoSchema = z.object({ title: z.string().min(1, "Title is required") });
type TodoForm = z.infer<typeof todoSchema>;

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const fetchTodos = (): Promise<Todo[]> =>
  fetch(`${API}/todos`).then((r) => r.json());

export default function Home() {
  const qc = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({ resolver: zodResolver(todoSchema) });

  const addMutation = useMutation({
    mutationFn: (title: string) =>
      fetch(`${API}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`${API}/todos/${id}`, { method: "PATCH" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  const onSubmit = async ({ title }: TodoForm) => {
    await addMutation.mutateAsync(title);
    reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Todo Starter App</h1>
        <p className="mt-2 text-slate-600">
          A beginner-friendly production-ready starter app.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-2">
          <div className="flex gap-3">
            <input
              {...register("title")}
              placeholder="Write a todo"
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-sky-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 disabled:opacity-50"
            >
              {addMutation.isPending ? "Adding…" : "Add"}
            </button>
          </div>
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-medium">Tasks</h2>

          {isLoading && <p className="mt-4 text-slate-500">Loading…</p>}

          {isError && (
            <p className="mt-4 text-red-500">
              Could not load todos. Is the API running?
            </p>
          )}

          {!isLoading && !isError && todos.length === 0 && (
            <p className="mt-4 text-slate-400">No todos yet. Add one above.</p>
          )}

          {todos.length > 0 && (
            <ul className="mt-4 space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <span
                    className={todo.completed ? "text-slate-400 line-through" : ""}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => toggleMutation.mutate(todo.id)}
                    disabled={toggleMutation.isPending}
                    className="rounded-full bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
                  >
                    {todo.completed ? "Undo" : "Done"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
