import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LEGACY_DIR = path.resolve(ROOT, "..", "legacy");

// flame has been hand-ported to real React (see components/flame/) — do not auto-import it.
const PAGES = [
  { slug: "our-song", file: "our-song.original.html" },
  { slug: "memes", file: "memes.original.html" },
  { slug: "us", file: "us.original.html" },
  { slug: "for-alaa", file: "for-alaa.original.html" },
  { slug: "invite", file: "invite.original.html" },
  { slug: "secrets", file: "secrets.original.html" },
  { slug: "index", file: "index.original.html" },
];

const HREF_MAP = {
  "index.html": "/",
  "flame.html": "/flame",
  "our-song.html": "/our-song",
  "memes.html": "/memes",
  "us.html": "/us",
  "secrets.html": "/secrets",
  "for-alaa.html": "/for-alaa",
  "invite.html": "/invite",
};

function extractBetween(source, startTag, endTag) {
  const start = source.indexOf(startTag);
  if (start === -1) return "";
  const from = start + startTag.length;
  const end = source.indexOf(endTag, from);
  if (end === -1) return "";
  return source.slice(from, end);
}

function rewriteLinks(html) {
  let out = html;
  for (const [from, to] of Object.entries(HREF_MAP)) {
    out = out.replaceAll(`href="${from}"`, `href="${to}"`);
  }
  out = out.replaceAll('href="favicon.svg"', 'href="/favicon.svg"');
  out = out.replaceAll('src="img/', 'src="/img/');
  return out;
}

function extractScripts(html) {
  const scripts = [];
  const cleaned = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_, code) => {
    scripts.push(code.trim());
    return "";
  });
  return { cleaned, scripts };
}

function patchScript(script) {
  let out = script;

  out = out.replace(
    /fetch\(`https:\/\/api\.jsonbin\.io\/v3\/b\/\$\{([^}]+)\}\/latest`[\s\S]*?\}\)/g,
    "fetch(`/api/jsonbin?binId=${$1}`)",
  );

  out = out.replace(
    /fetch\(`https:\/\/api\.jsonbin\.io\/v3\/b\/\$\{([^}]+)\}`,\s*\{[\s\S]*?method:\s*'PUT'[\s\S]*?body:\s*JSON\.stringify\(([^)]+)\)[\s\S]*?\}\)/g,
    "fetch('/api/jsonbin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ binId: $1, payload: $2 }) })",
  );

  return out;
}

function escapeTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function toComponentName(slug) {
  return `Legacy${slug
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")}Page`;
}

function toRunnerName(slug) {
  return `run${slug
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")}Scripts`;
}

for (const page of PAGES) {
  const sourcePath = path.join(LEGACY_DIR, page.file);
  const source = fs.readFileSync(sourcePath, "utf8");

  const style = extractBetween(source, "<style>", "</style>");
  let body = rewriteLinks(extractBetween(source, "<body>", "</body>"));

  const tailScript = extractBetween(source, "</body>", "</html>");
  const tailScripts = [];
  const tailMatch = tailScript.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
  if (tailMatch) {
    for (const block of tailMatch) {
      const code = block.replace(/<script\b[^>]*>/i, "").replace(/<\/script>/i, "");
      tailScripts.push(code.trim());
    }
  }

  const extracted = extractScripts(body);
  body = extracted.cleaned;
  const scripts = [...extracted.scripts, ...tailScripts].map(patchScript);

  const cssDir = path.join(ROOT, "styles", "legacy");
  const libDir = path.join(ROOT, "lib", "legacy");
  const compDir = path.join(ROOT, "components", "legacy", page.slug);

  fs.mkdirSync(cssDir, { recursive: true });
  fs.mkdirSync(libDir, { recursive: true });
  fs.mkdirSync(compDir, { recursive: true });

  const patchedStyle = style
    .replaceAll(
      "html.gate-locked body > *:not(#gate)",
      "html.gate-locked .legacy-page > *:not(#gate)",
    )
    .replaceAll("url('img/", "url('/img/")
    .replaceAll('url("img/', 'url("/img/')
    .replaceAll(
      "url('WhatsApp Image 2026-04-25 at 16.13.13.jpeg')",
      "url('/img/hero-couple.jpg')",
    )
    .replaceAll(
      'url("WhatsApp Image 2026-04-25 at 16.13.13.jpeg")',
      'url("/img/hero-couple.jpg")',
    );

  fs.writeFileSync(path.join(cssDir, `${page.slug}.css`), patchedStyle);

  const runnerName = toRunnerName(page.slug);
  const scriptsConst = `${page.slug.replace(/-/g, "_")}Scripts`;
  const scriptsJson = JSON.stringify(scripts, null, 2);

  fs.writeFileSync(
    path.join(libDir, `${page.slug}.ts`),
    `/* Auto-generated from legacy/${page.file} */\nexport const ${scriptsConst}: string[] = ${scriptsJson};\n\nexport function ${runnerName}(root: HTMLElement) {\n  for (const code of ${scriptsConst}) {\n    const el = document.createElement("script");\n    el.text = code;\n    root.appendChild(el);\n  }\n}\n`,
  );

  const componentName = toComponentName(page.slug);

  fs.writeFileSync(
    path.join(compDir, `${componentName}.tsx`),
    `"use client";

import { useLayoutEffect, useRef } from "react";
import "@/styles/legacy/${page.slug}.css";
import { ${runnerName} } from "@/lib/legacy/${page.slug}";

const BODY_HTML = \`${escapeTemplate(body)}\`;

export default function ${componentName}() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useLayoutEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    ${runnerName}(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-${page.slug}"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}
`,
  );

  console.log(`Imported ${page.slug} (${scripts.length} scripts)`);
}

console.log("Done.");
