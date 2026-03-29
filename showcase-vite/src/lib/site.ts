/** Public site name (title suffix, OG site_name). */
export const SITE_NAME = "piccolo jnr";

/** Primary name for Person schema and titles */
export const PERSON_NAME = "Rahim Daud";

/** Full <title> on the home page (no extra suffix). */
export const HOME_DOCUMENT_TITLE =
  "Rahim Daud – Full Stack Engineer (AI, IoT, SaaS) | Portfolio";

/**
 * Meta description for home & default OG/Twitter body.
 * Targets: Ghana / Accra, full-stack, RAG, FastAPI, Next.js, IoT, SaaS.
 */
export const SITE_DESCRIPTION =
  "Full-stack engineer in Ghana (Accra) specializing in AI systems, RAG pipelines, FastAPI & Next.js backends, IoT platforms, and scalable SaaS. Production case studies: Memraiq, university systems, and hardware-integrated products.";

/** Comma-separated hints for meta keywords (low weight; still useful for some tools). */
export const SITE_KEYWORDS =
  "Rahim Daud, full stack engineer Ghana, Accra software developer, AI engineer portfolio, RAG systems, FastAPI developer, Next.js portfolio, IoT developer portfolio, SaaS architect, piccolo jnr";

export const TWITTER_HANDLE = "@piccolojnr";

/** Profile / default social preview image path under `public/` (no BASE_URL prefix). */
export const DEFAULT_OG_PATH = "/profile.jpg";

export const SAME_AS = [
  "https://github.com/piccolojnr",
  "https://www.linkedin.com/in/rahim-daud-piccolo",
  "https://twitter.com/piccolojnr",
] as const;

export const PROJECTS_INDEX_DOCUMENT_TITLE = `Software case studies — Next.js, FastAPI, AI & IoT | ${SITE_NAME}`;

export const PROJECTS_INDEX_DESCRIPTION =
  "Portfolio case studies from a Ghana-based full-stack engineer: Next.js and React frontends, FastAPI and Node APIs, RAG / AI SaaS, payments, and IoT + kiosk systems. Filter by topic.";

function normalizeOrigin(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Canonical site origin for absolute URLs (OG, Twitter, canonical).
 * Uses VITE_SITE_URL in production builds; falls back to window.location.origin in the browser when unset.
 */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv && fromEnv.trim()) {
    return normalizeOrigin(fromEnv.trim());
  }
  if (typeof window !== "undefined") {
    return normalizeOrigin(window.location.origin);
  }
  return "";
}

/**
 * Path including Vite `base` (e.g. `/` or `/repo/`).
 */
export function pathWithBase(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (!base || base === "/") return path;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${b}${path}`;
}

export function absoluteUrl(pathname: string): string {
  const origin = getSiteOrigin();
  const path = pathWithBase(pathname);
  if (!origin) return path;
  return `${origin}${path}`;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_PATH);
}

export function formatPageTitle(pageTitle: string): string {
  if (pageTitle === SITE_NAME) return SITE_NAME;
  return `${pageTitle} · ${SITE_NAME}`;
}

export function projectDocumentTitle(projectTitle: string): string {
  return `${projectTitle} — case study | ${PERSON_NAME} · ${SITE_NAME}`;
}

export function homeJsonLd(): object {
  const url = getSiteOrigin()
    ? `${getSiteOrigin()}${pathWithBase("/")}`
    : pathWithBase("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        author: { "@id": `${url}#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: PERSON_NAME,
        url,
        sameAs: [...SAME_AS],
        jobTitle: "Full-stack software engineer",
        description: SITE_DESCRIPTION,
        knowsAbout: [
          "Full-stack web development",
          "Next.js",
          "FastAPI",
          "Retrieval-augmented generation",
          "IoT systems",
          "SaaS architecture",
          "Ghana",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Accra",
          addressCountry: "GH",
        },
      },
    ],
  };
}
