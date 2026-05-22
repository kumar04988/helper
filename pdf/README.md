# Handbook PDF Builder

Generates **`Software-Engineering-Handbook.pdf`** from [`../software-engineering-handbook.md`](../software-engineering-handbook.md).

## Requirements

- Node.js 20+
- ~500MB disk for `node_modules` (includes Chromium for Puppeteer)

## Build

```bash
cd pdf-build
npm install
npm run build
```

**Output:** `../Software-Engineering-Handbook.pdf`  
**Preview:** `handbook-preview.html` (open in browser before printing)

## What the build does

1. Renders all Mermaid diagrams to PNG (`diagrams/`)
2. Assembles a **full book** with front matter, body, and back matter
3. Two-pass build: measures headings → fills **Table of Contents with page numbers**
4. Exports A4 PDF with running header/footer

## Book structure (PDF)

| Section | Pages include |
| --- | --- |
| **Front cover** | Full-color cover, edition, feature list |
| **Half-title** | Short title spread |
| **Title page** | Formal title, edition, publisher |
| **Copyright** | Legal, ISBN placeholder, disclaimer |
| **About this book** | Audience, outcomes, stack |
| **How to use** | Reading modes, symbols |
| **Table of contents** | Front matter + all PARTs + page numbers |
| **List of figures** | All 42 diagrams with page numbers |
| **List of tables** | Major reference tables |
| **Main text** | PART 0–18 + appendices |
| **Index** | Alphabetical topic index |
| **Colophon** | Print/production credits |

## Rebuild after handbook edits

Edit `software-engineering-handbook.md`, then run `npm run build` again.
