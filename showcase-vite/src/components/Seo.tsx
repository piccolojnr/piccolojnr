import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  absoluteUrl,
  defaultOgImageUrl,
  formatPageTitle,
} from "@/lib/site";

function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return defaultOgImageUrl();
  if (/^https?:\/\//i.test(url)) return url;
  return absoluteUrl(url.startsWith("/") ? url : `/${url}`);
}

export type SeoProps = {
  title: string;
  /** When set, used as the exact document & OG title (no `· SITE_NAME` suffix). */
  documentTitle?: string;
  description?: string;
  path: string;
  imageUrl?: string | null;
  ogType?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: object | null;
  /** Optional meta keywords (e.g. home page). */
  keywords?: string;
};

export function Seo({
  title,
  documentTitle,
  description = SITE_DESCRIPTION,
  path,
  imageUrl,
  ogType = "website",
  noIndex,
  jsonLd,
  keywords,
}: SeoProps) {
  const fullTitle = documentTitle ?? formatPageTitle(title);
  const canonical = absoluteUrl(path);
  const desc = description.length > 320 ? `${description.slice(0, 317)}…` : description;
  const image = resolveImageUrl(imageUrl ?? null);
  const twitterCard = "summary_large_image";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#faf8f4" />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
