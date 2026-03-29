/** Public site name (title suffix, OG site_name). */
export const SITE_NAME = "piccolo jnr";

export const PERSON_NAME = "Rahim Daud";

export const HOME_DOCUMENT_TITLE =
  "Rahim Daud – Full Stack Engineer (AI, IoT, SaaS) | Portfolio";

export const SITE_DESCRIPTION =
  "Full-stack engineer in Ghana (Accra) specializing in AI systems, RAG pipelines, FastAPI & Next.js backends, IoT platforms, and scalable SaaS. Production case studies: Memraiq, university systems, and hardware-integrated products.";

export const SITE_KEYWORDS =
  "Rahim Daud, full stack engineer Ghana, Accra software developer, AI engineer portfolio, RAG systems, FastAPI developer, Next.js portfolio, IoT developer portfolio, SaaS architect, piccolo jnr";

export const TWITTER_HANDLE = "@piccolojnr";

export const DEFAULT_OG_PATH = "/profile.jpg";

export const SAME_AS = [
  "https://github.com/piccolojnr",
  "https://www.linkedin.com/in/rahim-daud-piccolo",
  "https://twitter.com/piccolojnr",
] as const;

export const PROJECTS_INDEX_DOCUMENT_TITLE = `Software case studies — Next.js, FastAPI, AI & IoT | ${SITE_NAME}`;

export const PROJECTS_INDEX_DESCRIPTION =
  "Portfolio case studies from a Ghana-based full-stack engineer: Next.js and React frontends, FastAPI and Node APIs, RAG / AI SaaS, payments, and IoT + kiosk systems. Filter by topic.";

export function formatPageTitle(pageTitle: string): string {
  if (pageTitle === SITE_NAME) return SITE_NAME;
  return `${pageTitle} · ${SITE_NAME}`;
}

export function projectDocumentTitle(projectTitle: string): string {
  return `${projectTitle} — case study | ${PERSON_NAME} · ${SITE_NAME}`;
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
