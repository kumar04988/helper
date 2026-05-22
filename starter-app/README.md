# Fresher Starter App

A production-ready starter for beginner engineers — **todos CRUD + user auth + tests + CI + Docker**.

**Companion guide:** Follow the 10-day build plan in [software-engineering-handbook.md](../software-engineering-handbook.md) while using this repo.

## What's inside

| Folder / file | Purpose |
| --- | --- |
| `frontend/` | Next.js 14 + TypeScript + Tailwind + React Query |
| `api/` | Fastify + TypeScript + Zod validation + JWT auth |
| `db/init.sql` | Postgres schema (`users` + `todos`) |
| `docker-compose.yml` | One-command local dev environment |
| `.github/workflows/ci.yml` | CI: test + build on every push |
| `.env.example` | All env vars you need (copy → `.env`) |

## Quick start (Day 1 of the 10-day plan)

```bash
# 1 — copy env vars
cp .env.example .env          # edit JWT_SECRET before going to prod

# 2 — start everything (Postgres + API + Frontend)
docker-compose up --build

# 3 — verify
curl http://localhost:4000/health          # → {"status":"ok"}
open http://localhost:3000                 # todo UI
```

## Auth endpoints (Day 4)

```bash
# Register a user
curl -s -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret123"}' | jq .

# Login → get access token
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"secret123"}' | jq -r .accessToken)

# Access protected route
curl -s http://localhost:4000/auth/me -H "Authorization: Bearer $TOKEN" | jq .
```

## Run tests (Day 5)

```bash
cd api
npm test
```

Tests cover validation schemas (unit) and the health endpoint (integration).

## Local ports

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| API | http://localhost:4000 |
| Postgres | localhost:5432 |

## Production notes

- Rotate `JWT_SECRET` with a cryptographically random 32-byte hex string.
- Run DB migrations before deploying a new API version.
- Build and push Docker images via CI; deploy to Railway, Fly.io, or Kubernetes.
