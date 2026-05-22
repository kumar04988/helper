/**
 * Professional book front & back matter HTML
 */

export const BOOK_META = {
  title: "The Complete Software Engineering Handbook",
  subtitle:
    "Build Any Production-Grade Application End-to-End — Complete Code, Diagrams, and Checklists for Freshers to Senior Engineers",
  edition: "Complete Edition",
  version: "2.0",
  year: "2026",
  publisher: "Engineering Playbooks",
  isbn: "978-0-000000-00-0 (placeholder — assign before retail print)",
};

export const FRONT_MATTER_NAV = [
  { id: "page-front-cover", title: "Front Cover", level: 0 },
  { id: "page-half-title", title: "Half Title", level: 0 },
  { id: "page-title", title: "Title Page", level: 0 },
  { id: "page-copyright", title: "Copyright", level: 0 },
  { id: "page-about", title: "About This Book", level: 0 },
  { id: "page-howto", title: "How to Use This Handbook", level: 0 },
  { id: "page-toc", title: "Table of Contents", level: 0 },
  { id: "page-list-of-figures", title: "List of Figures", level: 0 },
  { id: "page-list-of-tables", title: "List of Tables", level: 0 },
];

/** Map PART number → anchor id (filled at build time from measured headings) */
export const LOT_ENTRIES = [
  { topic: "10-day build plan (day-by-day)", part: 0 },
  { topic: "Stack decision guide", part: 2 },
  { topic: "Node vs Python vs Go vs Java", part: 2 },
  { topic: "Frontend framework choice", part: 2 },
  { topic: "Best tools, packages & libraries (2026)", part: 2 },
  { topic: "HTTP methods cheat sheet", part: 4 },
  { topic: "SQL vs NoSQL decision", part: 5 },
  { topic: "Scaling ladder", part: 11 },
  { topic: "25 troubleshooting fixes", part: 13 },
  { topic: "Production launch checklist", part: 12 },
  { topic: "90-day growth path", part: 17 },
  { topic: "Environment variables reference", anchorId: "appendix-b" },
  { topic: "Error decoder (13 common errors)", anchorId: "appendix-c" },
  { topic: "Glossary", anchorId: "appendix-d" },
];

export const INDEX_TERMS = [
  { term: "10-day build plan", anchorId: "part-0" },
  { term: "Authentication (JWT + bcrypt)", anchorId: "part-6" },
  { term: "AWS ECS + Terraform", anchorId: "part-9" },
  { term: "bcrypt", anchorId: "part-6" },
  { term: "BullMQ (background jobs)", anchorId: "part-4" },
  { term: "CI/CD pipeline", anchorId: "part-8" },
  { term: "CRUD routes", anchorId: "part-4" },
  { term: "Docker multi-stage", anchorId: "part-8" },
  { term: "Error decoder", anchorId: "appendix-c" },
  { term: "E2E tests (Playwright)", anchorId: "part-7" },
  { term: "Fastify", anchorId: "part-4" },
  { term: "GitHub Actions", anchorId: "part-8" },
  { term: "Glossary", anchorId: "appendix-d" },
  { term: "JWT refresh tokens", anchorId: "part-6" },
  { term: "Launch checklist", anchorId: "part-12" },
  { term: "Microservices", anchorId: "part-2" },
  { term: "Migrations (Prisma)", anchorId: "part-5" },
  { term: "N+1 query problem", anchorId: "part-5" },
  { term: "Next.js 15 (App Router)", anchorId: "part-3" },
  { term: "Node.js", anchorId: "part-2" },
  { term: "NoSQL vs SQL", anchorId: "part-5" },
  { term: "Observability", anchorId: "part-10" },
  { term: "OpenTelemetry (tracing)", anchorId: "part-10" },
  { term: "Pino (structured logging)", anchorId: "part-10" },
  { term: "PostgreSQL", anchorId: "part-5" },
  { term: "Prisma ORM", anchorId: "part-5" },
  { term: "React Query (TanStack v5)", anchorId: "part-3" },
  { term: "Redis (caching)", anchorId: "part-5" },
  { term: "Repository pattern", anchorId: "part-4" },
  { term: "Security (OWASP, CORS, CSP)", anchorId: "part-6" },
  { term: "Server Components (RSC)", anchorId: "part-3" },
  { term: "Service layer pattern", anchorId: "part-4" },
  { term: "Terraform (AWS infra)", anchorId: "part-9" },
  { term: "Testing (Vitest)", anchorId: "part-7" },
  { term: "Troubleshooting 25 fixes", anchorId: "part-13" },
  { term: "TypeScript", anchorId: "part-2" },
  { term: "Validation (Zod)", anchorId: "part-4" },
  { term: "Zustand (state management)", anchorId: "part-3" },
];

export function buildHalfTitle() {
  return `
<section id="page-half-title" class="front-matter-page half-title-page" aria-label="Half title">
  <p class="half-title-text">${BOOK_META.title}</p>
</section>`;
}

export function buildFrontCover() {
  return `
<section id="page-front-cover" class="front-matter-page cover-page" aria-label="Front cover">
  <div class="cover-inner">
    <p class="cover-series">Engineering Playbooks · Production Series</p>
    <span class="cover-badge">First Edition · ${BOOK_META.version}</span>
    <h1 class="cover-main-title">${BOOK_META.title}</h1>
    <p class="cover-subtitle">${BOOK_META.subtitle}</p>
    <ul class="cover-features">
      <li>10-day zero → production build path</li>
      <li>17 parts — every section has diagram → complete code → checklist</li>
      <li>100% runnable, copy-paste TypeScript code (not code shapes)</li>
      <li>Full stack: Next.js · Fastify · Prisma · PostgreSQL · Redis · Docker · AWS</li>
      <li>25 troubleshooting fixes + Error Decoder appendix</li>
    </ul>
    <p class="cover-audience">For freshers, junior engineers, and anyone shipping real production software</p>
  </div>
  <div class="cover-footer">
    <span>${BOOK_META.publisher}</span>
    <span>${BOOK_META.year}</span>
  </div>
</section>`;
}

export function buildTitlePage() {
  return `
<section id="page-title" class="front-matter-page title-page" aria-label="Title page">
  <div class="title-page-block">
    <p class="title-page-series">Engineering Playbooks</p>
    <h1 class="title-page-main">${BOOK_META.title}</h1>
    <p class="title-page-sub">${BOOK_META.subtitle}</p>
    <div class="title-page-rule"></div>
    <p class="title-page-edition">${BOOK_META.edition}</p>
    <p class="title-page-version">Version ${BOOK_META.version}</p>
  </div>
  <div class="title-page-publisher">
    <p><strong>${BOOK_META.publisher}</strong></p>
    <p>${BOOK_META.year}</p>
  </div>
</section>`;
}

export function buildCopyrightPage() {
  return `
<section id="page-copyright" class="front-matter-page copyright-page" aria-label="Copyright">
  <h2 class="fm-heading">Copyright</h2>
  <p class="copyright-main">
    Copyright © ${BOOK_META.year} ${BOOK_META.publisher}. All rights reserved.
  </p>
  <p>
    No part of this publication may be reproduced, stored in a retrieval system, or transmitted
    in any form or without prior written permission, except for brief quotations in reviews
    or internal team training with attribution.
  </p>
  <p><strong>ISBN:</strong> ${BOOK_META.isbn}</p>
  <p><strong>Edition:</strong> ${BOOK_META.edition} (${BOOK_META.version})</p>
  <p><strong>Publisher:</strong> ${BOOK_META.publisher}</p>
  <p><strong>Printed / distributed:</strong> Digital PDF — ${BOOK_META.year}</p>
  <h3 class="fm-sub">Disclaimer</h3>
  <p class="legal-small">
    This handbook is for educational and engineering guidance. Stack choices, cloud pricing,
    and security threats change over time. Always verify against your organization's policies,
    compliance requirements, and official vendor documentation before production deployments.
  </p>
  <h3 class="fm-sub">Trademarks</h3>
  <p class="legal-small">
    All product names, frameworks, and tools mentioned are trademarks of their respective owners.
    Next.js, React, PostgreSQL, Docker, Kubernetes, GitHub Actions, and others belong to their
    respective companies.
  </p>
  <p class="copyright-printed">Printed in digital form · ${BOOK_META.year}</p>
</section>`;
}

export function buildAboutPage() {
  return `
<section id="page-about" class="front-matter-page about-page" aria-label="About this book">
  <h2 class="fm-heading">About This Book</h2>
  <p>
    <strong>The Complete Software Engineering Handbook</strong> is the definitive action-first guide for
    building production-grade applications end-to-end — the same way senior engineers ship at real companies.
    Every section follows the same pattern: <em>architecture diagram → complete runnable code → checklist</em>.
  </p>
  <p>
    Unlike theory-heavy textbooks or guides that show you the "shape" of the answer, every code
    block in this book is a complete, copy-paste-ready file with correct imports and TypeScript types.
    Zero gap-filling required.
  </p>
  <h3 class="fm-sub">Who this book is for</h3>
  <ul>
    <li>Complete beginners with zero backend experience</li>
    <li>Fresher and junior developers preparing for industry</li>
    <li>Self-taught builders who want production discipline</li>
    <li>Teams needing one shared engineering playbook</li>
  </ul>
  <h3 class="fm-sub">What you will be able to do after this book</h3>
  <ul>
    <li>Follow a 10-day plan from zero to a deployed production app</li>
    <li>Build a full stack with Next.js, Fastify, Prisma, and PostgreSQL</li>
    <li>Implement JWT auth with refresh tokens, bcrypt, and session management</li>
    <li>Write unit, integration, and E2E tests with Vitest and Playwright</li>
    <li>Containerize with multi-stage Docker, CI/CD with GitHub Actions</li>
    <li>Deploy to Railway/Fly.io or AWS ECS with Terraform</li>
    <li>Add observability with Pino logs and OpenTelemetry traces</li>
    <li>Troubleshoot the 25 most common production failures</li>
  </ul>
  <h3 class="fm-sub">Technology stack</h3>
  <p>Next.js 15 · TypeScript · Fastify · Prisma · PostgreSQL · Redis · Docker · GitHub Actions · AWS</p>
</section>`;
}

export function buildHowToUsePage() {
  return `
<section id="page-howto" class="front-matter-page howto-page" aria-label="How to use">
  <h2 class="fm-heading">How to Use This Handbook</h2>
  <p class="howto-tip"><strong>Tip:</strong> In this PDF, blue links in the Table of Contents and Index jump to the section.</p>
  <table class="fm-table">
    <thead><tr><th>If you want to…</th><th>Start here</th></tr></thead>
    <tbody>
      <tr><td>Build your first app in 10 days</td><td><a href="#part-0">PART 0</a></td></tr>
      <tr><td>Understand the full system</td><td><a href="#the-whole-system-in-one-picture">Architecture diagram</a></td></tr>
      <tr><td>Fix a broken deploy or API</td><td><a href="#part-13">PART 13</a></td></tr>
      <tr><td>Ship safely to users</td><td><a href="#part-12">PART 12</a></td></tr>
      <tr><td>Copy terminal commands</td><td><a href="#appendix-a">Appendix A</a></td></tr>
    </tbody>
  </table>
  <h3 class="fm-sub">Reading modes</h3>
  <ol>
    <li><strong>Fast path (recommended):</strong> Follow PART 0 day-by-day only. Skim the rest when stuck.</li>
    <li><strong>Reference mode:</strong> Jump to the PART that matches your task (frontend, DB, DevOps).</li>
    <li><strong>Visual mode:</strong> Study diagrams first, then read tables and checklists.</li>
  </ol>
</section>`;
}

export function buildListOfFigures(figures, linkFigures = true) {
  const rows = figures
    .map((f) => {
      const desc = f.title || "Diagram";
      const descCell = linkFigures
        ? `<a href="#figure-${f.num}" class="book-link">${desc}</a>`
        : desc;
      const pageCell = linkFigures
        ? `<a href="#figure-${f.num}" class="book-link pagenum-link">${f.page ?? "—"}</a>`
        : (f.page ?? "—");
      return `<tr>
        <td class="lof-num">Figure ${f.num}</td>
        <td class="lof-desc">${descCell}</td>
        <td class="lof-pagenum">${pageCell}</td>
      </tr>`;
    })
    .join("");
  return `
<section id="page-list-of-figures" class="front-matter-page lof-page" aria-label="List of figures">
  <h2 class="fm-heading">List of Figures</h2>
  <p class="lof-hint">Click a figure title or page number to jump to that diagram.</p>
  <table class="lof-table">
    <thead><tr><th>No.</th><th>Description</th><th>Page</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</section>`;
}

export function buildListOfTables(partIdByNumber) {
  const rows = LOT_ENTRIES.map((e) => {
    const anchor =
      e.anchorId ||
      (e.part != null && partIdByNumber[e.part]) ||
      null;
    const location =
      e.part != null ? `PART ${e.part}` : e.topic.includes("Appendix") ? e.topic : "See topic";
    const cell = anchor
      ? `<a href="#${anchor}" class="book-link">${location}</a>`
      : location;
    return `<tr><td>${e.topic}</td><td class="lot-loc">${cell}</td></tr>`;
  }).join("");

  return `
<section id="page-list-of-tables" class="front-matter-page lot-page" aria-label="List of tables">
  <h2 class="fm-heading">List of Tables</h2>
  <p class="lof-hint">Click a location to jump to that section.</p>
  <table class="lof-table lot-table">
    <thead><tr><th>Topic</th><th>Location</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</section>`;
}

export function buildBackMatter(indexTerms, partIdByNumber) {
  const indexRows = indexTerms
    .map((t) => {
      const anchor =
        t.anchorId ||
        (t.part != null && partIdByNumber[t.part]) ||
        null;
      const termCell = anchor
        ? `<a href="#${anchor}" class="book-link idx-link">${t.term}</a>`
        : t.term;
      const seeCell = anchor
        ? `<a href="#${anchor}" class="book-link">Go to section →</a>`
        : (t.refs || "—");
      return `<tr><td class="idx-term">${termCell}</td><td class="idx-ref">${seeCell}</td></tr>`;
    })
    .join("");

  return `
<section id="page-index" class="back-matter-page index-page" aria-label="Index">
  <h2 class="fm-heading">Index</h2>
  <p class="index-intro">Click any term to jump to that section in the book.</p>
  <table class="index-table">
    <thead><tr><th>Term</th><th>Jump to</th></tr></thead>
    <tbody>${indexRows}</tbody>
  </table>
</section>

<section id="page-colophon" class="back-matter-page colophon-page" aria-label="Colophon">
  <h2 class="fm-heading">Colophon</h2>
  <p>
    This book was produced from structured Markdown source with automated diagram rendering
    (Mermaid), professional print CSS, and PDF generation for consistent team distribution.
  </p>
  <p><strong>Typeface:</strong> System UI stack optimized for screen and print.</p>
  <p><strong>Diagrams:</strong> All figures rendered at publication resolution.</p>
  <p><strong>Source:</strong> the-complete-handbook.md</p>
  <p><strong>${BOOK_META.edition}</strong> · Version ${BOOK_META.version} · ${BOOK_META.year}</p>
  <p class="colophon-end">— End of book —</p>
</section>`;
}
