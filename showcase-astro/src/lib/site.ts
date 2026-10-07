/** Public site name (title suffix, OG site_name). */
export const SITE_NAME = "piccolo jnr";

export const PERSON_NAME = "Daud Rahim";

export const HOME_DOCUMENT_TITLE =
  "Daud Rahim – Software Engineer | Portfolio";

export const SITE_DESCRIPTION =
  "Software engineer based in Accra, Ghana. React, Next.js, Laravel, Python/FastAPI and Tauri. Case studies in desktop software, payments, web applications and hardware integrations.";

export const SITE_KEYWORDS =
  "Daud Rahim, full stack engineer Ghana, Accra software developer, React developer, Laravel developer, Tauri desktop software, FastAPI developer, Next.js portfolio, IoT developer portfolio, SaaS architect, piccolo jnr";

export const TWITTER_HANDLE = "@piccolojnr";

export const DEFAULT_OG_PATH = "/profile.jpg";

/** Alt text for the default OG image (home, listing pages). */
export const DEFAULT_OG_IMAGE_ALT = `${PERSON_NAME}, ${SITE_NAME} portfolio`;

export const PROJECTS_INDEX_KEYWORDS =
  "software case studies, full stack portfolio Ghana, Next.js projects, FastAPI, desktop software, IoT development, Daud Rahim projects";

export function projectOgImageAlt(projectTitle: string): string {
  return `${projectTitle} case study preview`;
}

export const SAME_AS = [
  "https://github.com/piccolojnr",
  "https://www.linkedin.com/in/rahimdaud/",
  "https://twitter.com/piccolojnr",
] as const;

export const PROJECTS_INDEX_DOCUMENT_TITLE = `Software case studies: Web, desktop & integrations | ${SITE_NAME}`;

export const PROJECTS_INDEX_DESCRIPTION =
  "Portfolio case studies from a Ghana-based full-stack engineer: Next.js and React frontends, Laravel, FastAPI and Node APIs, desktop software, payments, and IoT + kiosk systems. Filter by topic.";

export function formatPageTitle(pageTitle: string): string {
  if (pageTitle === SITE_NAME) return SITE_NAME;
  return `${pageTitle} · ${SITE_NAME}`;
}

export function projectDocumentTitle(projectTitle: string): string {
  return `${projectTitle}: case study | ${PERSON_NAME} · ${SITE_NAME}`;
}

export function absoluteUrl(siteHref: string, pathname: string): string {
  const base = siteHref.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/") return `${base}/`;
  return `${base}${path}`;
}

export function homeJsonLd(siteHref: string): object {
  const url = absoluteUrl(siteHref, "/");
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
          "Desktop software",
          "Tauri",
          "Laravel",
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
