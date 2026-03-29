/**
 * Build-time portfolio sync: reads 02_projects from disk (monorepo) or GitHub API.
 * Env: PORTFOLIO_ROOT, GITHUB_OWNER (default piccolojnr), GITHUB_REPO (default piccolojnr),
 *      GITHUB_BRANCH (default main), GITHUB_TOKEN (optional, for API rate limits)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

/** @param {string} raw */
function matter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const fmText = m[1];
  const content = m[2];
  try {
    const data = parseYaml(fmText);
    return { data: data && typeof data === "object" ? data : {}, content };
  } catch {
    return { data: {}, content: raw };
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOWCASE_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(SHOWCASE_ROOT, "public", "data");
const OUT_FILE = path.join(OUT_DIR, "projects.json");

const OWNER = process.env.GITHUB_OWNER || "piccolojnr";
const REPO = process.env.GITHUB_REPO || "piccolojnr";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN || "";

const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;
const REPO_WEB = `https://github.com/${OWNER}/${REPO}`;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;

function rawUrl(relPath) {
  return `${RAW_BASE}/${relPath.replace(/^\/+/, "")}`;
}

async function ghApi(apiPath) {
  const url = apiPath.startsWith("http") ? apiPath : `https://api.github.com${apiPath}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GitHub API ${res.status}: ${t.slice(0, 500)}`);
  }
  return res.json();
}

async function fetchText(url) {
  const headers = {};
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch ${url}: ${res.status}`);
  return res.text();
}

function parseFallbackMeta(body, slug) {
  const titleMatch = body.match(/^#\s*Project:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  let summary = "";
  const problemIdx = body.indexOf("## The problem");
  if (problemIdx !== -1) {
    const after = body.slice(problemIdx + "## The problem".length);
    const para = after.split(/\n\n+/).find((p) => p.trim() && !p.trim().startsWith("#"));
    if (para) summary = para.replace(/\s+/g, " ").trim().slice(0, 280);
  }
  return { title, summary, tags: [], featured: false, sortOrder: 999 };
}

function overviewTableFields(content) {
  const status = content.match(/\|\s*\*\*Status\*\*\s*\|\s*([^|]+)\|/);
  const period = content.match(/\|\s*\*\*Period\*\*\s*\|\s*([^|]+)\|/);
  return {
    status: status ? status[1].trim() : undefined,
    period: period ? period[1].trim() : undefined,
  };
}

async function listSlugsFs(root) {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const slugs = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const overview = path.join(root, e.name, "overview.md");
    if (fs.existsSync(overview)) slugs.push(e.name);
  }
  return slugs.sort();
}

async function listArtifactNamesFs(slug, root) {
  const dir = path.join(root, slug, "artifacts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort();
}

async function listSlugsGitHub() {
  const items = await ghApi(`/repos/${OWNER}/${REPO}/contents/02_projects?ref=${BRANCH}`);
  if (!Array.isArray(items)) return [];
  return items
    .filter((i) => i.type === "dir")
    .map((i) => i.name)
    .sort();
}

async function listArtifactNamesGitHub(slug) {
  try {
    const items = await ghApi(
      `/repos/${OWNER}/${REPO}/contents/02_projects/${slug}/artifacts?ref=${BRANCH}`
    );
    if (!Array.isArray(items)) return [];
    return items
      .filter((i) => i.type === "file" && IMAGE_EXT.test(i.name))
      .map((i) => i.name)
      .sort();
  } catch {
    return [];
  }
}

async function readOverviewFs(slug, root) {
  return fs.readFileSync(path.join(root, slug, "overview.md"), "utf8");
}

async function readOverviewGitHub(slug) {
  const url = `${RAW_BASE}/02_projects/${slug}/overview.md`;
  return fetchText(url);
}

function buildProject(slug, rawMd, artifactFiles) {
  const { data, content } = matter(rawMd);
  const table = overviewTableFields(content);
  const fb = parseFallbackMeta(content, slug);

  const title = data.title ?? fb.title;
  const summary = data.summary ?? fb.summary;
  const tags = Array.isArray(data.tags) ? data.tags : typeof data.tags === "string" ? [data.tags] : fb.tags;
  const featured = Boolean(data.featured);
  const sortOrder = typeof data.sortOrder === "number" ? data.sortOrder : fb.sortOrder;
  const liveUrl = data.liveUrl || data.live || undefined;
  const githubUrl = data.githubUrl || data.repo || undefined;
  const coverRel = data.cover || undefined;

  const images = artifactFiles.map((name) =>
    rawUrl(`02_projects/${slug}/artifacts/${name}`)
  );

  let coverImage = "";
  if (coverRel) {
    const normalized = coverRel.replace(/^\.\//, "");
    coverImage = rawUrl(`02_projects/${slug}/${normalized}`);
  } else if (images.length) {
    const preferred = images.find((u) => /preview\.(png|jpe?g|webp)$/i.test(u));
    coverImage = preferred || images[0];
  }

  return {
    slug,
    title,
    summary,
    tags,
    featured,
    sortOrder,
    status: data.status ?? table.status,
    period: data.period ?? table.period,
    liveUrl: liveUrl || undefined,
    githubUrl: githubUrl || undefined,
    coverImage: coverImage || undefined,
    images,
    body: content.trim(),
    repoFolderUrl: `${REPO_WEB}/tree/${BRANCH}/02_projects/${slug}`,
  };
}

async function main() {
  const envRoot = process.env.PORTFOLIO_ROOT;
  const defaultRoot = path.resolve(SHOWCASE_ROOT, "..", "02_projects");
  const useFs = envRoot
    ? fs.existsSync(envRoot)
    : fs.existsSync(defaultRoot);

  const root = useFs ? envRoot || defaultRoot : null;

  console.log(
    useFs
      ? `[sync-portfolio] Using filesystem: ${root}`
      : `[sync-portfolio] Using GitHub: ${OWNER}/${REPO}@${BRANCH}`
  );

  const slugs = useFs ? await listSlugsFs(root) : await listSlugsGitHub();
  if (!slugs.length) {
    console.warn("[sync-portfolio] No projects found.");
  }

  const projects = [];
  for (const slug of slugs) {
    try {
      const rawMd = useFs ? await readOverviewFs(slug, root) : await readOverviewGitHub(slug);
      const artifactFiles = useFs
        ? await listArtifactNamesFs(slug, root)
        : await listArtifactNamesGitHub(slug);
      projects.push(buildProject(slug, rawMd, artifactFiles));
    } catch (e) {
      console.error(`[sync-portfolio] Skip ${slug}:`, e.message);
    }
  }

  projects.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.title.localeCompare(b.title);
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const payload = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: useFs ? "filesystem" : "github",
      branch: BRANCH,
    },
    projects,
  };
  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2), "utf8");
  console.log(`[sync-portfolio] Wrote ${projects.length} projects -> ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
