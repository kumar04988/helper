# Software Engineering Project Helper

**Everything a fresher needs to go from zero to a deployed production app —
one combined handbook, a runnable starter app, and a step-by-step 10-day plan.**

---

## Start here — the 3 files you actually need

| File | What it is | When to open it |
| --- | --- | --- |
| [the-complete-handbook.md](./the-complete-handbook.md) | **The main guide** — 17 parts, complete runnable code, diagrams, checklists | Open this first |
| [handbook-preview.html](./handbook-preview.html) | Same handbook as a beautiful webpage — dark theme, syntax highlighting, interactive checklists | Open in browser for the best reading experience |
| [Software-Engineering-Handbook.pdf](./Software-Engineering-Handbook.pdf) | Same handbook as a printable PDF — 83 pages, clickable TOC | Print it or read offline |

> **Pick one format.** All three cover exactly the same content. Use the HTML in your browser day-to-day, the PDF if you prefer reading on paper, or the `.md` if you want to search with your editor.

---

## What is inside this folder?

```
project helper/
├── README.md                          ← you are here
│
├── the-complete-handbook.md           ← THE handbook (start here — 17 parts)
├── handbook-preview.html              ← Same handbook as interactive webpage
├── Software-Engineering-Handbook.pdf  ← Same handbook as printable PDF
│
├── starter-app/                       ← Runnable app (Next.js + Fastify + Postgres)
│   ├── frontend/                      ← Next.js 14, TypeScript, Tailwind, React Query
│   ├── api/                           ← Fastify, TypeScript, Zod, JWT auth
│   ├── db/init.sql                    ← Postgres schema (users + todos)
│   ├── docker-compose.yml             ← Start everything with one command
│   ├── .env.example                   ← Copy → .env, fill in secrets
│   └── .github/workflows/ci.yml      ← GitHub Actions CI (test + build)
│
├── pdf-build/                         ← Source to regenerate the PDF (ignore this)
├── software-engineering-handbook.md   ← Older V1 guide (superseded — ignore)
└── ultimate-software-engineering-handbook.md  ← Older V2 guide (superseded — ignore)
```

> **Ignore `software-engineering-handbook.md` and `ultimate-software-engineering-handbook.md`.**
> Both are superseded by `the-complete-handbook.md`, which combines the best of both into one.

---

## Fresher? Do exactly these 4 steps

### Step 1 — Open the handbook in your browser (2 min)

Open `handbook-preview.html` directly in Chrome or Safari:

```bash
open handbook-preview.html        # Mac
# or double-click it in Finder
```

You will see a dark-themed guide with a sidebar. Do not read it all yet.

### Step 2 — Read only two sections (5 min)

In the sidebar, click **"How to read this"** and **"The whole system in one picture"**.

That one architecture diagram shows every piece — frontend, API, database, CI, monitoring — and how they connect. Understand that diagram and the rest will click into place.

### Step 3 — Run the starter app before reading anything else (10 min)

Theory without running code is slow. Get something working first.

```bash
# 1 — go into the starter app
cd starter-app

# 2 — copy the env file (defaults work for local dev)
cp .env.example .env

# 3 — start Postgres + API + Frontend in Docker
docker-compose up --build

# 4 — verify (open two terminals)
curl http://localhost:4000/health     # should print: {"status":"ok"}
open http://localhost:3000            # todo UI in your browser
```

You now have a real full-stack app running on your machine. **This is Day 1.**

### Step 4 — Follow PART 0 — the 10-day plan

Go back to the handbook (HTML or PDF), click **PART 0** in the sidebar, and work through it day by day. Each day has a checklist. Complete every box before moving on.

| Day | What you build | Skill you learn |
| --- | --- | --- |
| 1 | Scaffold runs + health check | Docker, project structure |
| 2 | CRUD API + UI list | REST, Postgres, Next.js |
| 3 | Validation + error handling | Zod, consistent API contracts |
| 4 | Auth — register / login / JWT | Passwords, tokens, protected routes |
| 5 | Unit + integration tests | Vitest, Fastify inject, app factory |
| 6 | Multi-stage Dockerfile | Docker best practices, security |
| 7 | GitHub Actions CI pipeline | Automated test + build |
| 8 | Deploy to staging | Cloud deploy, smoke testing |
| 9 | Structured logs + metrics + alerts | Observability basics |
| 10 | Production launch checklist | Ship with confidence |

---

## How the combined handbook is structured

`the-complete-handbook.md` has 17 parts. Every part follows the same pattern:
**diagram → complete runnable code → checklist.** No code shape — every block is a
complete file you can copy into your project.

| Part | Topic | When to read |
| --- | --- | --- |
| 0 | **10-day build plan** — zero to production | First — follow day by day |
| 1 | Local setup — Docker, tsconfig, package.json scripts | Day 1 |
| 2 | Architecture & stack selection — decision trees | Before picking a stack |
| 3 | Frontend — Next.js, React Query, Zustand, forms | When building UI |
| 4 | Backend — Fastify, app factory, CRUD, service layer | When building API |
| 5 | Database — Prisma schema, migrations, Redis cache | When designing schema |
| 6 | Auth & security — JWT, bcrypt, refresh tokens, OWASP | Day 4 |
| 7 | Testing — unit (Vitest), integration, E2E (Playwright) | Day 5 |
| 8 | DevOps & CI/CD — Docker, GitHub Actions, deploy | Days 6–8 |
| 9 | Cloud & deploy — Railway, Fly.io, AWS + Terraform | Day 8+ |
| 10 | Observability — Pino logs, OpenTelemetry tracing, alerts | Day 9 |
| 11 | Performance — Core Web Vitals, caching, scaling | After first version ships |
| 12 | **Production launch checklist** | Day 10 — before every deploy |
| 13 | **Troubleshooting — 25 exact fixes** | When something breaks |
| 14 | Real-world blueprints — SaaS, e-commerce, chat | When designing your own app |
| 15 | Team & Git workflow — branches, PRs, commit format | When working with others |
| 16 | Think like a senior engineer — ADRs, mental models | After first app is live |
| 17 | 90-day growth path | Career planning |
| Appendix A | Copy-paste commands | Any time |
| Appendix B | Environment variables reference | Any time |
| Appendix C | **Error decoder** — 13 common errors with exact fixes | When something breaks |
| Appendix D | Glossary | When you hit an unfamiliar term |

---

## How to build your own production app using this folder

Not the todo demo — your own idea. Follow these phases.

### Phase 1 — Decide what you are building (Day 0)

Answer these three questions before touching code:

1. **What does one user do in 30 seconds?** (the core action)
2. **What data do you store?** (list the tables/entities)
3. **Who can see what?** (auth + permissions)

Write the answers in a `notes.md` in your repo. Do not write code until you can answer all three.

### Phase 2 — Copy the starter app as your base

```bash
cp -r starter-app my-new-app
cd my-new-app

# Re-initialise git
rm -rf .git
git init && git add . && git commit -m "chore: initial scaffold"

# Copy and fill in secrets
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# → paste this value as JWT_SECRET in .env
```

### Phase 3 — Design your database schema first

Before writing API code, write the SQL for your tables.
Open `db/init.sql` and replace the todos table with your schema.
See **PART 5** of the handbook for Prisma schema patterns.

```sql
-- Example: a blog app
CREATE TABLE posts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
```

Then restart Docker so the schema loads:
```bash
docker-compose down -v      # wipe the old volume
docker-compose up --build   # fresh Postgres with new schema
```

### Phase 4 — Build one feature end-to-end before adding more

Follow this loop for every new feature:

```
1. DB migration / schema change
2. API route (Fastify, in api/src/routes/)
3. Zod validation schema for the request body
4. Test the route with curl
5. Frontend page / component that calls the route
6. At least one unit test for the validation schema
7. Commit: "feat: add [feature name]"
```

Never build the full backend then all the frontend. One vertical slice (DB → API → UI) per PR.

### Phase 5 — Add auth (use the existing code)

The starter app already has full JWT auth:

- `POST /auth/register` — create account
- `POST /auth/login` — get access token + refresh token
- `GET /auth/me` — read current user (protected)

To protect one of your new routes, add the `preHandler` hook:

```typescript
// api/src/routes/posts.ts
server.get(
  '/',
  { preHandler: [authenticate] },   // ← add this line
  async (request) => {
    const { userId } = request.user  // available after auth
    return prisma.post.findMany({ where: { userId } })
  },
)
```

See **PART 6** of the handbook for the complete auth system — register, login, refresh tokens, logout, and the middleware.

### Phase 6 — Write tests as you go (Day 5)

```bash
cd api
npm test
```

For each new route, write at least:
1. A unit test for its Zod schema
2. An integration test for the happy path using `buildApp()` + `app.inject()`

Pattern (from **PART 7** of the handbook):

```typescript
// api/src/tests/posts.test.ts
import { buildApp } from '../app'
import { generateAccessToken } from '../lib/jwt'

const app = await buildApp()
const token = generateAccessToken('test-user-id')

const res = await app.inject({
  method: 'POST',
  url: '/posts',
  headers: { Authorization: `Bearer ${token}` },
  payload: { title: 'Hello', body: 'World' },
})
expect(res.statusCode).toBe(201)
```

### Phase 7 — Deploy to staging (Day 8)

See **PART 8** and **PART 9** of the handbook for exact steps.

```bash
# Quick path — Railway (free tier, no config needed)
npm install -g @railway/cli
railway login
railway up

# Set env vars on the platform (never in code):
#   DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV=production
```

### Phase 8 — Before going live (Day 10)

Run through **PART 12 — Production Launch Checklist** in the handbook.
The checklist covers security, performance, reliability, observability, and rollback.
All critical boxes must be green before you deploy to production.

---

## Troubleshooting quick-help

If something breaks, check **PART 13** (25 fixes) and **Appendix C** (Error Decoder) in the handbook first.

| Problem | Quick fix |
| --- | --- |
| `docker-compose up` hangs | Another process on port 3000, 4000, or 5432 — kill it or change the port |
| `{"error":"Token required"}` on every request | JWT_SECRET not set in `.env`, or missing `Authorization: Bearer <token>` header |
| Frontend can't reach API | `NEXT_PUBLIC_API_URL` in `frontend/.env.local` — should be `http://localhost:4000` |
| `Cannot find module '@prisma/client'` | Run `npx prisma generate` inside `api/` |
| `Cannot find module 'fastify-cors'` | Change to `@fastify/cors` — the old package is abandoned |
| Tests fail with `buildApp is not a function` | Check `api/src/app.ts` exists and exports `buildApp` — see PART 4 in the handbook |
| Postgres connection error | `DATABASE_URL` in `.env` — check format: `postgresql://user:pass@localhost:5432/dbname` |
| `npm install` fails | Delete `node_modules` and `package-lock.json`, then run `npm install` again |

---

## After your first app — what to learn next

```
Month 1:  Ship the todo app → build your own idea using this folder
Month 2:  Add OAuth login (GitHub/Google) → PART 6 in the handbook
Month 3:  Add Prisma ORM + proper migrations → PART 5 in the handbook
Month 4:  Deploy to AWS with Terraform → PART 9 in the handbook
Month 5:  Add Prometheus + Grafana dashboards → PART 10 in the handbook
Month 6:  Design a second service (payments, notifications) → PART 14 in the handbook
```

The goal is one working app live on the internet before going deep on any topic.
**Deployed beats perfect.**

---

## Need help or got stuck?

1. Read the error message carefully — it usually tells you exactly what is wrong.
2. Search **PART 13** (Troubleshooting) and **Appendix C** (Error Decoder) in the handbook.
3. Search the exact error on Stack Overflow or the library's GitHub Issues.
4. Ask Claude Code — describe what you are building and paste the exact error.

---

*Every senior engineer shipped a broken toy app first. Ship yours.*
