#!/usr/bin/env node
/**
 * Build publish-ready PDF book from software-engineering-handbook.md
 * - Full front matter (cover, title, copyright, about, TOC, lists)
 * - Two-pass table of contents with page numbers
 * - Back matter (index, colophon)
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import { promisify } from "util";
import { marked } from "marked";
import puppeteer from "puppeteer";
import {
  BOOK_META,
  buildHalfTitle,
  buildFrontCover,
  buildTitlePage,
  buildCopyrightPage,
  buildAboutPage,
  buildHowToUsePage,
  buildListOfFigures,
  buildListOfTables,
  buildBackMatter,
  FRONT_MATTER_NAV,
  INDEX_TERMS,
} from "./book-front-matter.mjs";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_MD = path.join(ROOT, "the-complete-handbook.md");
const OUT_PDF = path.join(ROOT, "Software-Engineering-Handbook.pdf");
const DIAGRAMS_DIR = path.join(__dirname, "diagrams");
const MMDC = path.join(__dirname, "node_modules", ".bin", "mmdc");

const MM_TO_PX = 96 / 25.4;
const PAGE_HEIGHT_MM = 297;
const PDF_MARGIN_TOP_MM = 14;
const PDF_MARGIN_BOTTOM_MM = 14;
const CONTENT_HEIGHT_PX =
  (PAGE_HEIGHT_MM - PDF_MARGIN_TOP_MM - PDF_MARGIN_BOTTOM_MM) * MM_TO_PX;

function slugify(text) {
  const partMatch = text.match(/^PART\s+(\d+)/i);
  if (partMatch) return `part-${partMatch[1]}`;
  const appendixMatch = text.match(/^Appendix\s+([A-Z])/i);
  if (appendixMatch) return `appendix-${appendixMatch[1].toLowerCase()}`;
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getPrecedingH3(markdown, index) {
  const before = markdown.slice(0, index);
  const matches = [...before.matchAll(/^### (.+)$/gm)];
  if (matches.length === 0) return null;
  return matches[matches.length - 1][1].trim();
}

async function renderMermaidDiagrams(markdown) {
  await fs.mkdir(DIAGRAMS_DIR, { recursive: true });
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let index = 0;
  const replacements = [];
  const figures = [];

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    index += 1;
    const code = match[1].trim();
    const h3 = getPrecedingH3(markdown, match.index);
    const title = h3 || `Architecture & flow diagram ${index}`;
    const id = `diagram-${String(index).padStart(2, "0")}`;
    const mmdPath = path.join(DIAGRAMS_DIR, `${id}.mmd`);
    const pngPath = path.join(DIAGRAMS_DIR, `${id}.png`);

    await fs.writeFile(mmdPath, code, "utf8");

    try {
      await execFileAsync(
        MMDC,
        ["-i", mmdPath, "-o", pngPath, "-b", "white", "-w", "1200", "-H", "800", "--scale", "2"],
        { timeout: 120000 },
      );
      figures.push({ num: index, title, pngPath });
      replacements.push({
        full: match[0],
        html: `<figure class="diagram" id="figure-${index}"><img src="file://${pngPath}" alt="Figure ${index}" /><figcaption class="diagram-caption">Figure ${index} — ${title}</figcaption></figure>`,
      });
    } catch (err) {
      console.warn(`Warning: mermaid render failed for ${id}:`, err.message);
      figures.push({ num: index, title, pngPath: null });
      replacements.push({
        full: match[0],
        html: `<figure class="diagram" id="figure-${index}"><figcaption class="diagram-caption">Figure ${index} — ${title} (diagram render skipped)</figcaption></figure>`,
      });
    }
  }

  let result = markdown;
  for (const r of replacements) {
    result = result.replace(r.full, `\n\n${r.html}\n\n`);
  }
  return { markdown: result, figures };
}

function preprocessForPdf(markdown) {
  return markdown
    .replace(/<a\s+id="[^"]*"\s*><\/a>\n?/gi, "")
    .replace(
      /\| You want…[\s\S]*?\| Runnable starter code[\s\S]*?\n\n---\n\n/,
      "---\n\n",
    )
    .replace(/^📕 \*\*PDF book:\*\*[^\n]+\n\n/m, "")
    .replace(/\]\(\.\/starter-app\/README\.md\)/g, "](")
    .replace(/\]\(starter-app\/README\.md\)/g, "](")
    .replace(/- \[ \]/g, "- ☐ ")
    .replace(/- \[x\]/gi, "- ☑ ");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTocEntry(e) {
  const level = e.level ?? 1;
  const id = e.id ? escapeHtml(e.id) : "";
  const href = id ? `#${id}` : "#";
  const title = escapeHtml(e.title);
  const page = e.page ?? "—";
  return `<li class="toc-entry toc-entry-level-${level}">
    <a href="${href}" class="toc-link book-link">
      <span class="toc-entry-title">${title}</span>
      <span class="toc-entry-leader" aria-hidden="true"></span>
      <span class="toc-entry-page">${page}</span>
    </a>
  </li>`;
}

function buildTocHtml(frontNav, bodyEntries, backEntries) {
  const frontItems = frontNav.map((e) => buildTocEntry({ ...e, level: 0 })).join("");
  const bodyItems = bodyEntries.map((e) => buildTocEntry(e)).join("");
  const backItems = backEntries.map((e) => buildTocEntry({ ...e, level: 0 })).join("");

  return `
<section id="page-toc" class="front-matter-page toc-page" aria-label="Table of contents">
  <p class="toc-book-title">${BOOK_META.title} · ${BOOK_META.edition}</p>
  <h2 class="fm-heading">Table of Contents</h2>
  <p class="lof-hint">Click any title below to jump to that section.</p>

  <p class="toc-section-label">Front Matter</p>
  <ul class="toc-entries">${frontItems}</ul>

  <p class="toc-section-label">Body</p>
  <ul class="toc-entries">${bodyItems}</ul>

  <p class="toc-section-label">Back Matter</p>
  <ul class="toc-entries">${backItems}</ul>

  <div class="toc-howto-note">
    <strong>Start here:</strong> <a href="#page-about" class="book-link">About This Book</a> →
    <a href="#part-0" class="book-link">PART 0</a> (10-day plan).
    All blue links are clickable in this PDF.
  </div>
</section>`;
}

async function measurePages(page) {
  return page.evaluate((contentHeightPx) => {
    function pageNum(el) {
      return Math.max(1, Math.floor(el.offsetTop / contentHeightPx) + 1);
    }

    const content = document.querySelector(".content");
    if (!content) {
      return { contentStartPage: 10, headings: [], figures: [], backEntries: [] };
    }

    const contentStartPage = pageNum(content);

    const headings = [];
    content.querySelectorAll("h2, h3").forEach((el) => {
      if (!el.id) return;
      const text = el.textContent.trim();
      if (text.length < 2 || /^figure\s/i.test(text)) return;
      headings.push({
        id: el.id,
        title: text,
        level: el.tagName === "H2" ? 1 : 2,
        page: pageNum(el),
        isPart: /^PART\s/i.test(text),
      });
    });

    const figures = [];
    content.querySelectorAll("figure.diagram").forEach((fig) => {
      const cap = fig.querySelector(".diagram-caption");
      const numMatch = cap?.textContent.match(/Figure\s+(\d+)/);
      figures.push({
        num: numMatch ? Number(numMatch[1]) : 0,
        title: cap?.textContent.replace(/^Figure\s+\d+\s+—\s*/, "") || "Diagram",
        page: pageNum(fig),
      });
    });

    const backEntries = [];
    const back = document.getElementById("page-index");
    const colo = document.getElementById("page-colophon");
    if (back) {
      backEntries.push({
        id: "page-index",
        title: "Index",
        level: 0,
        page: pageNum(back),
      });
    }
    if (colo) {
      backEntries.push({
        id: "page-colophon",
        title: "Colophon",
        level: 0,
        page: pageNum(colo),
      });
    }

    return { contentStartPage, headings, figures, backEntries };
  }, CONTENT_HEIGHT_PX);
}

function selectTocEntries(headings) {
  const out = [];
  for (const h of headings) {
    if (h.isPart || h.level === 1) {
      out.push({ ...h, level: 1 });
      continue;
    }
    if (h.level === 2 && out.length > 0 && out[out.length - 1].isPart) {
      out.push({ ...h, level: 2 });
    }
  }
  return out;
}

function buildPartIdMap(headings) {
  const map = {};
  for (const h of headings) {
    const m = h.title.match(/^PART\s*(\d+)/i);
    if (m) map[Number(m[1])] = h.id;
  }
  return map;
}

function fixIndexAnchors(terms, partIdMap, headingIds) {
  const ids = new Set(headingIds);
  return terms.map((t) => {
    let anchorId = t.anchorId;
    if (anchorId && !ids.has(anchorId)) {
      const partMatch = anchorId.match(/^part-(\d+)/);
      if (partMatch && partIdMap[Number(partMatch[1])]) {
        anchorId = partIdMap[Number(partMatch[1])];
      } else {
        const prefix = anchorId.split("-").slice(0, 3).join("-");
        const fuzzy = headingIds.find((id) => id.startsWith(prefix));
        if (fuzzy) anchorId = fuzzy;
      }
    }
    return { ...t, anchorId };
  });
}

async function measureFrontMatterNav(page) {
  const ids = FRONT_MATTER_NAV.map((f) => f.id);
  const pages = await page.evaluate(
    (navIds, contentHeightPx) => {
      function pageNum(el) {
        return Math.max(1, Math.floor(el.offsetTop / contentHeightPx) + 1);
      }
      return navIds.map((id) => {
        const el = document.getElementById(id);
        return { id, page: el ? pageNum(el) : "—" };
      });
    },
    ids,
    CONTENT_HEIGHT_PX,
  );
  return FRONT_MATTER_NAV.map((item) => {
    const measured = pages.find((p) => p.id === item.id);
    return { ...item, page: measured?.page ?? "—" };
  });
}

async function assembleHtml(bodyHtml, tocHtml, lofHtml, partIdMap, indexTerms = INDEX_TERMS) {
  const css = await fs.readFile(path.join(__dirname, "handbook-pdf.css"), "utf8");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="author" content="${BOOK_META.publisher}" />
  <meta name="description" content="${BOOK_META.subtitle}" />
  <title>${BOOK_META.title} — ${BOOK_META.edition}</title>
  <style>${css}</style>
</head>
<body class="book-root">

  <!-- ========== FRONT MATTER ========== -->
  ${buildFrontCover()}
  ${buildHalfTitle()}
  ${buildTitlePage()}
  ${buildCopyrightPage()}
  ${buildAboutPage()}
  ${buildHowToUsePage()}
  ${tocHtml}
  ${lofHtml}
  ${buildListOfTables(partIdMap)}

  <!-- ========== BODY ========== -->
  <main class="content" role="main">
    ${bodyHtml}
  </main>

  <!-- ========== BACK MATTER ========== -->
  ${buildBackMatter(indexTerms, partIdMap)}

</body>
</html>`;
}

async function generatePdf(htmlPath, outPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 120000 });
  await page.emulateMediaType("print");

  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.onload = r;
                img.onerror = r;
              }),
      ),
    );
  });

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div></div>`,
    footerTemplate: `<div style="width:100%;font-size:9px;padding:0 20mm 4px;color:#64748b;font-family:system-ui,sans-serif;display:flex;justify-content:flex-end;align-items:flex-end;height:100%;box-sizing:border-box;"><span class="pageNumber"></span></div>`,
    margin: { top: "0", bottom: "14mm", left: "0", right: "0" },
    tagged: true,
  });

  await browser.close();
}

async function countPdfPages(pdfPath) {
  const buf = await fs.readFile(pdfPath);
  const s = buf.toString("latin1");
  const matches = s.match(/\/Type\s*\/Page[^s]/g);
  return matches ? matches.length : "?";
}

async function main() {
  console.log("📖 Building publication-ready PDF book...\n");

  let markdown = await fs.readFile(SRC_MD, "utf8");
  markdown = preprocessForPdf(markdown);

  console.log("1/5 Rendering Mermaid diagrams...");
  const { markdown: mdWithDiagrams, figures } = await renderMermaidDiagrams(markdown);

  marked.use({
    renderer: {
      heading({ depth, text }) {
        const id = slugify(text.replace(/&amp;/g, "and"));
        const isSectionOpener = /^PART\s/i.test(text) || /^Appendix\s/i.test(text);
        if (isSectionOpener) {
          // Emit a zero-height break div BEFORE the heading so that
          // page-break-after (not page-break-before) is used.
          // Chrome PDF registers anchor destinations correctly this way.
          return `<div class="part-break"></div><h${depth} id="${id}" class="part-opener">${text}</h${depth}>\n`;
        }
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
    },
  });

  console.log("2/5 Converting markdown to HTML...");
  const bodyHtml = await marked.parse(mdWithDiagrams);

  const emptyPartMap = {};
  const placeholderToc = buildTocHtml(FRONT_MATTER_NAV, [], []);
  const placeholderLof = buildListOfFigures(
    figures.map((f) => ({ ...f, page: "—" })),
    true,
  );

  const htmlPass1 = await assembleHtml(
    bodyHtml,
    placeholderToc,
    placeholderLof,
    emptyPartMap,
  );
  const htmlPath = path.join(__dirname, "handbook-preview.html");
  await fs.writeFile(htmlPath, htmlPass1, "utf8");

  console.log("3/5 Measuring page numbers + link targets (pass 1)...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 120000 });
  const measured = await measurePages(page);
  const frontNav = await measureFrontMatterNav(page);
  await browser.close();

  const partIdMap = buildPartIdMap(measured.headings);
  const headingIds = measured.headings.map((h) => h.id);
  const fixedIndexTerms = fixIndexAnchors(INDEX_TERMS, partIdMap, headingIds);

  const tocBody = selectTocEntries(measured.headings);
  const figuresWithPages = figures.map((f) => {
    const m = measured.figures.find((x) => x.num === f.num);
    return { ...f, page: m?.page ?? "—" };
  });

  const finalToc = buildTocHtml(frontNav, tocBody, measured.backEntries);
  const finalLof = buildListOfFigures(figuresWithPages, true);

  console.log("4/5 Assembling final book HTML with clickable TOC...");
  const htmlFinal = await assembleHtml(
    bodyHtml,
    finalToc,
    finalLof,
    partIdMap,
    fixedIndexTerms,
  );
  await fs.writeFile(htmlPath, htmlFinal, "utf8");

  console.log("5/5 Generating PDF...");
  await generatePdf(htmlPath, OUT_PDF);

  const stat = await fs.stat(OUT_PDF);
  const pages = await countPdfPages(OUT_PDF);

  console.log("\n✅ Publication PDF ready");
  console.log(`   File: ${OUT_PDF}`);
  console.log(`   Pages: ${pages}`);
  console.log(`   Size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Figures: ${figures.length}`);
  console.log("\n   Front matter: Cover · Half-title · Title · Copyright · About · How to use · TOC · List of figures · List of tables");
  console.log("   Back matter: Index · Colophon");
  console.log("   All TOC / Index / List entries are clickable links in the PDF.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
