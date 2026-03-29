/** Public site name (title suffix, OG site_name). */
export const SITE_NAME = "piccolo jnr";

/** Legal / schema name */
export const PERSON_NAME = "Daud Rahim";

export const SITE_DESCRIPTION =
  "Software engineer building end-to-end web platforms, AI integrations, and IoT. Portfolio and case studies from production work.";

export const TWITTER_HANDLE = "@piccolojnr";

/** Profile / default social preview image path under `public/` (no BASE_URL prefix). */
export const DEFAULT_OG_PATH = "/profile.jpg";

export const SAME_AS = [
  "https://github.com/piccolojnr",
  "https://www.linkedin.com/in/rahim-daud-piccolo",
  "https://twitter.com/piccolojnr",
] as const;

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

export function homeJsonLd(): object {
  const url = getSiteOrigin() ? `${getSiteOrigin()}${pathWithBase("/")}` : pathWithBase("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: PERSON_NAME,
        url,
        sameAs: [...SAME_AS],
        jobTitle: "Software engineer",
      },
    ],
  };
}
