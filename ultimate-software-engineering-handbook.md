# 🚀 The Complete Production Engineering Handbook 2026

> **Zero to Senior Engineer — Your All-in-One Production Playbook**

> **Who this is for:** Complete beginners through experienced engineers who want to build, ship, and operate production-grade apps like top-tier senior engineers.

> **Promise:** After reading this guide, you can build any production-grade application end-to-end — frontend, backend, database, auth, deployment, monitoring, and everything in between.

---

## 📚 Table of Contents

| # | Section | What You'll Learn |
|---|---------|-------------------|
| — | [How to Read This Guide](#how-to-read) | Navigation tips, reading paths |
| — | [The Big Picture](#big-picture) | Full production architecture diagram |
| — | [10-Step Zero → Production Path](#ten-step) | Build any app in 10 steps |
| **0** | [Stack Selection](#section-0) | Which backend, frontend & database to choose |
| **1** | [Local Dev Setup](#section-1) | Docker, env vars, project structure |
| **2** | [Frontend Engineering](#section-2) | Next.js, state, forms, performance |
| **3** | [Backend Engineering](#section-3) | Fastify, services, APIs, background jobs |
| **4** | [Database Engineering](#section-4) | Prisma, migrations, Redis, indexes |
| **5** | [Auth & Security](#section-5) | JWT, OAuth, security checklist |
| **6** | [Testing Strategy](#section-6) | Unit, integration, E2E tests |
| **7** | [DevOps & CI/CD](#section-7) | Docker, GitHub Actions, deployment strategies |
| **8** | [Cloud & Infrastructure](#section-8) | AWS, Terraform, VPC, ECS |
| **9** | [Observability & Monitoring](#section-9) | Logs, metrics, traces, alerts |
| **10** | [Performance Engineering](#section-10) | Frontend + backend optimization |
| **11** | [System Design Patterns](#section-11) | Monolith, microservices, event-driven |
| **12** | [Real-World App Blueprints](#section-12) | SaaS, e-commerce, chat, API platform |
| **13** | [Troubleshooting Guide](#section-13) | 25 common problems + exact fixes |
| **14** | [Production Launch Checklists](#section-14) | Pre-launch security/reliability/performance |
| **15** | [Tools & Libraries Reference 2026](#section-15) | Every tool by category |
| **16** | [Senior Engineer Mental Models](#section-16) | Think like a senior |
| **17** | [Quick Reference Cheat Sheet](#section-17) | Commands, git, deploy, Prisma |
| — | [Appendix](#appendix) | ADR template |
| — | [Final Words](#final-words) | Your next steps |

> 💡 **Jump to any section** by clicking the link. Use `Ctrl+F` / `Cmd+F` to search within a section.

---

<a id="how-to-read"></a>

## 📖 How to Read This Guide

**Bored by theory? Perfect — this guide is built for you.**

- Every section starts with a **diagram or visual** first, then a short explanation.
- Every major decision has a **decision tree** — no guessing.
- Every concept has **real, copy-paste code**.
- If you want to skip deep dives, look for the 📌 **Quick Win** blocks.
- Use the 💡 **Pro Tip** and ⚠️ **Watch Out** callouts to avoid rookie mistakes.
- The `[SKIP]` tag means this section is optional — come back when you need it.

**Recommended reading path for a beginner:**

```
Section 0 (Stack Choice) → Section 1 (Local Setup) → Section 2 (Frontend) →
Section 3 (Backend) → Section 4 (Database) → Section 5 (Auth) →
Section 6 (Testing) → Section 7 (DevOps) → Section 8 (Deploy) →
Section 9 (Monitoring) → Section 13 (Troubleshooting)
```

---

<a id="big-picture"></a>

## 🗺️ The Big Picture — Every Production App in One Diagram

```mermaid
graph TB
    subgraph Client["👤 Client Layer"]
        Browser[Browser / Mobile App]
    end

    subgraph Edge["🌐 Edge Layer"]
        CDN[CDN — CloudFront / Vercel Edge]
        LB[Load Balancer]
    end

    subgraph Frontend["🖥️ Frontend"]
        Next[Next.js App\nReact + TypeScript + Tailwind]
    end

    subgraph Backend["⚙️ Backend Services"]
        API[REST API\nFastify / Express / NestJS]
        Auth[Auth Service\nJWT + OAuth]
        Queue[Background Jobs\nBullMQ / SQS]
        Worker[Workers\nEmail, Notifications]
    end

    subgraph Data["💾 Data Layer"]
        PG[(PostgreSQL\nPrimary DB)]
        Redis[(Redis\nCache + Sessions)]
        S3[S3\nFile Storage]
    end

    subgraph Observability["📊 Observability"]
        Logs[Logs — Loki]
        Metrics[Metrics — Prometheus]
        Traces[Traces — Tempo]
        Grafana[Grafana Dashboard]
    end

    subgraph Infra["🏗️ Infrastructure"]
        K8s[Kubernetes / ECS]
        TF[Terraform — IaC]
        CI[GitHub Actions — CI/CD]
    end

    Browser --> CDN
    CDN --> Next
    CDN --> LB
    LB --> API
    API --> Auth
    API --> PG
    API --> Redis
    API --> Queue
    API --> S3
    Queue --> Worker
    API --> Logs
    API --> Metrics
    API --> Traces
    Logs --> Grafana
    Metrics --> Grafana
    Traces --> Grafana
    K8s --> API
    CI --> K8s
    TF --> K8s
```

> 💡 **Pro Tip:** Save this diagram. When you're confused about where something lives, come back here.

---

<a id="ten-step"></a>

## ⚡ The 10-Step Zero → Production Path

**Build your first production app in 10 steps. Check each off as you go.**

```
Step 1: Pick a user story → Step 2: Set up local environment → Step 3: Build the database schema
   ↓
Step 4: Build the backend API → Step 5: Build the frontend → Step 6: Add authentication
   ↓
Step 7: Write tests → Step 8: Add CI/CD pipeline → Step 9: Deploy to production
   ↓
Step 10: Add monitoring & iterate
```

| Step | What You Build | Time |
|------|---------------|------|
| 1 | User story + tech decisions | 1 hour |
| 2 | Local dev environment (Docker) | 1 hour |
| 3 | Database schema + migrations | 2 hours |
| 4 | REST API endpoints (CRUD) | 4 hours |
| 5 | Frontend UI pages | 4 hours |
| 6 | Auth (login, register, protect routes) | 3 hours |
| 7 | Tests (unit + integration + E2E) | 3 hours |
| 8 | CI/CD pipeline | 2 hours |
| 9 | Deploy to production | 2 hours |
| 10 | Monitoring + dashboards | 2 hours |

> 🚀 **Quick Win:** Use the starter commands in each section to skip boilerplate and go straight to building.

---

<a id="section-0"></a>

## 🎯 SECTION 0 — Choose Your Stack

**The most important decisions you'll make. Get these right and everything else flows.**

### 0.1 Backend Language — What to Choose?

```mermaid
flowchart TD
    A[What are you building?] --> B{Is it ML / AI / Data?}
    B -- Yes --> PY[Python + FastAPI\n✅ Best ecosystem for AI/ML\n✅ Fast to write\n✅ Great data libraries]
    B -- No --> C{Do you need extreme performance\nor high concurrency?}
    C -- Yes --> GO[Go\n✅ Super fast\n✅ Low memory\n✅ Great for APIs & microservices]
    C -- No --> D{Is the team full-stack JS?}
    D -- Yes --> NODE[Node.js + TypeScript\n✅ One language everywhere\n✅ Huge ecosystem\n✅ Fast to build]
    D -- No --> E{Enterprise / JVM shop?}
    E -- Yes --> JAVA[Java / Kotlin + Spring Boot\n✅ Mature & battle-tested\n✅ Great for enterprise\n✅ Strong typing]
    E -- No --> NODE2[Node.js + TypeScript\n✅ Best default choice for startups\n✅ Hire easily\n✅ JavaScript everywhere]
```

| Language | Best For | Avoid When | Hiring | Speed to Ship |
|----------|----------|------------|--------|--------------|
| **Node.js/TS** | Web APIs, SaaS, startups | CPU-heavy processing | Easy | ⭐⭐⭐⭐⭐ |
| **Python** | ML/AI, data pipelines, scripts | High-concurrency APIs | Easy | ⭐⭐⭐⭐⭐ |
| **Go** | Microservices, CLIs, platform tools | Complex business logic | Medium | ⭐⭐⭐⭐ |
| **Java/Kotlin** | Enterprise, banking, regulated industries | Small teams, MVPs | Medium | ⭐⭐⭐ |
| **Rust** | Systems, security-critical, low-level | General web apps | Hard | ⭐⭐ |

> 💡 **Default Choice for 90% of cases:** Node.js + TypeScript. Easy to hire, one language across frontend & backend, massive ecosystem, fast to ship.

---

### 0.2 Frontend Framework — What to Choose?

```mermaid
flowchart TD
    A[Start] --> B{Do you need SEO or\npublic-facing pages?}
    B -- Yes --> NEXT[Next.js + React\n✅ SSR built-in\n✅ Best SEO support\n✅ Industry standard]
    B -- No --> C{Is performance critical?\nTiny bundle size matters?}
    C -- Yes --> SVELTE[SvelteKit\n✅ Smallest bundles\n✅ Fastest runtime\n✅ Great DX]
    C -- No --> D{Enterprise / large team\nwith strict structure?}
    D -- Yes --> ANGULAR[Angular\n✅ Opinionated\n✅ Built-in everything\n✅ TypeScript-first]
    D -- No --> E{Simple app or\nprefer Vue syntax?}
    E -- Yes --> VUE[Vue 3 + Nuxt\n✅ Easy to learn\n✅ Great for small teams]
    E -- No --> NEXT2[Next.js + React\n✅ Best default choice\n✅ Huge community\n✅ Huge job market]
```

| Framework | Best For | Learning Curve | Bundle Size | SEO | Jobs |
|-----------|----------|---------------|-------------|-----|------|
| **Next.js + React** | Everything, especially SaaS | Medium | Medium | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SvelteKit** | Performance-first, lean apps | Low | Very Small | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Vue 3 + Nuxt** | Small-medium apps, easy teams | Low | Small | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Angular** | Large enterprise apps | High | Large | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Vite + React** | SPAs without SSR | Low | Small | ⭐⭐ (no SSR) | ⭐⭐⭐⭐ |

> 💡 **Default Choice:** Next.js + React + TypeScript + Tailwind CSS. This is what 80% of production apps use in 2026.

---

### 0.3 Database — What to Choose?

```mermaid
flowchart TD
    A[What data are you storing?] --> B{Is it structured\nwith relationships?}
    B -- Yes --> C{How big will it grow?}
    C -- Small-Medium --> PG[PostgreSQL\n✅ Best default choice\n✅ Reliable, ACID\n✅ Great tooling]
    C -- Global scale --> CDB[CockroachDB / PlanetScale\n✅ Distributed SQL\n✅ Multi-region]
    B -- No --> D{What kind of data?}
    D -- Key/Value or Cache --> REDIS[Redis\n✅ Blazing fast\n✅ Sessions, cache\n✅ Rate limiting]
    D -- Documents with\nflexible schema --> MONGO[MongoDB\n✅ No schema\n✅ Fast iteration\n✅ JSON-native]
    D -- Search / Full-text --> ES[Elasticsearch / OpenSearch\n✅ Search engine\n✅ Analytics]
    D -- Time-series data --> TS[TimescaleDB / InfluxDB\n✅ Metrics, IoT\n✅ Time queries]
    D -- Managed scale,\nno ops --> DDB[DynamoDB\n✅ Serverless\n✅ AWS-native\n✅ Auto-scale]
```

| Database | Type | Best For | When to Avoid | Cost |
|----------|------|----------|---------------|------|
| **PostgreSQL** | Relational SQL | 90% of apps, user data, orders | Massive write throughput | Free (open source) |
| **Redis** | In-memory K/V | Sessions, cache, queues, rate limits | Long-term primary data store | Free / Redis Cloud |
| **MongoDB** | Document | Flexible schemas, rapid prototyping | Complex joins, strong consistency | Free / Atlas |
| **DynamoDB** | Managed K/V/Doc | AWS apps, serverless, global scale | Complex queries, joins | AWS pricing |
| **Elasticsearch** | Search engine | Full-text search, log analytics | Primary data store | Free / Elastic Cloud |
| **CockroachDB** | Distributed SQL | Multi-region apps | Simple small apps | Free tier / Cockroach |

> 💡 **Default Choice:** PostgreSQL + Redis. PostgreSQL for all your business data. Redis for caching and sessions. This covers 95% of production apps.

> ⚠️ **Watch Out:** Don't use MongoDB as your default just because it's "easier." If your data has relationships (users, orders, products), use PostgreSQL.

---

### 0.4 The Recommended Stack for 2026

**If you're building a new production app today, start here:**

```mermaid
graph LR
    FE["🖥️ Frontend\nNext.js 14 + React + TypeScript\nTailwind CSS + shadcn/ui"]
    BE["⚙️ Backend\nNode.js + TypeScript\nFastify or NestJS"]
    DB["💾 Database\nPostgreSQL (Prisma ORM)\n+ Redis"]
    AUTH["🔐 Auth\nJWT + Refresh Tokens\nor NextAuth.js"]
    INFRA["🏗️ Infrastructure\nDocker + GitHub Actions\nAWS ECS or Vercel"]
    OBS["📊 Observability\nOpenTelemetry + Grafana\nSentry for errors"]

    FE --> BE
    BE --> DB
    BE --> AUTH
    INFRA --> BE
    BE --> OBS
```

**The full opinionated stack:**

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js 15 + TypeScript | Best SSR, SEO, huge ecosystem |
| Styling | Tailwind CSS + shadcn/ui | Fast UI, consistent design |
| State | Zustand + TanStack Query | Simple + powerful |
| Backend | Node.js + Fastify + TypeScript | Fast, lightweight, typed |
| Validation | Zod | TypeScript-first, runtime + compile |
| ORM | Prisma | Best DX, type-safe queries |
| Database | PostgreSQL 16 | Reliable, feature-rich |
| Cache | Redis 7 | Sessions, cache, rate limits |
| Auth | JWT + refresh tokens | Scalable, stateless |
| Testing | Vitest + Playwright | Fast unit + real E2E |
| CI/CD | GitHub Actions | Integrated, easy YAML |
| Deploy | AWS ECS or Vercel + Railway | Managed, scalable |
| Monitoring | OpenTelemetry + Grafana | Industry standard |
| Errors | Sentry | Best error tracking |

---

<a id="section-1"></a>

## 🛠️ SECTION 1 — Local Development Setup

**Goal: A running local environment in under 15 minutes.**

### 1.1 What You Need Installed

```bash
# Check what you have
node --version    # Need 20+
docker --version  # Need 24+
git --version     # Need 2.40+

# Install missing tools (Mac)
brew install node@22
brew install --cask docker
brew install git

# Install global CLI tools
npm install -g pnpm  # Faster than npm
```

### 1.2 Project Structure — The Right Way

```text
my-app/
├── frontend/           ← Next.js app
│   ├── src/
│   │   ├── app/        ← Next.js App Router pages
│   │   ├── components/ ← Reusable UI components
│   │   ├── features/   ← Feature modules
│   │   ├── hooks/      ← Custom React hooks
│   │   ├── lib/        ← Utilities, config
│   │   └── types/      ← TypeScript types
│   ├── public/
│   ├── .env.local
│   └── package.json
│
├── backend/            ← API server
│   ├── src/
│   │   ├── routes/     ← API route handlers
│   │   ├── services/   ← Business logic
│   │   ├── repositories/ ← Database access
│   │   ├── middleware/ ← Auth, validation, logging
│   │   ├── lib/        ← DB client, Redis, etc.
│   │   └── types/      ← TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env
│   └── package.json
│
├── docker-compose.yml  ← Local databases
└── .github/
    └── workflows/      ← CI/CD pipelines
```

### 1.3 Docker Compose — Local Databases in One Command

```yaml
# docker-compose.yml — run this to start local databases
version: '3.9'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # Optional: Adminer to view your database in browser
  adminer:
    image: adminer
    ports:
      - "8080:8080"

volumes:
  postgres_data:
  redis_data:
```

```bash
# Start all local services
docker-compose up -d

# Check they're running
docker-compose ps

# Stop them
docker-compose down
```

### 1.4 Frontend — Scaffold & Run

```bash
# Create Next.js app
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd frontend

# Install essential packages
npm install @tanstack/react-query zustand
npm install react-hook-form zod @hookform/resolvers
npm install axios
npm install next-auth  # or use your own JWT auth

# Install shadcn/ui (best component library)
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input form card table

# Start dev server
npm run dev
# Open http://localhost:3000
```

### 1.5 Backend — Scaffold & Run

```bash
# Create backend
mkdir backend && cd backend
npm init -y

# Install Fastify + essentials
npm install fastify @fastify/cors @fastify/jwt @fastify/helmet
npm install @prisma/client
npm install zod
npm install pino  # logging

# Dev dependencies
npm install -D typescript ts-node-dev @types/node prisma
npm install -D @types/node tsx

# Initialize TypeScript
npx tsc --init

# Initialize Prisma
npx prisma init

# Start dev server
npm run dev
# API runs at http://localhost:4000
```

### 1.6 Environment Variables — Never Get This Wrong

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# backend/.env
DATABASE_URL="postgresql://myapp:password@localhost:5432/myapp"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret-here"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=4000
NODE_ENV=development
```

> ⚠️ **Watch Out:** NEVER commit `.env` files to Git. Add `.env` and `.env.local` to `.gitignore` immediately.

```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

---

<a id="section-2"></a>

## 🖥️ SECTION 2 — Frontend Engineering Masterclass

### 2.1 Next.js Architecture — Which Rendering Mode to Use?

```mermaid
flowchart TD
    A[New Page to Build] --> B{Is the content\npersonal / user-specific?}
    B -- Yes --> CSR["Client-Side Rendering\nuseEffect + fetch\n✅ Use for dashboards,\nprivate pages"]
    B -- No --> C{Does it change\nfrequently?}
    C -- Never/Rarely --> SSG["Static Site Generation\nexport const generateStaticParams\n✅ Use for blogs,\ndocs, landing pages"]
    C -- Sometimes --> ISR["ISR — Revalidate on interval\nrevalidate: 60\n✅ Use for product pages,\nmarketing content"]
    C -- Every request --> SSR["Server-Side Rendering\nno-store or dynamic\n✅ Use for SEO pages\nwith real-time data"]
```

> 💡 **Pro Tip:** In Next.js 14+ (App Router), all components are **Server Components by default**. Add `'use client'` only when you need interactivity (useState, useEffect, event handlers).

### 2.2 Next.js App Router — Folder Structure

```text
frontend/src/app/
├── layout.tsx          ← Root layout (headers, providers)
├── page.tsx            ← Home page /
├── globals.css
│
├── (auth)/             ← Route group (no URL prefix)
│   ├── login/
│   │   └── page.tsx    ← /login
│   └── register/
│       └── page.tsx    ← /register
│
├── dashboard/          ← Protected dashboard
│   ├── layout.tsx      ← Dashboard layout (auth check)
│   ├── page.tsx        ← /dashboard
│   └── settings/
│       └── page.tsx    ← /dashboard/settings
│
└── api/                ← API routes (edge/server)
    └── auth/
        └── [...nextauth]/
            └── route.ts
```

### 2.3 The Component Pattern — Build It Right

**The golden rule: Server Components for data fetching, Client Components for interactivity.**

```typescript
// ✅ Server Component — fetches data on server, no JS sent to browser
// app/products/page.tsx
import { ProductCard } from '@/components/product-card'

async function getProducts() {
  const res = await fetch('http://localhost:4000/products', {
    next: { revalidate: 60 }, // Cache 60 seconds (ISR)
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
```

```typescript
// ✅ Client Component — handles user interactions
// components/product-card.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  price: number
}

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id }),
    })
    setAdded(true)
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Button
        onClick={addToCart}
        disabled={added}
        className="mt-2 w-full"
      >
        {added ? 'Added ✓' : 'Add to Cart'}
      </Button>
    </div>
  )
}
```

### 2.4 State Management — The Decision Guide

```mermaid
flowchart TD
    A[Need to store state?] --> B{Where is this state needed?}
    B --> LOCAL["Single component\n→ useState / useReducer"]
    B --> SHARED["Across a few components\n→ Lift state up to parent\nor useContext"]
    B --> GLOBAL["Whole app (theme, auth)\n→ Zustand store"]
    B --> SERVER["Server/API data\n→ TanStack Query"]
    B --> URL["Filters, pagination, search\n→ URL params (useSearchParams)"]
```

```typescript
// ✅ Zustand — global state (auth, theme, cart)
// lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStore {
  theme: 'light' | 'dark'
  user: { id: string; name: string } | null
  setTheme: (theme: 'light' | 'dark') => void
  setUser: (user: AppStore['user']) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'light',
      user: null,
      setTheme: (theme) => set({ theme }),
      setUser: (user) => set({ user }),
    }),
    { name: 'app-storage' } // persists to localStorage
  )
)

// Use it anywhere
const { user, setUser } = useAppStore()
```

```typescript
// ✅ TanStack Query — server state (API data)
// hooks/use-todos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API = process.env.NEXT_PUBLIC_API_URL

// Fetch todos
export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`${API}/todos`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    staleTime: 30_000, // Consider data fresh for 30s
  })
}

// Create todo
export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(`${API}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title }),
      })
      return res.json()
    },
    onSuccess: () => {
      // Refresh the todos list after creating
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
```

### 2.5 Forms — The Right Way

```typescript
// ✅ React Hook Form + Zod — the winning combo
// components/create-todo-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateTodo } from '@/hooks/use-todos'

// 1. Define the schema
const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Too long'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

type TodoForm = z.infer<typeof todoSchema>

export function CreateTodoForm() {
  const { mutate: createTodo, isPending } = useCreateTodo()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  })

  const onSubmit = (data: TodoForm) => {
    createTodo(data.title, {
      onSuccess: () => reset(),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('title')}
          placeholder="What needs to be done?"
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <select {...register('priority')} className="border rounded px-3 py-2">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  )
}
```

### 2.6 Frontend Performance — Core Web Vitals Checklist

```mermaid
graph LR
    LCP["LCP — Largest Contentful Paint\n< 2.5s is GOOD\nFix: Preload hero image,\nuse CDN, optimize images"]
    FID["FID — First Input Delay\n< 100ms is GOOD\nFix: Code split,\nreduce JS bundle"]
    CLS["CLS — Cumulative Layout Shift\n< 0.1 is GOOD\nFix: Set width/height\non images & iframes"]
    INP["INP — Interaction to Next Paint\n< 200ms is GOOD\nFix: Debounce events,\navoid heavy renders"]
```

```typescript
// ✅ Image optimization — always use Next.js Image
import Image from 'next/image'

// WRONG ❌
<img src="/hero.jpg" />

// RIGHT ✅
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // preload above-the-fold images
  placeholder="blur"
/>
```

```typescript
// ✅ Code splitting — lazy load heavy components
import dynamic from 'next/dynamic'

// Only load chart when needed
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // don't render on server if not needed
})
```

---

<a id="section-3"></a>

## ⚙️ SECTION 3 — Backend Engineering Masterclass

### 3.1 Backend Architecture — The Layers

```mermaid
graph TB
    subgraph Request["📥 Incoming Request"]
        R[HTTP Request]
    end

    subgraph Middleware["🛡️ Middleware Layer"]
        Auth[Auth Check]
        Validate[Input Validation]
        RateLimit[Rate Limiting]
        Logger[Request Logger]
    end

    subgraph Routes["🗺️ Route Layer"]
        Route[Route Handler\nThin — just maps request to service]
    end

    subgraph Services["🧠 Service Layer"]
        Service[Business Logic\nRules, Calculations, Orchestration]
    end

    subgraph Data["💾 Data Layer"]
        Repo[Repository\nDatabase queries only]
        Cache[Cache Layer\nRedis get/set]
    end

    subgraph DB["🗄️ External Systems"]
        PG[(PostgreSQL)]
        Redis[(Redis)]
    end

    R --> Logger
    Logger --> RateLimit
    RateLimit --> Auth
    Auth --> Validate
    Validate --> Route
    Route --> Service
    Service --> Repo
    Service --> Cache
    Repo --> PG
    Cache --> Redis
```

> 💡 **The Golden Rule of Backend Architecture:**
> - **Routes** are thin — just call a service and return the result.
> - **Services** contain all business logic.
> - **Repositories** contain all database queries.
> - Never put database code in routes. Never put HTTP logic in services.

### 3.2 Fastify Server Setup — Complete Boilerplate

```typescript
// backend/src/server.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import { todoRoutes } from './routes/todos'
import { authRoutes } from './routes/auth'
import { logger } from './lib/logger'

const server = Fastify({ logger: true })

// Security headers
await server.register(helmet)

// CORS — allow frontend
await server.register(cors, {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
})

// JWT
await server.register(jwt, {
  secret: process.env.JWT_SECRET!,
})

// Health check — ALWAYS have this
server.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}))

// Routes
await server.register(authRoutes, { prefix: '/auth' })
await server.register(todoRoutes, { prefix: '/todos' })

// Global error handler
server.setErrorHandler((error, request, reply) => {
  logger.error({ error, url: request.url }, 'Request error')

  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: error.validation,
    })
  }

  const statusCode = error.statusCode ?? 500
  reply.status(statusCode).send({
    error: statusCode === 500 ? 'Internal server error' : error.message,
  })
})

// Start
const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 4000, host: '0.0.0.0' })
    console.log('Server running on port 4000')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
```

### 3.3 CRUD Route — The Full Pattern

```typescript
// backend/src/routes/todos.ts
import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { TodoService } from '../services/todo.service'
import { authenticate } from '../middleware/auth'

const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
})

export const todoRoutes: FastifyPluginAsync = async (fastify) => {
  const todoService = new TodoService()

  // GET /todos — list all todos for current user
  fastify.get('/', { preHandler: [authenticate] }, async (request, reply) => {
    const todos = await todoService.findAll(request.user.userId)
    return reply.send(todos)
  })

  // GET /todos/:id — get single todo
  fastify.get('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const todo = await todoService.findById(id, request.user.userId)

    if (!todo) return reply.status(404).send({ error: 'Todo not found' })
    return reply.send(todo)
  })

  // POST /todos — create todo
  fastify.post('/', { preHandler: [authenticate] }, async (request, reply) => {
    const body = createTodoSchema.parse(request.body)
    const todo = await todoService.create({
      ...body,
      userId: request.user.userId,
    })
    return reply.status(201).send(todo)
  })

  // PATCH /todos/:id — update todo
  fastify.patch('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = updateTodoSchema.parse(request.body)
    const todo = await todoService.update(id, request.user.userId, body)

    if (!todo) return reply.status(404).send({ error: 'Todo not found' })
    return reply.send(todo)
  })

  // DELETE /todos/:id — delete todo
  fastify.delete('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string }
    await todoService.delete(id, request.user.userId)
    return reply.status(204).send()
  })
}
```

### 3.4 Service Layer — Business Logic

```typescript
// backend/src/services/todo.service.ts
import { TodoRepository } from '../repositories/todo.repository'
import { redis } from '../lib/redis'

export class TodoService {
  private repo = new TodoRepository()

  async findAll(userId: string) {
    // Try cache first
    const cacheKey = `todos:${userId}`
    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)

    // Cache miss — hit database
    const todos = await this.repo.findByUser(userId)

    // Cache for 60 seconds
    await redis.setex(cacheKey, 60, JSON.stringify(todos))
    return todos
  }

  async findById(id: string, userId: string) {
    return this.repo.findOne(id, userId)
  }

  async create(data: { title: string; priority: string; userId: string }) {
    const todo = await this.repo.create(data)

    // Invalidate user's todo cache
    await redis.del(`todos:${data.userId}`)

    return todo
  }

  async update(id: string, userId: string, data: Partial<{ title: string; completed: boolean; priority: string }>) {
    const todo = await this.repo.update(id, userId, data)
    if (todo) await redis.del(`todos:${userId}`)
    return todo
  }

  async delete(id: string, userId: string) {
    await this.repo.delete(id, userId)
    await redis.del(`todos:${userId}`)
  }
}
```

### 3.5 Repository Layer — Database Queries

```typescript
// backend/src/repositories/todo.repository.ts
import { prisma } from '../lib/prisma'

export class TodoRepository {
  findByUser(userId: string) {
    return prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  findOne(id: string, userId: string) {
    return prisma.todo.findFirst({
      where: { id, userId }, // always filter by userId for security!
    })
  }

  create(data: { title: string; priority: string; userId: string }) {
    return prisma.todo.create({ data })
  }

  update(id: string, userId: string, data: object) {
    return prisma.todo.update({
      where: { id, userId },
      data,
    })
  }

  delete(id: string, userId: string) {
    return prisma.todo.delete({
      where: { id, userId },
    })
  }
}
```

### 3.6 API Design — REST Best Practices

```mermaid
graph LR
    subgraph Resources["Resource Naming"]
        R1["✅ GET /users"]
        R2["✅ GET /users/123"]
        R3["✅ POST /users"]
        R4["✅ PATCH /users/123"]
        R5["✅ DELETE /users/123"]
        R6["❌ GET /getUsers"]
        R7["❌ POST /createUser"]
        R8["❌ GET /user/delete/123"]
    end
```

**HTTP Status Codes — use these correctly:**

| Status | Meaning | When to Use |
|--------|---------|-------------|
| `200 OK` | Success | GET, PATCH, PUT succeeded |
| `201 Created` | Resource created | POST that creates a resource |
| `204 No Content` | Success, no body | DELETE, sometimes PATCH |
| `400 Bad Request` | Client sent bad data | Validation failed |
| `401 Unauthorized` | Not authenticated | No or invalid token |
| `403 Forbidden` | Not authorized | Has token but no permission |
| `404 Not Found` | Resource doesn't exist | Item doesn't exist |
| `409 Conflict` | Conflict with current state | Duplicate email, etc. |
| `422 Unprocessable Entity` | Semantic validation error | Business rule violation |
| `429 Too Many Requests` | Rate limited | Rate limit exceeded |
| `500 Internal Server Error` | Server bug | Unexpected errors |

### 3.7 Rate Limiting — Protect Your API

```typescript
// backend/src/middleware/rate-limit.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { redis } from '../lib/redis'

export async function rateLimit(
  request: FastifyRequest,
  reply: FastifyReply,
  options = { limit: 100, window: 60 } // 100 requests per 60 seconds
) {
  const identifier = request.user?.userId || request.ip
  const key = `ratelimit:${identifier}:${request.routerPath}`

  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, options.window)
  }

  // Set rate limit headers so client knows their limit
  reply.header('X-RateLimit-Limit', options.limit)
  reply.header('X-RateLimit-Remaining', Math.max(0, options.limit - current))

  if (current > options.limit) {
    return reply.status(429).send({
      error: 'Too many requests. Please try again later.',
    })
  }
}
```

### 3.8 Background Jobs — Do Heavy Work Async

```typescript
// backend/src/lib/queue.ts
import { Queue, Worker } from 'bullmq'
import { redis } from './redis'

// Create queues
export const emailQueue = new Queue('email', { connection: redis })
export const notificationQueue = new Queue('notifications', { connection: redis })

// Add jobs to queue
export async function sendWelcomeEmail(userId: string, email: string) {
  await emailQueue.add('welcome-email', { userId, email }, {
    attempts: 3, // retry 3 times on failure
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
    removeOnFail: 100, // keep last 100 failed jobs
  })
}

// Process jobs
const emailWorker = new Worker('email', async (job) => {
  if (job.name === 'welcome-email') {
    const { userId, email } = job.data
    await sendEmail({
      to: email,
      subject: 'Welcome!',
      template: 'welcome',
      data: { userId },
    })
  }
}, { connection: redis })

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err)
})
```

---

<a id="section-4"></a>

## 💾 SECTION 4 — Database Engineering Masterclass

### 4.1 Prisma Schema — Define Your Data

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String   // hashed with bcrypt
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  todos     Todo[]
  sessions  Session[]

  @@index([email])
}

model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  priority  Priority @default(MEDIUM)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([userId, completed]) // compound index for common query
}

model Session {
  id           String   @id @default(cuid())
  refreshToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([refreshToken])
}

enum Role {
  USER
  ADMIN
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

```bash
# Run migrations
npx prisma migrate dev --name init
npx prisma migrate deploy  # production

# View your data
npx prisma studio
```

### 4.2 Database Indexing — Speed Up Your Queries

```mermaid
flowchart LR
    Query[SELECT * FROM todos\nWHERE user_id = '123'\nAND completed = false] --> Check{Index exists?}
    Check -- No --> SeqScan[Sequential Scan\n🔴 Reads EVERY row\nSlow on large tables]
    Check -- Yes --> IndexScan[Index Scan\n🟢 Jumps directly\nto matching rows]
```

> 💡 **Rule of thumb:** Add an index on any column you `WHERE`, `JOIN`, or `ORDER BY` in queries.

```sql
-- Common indexes to add
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_user_completed ON todos(user_id, completed);  -- compound
CREATE INDEX idx_users_email ON users(email);  -- unique lookup
CREATE INDEX idx_sessions_refresh_token ON sessions(refresh_token);

-- Check query performance
EXPLAIN ANALYZE SELECT * FROM todos WHERE user_id = '123' AND completed = false;
```

> ⚠️ **Watch Out:** Don't add indexes on every column — they slow down writes. Only index columns you actually query against.

### 4.3 Database Migrations — Never Break Production

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CI as CI Pipeline
    participant Staging as Staging DB
    participant Prod as Production DB

    Dev->>Dev: Create migration file
    Dev->>Dev: Test migration locally
    Dev->>CI: Push to main branch
    CI->>Staging: Run migration on staging
    CI->>CI: Run integration tests
    CI->>Prod: Run migration on production
    Prod-->>CI: Migration success
    CI->>Prod: Deploy new app version
```

```bash
# ✅ Safe migration workflow
# 1. Create migration
npx prisma migrate dev --name add_priority_to_todos

# 2. Review the generated SQL before applying
cat prisma/migrations/20260101000000_add_priority_to_todos/migration.sql

# 3. Apply to production (in CI)
npx prisma migrate deploy

# ✅ Zero-downtime migration rules:
# - Add nullable columns (no downtime)
# - Add indexes CONCURRENTLY (no lock)
# - Never remove columns without deprecation period
# - Rename columns: add new → copy data → remove old
```

### 4.4 Query Performance — Find and Fix Slow Queries

```typescript
// backend/src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
})

// Log slow queries in production
prisma.$on('query' as never, (e: any) => {
  if (e.duration > 1000) { // slower than 1 second
    console.warn(`Slow query (${e.duration}ms):`, e.query)
  }
})

export { prisma }
```

```typescript
// ✅ Avoid N+1 queries — this is the #1 database mistake

// ❌ N+1 problem (1 query for users + N queries for todos)
const users = await prisma.user.findMany()
for (const user of users) {
  user.todos = await prisma.todo.findMany({ where: { userId: user.id } })
  // This runs 1 query PER user!
}

// ✅ Fix with include (1 query total)
const users = await prisma.user.findMany({
  include: { todos: true },
})
```

### 4.5 Redis — Caching Done Right

```typescript
// backend/src/lib/redis.ts
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

redis.on('error', (err) => console.error('Redis error:', err))
redis.on('connect', () => console.log('Redis connected'))

// Helper functions
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const val = await redis.get(key)
    return val ? JSON.parse(val) : null
  },

  async set(key: string, value: unknown, ttlSeconds = 300) {
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
  },

  async del(key: string) {
    await redis.del(key)
  },

  async invalidatePattern(pattern: string) {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) await redis.del(...keys)
  },
}

// Usage
await cache.set('user:123:profile', userProfile, 600) // 10 minutes
const profile = await cache.get<UserProfile>('user:123:profile')
```

**When to cache what:**

| Data | Cache? | TTL | Why |
|------|--------|-----|-----|
| User profile | Yes | 5-10 min | Rarely changes |
| Product list | Yes | 1-5 min | High read traffic |
| Shopping cart | No | — | Per-user, must be fresh |
| Auth tokens | Yes (Redis) | = token expiry | Fast lookup |
| Search results | Yes | 1 min | Expensive queries |
| Real-time data | No | — | Must be live |

---

<a id="section-5"></a>

## 🔐 SECTION 5 — Auth & Security

### 5.1 JWT Auth Flow — How It Works

```mermaid
sequenceDiagram
    participant Client as Browser / App
    participant API as Backend API
    participant DB as Database
    participant Redis as Redis

    Note over Client,Redis: LOGIN FLOW
    Client->>API: POST /auth/login\n{email, password}
    API->>DB: Find user by email
    DB-->>API: User record
    API->>API: Verify password (bcrypt)
    API->>API: Generate access token (15min)\n+ refresh token (7 days)
    API->>DB: Store refresh token
    API-->>Client: { accessToken, refreshToken }
    Client->>Client: Store tokens securely

    Note over Client,Redis: AUTHENTICATED REQUEST
    Client->>API: GET /todos\nAuthorization: Bearer {accessToken}
    API->>API: Verify JWT signature
    API->>DB: Fetch todos for userId
    DB-->>API: Todos
    API-->>Client: Todos response

    Note over Client,Redis: TOKEN REFRESH
    Client->>API: POST /auth/refresh\n{refreshToken}
    API->>DB: Verify refresh token is valid & not expired
    DB-->>API: Valid
    API->>API: Generate new access token
    API-->>Client: { accessToken }

    Note over Client,Redis: LOGOUT
    Client->>API: POST /auth/logout\n{refreshToken}
    API->>DB: Delete refresh token from DB
    API-->>Client: 200 OK
    Client->>Client: Clear stored tokens
```

### 5.2 Auth Implementation — Complete Code

```typescript
// backend/src/routes/auth.ts
import bcrypt from 'bcrypt'
import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { signTokens, verifyRefreshToken } from '../lib/jwt'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).max(100),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Register
  fastify.post('/register', async (request, reply) => {
    const { email, password, name } = registerSchema.parse(request.body)

    // Check duplicate
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return reply.status(409).send({ error: 'Email already in use' })

    // Hash password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    const { accessToken, refreshToken } = await signTokens(user.id)

    return reply.status(201).send({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    })
  })

  // Login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })

    // Always use constant-time comparison — don't reveal if email exists
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, '$2b$12$invalidhashfortimingreasons')

    if (!user || !passwordMatch) {
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const { accessToken, refreshToken } = await signTokens(user.id)

    return reply.send({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    })
  })

  // Refresh token
  fastify.post('/refresh', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string }

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    })

    if (!session || session.expiresAt < new Date()) {
      // Delete expired session
      if (session) await prisma.session.delete({ where: { id: session.id } })
      return reply.status(401).send({ error: 'Invalid or expired refresh token' })
    }

    const { accessToken } = await signTokens(session.userId)
    return reply.send({ accessToken })
  })

  // Logout
  fastify.post('/logout', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string }
    await prisma.session.deleteMany({ where: { refreshToken } })
    return reply.status(200).send({ message: 'Logged out' })
  })
}
```

```typescript
// backend/src/lib/jwt.ts
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const ACCESS_SECRET = process.env.JWT_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' })
}

export async function signTokens(userId: string) {
  const accessToken = generateAccessToken(userId)
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' })

  // Store refresh token in DB
  await prisma.session.create({
    data: {
      userId,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  })

  return { accessToken, refreshToken }
}
```

```typescript
// backend/src/middleware/auth.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return reply.status(401).send({ error: 'Authorization token required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    request.user = payload // TypeScript: declare this in types/fastify.d.ts
  } catch {
    return reply.status(401).send({ error: 'Invalid or expired token' })
  }
}
```

### 5.3 Security Checklist — Production Must-Haves

```mermaid
graph TD
    subgraph Input["🛡️ Input Security"]
        A[Validate ALL inputs\nZod / Pydantic]
        B[Parameterized queries\nNever string concat SQL]
        C[Sanitize HTML output\nDOMPurify]
    end

    subgraph Auth["🔐 Auth Security"]
        D[Hash passwords\nbcrypt rounds=12]
        E[Short-lived tokens\n15 min access tokens]
        F[HTTPS only\nHSTS headers]
        G[Secure cookies\nHttpOnly + SameSite]
    end

    subgraph Headers["📋 Security Headers"]
        H[Content-Security-Policy]
        I[X-Frame-Options: DENY]
        J[X-Content-Type-Options: nosniff]
        K[Referrer-Policy]
    end

    subgraph Secrets["🔑 Secrets"]
        L[Never in code/git\nUse env vars]
        M[Rotate regularly]
        N[Use secret managers\nAWS Secrets Manager / Vault]
    end
```

```typescript
// ✅ Security headers with Fastify Helmet
await server.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // tighten in production
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
  },
})
```

---

<a id="section-6"></a>

## 🧪 SECTION 6 — Testing Strategy

### 6.1 The Testing Pyramid

```mermaid
graph TD
    subgraph Pyramid["Testing Pyramid"]
        E2E["🔺 E2E Tests\n~10%\nSlow, expensive, realistic\nPlaywright / Cypress"]
        INT["🔸 Integration Tests\n~30%\nTest API + DB together\nVitest + Supertest"]
        UNIT["🔷 Unit Tests\n~60%\nFast, cheap, isolated\nVitest / Jest"]
    end

    UNIT --> INT
    INT --> E2E
```

> 💡 **Senior Insight:** Most beginners write zero tests, then scramble when production breaks. Even 20% coverage on critical paths beats 0%.

### 6.2 Unit Tests — Test Your Business Logic

```typescript
// backend/src/services/__tests__/todo.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TodoService } from '../todo.service'

// Mock the repository
vi.mock('../../repositories/todo.repository', () => ({
  TodoRepository: vi.fn().mockImplementation(() => ({
    findByUser: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  })),
}))

// Mock Redis
vi.mock('../../lib/redis', () => ({
  cache: {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn(),
    del: vi.fn(),
  },
}))

describe('TodoService', () => {
  let service: TodoService

  beforeEach(() => {
    service = new TodoService()
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create a todo and invalidate cache', async () => {
      const mockTodo = { id: '1', title: 'Test todo', userId: 'user1' }
      const { TodoRepository } = await import('../../repositories/todo.repository')
      const mockRepo = new (TodoRepository as any)()
      mockRepo.create.mockResolvedValue(mockTodo)

      const result = await service.create({
        title: 'Test todo',
        userId: 'user1',
        priority: 'medium',
      })

      expect(result).toEqual(mockTodo)
    })
  })
})
```

### 6.3 Integration Tests — Test Your API

```typescript
// backend/src/routes/__tests__/todos.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { buildApp } from '../../server'
import { prisma } from '../../lib/prisma'
import { generateAccessToken } from '../../lib/jwt'

describe('Todos API', () => {
  let app: Awaited<ReturnType<typeof buildApp>>
  let accessToken: string
  let userId: string

  beforeAll(async () => {
    app = await buildApp()

    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: 'hashedpassword',
        name: 'Test User',
      },
    })
    userId = user.id
    accessToken = generateAccessToken(userId)
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } })
    await app.close()
  })

  it('GET /todos should return empty list for new user', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/todos',
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual([])
  })

  it('POST /todos should create a todo', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/todos',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'Test todo', priority: 'high' }),
    })

    expect(response.statusCode).toBe(201)
    const todo = JSON.parse(response.body)
    expect(todo.title).toBe('Test todo')
    expect(todo.userId).toBe(userId)
  })

  it('POST /todos should return 400 for invalid input', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/todos',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: '' }), // empty title is invalid
    })

    expect(response.statusCode).toBe(400)
  })
})
```

### 6.4 E2E Tests — Test Like a Real User

```typescript
// frontend/e2e/todo.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Todo Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('[name=email]', 'test@example.com')
    await page.fill('[name=password]', 'password123')
    await page.click('[type=submit]')
    await page.waitForURL('/dashboard')
  })

  test('can create a new todo', async ({ page }) => {
    await page.goto('/dashboard')

    await page.fill('[placeholder="What needs to be done?"]', 'Buy groceries')
    await page.click('[type=submit]')

    await expect(page.getByText('Buy groceries')).toBeVisible()
  })

  test('can mark todo as complete', async ({ page }) => {
    await page.goto('/dashboard')

    // Find the first todo and click its checkbox
    await page.click('[data-testid="todo-checkbox"]')

    await expect(page.locator('[data-testid="todo-item"]').first())
      .toHaveClass(/completed/)
  })
})
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
```

---

<a id="section-7"></a>

## 🚀 SECTION 7 — DevOps & CI/CD

### 7.1 Docker — Containerize Your App

**Why Docker?**

```mermaid
graph LR
    DEV["🧑‍💻 Your Machine\n'Works on my machine'"] -- No Docker --> PROD["🔥 Production\n'Crashes in prod'"]
    DEV -- With Docker --> SAME["📦 Identical Container\nSame everywhere"]
    SAME --> PROD2["✅ Production\nWorks perfectly"]
```

```dockerfile
# backend/Dockerfile — multi-stage build
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Production image (smaller!)
FROM node:22-alpine AS runner
WORKDIR /app

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy only what's needed
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 4000
CMD ["node", "dist/server.js"]
```

```dockerfile
# frontend/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build and run locally
docker build -t my-backend:latest ./backend
docker build -t my-frontend:latest ./frontend

docker run -p 4000:4000 --env-file ./backend/.env my-backend:latest
docker run -p 3000:3000 my-frontend:latest
```

### 7.2 GitHub Actions CI/CD — Full Pipeline

```mermaid
flowchart LR
    Push[Git Push] --> CI[CI Pipeline]
    CI --> Lint[Lint & Type Check]
    CI --> Test[Run Tests]
    CI --> Security[Security Scan]
    Lint & Test & Security --> Build[Build Docker Image]
    Build --> Push2[Push to Registry]
    Push2 --> Deploy[Deploy to Staging]
    Deploy --> Smoke[Smoke Tests]
    Smoke -- Pass --> Prod[Deploy to Production]
    Smoke -- Fail --> Rollback[Rollback]
```

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: myapp_test
          POSTGRES_USER: myapp
          POSTGRES_PASSWORD: password
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports: ['6379:6379']

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install backend deps
        run: cd backend && npm ci

      - name: Install frontend deps
        run: cd frontend && npm ci

      - name: Run backend lint
        run: cd backend && npm run lint

      - name: Run frontend lint
        run: cd frontend && npm run lint

      - name: Run backend type check
        run: cd backend && npm run type-check

      - name: Run backend tests
        run: cd backend && npm test
        env:
          DATABASE_URL: postgresql://myapp:password@localhost:5432/myapp_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret-key

      - name: Run frontend tests
        run: cd frontend && npm test

  build-and-push:
    name: Build & Push Docker Images
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-backend:latest

      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-frontend:latest

  deploy-staging:
    name: Deploy to Staging
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - name: Deploy to staging
        run: |
          # SSH into server and pull latest image
          # Or update ECS task definition
          echo "Deploying to staging..."

      - name: Run smoke tests
        run: |
          sleep 30  # Wait for app to start
          curl -f https://staging.myapp.com/health || exit 1

  deploy-production:
    name: Deploy to Production
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval in GitHub

    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."

      - name: Verify deployment
        run: curl -f https://myapp.com/health || exit 1
```

### 7.3 Deployment Strategies — Pick the Right One

```mermaid
graph TD
    subgraph Rolling["🔄 Rolling Deploy"]
        R1[v1 Pod] --> R2[v2 Pod replacing v1]
        R2 --> R3[v2 running]
        note1["✅ No downtime\n⚠️ Brief mixed version period"]
    end

    subgraph BlueGreen["🔵🟢 Blue-Green Deploy"]
        BG1[Blue: v1 LIVE] --> BG2[Green: v2 READY]
        BG2 --> BG3[Switch traffic to Green instantly]
        note2["✅ Instant switch\n✅ Easy rollback\n⚠️ Costs 2x infra temporarily"]
    end

    subgraph Canary["🐤 Canary Deploy"]
        C1[100% → v1] --> C2[5% → v2, 95% → v1]
        C2 --> C3[Metrics OK? → 50%/50%]
        C3 --> C4[100% → v2]
        note3["✅ Safest\n✅ Real user testing\n⚠️ More complex"]
    end
```

| Strategy | Use When | Downtime | Rollback Speed | Cost |
|----------|----------|----------|----------------|------|
| Rolling | Most apps, tolerates brief mixed state | None | Minutes | Low |
| Blue-Green | Zero-tolerance downtime, need instant rollback | None | Seconds | 2x |
| Canary | High-risk changes, large user base | None | Minutes | Low+ |
| Feature Flags | Risk-free code deployments | None | Instant | Low |

> 💡 **Default for most apps:** Rolling deploy. Use canary when you're nervous about a change.

---

<a id="section-8"></a>

## ☁️ SECTION 8 — Cloud & Infrastructure

### 8.1 Cloud Provider — Which to Choose?

```mermaid
flowchart TD
    A[Which cloud?] --> B{Are you already in\nan ecosystem?}
    B -- Microsoft/Azure shop --> AZ[Azure\n✅ AD integration\n✅ .NET tooling\n✅ Enterprise support]
    B -- Google workspace / BigQuery --> GCP[Google Cloud\n✅ Best Kubernetes\n✅ Best data tools\n✅ AI/ML leader]
    B -- None / Starting fresh --> C{Team size?}
    C -- Solo / Small team --> AWS[AWS\n✅ Most services\n✅ Best docs\n✅ Most jobs\n✅ Default choice]
    C -- Enterprise --> AWS
```

> 💡 **Default:** AWS. It has the most services, best documentation, largest community, and most job market demand.

### 8.2 AWS Architecture — Minimal Production Setup

```mermaid
graph TB
    subgraph Internet["🌐 Internet"]
        User[Users]
    end

    subgraph AWS["☁️ AWS"]
        subgraph Edge["Edge"]
            CF[CloudFront CDN]
            R53[Route 53 DNS]
        end

        subgraph Compute["Compute — us-east-1"]
            subgraph VPC["VPC"]
                subgraph Public["Public Subnet"]
                    ALB[Application\nLoad Balancer]
                end
                subgraph Private["Private Subnet"]
                    ECS[ECS Fargate\nApp Containers]
                end
                subgraph Data["Data Subnet"]
                    RDS[(RDS PostgreSQL\nMulti-AZ)]
                    Elasticache[(ElastiCache\nRedis)]
                end
            end
        end

        subgraph Storage["Storage"]
            S3[S3 Bucket\nStatic Assets]
            ECR[ECR\nDocker Registry]
        end

        subgraph Secrets["Secrets & Config"]
            SM[Secrets Manager]
            SSM[Parameter Store]
        end
    end

    User --> R53
    R53 --> CF
    CF --> ALB
    CF --> S3
    ALB --> ECS
    ECS --> RDS
    ECS --> Elasticache
    ECS --> S3
    ECS --> SM
```

### 8.3 Terraform — Infrastructure as Code

```hcl
# infrastructure/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Store state remotely so team shares it
  backend "s3" {
    bucket = "my-app-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0"

  name = "my-app-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false  # true for cost saving in non-prod
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  identifier        = "my-app-postgres"
  engine            = "postgres"
  engine_version    = "16.1"
  instance_class    = "db.t3.medium"
  allocated_storage = 20
  storage_encrypted = true

  db_name  = "myapp"
  username = "myapp"
  password = var.db_password  # from secrets, never hardcoded

  multi_az               = true  # High availability
  backup_retention_period = 7
  skip_final_snapshot    = false

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "main" {
  cluster_id           = "my-app-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
}
```

```bash
# Terraform commands
terraform init          # Initialize providers
terraform plan          # Preview changes
terraform apply         # Apply changes
terraform destroy       # Destroy everything (careful!)
terraform output        # Show output values
```

> ⚠️ **Watch Out:** Never run `terraform destroy` on production without backup and confirmation. It deletes everything.

---

<a id="section-9"></a>

## 📊 SECTION 9 — Observability & Monitoring

### 9.1 The Three Pillars of Observability

```mermaid
graph TD
    subgraph Logs["📝 Logs — WHAT happened"]
        L1["2026-01-15T10:23:45Z INFO User logged in userId=abc123"]
        L2["2026-01-15T10:23:46Z ERROR DB query failed: connection timeout"]
    end

    subgraph Metrics["📈 Metrics — HOW MUCH / HOW FAST"]
        M1["api_requests_total{path='/todos', status='200'} 1523"]
        M2["api_response_time_ms{p99} 245"]
        M3["db_connections_active 23"]
    end

    subgraph Traces["🔍 Traces — WHERE it spent time"]
        T1["Request: GET /todos\n  → Auth check: 2ms\n  → Redis cache: 1ms\n  → DB query: 45ms\n  → Response: 48ms total"]
    end

    Logs --> Grafana
    Metrics --> Grafana
    Traces --> Grafana

    Grafana[🖥️ Grafana Dashboard\nAlerts + Dashboards]
```

### 9.2 Structured Logging — Do This Right

```typescript
// backend/src/lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' } // Human-readable in dev
    : undefined, // JSON in production (for log aggregation)
  base: {
    service: 'my-backend',
    env: process.env.NODE_ENV,
  },
})

// Usage — always include context
logger.info({ userId: '123', action: 'todo.created', todoId: 'abc' }, 'Todo created')
logger.error({ err, userId: '123', todoId: 'abc' }, 'Failed to create todo')
logger.warn({ ip: '1.2.3.4', path: '/api/todos' }, 'Rate limit approaching')

// ✅ Good log: has context
// { level: 'info', userId: '123', action: 'todo.created', msg: 'Todo created' }

// ❌ Bad log: no context
// console.log('Todo created')
```

### 9.3 OpenTelemetry — Distributed Tracing

```typescript
// backend/src/lib/telemetry.ts
// Set this up BEFORE any other imports!
import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PrismaInstrumentation } from '@prisma/instrumentation'

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.APP_VERSION || '1.0.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new PrismaInstrumentation(),
  ],
})

sdk.start()
process.on('SIGTERM', () => sdk.shutdown())
```

### 9.4 Alerts — Get Notified Before Users Complain

**Set these alerts in Grafana or CloudWatch:**

| Alert | Threshold | Action |
|-------|-----------|--------|
| High error rate | > 1% of requests return 5xx | Page on-call immediately |
| Slow response time | p99 > 2 seconds | Page on-call |
| High CPU | > 80% for 5 min | Scale up, investigate |
| High memory | > 85% | Check for memory leaks |
| DB connections near limit | > 80% of pool | Scale DB or fix pooling |
| Disk space low | > 85% | Expand or clean up |
| Health check failing | Any failure | Page on-call immediately |

```yaml
# Grafana alert rule example
groups:
  - name: my-app
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m]))
          > 0.01
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "{{ $value | humanizePercentage }} of requests are failing"
```

---

<a id="section-10"></a>

## ⚡ SECTION 10 — Performance Engineering

### 10.1 Frontend Performance — Find & Fix Issues

```mermaid
flowchart TD
    A[App is slow] --> B{Where is it slow?}
    B -- First page load --> C[Measure LCP]
    B -- After first load --> D[Measure INP/FID]
    B -- Page jumps around --> E[Measure CLS]

    C --> C1{> 2.5s?}
    C1 -- Yes --> C2[Fix:\n1. Use CDN for assets\n2. Preload hero image\n3. Use SSR/SSG\n4. Reduce server time]

    D --> D1{> 200ms?}
    D1 -- Yes --> D2[Fix:\n1. Code split bundles\n2. Remove unused JS\n3. Defer non-critical JS\n4. Use web workers]

    E --> E1{> 0.1?}
    E1 -- Yes --> E2[Fix:\n1. Set image dimensions\n2. Reserve space for ads\n3. Avoid late DOM inserts]
```

```bash
# Measure performance
npx lighthouse https://yourapp.com --output html --output-path ./report.html

# Check bundle size
npx @next/bundle-analyzer
# Add to next.config.js:
# ANALYZE=true npm run build
```

### 10.2 Backend Performance — What Slows APIs Down

```mermaid
graph TD
    Slow[Slow API Response] --> DB[Database: 80% of slowness]
    Slow --> Network[Network: 15%]
    Slow --> Code[App Code: 5%]

    DB --> Fix1[Fix DB issues:\n- Add missing indexes\n- Fix N+1 queries\n- Add caching\n- Use read replicas]

    Network --> Fix2[Fix network issues:\n- Use CDN\n- Compress responses\n- Reduce payload size]

    Code --> Fix3[Fix code issues:\n- Move CPU work to workers\n- Use streaming\n- Optimize hot paths]
```

```typescript
// ✅ Measure what's slow — never guess
import { performance } from 'perf_hooks'

async function slowOperation() {
  const start = performance.now()

  const result = await expensiveQuery()

  const duration = performance.now() - start
  logger.info({ duration: `${duration.toFixed(2)}ms`, operation: 'expensiveQuery' }, 'Query completed')

  if (duration > 500) {
    logger.warn({ duration }, 'Slow query detected')
  }

  return result
}
```

---

<a id="section-11"></a>

## 🏗️ SECTION 11 — System Design Patterns

### 11.1 Monolith vs Microservices — The Honest Guide

```mermaid
graph TD
    Start[New Project] --> Q1{Team size?}
    Q1 -- 1-5 devs --> MONO[Start with Monolith\nMove fast, low complexity]
    Q1 -- 5-20 devs --> Q2{Does each domain need\nindependent deployment?}
    Q2 -- No --> MOD[Modular Monolith\nModules with clean boundaries]
    Q2 -- Yes --> MICRO[Microservices\nOnly with mature teams]
    Q1 -- 20+ devs --> MICRO2[Microservices\nOR large modular monolith]

    MONO --> Q3{App outgrowing monolith?}
    Q3 -- Yes --> EXTRACT[Extract services gradually\nNot all at once]
    Q3 -- No --> STAY[Stay monolith — it's fine!]
```

> 🔥 **Senior Insight:** Amazon, Shopify, Stack Overflow, Basecamp — all started as monoliths. Microservices aren't a sign of maturity; they're a solution to a specific scaling problem. Don't adopt them until you feel the pain.

**Cost comparison:**

| | Monolith | Microservices |
|--|---------|--------------|
| Complexity | Low | Very High |
| Deployment | 1 process | N services, N deployments |
| Debugging | Easy (1 log stream) | Hard (distributed tracing) |
| Team coordination | Low overhead | High coordination |
| Local dev | Easy | Docker Compose hell |
| When it breaks | Easy to fix | Hard to trace |
| Good for | Startups, small teams | Large orgs, big teams |

### 11.2 Event-Driven Architecture — When You Need It

```mermaid
sequenceDiagram
    participant API as Order API
    participant Queue as Message Queue (SQS/Kafka)
    participant Email as Email Service
    participant Inventory as Inventory Service
    participant Analytics as Analytics Service

    API->>API: Order created
    API->>Queue: Publish: order.created event
    API-->>User: 201 Order confirmed

    Queue-->>Email: Consume: order.created
    Email->>Email: Send confirmation email

    Queue-->>Inventory: Consume: order.created
    Inventory->>Inventory: Reserve stock

    Queue-->>Analytics: Consume: order.created
    Analytics->>Analytics: Track revenue event
```

> 💡 **Use event-driven when:** Multiple systems need to react to the same event. Don't use it just because it sounds cool — it adds significant complexity.

### 11.3 CAP Theorem — Understand This

```mermaid
graph TD
    subgraph CAP["CAP Theorem — Pick 2 of 3"]
        C["🔒 Consistency\nEvery read sees\nlatest write"]
        A["⚡ Availability\nEvery request\ngets a response"]
        P["🌐 Partition Tolerance\nSystem works despite\nnetwork splits"]
    end

    C -- CA\n(Traditional SQL) --> SQL[(PostgreSQL\nMySQL)]
    A -- AP\n(Eventual consistency) --> NOSQL[(DynamoDB\nCassandra\nMongoDB)]
    C -- CP\n(Sacrifices availability) --> CP[(CockroachDB\nHBase)]
```

> 💡 **Real Talk:** Network partitions WILL happen. So you really only choose between **CP** (consistency) or **AP** (availability). For most web apps, **CP with PostgreSQL** is correct.

---

<a id="section-12"></a>

## 📐 SECTION 12 — Real-World App Blueprints

### Blueprint 1: SaaS Application

```mermaid
graph TB
    subgraph Users["Users"]
        Admin[Admin User]
        Regular[Regular User]
    end

    subgraph Frontend["Frontend (Next.js)"]
        Landing[Landing Page\nSSG - Fast, SEO]
        Dashboard[Dashboard SPA\nCSR - Dynamic]
        AdminPanel[Admin Panel\nProtected Route]
    end

    subgraph Auth["Auth Layer"]
        JWT[JWT Service]
        OAuth[OAuth Provider\nGoogle, GitHub]
    end

    subgraph Backend["Backend Services"]
        UserSvc[User Service]
        BillingSvc[Billing Service\nStripe Integration]
        TenantSvc[Tenant Service\nMulti-tenancy]
        EmailSvc[Email Service\nResend / SendGrid]
    end

    subgraph Data["Data Layer"]
        PG[(PostgreSQL\nUsers, Tenants, Data)]
        Redis[(Redis\nSessions, Cache)]
        S3[S3\nFile Uploads]
    end

    Admin --> AdminPanel
    Regular --> Dashboard
    Dashboard --> JWT
    JWT --> UserSvc
    UserSvc --> PG
    BillingSvc --> PG
    TenantSvc --> PG
    Dashboard --> Redis
```

**Key SaaS considerations:**
- Multi-tenancy: add `tenantId` to all data tables
- Billing: integrate Stripe webhooks for subscription events
- Auth: support OAuth login + email/password
- Permissions: RBAC per tenant

### Blueprint 2: E-Commerce Platform

```mermaid
graph TB
    subgraph Customer["Customer Flow"]
        Browse[Browse Products\nSSR - SEO Critical]
        Cart[Shopping Cart\nCSR - Real-time]
        Checkout[Checkout\nSSR - Trust signals]
    end

    subgraph Backend["Services"]
        CatalogSvc[Catalog Service\nProducts, Search]
        CartSvc[Cart Service\nRedis-backed]
        OrderSvc[Order Service\nPostgreSQL]
        PaymentSvc[Payment Service\nStripe]
        InventorySvc[Inventory Service]
        NotifySvc[Notification Service\nEmail / SMS]
    end

    subgraph Data["Data"]
        PG[(PostgreSQL\nOrders, Users)]
        ES[(Elasticsearch\nProduct Search)]
        Redis[(Redis\nCart, Sessions)]
    end

    Browse --> CatalogSvc
    Cart --> CartSvc
    Checkout --> OrderSvc
    OrderSvc --> PaymentSvc
    OrderSvc --> InventorySvc
    OrderSvc --> NotifySvc
    CatalogSvc --> ES
    CartSvc --> Redis
    OrderSvc --> PG
```

### Blueprint 3: Real-Time Chat App

```mermaid
sequenceDiagram
    participant Alice
    participant Server as Chat Server
    participant Bob
    participant DB as PostgreSQL
    participant Redis as Redis Pub/Sub

    Alice->>Server: WebSocket connect + auth
    Bob->>Server: WebSocket connect + auth

    Alice->>Server: Send message "Hello!"
    Server->>DB: Save message
    Server->>Redis: Publish to channel:room123
    Redis-->>Server: Fan-out to subscribers
    Server->>Bob: Push message in real-time
    Bob-->>Alice: "Hello!" appears instantly
```

```typescript
// Real-time with Socket.io
import { Server } from 'socket.io'

const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL }
})

io.use(async (socket, next) => {
  // Authenticate on connect
  const token = socket.handshake.auth.token
  const user = await verifyToken(token)
  if (!user) return next(new Error('Unauthorized'))
  socket.data.user = user
  next()
})

io.on('connection', (socket) => {
  const { userId } = socket.data.user

  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-joined', { userId })
  })

  socket.on('send-message', async ({ roomId, content }) => {
    const message = await prisma.message.create({
      data: { roomId, content, userId },
      include: { user: true },
    })
    io.to(roomId).emit('new-message', message)
  })
})
```

### Blueprint 4: API Platform

```mermaid
graph TB
    subgraph Consumers["API Consumers"]
        Mobile[Mobile Apps]
        Web[Web Apps]
        Third[Third-party Partners]
    end

    subgraph Gateway["API Gateway Layer"]
        Kong[Kong / AWS API Gateway]
        RateLimit[Rate Limiting]
        AuthGW[API Key Auth]
        Cache[Response Cache]
    end

    subgraph Services["Core Services"]
        V1[API v1\nLegacy Support]
        V2[API v2\nCurrent]
        Docs[API Docs\nOpenAPI / Swagger]
        Webhooks[Webhook Delivery]
    end

    Mobile --> Kong
    Web --> Kong
    Third --> Kong
    Kong --> RateLimit
    RateLimit --> AuthGW
    AuthGW --> V2
    AuthGW --> V1
```

---

<a id="section-13"></a>

## 🔧 SECTION 13 — Troubleshooting Guide

**The 25 problems every developer hits — with exact fixes.**

| # | Problem | Symptom | Fix |
|---|---------|---------|-----|
| 1 | API not responding | `CORS error` in browser console | Add `@fastify/cors` with frontend origin |
| 2 | Can't connect to DB | `ECONNREFUSED 5432` | Run `docker-compose up -d postgres` |
| 3 | Port in use | `Error: address already in use` | `lsof -ti:4000 \| xargs kill -9` |
| 4 | Env vars not loading | `undefined` values | Check `.env` file exists, restart server |
| 5 | Docker image huge | Image is 1GB+ | Use multi-stage Dockerfile |
| 6 | Auth token expired | 401 after 15 min | Implement refresh token flow |
| 7 | N+1 slow queries | API suddenly slow | Add `include` to Prisma queries |
| 8 | Memory leak | RAM keeps growing | Profile with `--inspect`, check for unclosed connections |
| 9 | Migration failed | Schema mismatch | Check migration order, rollback and re-run |
| 10 | Tests fail in CI only | Passes locally | Check env vars in CI, use `.env.test` |
| 11 | Secret in git | GitHub security alert | Rotate secret, add to `.gitignore`, use secret manager |
| 12 | 502 Bad Gateway | Load balancer error | App crashed — check logs: `docker logs <container>` |
| 13 | HTTPS cert broken | `ERR_CERT_AUTHORITY_INVALID` | Renew cert with certbot, check expiry date |
| 14 | DB connection limit | `too many connections` | Add PgBouncer pooler or reduce pool size |
| 15 | Disk full | Server stops responding | `df -h` to check, delete old logs, set up log rotation |
| 16 | Build fails in CI | `npm install` fails | Delete `package-lock.json`, commit fresh one |
| 17 | WebSocket drops | Connections disconnecting | Add heartbeat/ping-pong, check proxy timeouts |
| 18 | S3 upload fails | `Access Denied` | Check IAM permissions, bucket policy |
| 19 | Redis memory full | OOM errors | Set `maxmemory-policy allkeys-lru` |
| 20 | TypeScript errors | `Type 'X' is not assignable to 'Y'` | Read the error carefully, use `as` only as last resort |
| 21 | Prisma schema mismatch | `Table not found` | Run `npx prisma migrate deploy` |
| 22 | Race condition | Data sometimes wrong | Use DB transactions, add unique constraints |
| 23 | CPU spike | Server 100% CPU | Profile with `clinic.js`, check infinite loops |
| 24 | Slow frontend | LCP > 3s | Check bundle size with `next build`, lazy load |
| 25 | Email not sending | No emails arriving | Check spam folder, verify DKIM/SPF records |

```bash
# Essential debugging commands
# View logs
docker logs my-backend --tail=100 -f

# Check process health
curl http://localhost:4000/health

# Check DB connections
psql -U myapp -c "SELECT count(*) FROM pg_stat_activity;"

# Check Redis memory
redis-cli info memory | grep used_memory_human

# Check disk space
df -h

# Kill process on port
lsof -ti:4000 | xargs kill -9

# View database in terminal
npx prisma studio

# Check for slow queries
psql -U myapp -c "SELECT query, mean_exec_time, calls FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;"
```

---

<a id="section-14"></a>

## ✅ SECTION 14 — Production Launch Checklists

### Pre-Launch Checklist — Don't Ship Without These

```mermaid
graph TD
    subgraph Security["🔒 Security — P0 Blockers"]
        S1[✅ HTTPS everywhere]
        S2[✅ Secrets in env vars / secret manager]
        S3[✅ Input validation on all endpoints]
        S4[✅ Auth on all protected routes]
        S5[✅ Rate limiting configured]
        S6[✅ CORS configured correctly]
        S7[✅ Dependencies scanned — no critical CVEs]
    end

    subgraph Reliability["🛡️ Reliability — P0 Blockers"]
        R1[✅ Health check endpoint working]
        R2[✅ Database backups configured]
        R3[✅ Rollback plan documented]
        R4[✅ Error monitoring active — Sentry]
        R5[✅ Structured logging enabled]
    end

    subgraph Performance["⚡ Performance — P1"]
        P1[✅ Load test run — can handle expected traffic]
        P2[✅ Database indexes in place]
        P3[✅ Caching configured — Redis]
        P4[✅ CDN for static assets]
        P5[✅ Images optimized]
    end

    subgraph Observability["📊 Observability — P1"]
        O1[✅ Metrics dashboard set up — Grafana]
        O2[✅ Alerts configured for error rate + latency]
        O3[✅ Logs centralized — Loki / CloudWatch]
        O4[✅ On-call runbook written]
    end
```

**The checklist in copy-paste format:**

```markdown
## Security
- [ ] HTTPS configured and certificate valid
- [ ] All secrets in environment variables or secret manager
- [ ] Input validation on all API endpoints
- [ ] Authentication checked on all protected routes
- [ ] Rate limiting configured on public endpoints
- [ ] CORS set to specific allowed origins (not *)
- [ ] Dependency scan run (npm audit, Snyk)
- [ ] Container security scan (Trivy)
- [ ] SQL injection prevention (parameterized queries / ORM)
- [ ] XSS prevention (React auto-escapes, CSP headers)

## Reliability
- [ ] /health endpoint returning 200
- [ ] Automated database backups with tested restore
- [ ] Graceful shutdown handling (SIGTERM)
- [ ] Error monitoring active (Sentry)
- [ ] Structured logging to central store
- [ ] Circuit breakers on external dependencies
- [ ] Rollback procedure documented and tested

## Performance
- [ ] Load test with realistic traffic
- [ ] Database indexes on all queried columns
- [ ] N+1 queries eliminated
- [ ] Redis cache for expensive queries
- [ ] CDN for static assets
- [ ] Images optimized (WebP, lazy loading)
- [ ] API response times < 200ms for p95

## Deployment
- [ ] CI pipeline green (tests, lint, security scan)
- [ ] Docker images tagged with version (not just "latest")
- [ ] Environment variables set in production
- [ ] Database migrations applied
- [ ] Smoke tests passing on staging
- [ ] Monitoring dashboards verified

## Monitoring
- [ ] Error rate alerts set (> 1%)
- [ ] Latency alerts set (p99 > 2s)
- [ ] Health check monitoring active
- [ ] On-call rotation assigned
- [ ] Runbook written for common incidents
```

---

<a id="section-15"></a>

## 🔨 SECTION 15 — Tools & Libraries Reference 2026

### Frontend Tools

| Category | Tool | Why Use It | Get Started |
|----------|------|-----------|-------------|
| Framework | Next.js 15 | Best React framework, SSR, App Router | `npx create-next-app@latest` |
| Styling | Tailwind CSS | Utility-first, fast, consistent | `npm install -D tailwindcss` |
| Components | shadcn/ui | Copy-paste components, Tailwind-based | `npx shadcn-ui@latest init` |
| State | Zustand | Minimal, no boilerplate, TypeScript-first | `npm install zustand` |
| Server State | TanStack Query | Caching, sync, mutations | `npm install @tanstack/react-query` |
| Forms | React Hook Form + Zod | Performance + validation | `npm install react-hook-form zod @hookform/resolvers` |
| Animations | Framer Motion | Declarative, powerful | `npm install framer-motion` |
| Icons | Lucide React | Clean SVG icons | `npm install lucide-react` |
| Tables | TanStack Table | Headless, powerful | `npm install @tanstack/react-table` |
| Charts | Recharts / Tremor | Data visualization | `npm install recharts` |
| Testing | Vitest + RTL | Fast, Vite-native | `npm install -D vitest @testing-library/react` |
| E2E | Playwright | Real browser testing | `npm init playwright@latest` |

### Backend Tools

| Category | Tool | Why Use It | Get Started |
|----------|------|-----------|-------------|
| Runtime | Node.js 22 | LTS, fast, huge ecosystem | `node --version` |
| Framework | Fastify | Fastest Node.js framework | `npm install fastify` |
| Framework | NestJS | Enterprise, structured, DI | `npm install -g @nestjs/cli` |
| ORM | Prisma | Best TypeScript ORM | `npm install prisma @prisma/client` |
| Validation | Zod | TypeScript-first schema | `npm install zod` |
| Auth | jsonwebtoken | JWT tokens | `npm install jsonwebtoken` |
| Password | bcrypt | Secure hashing | `npm install bcrypt` |
| Queue | BullMQ | Redis-backed job queue | `npm install bullmq` |
| Logging | Pino | Fastest JSON logger | `npm install pino` |
| Email | Resend | Modern transactional email | `npm install resend` |
| File Upload | @aws-sdk/client-s3 | S3 uploads | `npm install @aws-sdk/client-s3` |
| HTTP Client | Axios | Requests to external APIs | `npm install axios` |
| Testing | Vitest | Fast, ESM-native | `npm install -D vitest` |

### Database Tools

| Category | Tool | Why Use It |
|----------|------|-----------|
| Primary DB | PostgreSQL 16 | Reliable, ACID, feature-rich |
| Cache | Redis 7 | Fast, TTL, pub/sub |
| ORM | Prisma | Type-safe, migrations |
| Migrations | Prisma Migrate | SQL diffs, history |
| GUI | TablePlus / Prisma Studio | Visualize DB |
| Search | Elasticsearch 8 / Typesense | Full-text search |
| Analytics | ClickHouse / Snowflake | OLAP queries |

### DevOps & Infrastructure Tools

| Category | Tool | Why Use It |
|----------|------|-----------|
| CI/CD | GitHub Actions | Free for open source, integrated |
| Containers | Docker + BuildKit | Package apps consistently |
| Orchestration | Kubernetes / AWS ECS | Run containers at scale |
| IaC | Terraform | Declarative infra |
| Registry | GitHub Container Registry | Free with GitHub |
| Secrets | AWS Secrets Manager | Managed secret rotation |
| SSL | Let's Encrypt / AWS ACM | Free TLS certificates |

### Observability Tools

| Category | Tool | Why Use It |
|----------|------|-----------|
| Tracing | OpenTelemetry | Vendor-neutral standard |
| Metrics | Prometheus + Grafana | Industry standard |
| Logs | Loki | Grafana-native, cheap |
| Error tracking | Sentry | Best error tracking |
| Uptime | Betterstack / UptimeRobot | External health checks |
| APM | Datadog / New Relic | All-in-one (paid) |

### Security Tools

| Category | Tool | Why Use It |
|----------|------|-----------|
| Dependency scan | Dependabot + Snyk | Automated CVE alerts |
| Container scan | Trivy | Free, fast image scanning |
| SAST | CodeQL / SonarQube | Static code analysis |
| Pen testing | OWASP ZAP | Automated security testing |
| Secrets scan | GitLeaks | Prevent secrets in git |

---

<a id="section-16"></a>

## 🧠 SECTION 16 — Senior Engineer Mental Models

### 16.1 The Principles That Separate Senior from Junior

```mermaid
graph TD
    subgraph Junior["Junior Engineer Thinking"]
        J1["'Does it work?'"]
        J2["'I'll add tests later'"]
        J3["'It works on my machine'"]
        J4["'Let me add more microservices'"]
    end

    subgraph Senior["Senior Engineer Thinking"]
        S1["'Does it work reliably at scale?'"]
        S2["'Tests prove it works'"]
        S3["'CI runs in the same environment'"]
        S4["'Keep it as simple as possible'"]
    end
```

### 16.2 The 5 Mental Models

**1. Small > Big — Ship incrementally**
> Never build 3 months of code without shipping. Ship every few days. Get feedback. Adjust.

**2. Observe > Assume — Measure everything**
> Don't guess why it's slow. Don't assume users do X. Add logging and metrics. Look at the data.

**3. Automate > Manual — Remove human error**
> If you do it more than twice, automate it. Tests, deploys, alerts — all automated.

**4. Simple > Clever — Code for your future self**
> The cleverest code is the code someone else can read and maintain. One function = one job.

**5. Secure > Fast — Never sacrifice security**
> A fast app that gets hacked is worth nothing. Security is not a feature you add later.

### 16.3 Your Path from Beginner to Senior

| Phase | Timeline | Focus | Signal You're There |
|-------|----------|-------|-------------------|
| **Beginner** | Month 1-3 | Ship one working feature end-to-end | "I built something that works" |
| **Developing** | Month 3-6 | Understand each layer (why, not just how) | "I know why each part exists" |
| **Intermediate** | Month 6-12 | Write tests, improve code quality | "My code rarely breaks in production" |
| **Senior** | Year 1-2 | Think architecturally, mentor others | "I design systems, not just features" |
| **Staff+** | Year 2+ | Drive org-wide technical direction | "I influence how teams work, not just code" |

> 🔥 **Senior Insight:** The fastest path to senior isn't reading more books — it's shipping more features, breaking things in production, learning why, and fixing them. Every outage you survive makes you better.

---

<a id="section-17"></a>

## 📋 SECTION 17 — Quick Reference Cheat Sheet

### Start Local Dev

```bash
# Start databases
docker-compose up -d

# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Check everything
curl http://localhost:4000/health
open http://localhost:3000
```

### Git Workflow

```bash
# Start new feature
git checkout -b feature/add-todo-filters

# Commit work
git add src/
git commit -m "feat: add todo priority filter"

# Push and create PR
git push origin feature/add-todo-filters
gh pr create --title "Add todo priority filter"

# After PR merged
git checkout main && git pull
```

### Deploy to Production

```bash
# 1. Tests pass
npm test

# 2. Build Docker image
docker build -t ghcr.io/myorg/my-backend:v1.2.3 ./backend
docker push ghcr.io/myorg/my-backend:v1.2.3

# 3. Run migrations
npx prisma migrate deploy

# 4. Deploy (ECS example)
aws ecs update-service \
  --cluster my-cluster \
  --service my-backend \
  --force-new-deployment

# 5. Verify
curl https://api.myapp.com/health
```

### Common Prisma Commands

```bash
npx prisma init                    # Initialize Prisma
npx prisma migrate dev             # Create + apply migration (dev)
npx prisma migrate deploy          # Apply migrations (production)
npx prisma db seed                 # Run seed script
npx prisma studio                  # Open DB GUI
npx prisma generate                # Regenerate client after schema change
npx prisma db push                 # Push schema without migration (prototyping)
```

### Environment Check

```bash
# What's running?
docker-compose ps
lsof -i :3000          # Who's on frontend port?
lsof -i :4000          # Who's on backend port?
lsof -i :5432          # Who's on postgres port?

# Logs
docker-compose logs postgres -f
docker-compose logs redis -f
```

---

<a id="appendix"></a>

## Appendix — Architecture Decision Record Template

```markdown
# ADR-001: [Short descriptive title]

**Date:** 2026-01-15
**Status:** Accepted | Deprecated | Superseded by ADR-XXX

## Context
What problem are we solving? Why is a decision needed?

## Decision
What have we decided to do?

## Consequences
### Pros
- Benefit 1
- Benefit 2

### Cons
- Tradeoff 1
- Tradeoff 2

## Alternatives Considered
- Option A: Rejected because...
- Option B: Rejected because...
```

---

<a id="final-words"></a>

## 🎯 Final Words

**You now have everything you need to build production-grade applications.**

Here's what makes the difference between engineers who build things that last and those who don't:

1. **Ship small** — one working feature at a time
2. **Test as you go** — not as an afterthought
3. **Observe everything** — logs, metrics, traces from day one
4. **Automate the boring parts** — CI, deploys, alerts
5. **Keep it simple** — the simplest solution that works is the right solution

Every diagram, every code snippet, every checklist in this guide is based on patterns from production systems running at companies like Stripe, Vercel, Shopify, and Airbnb.

The technology will change. The principles won't.

**Now build something. Ship it. Learn from it. Repeat.**

---

*Last updated: 2026 — Built to be your one-stop production engineering reference.*
