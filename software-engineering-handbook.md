# Software Engineering Handbook

> **Build any production-grade app end-to-end — even if you are a complete beginner.**  
> Visual-first. Checklist-driven. Copy commands, follow diagrams, ship.

📕 **PDF book:** [Software-Engineering-Handbook.pdf](./Software-Engineering-Handbook.pdf) — includes front cover, title page, copyright, **table of contents with page numbers**, list of figures, index, and colophon (`cd pdf-build && npm run build`).

| You want… | Go to… |
| --- | --- |
| Start today (zero experience) | [PART 0 — 10-day build plan](#part-0--10-day-build-plan-zero-to-production) |
| Copy-paste commands | [Appendix A — Commands](#appendix-a--copy-paste-commands) |
| Fix something broken | [PART 13 — Troubleshooting](#part-13--troubleshooting-20-fixes) |
| Ship to production safely | [PART 12 — Launch checklist](#part-12--production-launch-checklist) |
| Runnable starter code | [`starter-app/`](starter-app/README.md) |

---

## How to read this (60 seconds)

```mermaid
flowchart LR
  A[You] --> B{Goal?}
  B -->|First app| C[PART 0 + starter-app]
  B -->|Building now| D[Relevant PART + checklist]
  B -->|Stuck / error| E[PART 13]
  B -->|Going live| F[PART 12 + 14]
```

**Rules (save your time):**

1. **Do first, read later** — follow PART 0 day-by-day; use other parts as reference.
2. **Bold headings + tables + diagrams** = must-read. Long paragraphs = optional.
3. **One working slice at a time** — health check → CRUD → auth → tests → deploy.
4. **Default stack** (boring = good): Next.js + TypeScript + Fastify + PostgreSQL + Docker + GitHub Actions.

---

## The whole system in one picture

```mermaid
graph TB
  subgraph Users
    U[User browser / mobile]
  end
  subgraph Edge
    CDN[CDN / TLS]
  end
  subgraph App
    FE[Frontend - Next.js]
    API[API - Fastify]
  end
  subgraph Data
    PG[(PostgreSQL)]
    RD[(Redis cache)]
  end
  subgraph Platform
    CI[GitHub Actions CI]
    REG[Container registry]
    K8s[Cloud / K8s runtime]
  end
  subgraph Observe
    LOG[Structured logs]
    MET[Metrics]
    TR[Traces]
    DASH[Grafana / alerts]
  end
  U -->|HTTPS| CDN --> FE
  FE -->|REST + JWT| API
  API --> PG
  API --> RD
  CI --> REG --> K8s
  FE --> K8s
  API --> K8s
  API --> LOG & MET & TR --> DASH
```

---

## Handbook map

| Part | Topic | Time to skim |
| --- | --- | --- |
| [0](#part-0) | 10-day build plan (zero → production) | 5 min |
| [1](#part-1) | Mindset & SDLC (visual) | 10 min |
| [2](#part-2) | Architecture, stack choice (Node/Python/Go/Java), SQL vs NoSQL, tools | 25 min |
| [3](#part-3) | Frontend | 15 min |
| [4](#part-4) | Backend & auth | 20 min |
| [5](#part-5) | Database | 15 min |
| [6](#part-6) | DevOps & deploy | 20 min |
| [7](#part-7) | Observability | 10 min |
| [8](#part-8) | Testing | 10 min |
| [9](#part-9) | Security | 15 min |
| [10](#part-10) | Performance | 10 min |
| [11](#part-11) | Real-world blueprints | 15 min |
| [12](#part-12) | Production launch checklist | 10 min |
| [13](#part-13) | Troubleshooting (20 fixes) | 5 min |
| [14](#part-14) | After you ship | 10 min |
| [15](#part-15) | Code patterns library | reference |
| [16](#part-16) | Team, Git & PRs | 10 min |
| [17](#part-17) | Think like a senior | 10 min |
| [18](#part-18) | 90-day growth path | 5 min |
| [A](#appendix-a) | Copy-paste commands | reference |
| [B](#appendix-b) | Environment variables | reference |
| [C](#appendix-c) | Glossary (30 seconds each) | reference |

**30+ Mermaid diagrams** — open in VS Code, GitHub, or [mermaid.live](https://mermaid.live).

### Anti-boring reading mode

| If you feel… | Do this instead |
| --- | --- |
| Overwhelmed | Only PART 0 + `starter-app` for 10 days |
| Lost in theory | Skip to next checklist or diagram |
| Ready to deep dive | Read one PART matching your current task |

---

<a id="part-0"></a>

## PART 0 — 10-day build plan (zero to production)

> **Outcome:** A deployed app with CRUD, auth, tests, Docker, CI, health checks, and basic monitoring.

### Day overview

```mermaid
gantt
  title Fresher 10-day production path
  dateFormat YYYY-MM-DD
  section Build
  Scaffold + health           :d1, 2026-01-01, 1d
  CRUD API + UI list          :d2, 2026-01-02, 1d
  Validation + errors         :d3, 2026-01-03, 1d
  Auth login + protected route:d4, 2026-01-04, 1d
  Tests unit + API            :d5, 2026-01-05, 1d
  Docker + compose            :d6, 2026-01-06, 1d
  CI pipeline                 :d7, 2026-01-07, 1d
  Deploy staging              :d8, 2026-01-08, 1d
  Logs + metrics + alerts     :d9, 2026-01-09, 1d
  Launch checklist + fix bugs :d10, 2026-01-10, 1d
```

### Day 1 — Scaffold + “it runs”

| Step | Action | Done |
| --- | --- | --- |
| 1 | Clone or copy [`starter-app/`](starter-app/README.md) | ☐ |
| 2 | `docker-compose up --build` — all services green | ☐ |
| 3 | Open `http://localhost:3000` (frontend) | ☐ |
| 4 | `curl http://localhost:4000/health` → `200 OK` | ☐ |
| 5 | First commit: `chore: initial scaffold` | ☐ |

```bash
cd starter-app
docker-compose up --build
# another terminal:
curl -s http://localhost:4000/health | jq .
```

### Day 2 — CRUD (one feature end-to-end)

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Next.js page
  participant API as Fastify
  participant DB as Postgres

  U->>UI: Click "Add item"
  UI->>API: POST /items {title}
  API->>API: Validate body
  API->>DB: INSERT
  DB-->>API: row
  API-->>UI: 201 + JSON
  UI-->>U: List updates
```

| Step | Action | Done |
| --- | --- | --- |
| 1 | DB table: `items(id, title, created_at)` | ☐ |
| 2 | API: `GET/POST/DELETE /items` | ☐ |
| 3 | UI: list + form calling API | ☐ |
| 4 | Env: `NEXT_PUBLIC_API_URL=http://localhost:4000` | ☐ |

### Day 3 — Validation + consistent errors

| Rule | Example |
| --- | --- |
| Never trust client input | Validate with Zod on every write endpoint |
| Same error shape | `{ "error": "message", "code": "VALIDATION" }` |
| HTTP codes mean something | `400` bad input, `401` auth, `404` missing, `500` server |

### Day 4 — Auth (minimum production pattern)

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Frontend
  participant API as API
  participant DB as DB

  U->>UI: email + password
  UI->>API: POST /auth/login
  API->>DB: verify hash
  API-->>UI: accessToken + refreshToken
  UI->>UI: store tokens (httpOnly cookie preferred)
  U->>UI: open protected page
  UI->>API: GET /me (Authorization: Bearer)
  API-->>UI: user profile
```

| Step | Action | Done |
| --- | --- | --- |
| 1 | `POST /auth/register`, `POST /auth/login` | ☐ |
| 2 | Hash passwords (bcrypt/argon2) — never plain text | ☐ |
| 3 | Middleware: reject missing/invalid JWT | ☐ |
| 4 | One protected route: `GET /me` | ☐ |

### Day 5 — Tests

```mermaid
flowchart TB
  subgraph Pyramid
    E2E[E2E - 1 happy path]
    INT[Integration - API + DB]
    UNIT[Unit - pure logic]
  end
  UNIT --> INT --> E2E
```

| Layer | What to test first |
| --- | --- |
| Unit | Validation schemas, helpers |
| Integration | `POST /items` returns 201 |
| E2E | Login → create item → see in list |

### Day 6 — Docker (multi-stage)

```mermaid
flowchart LR
  A[Source] --> B[builder stage: npm ci + build]
  B --> C[runtime stage: slim image + dist only]
  C --> D[Registry]
```

| Check | ☐ |
| --- | --- |
| `.dockerignore` excludes `node_modules` | |
| Non-root user in container | |
| `HEALTHCHECK` or K8s probe hits `/health` | |

### Day 7 — CI (GitHub Actions)

```mermaid
flowchart LR
  Push[git push] --> Lint[lint]
  Lint --> Test[test]
  Test --> Build[build image]
  Build --> Scan[optional: Trivy scan]
  Scan --> PushImg[push to registry]
```

### Day 8 — Deploy staging

| Step | Action |
| --- | --- |
| 1 | Set secrets in platform (not in git) |
| 2 | Run DB migrations before app rollout |
| 3 | Smoke test: health + login + create item |
| 4 | Document rollback: previous image tag |

### Day 9 — Observability

| Signal | Minimum |
| --- | --- |
| Logs | JSON with `requestId`, `level`, `msg` |
| Metrics | Request count, latency, error rate |
| Alerts | 5xx spike, health check down |
| Traces | Optional but valuable — OpenTelemetry |

### Day 10 — Launch checklist

Use [PART 12](#part-12--production-launch-checklist). If every critical box is checked → ship.

---

<a id="part-1"></a>

## PART 1 — Engineering mindset (5 ideas, not a textbook)

```mermaid
mindmap
  root((Senior mindset))
    Ship small
      Working slice daily
    Measure
      Logs metrics traces
    Automate
      CI tests deploy
    Secure defaults
      HTTPS validate secrets
    Boring tech
      Proven stack
```

| Principle | Do this | Avoid this |
| --- | --- | --- |
| **Ship small** | One feature end-to-end per PR | 3-week “big bang” branch |
| **Measure** | Fix the slowest query you proved | Random caching |
| **Automate** | CI on every push | Manual deploy Friday night |
| **Secure defaults** | Validate all inputs | “We’ll add auth later” |
| **Boring tech** | Postgres + Node | Bleeding-edge framework |

### SDLC in one flow

```mermaid
flowchart LR
  Idea[User story] --> Design[Sketch API + UI]
  Design --> Code[Implement + test]
  Code --> Review[PR review]
  Review --> CI[CI green]
  CI --> Stage[Staging]
  Stage --> Prod[Production]
  Prod --> Learn[Monitor + iterate]
```

---

<a id="part-2"></a>

## PART 2 — Architecture & system design

### Pick your shape (start here)

```mermaid
flowchart TD
  Start[New product] --> Q1{Team size < 5?}
  Q1 -->|Yes| Mono[Modular monolith]
  Q1 -->|No| Q2{Clear domain boundaries?}
  Q2 -->|Not yet| Mono
  Q2 -->|Yes| MS[Services per domain]
  Mono --> Stack[Next + API + Postgres]
  MS --> GW[API gateway + services]
```

| Pattern | When | Fresher default |
| --- | --- | --- |
| **Modular monolith** | MVP, small team | ✅ Yes |
| **Microservices** | Large team, clear domains | ❌ Later |
| **Serverless** | Spiky traffic, ops-light | Optional |

### Request lifecycle (memorize this)

```mermaid
sequenceDiagram
  participant C as Client
  participant E as Edge TLS CDN
  participant F as Frontend
  participant A as API
  participant Cache as Redis
  participant D as Database

  C->>E: HTTPS request
  E->>F: static / SSR page
  C->>A: API call + JWT
  A->>A: auth middleware
  A->>A: validate input
  alt cache hit
    A->>Cache: GET key
    Cache-->>A: value
  else cache miss
    A->>D: query
    D-->>A: rows
    A->>Cache: SET key TTL
  end
  A-->>C: JSON response
```

### API design cheat sheet

| Method | Use for | Example |
| --- | --- | --- |
| `GET` | Read | `GET /items` |
| `POST` | Create | `POST /items` |
| `PUT/PATCH` | Update | `PATCH /items/:id` |
| `DELETE` | Remove | `DELETE /items/:id` |

**Versioning:** `/v1/items` when you have external clients.  
**Pagination:** `?limit=20&cursor=abc` — not unbounded lists.  
**Idempotency:** `POST /payments` → use `Idempotency-Key` header for money actions.

### Stack selection (decision tree)

```mermaid
flowchart TD
  A[Product needs SEO / marketing pages?] -->|Yes| N[Next.js + React + TS]
  A -->|No| V[Vite + React]
  N --> B[API language]
  V --> B
  B -->|JS team| F[Fastify / Nest]
  B -->|Python team| P[FastAPI]
  B -->|Max perf simple API| G[Go + chi/fiber]
  F --> D[(PostgreSQL)]
  P --> D
  G --> D
  D --> R[(Redis - cache sessions)]
```

| Layer | Recommended default | Alternatives |
| --- | --- | --- |
| UI | Next.js 14+, TypeScript, Tailwind | Remix, Vite+React |
| API | Fastify + TypeScript | Express, Nest, FastAPI |
| DB | PostgreSQL | MySQL, SQLite (proto only) |
| Cache | Redis | In-memory (dev only) |
| Auth | JWT + refresh OR session cookies | Auth0, Clerk (faster MVP) |
| IaC | Terraform | Pulumi, CDK |
| CI | GitHub Actions | GitLab CI, CircleCI |
| Host | Managed K8s / Railway / Fly / Vercel+API | Raw EC2 (more ops) |

### When to use Node.js vs Python vs Go vs Java (backend)

```mermaid
flowchart TD
  START[Pick backend language] --> TEAM{What does your team know best?}
  TEAM -->|JavaScript/TypeScript| NODE[Node.js]
  TEAM -->|Python| PY[Python]
  TEAM -->|Go| GO[Go]
  TEAM -->|Java/Kotlin| JAVA[Java]
  TEAM -->|Unsure| NODE

  NODE --> N1{Full-stack web app?}
  N1 -->|Yes| N2[Node + Fastify or Nest]
  N1 -->|No| N3[Consider Go/Python for CPU-heavy]

  PY --> P1{ML, data, scripting, fast MVP?}
  P1 -->|Yes| P2[Python + FastAPI]
  P1 -->|No| P3[Node or Go for high-concurrency APIs]

  GO --> G1{Need max perf, simple deploy, few deps?}
  G1 -->|Yes| G2[Go + chi/fiber/gin]
  G1 -->|No| G3[Node/Python often faster to hire & build]

  JAVA --> J1{Enterprise, bank, large org, Spring shop?}
  J1 -->|Yes| J2[Java + Spring Boot]
  J1 -->|No| J3[Node/Go unless team is Java-only]
```

| Language | Choose when | Avoid when | Default stack |
| --- | --- | --- | --- |
| **Node.js (TypeScript)** | Full-stack JS team, real-time web, APIs + SSR, huge npm ecosystem | CPU-heavy batch on single thread without workers | Fastify or Nest + Prisma + Postgres |
| **Python** | ML/AI, data pipelines, scripting, FastAPI MVPs, Django admin apps | Ultra-low-latency microservices without careful tuning | FastAPI or Django + Postgres |
| **Go** | High throughput APIs, CLIs, infra tools, small binaries, simple deploy | Rich ORM-heavy CRUD shops without Go experience | chi/fiber + sqlc or GORM + Postgres |
| **Java** | Enterprise compliance, Spring ecosystem, Android backend, big-org standards | Tiny startup MVP with 2-person JS team | Spring Boot + Postgres + Kafka (later) |

| Signal | Lean toward |
| --- | --- |
| Same language as frontend | **Node.js** |
| Team is mostly data scientists | **Python** |
| Need 10k+ RPS per small VM | **Go** |
| Company mandates JVM / Spring | **Java** |
| Fresher learning first job | **Node.js** (pairs with React/Next) |

### When to use what on the frontend (React & beyond)

```mermaid
flowchart TD
  FE[Frontend choice] --> SEO{Need SEO or marketing pages?}
  SEO -->|Yes| NEXT[Next.js React]
  SEO -->|No SPA| VITE[Vite + React]
  NEXT --> APP{App-like dashboard only?}
  APP -->|Yes| NEXT2[Next.js still fine]
  APP -->|No content pages| VITE2[Vite SPA OK]

  FE --> ALT{Team not using React?}
  ALT -->|Vue preference| VUE[Nuxt 3 or Vite+Vue]
  ALT -->|Angular enterprise| ANG[Angular]
  ALT -->|Minimal JS| SVELTE[SvelteKit]
```

| Framework | Choose when | Skip when |
| --- | --- | --- |
| **React + Next.js** | Default for web apps, SEO, full-stack TS, largest job market | You need zero React and team refuses it |
| **React + Vite (SPA)** | Internal admin, dashboards behind login, no SEO | Public marketing site needs SEO |
| **Vue + Nuxt** | Team prefers Vue, good DX, SSR option | Org standardized on React |
| **SvelteKit** | Small bundles, less boilerplate, greenfield | Need maximum third-party React libs |
| **Angular** | Large enterprise, strict structure, long-lived apps | Fast-moving startup MVP |

| UI need | Best pick |
| --- | --- |
| Server state (API data) | `@tanstack/react-query` |
| Forms + validation | `react-hook-form` + `zod` |
| Styling | Tailwind CSS + shadcn/ui (components) |
| Tables | TanStack Table |
| Charts | Recharts or Chart.js |
| E2E tests | Playwright |
| Unit tests | Vitest + Testing Library |

### SQL vs NoSQL vs other databases (full decision guide)

```mermaid
flowchart TD
  DATA[What data do you store?] --> REL{Need joins, transactions, ACID?}
  REL -->|Yes| SQL[PostgreSQL default]
  REL -->|No| SHAPE{Data shape?}

  SHAPE -->|Flexible JSON docs| DOC[MongoDB / DynamoDB]
  SHAPE -->|Key-value cache/sessions| KV[Redis]
  SHAPE -->|Full-text search| SEARCH[OpenSearch / Meilisearch / PG tsvector]
  SHAPE -->|Time-series metrics| TS[TimescaleDB / Influx]
  SHAPE -->|Graph friends/network| GRAPH[Neo4j / Neptune]
  SHAPE -->|Analytics warehouse| WH[BigQuery / Snowflake / ClickHouse]
```

| Store | Use for | Real example |
| --- | --- | --- |
| **PostgreSQL (SQL)** | Users, orders, money, anything relational | 90% of production apps start here |
| **MySQL / MariaDB** | Same as Postgres, legacy hosting | WordPress, older LAMP stacks |
| **SQLite** | Local dev, mobile, embedded, prototypes | On-device apps — not multi-user prod |
| **MongoDB** | Flexible documents, rapid schema change, content | Catalogs, CMS-like content |
| **Redis** | Cache, sessions, rate limits, pub/sub | Session store, hot API cache |
| **DynamoDB** | Serverless AWS, predictable scale, key-value access | AWS-native high-scale apps |
| **Elasticsearch / OpenSearch** | Search, logs, analytics queries | Product search, log platform |
| **Kafka + warehouse** | Event streams, analytics (later) | Click tracking at scale |

| Mistake | Fix |
| --- | --- |
| NoSQL because “it scales” on day 1 | Start **Postgres** until proven otherwise |
| SQL for everything including raw event firehose | Add **queue + warehouse** later |
| Redis as primary database | Redis is **cache**, not source of truth |
| Multiple DBs before one works | One primary DB + Redis cache first |

### Best tools, packages & libraries (2025–2026 production stack)

> **Rule:** Pick boring, popular tools with active maintenance. Below is what senior teams use most often in new greenfield apps.

#### Frontend (latest standard)

| Category | Recommended | Alternatives |
| --- | --- | --- |
| Framework | Next.js 15, React 19, TypeScript 5 | Remix, Vite+React |
| Styling | Tailwind CSS 4, shadcn/ui | Chakra, MUI |
| Data fetching | TanStack Query v5 | SWR, RTK Query |
| Forms | React Hook Form + Zod | Formik |
| Auth (hosted) | Clerk, Auth0, Supabase Auth | NextAuth / Auth.js |
| Testing | Vitest, Playwright, Testing Library | Cypress |
| Lint/format | ESLint 9, Prettier, Biome | — |
| Build | Turbopack (Next), Vite | Webpack (legacy) |

#### Backend (by language)

| Category | Node.js / TS | Python | Go | Java |
| --- | --- | --- | --- | --- |
| HTTP API | Fastify, NestJS | FastAPI, Django | fiber, chi, gin | Spring Boot |
| Validation | Zod | Pydantic | go-playground/validator | Bean Validation |
| ORM / DB | Prisma, Drizzle | SQLAlchemy, Django ORM | sqlc, GORM | JPA/Hibernate |
| Auth | jsonwebtoken, passport | python-jose | golang-jwt | Spring Security |
| Testing | Vitest, Supertest | pytest | testing package | JUnit 5 |
| Docs | Swagger via @fastify/swagger | OpenAPI native | swaggo | springdoc |

#### Database & data tools

| Category | Tool |
| --- | --- |
| Primary DB | PostgreSQL 16+ |
| Migrations | Prisma Migrate, Drizzle Kit, Flyway (Java) |
| Cache | Redis 7 |
| Search | Meilisearch (simple), OpenSearch (scale) |
| Queue (later) | BullMQ (Node), Celery (Python), Kafka (enterprise) |
| Object storage | S3, Cloudflare R2, MinIO (local) |

#### DevOps, observability & security

| Category | Tool |
| --- | --- |
| Containers | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| IaC | Terraform, OpenTofu |
| Hosting | Vercel (front), Railway/Fly/Render (full), AWS/GCP (scale) |
| K8s | EKS, GKE (when team ready) |
| Logs | Structured JSON → Datadog, Grafana Loki, CloudWatch |
| Metrics | Prometheus + Grafana |
| Traces | OpenTelemetry → Tempo/Jaeger/Datadog |
| Errors | Sentry |
| Secrets | AWS Secrets Manager, Vault, Doppler |
| Scanning | Dependabot, Snyk, Trivy (images) |

#### Quick “what should I npm install?” (Node full-stack default)

```bash
# Frontend
npm i @tanstack/react-query zod react-hook-form @hookform/resolvers

# Backend
npm i fastify @fastify/cors zod prisma @prisma/client bcrypt jsonwebtoken
npm i -D typescript tsx vitest @types/node
```

| Package | Why |
| --- | --- |
| `fastify` | Fast, modern Node API framework |
| `prisma` | Type-safe DB + migrations |
| `zod` | Shared validation front + back |
| `@tanstack/react-query` | Server state, cache, refetch |
| `playwright` | E2E tests that match real users |

---

<a id="part-3"></a>

## PART 3 — Frontend engineering

### Folder structure (copy this)

```text
frontend/
├── app/                 # Next.js routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── (auth)/login/
├── components/          # reusable UI
├── lib/                 # api client, utils
├── hooks/
├── types/
└── tests/
```

### Data fetching pattern

```mermaid
flowchart LR
  UI[Component] --> RQ[React Query]
  RQ --> API[fetch /api]
  API --> Cache[cache + stale time]
  Cache --> UI
```

| Task | Tool |
| --- | --- |
| Server state | `@tanstack/react-query` |
| Forms | `react-hook-form` + `zod` |
| Styling | Tailwind |
| E2E | Playwright |

### Frontend checklist

- [ ] Loading, empty, and error states on every data view
- [ ] No secrets in client bundle (`NEXT_PUBLIC_` only for public URLs)
- [ ] Accessibility: labels, focus, contrast (run axe)
- [ ] Bundle check: no accidental huge imports
- [ ] API base URL from env, not hardcoded

### Frontend security (quick)

| Risk | Fix |
| --- | --- |
| XSS | React escapes by default; avoid `dangerouslySetInnerHTML` |
| Token in localStorage | Prefer httpOnly cookies for refresh |
| CSRF | SameSite=Lax/Strict on cookies |
| Clickjacking | `X-Frame-Options: DENY` |

### UI → API sequence (edit item)

```mermaid
sequenceDiagram
  participant U as User
  participant P as Page
  participant Q as React Query
  participant A as API

  U->>P: Edit + Save
  P->>Q: mutate PATCH /items/1
  Q->>A: PATCH body
  A-->>Q: 200 updated row
  Q->>Q: invalidate items query
  Q-->>P: fresh list
  P-->>U: UI synced
```

---

<a id="part-4"></a>

## PART 4 — Backend engineering

### Folder structure

```text
api/
├── src/
│   ├── routes/          # route handlers thin
│   ├── services/        # business logic
│   ├── db/              # queries / repository
│   ├── plugins/         # auth, cors, swagger
│   ├── schemas/         # zod validation
│   └── index.ts
├── tests/
└── Dockerfile
```

### Layer flow

```mermaid
flowchart TB
  R[Route] --> V[Validate Zod]
  V --> S[Service]
  S --> DB[DB layer]
  DB --> PG[(Postgres)]
  S --> R
  R --> JSON[JSON response]
```

### Backend checklist

- [ ] `GET /health` — no auth, fast
- [ ] Central error handler — no stack traces to clients in prod
- [ ] CORS configured for frontend origin only
- [ ] Connection pool for DB (don’t open connection per request)
- [ ] Graceful shutdown on SIGTERM
- [ ] Structured logs (JSON)

### API contracts (OpenAPI)

```mermaid
flowchart LR
  Code[Route + Zod schema] --> Gen[Generate OpenAPI]
  Gen --> Doc[Swagger UI / Redoc]
  Doc --> Client[Frontend types optional]
```

Document every public endpoint: path, body, errors, auth.

### Auth middleware flow

```mermaid
flowchart TD
  Req[Incoming request] --> H{Authorization header?}
  H -->|No| E401[401 Unauthorized]
  H -->|Yes| V[Verify JWT]
  V -->|Invalid/expired| E401
  V -->|Valid| R[Attach user to request]
  R --> Handler[Route handler]
```

### Refresh token flow (production auth)

```mermaid
sequenceDiagram
  participant UI as Frontend
  participant API as API
  participant DB as DB

  Note over UI,DB: Access token expired
  UI->>API: POST /auth/refresh (refresh cookie)
  API->>DB: validate refresh token hash
  alt valid
    API-->>UI: new accessToken
  else stolen / expired
    API-->>UI: 401 → force login
  end
```

| Token | Lifetime | Storage |
| --- | --- | --- |
| Access | 15 min | Memory or short cookie |
| Refresh | 7–30 days | httpOnly Secure cookie |

---

<a id="part-5"></a>

## PART 5 — Database engineering

### SQL vs NoSQL (simple rule)

```mermaid
flowchart TD
  Q[What is your data?] --> R{Relationships + transactions?}
  R -->|Yes - orders users payments| SQL[PostgreSQL]
  R -->|Flexible docs - logs events| NOS[Mongo / Dynamo]
  R -->|Graph social network| G[Neo4j / graph store]
  R -->|Search text| S[OpenSearch / Elasticsearch]
```

| Need | Choice |
| --- | --- |
| Users, orders, billing | PostgreSQL |
| Session cache | Redis |
| Full-text search | OpenSearch (or PG `tsvector` for small apps) |
| Analytics events | Column store / warehouse (later) |

### Schema starter (items + users)

```sql
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,  -- hashed only!
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  title      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_items_user_id ON items(user_id);
```

### Migrations flow

```mermaid
flowchart LR
  Dev[Change schema locally] --> Mig[Write migration file]
  Mig --> CI[CI applies on staging]
  CI --> Prod[Prod migration job]
  Prod --> App[Roll out new app version]
```

| Rule | Why |
| --- | --- |
| Never edit prod DB by hand | Drift breaks deploys |
| Backward-compatible migrations | Add column nullable first, deploy, then enforce |
| Index large tables online | Use `CONCURRENTLY` in Postgres |

### Database checklist

- [ ] Indexes on foreign keys and frequent `WHERE` columns
- [ ] Backups automated + restore tested once
- [ ] Connection pool max set (e.g. 20 per API instance)
- [ ] No `SELECT *` in hot paths — pick columns
- [ ] Explain slow queries: `EXPLAIN ANALYZE`

### Backup & disaster recovery

```mermaid
flowchart LR
  PG[(Primary DB)] -->|continuous| Backup[Automated backups]
  Backup --> S3[Object storage]
  S3 --> Test[Monthly restore test]
```

| Term | Meaning for freshers |
| --- | --- |
| **RPO** | Max data loss window |
| **RTO** | Max downtime to restore |
| **Minimum** | Daily backups + one restore drill |

---

<a id="part-6"></a>

## PART 6 — DevOps & infrastructure

### Local → prod pipeline

```mermaid
flowchart LR
  subgraph Local
    DC[docker-compose]
  end
  subgraph CI
    GHA[GitHub Actions]
  end
  subgraph Registry
    GHCR[ghcr.io / ECR]
  end
  subgraph Prod
    CL[Cloud / K8s]
  end
  DC --> GHA --> GHCR --> CL
```

### Dockerfile pattern (multi-stage)

```dockerfile
# builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

### Minimal GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: pass
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd api && npm ci && npm test
      - run: cd frontend && npm ci && npm run build
```

```mermaid
flowchart LR
  Push[git push] --> Lint[lint + test]
  Lint --> Build[docker build]
  Build --> PushR[push image]
  PushR --> Stage[deploy staging]
  Stage --> Smoke[smoke tests]
  Smoke --> Prod[promote prod]
```

### CI/CD checklist

- [ ] Lint + test on every PR
- [ ] Build Docker image with git SHA tag
- [ ] Scan image (Trivy / Snyk)
- [ ] Deploy staging automatically on `main`
- [ ] Manual or gated promote to production
- [ ] Rollback = redeploy previous image tag

### Environments

| Env | Purpose | Data |
| --- | --- | --- |
| **local** | Your laptop | Fake / seed data |
| **staging** | Pre-prod testing | Anonymized copy |
| **production** | Real users | Real data — treat carefully |

### Kubernetes (when you outgrow PaaS)

> Use Railway, Fly.io, Render, or Vercel+API first. Learn K8s when your team runs it.

```mermaid
flowchart TB
  Dev[Developer] --> CI[CI builds image]
  CI --> Reg[Container registry]
  Reg --> Dep[Deployment manifest]
  Dep --> Pod[Pods running API]
  Pod --> Svc[Service ClusterIP]
  Svc --> Ing[Ingress TLS]
  Ing --> User[Internet]
```

| Object | Job |
| --- | --- |
| **Deployment** | Keeps N replicas of your API |
| **Service** | Stable internal DNS to pods |
| **Ingress** | HTTPS routing to service |
| **Secret** | Env credentials (not in image) |
| **HPA** | Autoscale on CPU/RPS |

### Infrastructure diagram (typical cloud)

```mermaid
graph TB
  subgraph VPC
    ALB[Load balancer]
    subgraph Private
      API1[API pod]
      API2[API pod]
      RDS[(RDS Postgres)]
    end
  end
  Internet --> ALB --> API1 & API2
  API1 & API2 --> RDS
```

---

<a id="part-7"></a>

## PART 7 — Observability

```mermaid
flowchart LR
  App[App] --> OTel[OpenTelemetry SDK]
  OTel --> Coll[Collector]
  Coll --> Prom[Prometheus metrics]
  Coll --> Loki[Loki logs]
  Coll --> Tempo[Tempo traces]
  Prom & Loki & Tempo --> Graf[Grafana]
  Graf --> Alert[Pager / Slack alert]
```

| Signal | What to log/measure | Alert when |
| --- | --- | --- |
| **Logs** | Errors with `requestId` | Error rate > baseline |
| **Metrics** | `http_requests_total`, latency p95 | p95 > 1s sustained |
| **Traces** | Slow spans DB/external | Optional SLO breach |
| **Health** | `/health` dependency checks | 2 failures in 1 min |

### Minimum viable observability

- [ ] JSON logs to stdout (platform aggregates)
- [ ] `/health` checks DB connectivity
- [ ] Dashboard: RPS, 5xx rate, p95 latency
- [ ] One alert channel (Slack/email)

---

<a id="part-8"></a>

## PART 8 — Testing

```mermaid
flowchart TB
  subgraph What to test
    U[Unit: validation business rules]
    I[Integration: API + real test DB]
    E[E2E: Playwright one journey]
  end
  U --> I --> E
```

| When | Test type |
| --- | --- |
| Zod schema edge cases | Unit |
| `POST /items` unauthorized → 401 | Integration |
| Register → login → create → list | E2E |

### Testing checklist

- [ ] CI fails if tests fail — no merge
- [ ] Test DB isolated (Docker service in CI)
- [ ] No flaky sleeps — use `waitFor` in E2E
- [ ] Cover auth + one critical business path

### Test code snippets

```typescript
// Unit — schema
import { describe, it, expect } from 'vitest';
import { createItemSchema } from './schemas';

describe('createItemSchema', () => {
  it('rejects empty title', () => {
    expect(() => createItemSchema.parse({ title: '' })).toThrow();
  });
});
```

```typescript
// Integration — API (Fastify inject)
const res = await app.inject({
  method: 'POST',
  url: '/items',
  payload: { title: 'hello' },
});
expect(res.statusCode).toBe(201);
```

---

<a id="part-9"></a>

## PART 9 — Security (production minimum)

```mermaid
flowchart TB
  subgraph Layers
    E[Edge: TLS WAF rate limit]
    A[App: auth validation]
    D[Data: encryption at rest]
    O[Ops: secrets scanning]
  end
  User --> E --> A --> D
  O -.-> A
```

| Threat | Defense |
| --- | --- |
| Stolen passwords | bcrypt/argon2 + MFA for admin |
| XSS | Escape output, CSP headers, httpOnly cookies |
| CSRF | SameSite cookies or CSRF tokens |
| Injection | Parameterized queries, Zod validation |
| Secret leak | `.env` in `.gitignore`, vault in prod |
| DDoS / abuse | Rate limiting at API gateway |

### Security checklist (non-negotiable)

- [ ] HTTPS everywhere
- [ ] Secrets only in env / secret manager
- [ ] Input validation on every write endpoint
- [ ] Auth on every private route
- [ ] Dependency scan in CI (Dependabot/Snyk)
- [ ] Principle of least privilege for DB user

---

<a id="part-10"></a>

## PART 10 — Performance

```mermaid
flowchart TD
  Slow[App feels slow] --> M[Measure p95 latency]
  M --> DB{DB slow?}
  M --> FE{Frontend slow?}
  M --> NET{Network slow?}
  DB -->|Yes| IDX[Add index / fix N+1]
  DB -->|No| CACHE[Add Redis cache]
  FE -->|Yes| BUNDLE[Code split reduce JS]
  NET -->|Yes| CDN[CDN + compression]
```

| Symptom | Likely fix |
| --- | --- |
| API p95 high, DB CPU high | Missing index, N+1 queries |
| API fast, page slow | Large JS bundle |
| Spiky traffic | Cache + horizontal scale |
| DB connections maxed | Pool size + fewer instances leaking connections |

### Scaling ladder

| Users (rough) | Action |
| --- | --- |
| < 500 concurrent | Optimize queries, add indexes |
| 500–2k | Redis cache hot reads |
| 2k–10k | Read replica, more API replicas + LB |
| 10k+ | Domain split, queue heavy work |

### Caching layers (when reads are slow)

```mermaid
flowchart TB
  REQ[API request] --> L1{In-memory LRU?}
  L1 -->|miss| L2{Redis?}
  L2 -->|miss| DB[(Postgres)]
  DB --> L2
  L2 --> L1
  L1 --> RES[Response]
```

| Cache | TTL | Invalidate when |
| --- | --- | --- |
| HTTP CDN | minutes–hours | Asset hash in filename |
| Redis | seconds–minutes | Data update → delete key |
| DB query cache | avoid early | Prefer explicit Redis |

### N+1 query problem (avoid this)

```mermaid
flowchart LR
  BAD[GET /users] --> U1[User 1]
  U1 --> Q1[query items]
  U1 --> U2[User 2]
  U2 --> Q2[query items]
  GOOD[GET /users?include=items] --> ONE[One JOIN query]
```

---

<a id="part-11"></a>

## PART 11 — Real-world blueprints

### Blueprint A — SaaS MVP (default fresher project)

```mermaid
graph LR
  UI[Next.js app] --> API[Auth + CRUD API]
  API --> PG[(Postgres)]
  API --> R[(Redis)]
  API --> Q[Job queue - optional]
  Q --> Email[Email service]
```

| Piece | Build order |
| --- | --- |
| Auth + org/user | Week 1 |
| Core entity CRUD | Week 1–2 |
| Billing (Stripe) | Week 3+ |
| Admin dashboard | Week 2+ |

### Blueprint B — E-commerce (simplified)

```mermaid
sequenceDiagram
  participant U as User
  participant C as Cart API
  participant P as Payment
  participant O as Orders

  U->>C: Add to cart
  U->>P: Checkout
  P-->>O: Webhook payment success
  O-->>U: Order confirmed email
```

### Blueprint C — Realtime chat (advanced)

- WebSocket server or managed service (Pusher, Ably)
- Pub/sub for rooms (Redis)
- Store messages in Postgres, cache recent in Redis

### Blueprint D — Internal admin tool

- Next.js + API + Postgres only
- SSO later (OAuth)
- Skip microservices entirely

| App type | Start with | Add later |
| --- | --- | --- |
| SaaS | Monolith + Postgres | Queues, Stripe |
| E-commerce | Monolith + search index | Microservices at scale |
| Chat | Monolith + WebSockets | Shard by room |
| Admin | Monolith | SSO |

### System design thinking (same skill as shipping)

```mermaid
flowchart TD
  CL[Clarify requirements] --> EST[Estimate scale]
  EST --> API[Draw API + data model]
  API --> BOT[Find bottlenecks]
  BOT --> DEEP[Deep dive 1-2 areas]
```

| Step | Ask yourself |
| --- | --- |
| Clarify | Who uses it? Read vs write ratio? |
| Estimate | 1k vs 1M users changes the design |
| High-level | Boxes: client, API, DB, cache, queue |
| Deep dive | Sharding, cache, consistency tradeoffs |

---

<a id="part-12"></a>

## PART 12 — Production launch checklist

```mermaid
flowchart TD
  L[Launch ready?] --> F[Frontend checks]
  L --> B[Backend checks]
  L --> D[Database checks]
  L --> S[Security checks]
  L --> O[Observability checks]
  L --> P[Deploy checks]
  F & B & D & S & O & P --> GO{All critical green?}
  GO -->|Yes| Ship[Ship 🚀]
  GO -->|No| Fix[Fix blockers first]
```

### Critical (must be green)

**Frontend**

- [ ] Error and loading states
- [ ] Env vars set in hosting platform
- [ ] No API keys in client code

**Backend**

- [ ] Auth enforced on private routes
- [ ] Validation on all writes
- [ ] `/health` live
- [ ] Graceful shutdown

**Database**

- [ ] Migrations applied
- [ ] Backups enabled
- [ ] Indexes on hot queries

**Security**

- [ ] HTTPS
- [ ] Secrets in vault/env — not git
- [ ] Rate limits on auth endpoints

**Observability**

- [ ] Logs visible
- [ ] Alert on 5xx / health failure

**Deploy**

- [ ] Rollback tag documented
- [ ] Smoke test script run on staging

### Launch readiness radar

| Domain | Score 1–5 | Owner |
| --- | --- | --- |
| Frontend | | |
| Backend | | |
| Database | | |
| Security | | |
| Infra | | |
| Monitoring | | |
| Performance | | |
| Deploy safety | | |

**Ship if:** all domains ≥ 4, none at 1–2 without mitigation plan.

---

<a id="part-13"></a>

## PART 13 — Troubleshooting (20 fixes)

| Problem | Cause | Fix |
| --- | --- | --- |
| API not responding | CORS | Register CORS plugin; allow frontend origin |
| Frontend can't connect | Wrong URL | Set `NEXT_PUBLIC_API_URL` |
| DB connection fails | Postgres down | `docker-compose up -d postgres` |
| Port in use | Old process | `lsof -ti:3000 \| xargs kill -9` |
| Env missing | No `.env` | Copy `.env.example`; restart app |
| Docker build fails | Bad context | Add `.dockerignore` |
| 401 everywhere | Token expired | Refresh token flow or re-login |
| Migration failed | Order wrong | Fix migration; restore backup if prod |
| Slow list API | No index | `CREATE INDEX` on filter columns |
| No logs | Stdout not collected | Log JSON to stdout; check platform |
| Huge image | Single-stage Dockerfile | Multi-stage build |
| Tests pass locally only | Different env | `.env.test` + CI env block |
| Secret in git | Committed `.env` | Rotate secret; gitignore; BFG purge |
| Pool exhausted | Too many connections | Set pool max; scale DB |
| Random 502 | Crash on error | Global error handler; health probe |
| Stale deploy | Cached image | Tag with `git sha`; force new deploy |
| HTTPS error | Cert expired | Renew cert in load balancer |
| Disk full | Logs unbounded | Log rotation / retention policy |
| Flaky E2E | Race | `await expect(...).toBeVisible()` |
| CORS preflight fail | Missing OPTIONS | Configure CORS methods/headers |

```mermaid
flowchart TD
  Bug[Something broke] --> R[Reproduce locally]
  R --> L[Read logs with requestId]
  L --> C{Changed recently?}
  C -->|Deploy| Roll[Rollback last deploy]
  C -->|Code| Fix[Fix + test + redeploy]
  C -->|Infra| Inv[Check health DB disk]
```

---

<a id="part-14"></a>

## PART 14 — After you ship

### First week ops

| Day | Check |
| --- | --- |
| Daily | Error logs, 5xx rate, disk, DB connections |
| Daily | `/health` + one user journey |
| Weekly | Review slow queries, dependency updates |

### Incident flow

```mermaid
sequenceDiagram
  participant M as Monitor
  participant O as On-call
  participant T as Team

  M->>O: Alert fired
  O->>O: Triage severity
  O->>T: War room if SEV1
  T->>T: Mitigate rollback scale
  T->>T: Postmortem blameless
```

| Severity | Example | Response |
| --- | --- | --- |
| SEV1 | Site down | Rollback immediately |
| SEV2 | Payments failing | Fix forward < 1h |
| SEV3 | Minor UI bug | Next sprint |

---

<a id="part-15"></a>

## PART 15 — Code patterns library

### Validation (Zod + Fastify)

```typescript
import { z } from 'zod';

export const createItemSchema = z.object({
  title: z.string().min(1).max(200),
});

// in route
const body = createItemSchema.parse(request.body);
```

### Centralized errors

```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

// handler
if (err instanceof AppError) {
  return reply.code(err.statusCode).send({ error: err.message, code: err.code });
}
logger.error({ err, requestId });
return reply.code(500).send({ error: 'Internal error', code: 'INTERNAL' });
```

### React Query fetch

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: () => fetch(`${API}/items`).then((r) => r.json()),
});
```

### JWT issue + verify

```typescript
import jwt from 'jsonwebtoken';

const access = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });

// middleware
const token = request.headers.authorization?.replace('Bearer ', '');
const payload = jwt.verify(token, process.env.JWT_SECRET!);
```

---

<a id="part-16"></a>

## PART 16 — Team, Git & PRs

```mermaid
gitGraph
  commit id: "main"
  branch feature/items
  checkout feature/items
  commit id: "add items API"
  commit id: "add tests"
  checkout main
  merge feature/items
```

| Practice | Rule |
| --- | --- |
| Branch | `feature/short-description` |
| PR size | < 400 lines ideal |
| Review | 1 approval + CI green |
| Commit | `[feat] add item filters` + why in body |

### PR checklist

- [ ] Tests added/updated
- [ ] No secrets
- [ ] Screenshots for UI
- [ ] Migration noted in description

---

<a id="part-17"></a>

## PART 17 — Think like a senior (5 rules)

| # | Rule | Example |
| --- | --- | --- |
| 1 | **Small > big** | Ship login before dashboard widgets |
| 2 | **Observe > guess** | `EXPLAIN` before adding Redis |
| 3 | **Automate > manual** | CI deploy, not FTP |
| 4 | **Simple > clever** | Monolith until pain is real |
| 5 | **Secure > fast** | Validate first; optimize second |

```mermaid
flowchart LR
  Junior[See bug] --> Fix[Quick patch]
  Senior[See bug] --> Why[Root cause]
  Why --> Test[Add test]
  Test --> Guard[Prevent class of bugs]
```

---

<a id="part-18"></a>

## PART 18 — 90-day growth path

```mermaid
timeline
  title Fresher → confident engineer
  section Days 1-30
    Ship first prod app     : Done in PART 0
    Understand each layer   : Read Parts 2-10
  section Days 31-60
    Second feature solo     : Auth or payments
    Write postmortem doc    : After one bug
  section Days 61-90
    Design small system     : Draw diagrams first
    Mentor another fresher  : Explain PART 0
```

| Month | Focus | Proof |
| --- | --- | --- |
| 1 | One app live | URL + monitoring |
| 2 | Quality | Tests + fewer bugs |
| 3 | Design | Architecture doc for next feature |

---

<a id="appendix-a"></a>

## Appendix A — Copy-paste commands

```bash
# === FRONTEND ===
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app && npm install @tanstack/react-query zod react-hook-form @hookform/resolvers

# === BACKEND ===
mkdir api && cd api
npm init -y
npm install fastify @fastify/cors zod jsonwebtoken bcrypt
npm install -D typescript tsx @types/node @types/jsonwebtoken @types/bcrypt vitest

# === DATABASE (local) ===
docker run --rm -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=app -p 5432:5432 -d postgres:16

# === TEST ===
npm test

# === DOCKER ===
docker build -t my-api:$(git rev-parse --short HEAD) .
docker push ghcr.io/YOUR_ORG/my-api:$(git rev-parse --short HEAD)

# === HEALTH ===
curl -sf http://localhost:4000/health && echo OK
```

---

<a id="appendix-b"></a>

## Appendix B — Environment variables

| Variable | Where | Example |
| --- | --- | --- |
| `DATABASE_URL` | API | `postgres://user:pass@localhost:5432/app` |
| `JWT_SECRET` | API | long random string |
| `NEXT_PUBLIC_API_URL` | Frontend | `http://localhost:4000` |
| `NODE_ENV` | API | `production` |

Never commit `.env`. Commit `.env.example` with empty values.

---

## Monorepo layout (full production starter)

```text
my-product/
├── frontend/                 # Next.js
├── api/                      # Fastify
├── db/
│   ├── migrations/
│   └── init.sql
├── infra/
│   ├── terraform/            # VPC, RDS, registry
│   └── k8s/                  # optional manifests
├── .github/workflows/
│   └── ci.yml
├── docker-compose.yml        # local dev
└── README.md
```

```mermaid
flowchart TB
  subgraph Repo
    FE[frontend]
    API[api]
    DBM[db/migrations]
    INF[infra]
    GHA[.github/workflows]
  end
  GHA --> Build[Build & test]
  Build --> IMG[Docker images]
  IMG --> INF
```

---

<a id="appendix-c"></a>

## Appendix C — Glossary (30 seconds each)

| Term | Meaning |
| --- | --- |
| **API** | Backend HTTP service your UI calls |
| **CI/CD** | Automated test + deploy pipeline |
| **CRUD** | Create Read Update Delete |
| **JWT** | Signed token proving who user is |
| **Idempotent** | Same request twice = same result |
| **p95 latency** | 95% of requests faster than this time |
| **Rollback** | Deploy previous known-good version |
| **Staging** | Production-like env for testing |
| **TTL** | How long cache entry lives |

---

## You are ready

You now have:

- ✅ 10-day path from zero to production  
- ✅ Diagrams for architecture, auth, CI, scaling, incidents  
- ✅ Checklists for frontend, backend, DB, security, launch  
- ✅ 20 troubleshooting fixes  
- ✅ Code patterns + commands  
- ✅ Runnable [`starter-app/`](starter-app/README.md)  

### Next steps

1. Open [`starter-app/README.md`](starter-app/README.md) and run `docker-compose up --build`.  
2. Follow **PART 0** day by day — check boxes.  
3. Deploy to staging on Day 8.  
4. Complete **PART 12** and ship.  
5. Build your second feature without rereading the whole book — use the map table at the top.

Every senior engineer started exactly here. **Ship small. Measure. Repeat.**

---

*Version 1.0 — publish-ready. Default stack: Next.js · Fastify · PostgreSQL · Docker · GitHub Actions.*
