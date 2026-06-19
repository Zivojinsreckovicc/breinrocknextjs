import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/site";

/**
 * Centralised metadata builder so every page emits a consistent, complete set
 * of SEO tags (title, description, keywords, robots directives, canonical +
 * hreflang, Open Graph, Twitter, and geo targeting) without repeating the
 * shared boilerplate. Page-specific copy lives in each page's `metadata`
 * export; the site-wide defaults live here. See SEO-GUIDE.md.
 *
 * Canonical / OG / hreflang URLs are passed as paths (e.g. "/about") and
 * resolved against `metadataBase` (set in the root layout).
 */

const OG_LOCALE = "en_US";

/** index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 */
const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
};

/** Geo targeting for Breinrock's regulated jurisdictions / offices. */
const GEO: Metadata["other"] = {
  "geo.region": "CA-ON, GB, CZ, CY, AE",
  "geo.placename": "Toronto, London, Prague, Limassol, Dubai",
};

type BuildMetadataInput = {
  /** Full document title — already includes the brand (used as-is). */
  title: string;
  description?: string;
  keywords?: string | string[];
  /** Canonical path, e.g. "/about". Drives canonical, og:url and hreflang. */
  path: string;
  ogType?: "website" | "article";
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  /** Absolute or root-relative image URLs for OG / Twitter cards. */
  images?: string[];
  /** ISO date for article OG (blog posts). */
  publishedTime?: string;
  /** Override the default index/follow robots (e.g. noindex pages). */
  robots?: Metadata["robots"];
  /** Emit hreflang alternates (en + x-default). Default true. */
  hreflang?: boolean;
};

export function buildMetadata({
  title,
  description,
  keywords,
  path,
  ogType = "website",
  ogTitle,
  ogDescription,
  twitterCard = "summary",
  twitterTitle,
  twitterDescription,
  images,
  publishedTime,
  robots = DEFAULT_ROBOTS,
  hreflang = true,
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    robots,
    alternates: {
      canonical: path,
      ...(hreflang ? { languages: { en: path, "x-default": path } } : {}),
    },
    openGraph: {
      type: ogType,
      url: path,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      images,
      // publishedTime is only valid on article OG; cast past the discriminated union.
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
    } as Metadata["openGraph"],
    twitter: {
      card: twitterCard,
      title: twitterTitle ?? ogTitle ?? title,
      description: twitterDescription ?? ogDescription ?? description,
      images,
    } as Metadata["twitter"],
    other: GEO,
  };
}
