import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");

function loadSiteUrl() {
  for (const key of ["SITE_URL", "VITE_SITE_URL", "PUBLIC_SITE_URL"]) {
    const v = process.env[key]?.trim();
    if (v) return v.replace(/\/+$/, "");
  }
  if (existsSync(envPath)) {
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(
        /^\s*(?:SITE_URL|VITE_SITE_URL|PUBLIC_SITE_URL)\s*=\s*(.*)$/
      );
      if (m) {
        let v = m[1].trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        if (v) return v.replace(/\/+$/, "");
      }
    }
  }
  return "";
}

const origin = loadSiteUrl();
if (!origin) {
  console.warn(
    "[generate-sitemap] SITE_URL (or VITE_SITE_URL) is not set. Using http://localhost:4321. Set in .env for production."
  );
}

const base = origin || "http://localhost:4321";

const projectsPath = join(root, "public", "data", "projects.json");
const raw = readFileSync(projectsPath, "utf8");
const data = JSON.parse(raw);
const slugs = Array.isArray(data.projects)
  ? data.projects.map((p) => p.slug).filter(Boolean)
  : [];

const paths = ["/", "/projects/", ...slugs.map((s) => `/projects/${s}/`)];

const urls = paths.map((path) => {
  const loc = `${base}${path === "/" ? "/" : path}`;
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${path === "/" ? "1.0" : path === "/projects/" ? "0.9" : "0.8"}</priority>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

writeFileSync(join(root, "public", "robots.txt"), robots, "utf8");

console.log(
  `[generate-sitemap] Wrote ${paths.length} URLs -> public/sitemap.xml, public/robots.txt (base: ${base})`
);

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
