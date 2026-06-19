/**
 * Canonical site identity. Single source of truth for the origin used by
 * metadata, robots.txt, sitemap.xml and llms.txt. Override per-environment
 * with `NEXT_PUBLIC_SITE_URL` (no trailing slash needed — it's stripped).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.breinrock.com";

export const SITE_NAME = "Breinrock";

export const SITE_DESCRIPTION =
  "Modern banking and payment infrastructure — multi-currency accounts, local and cross-border payments, online FX, prepaid cards, and white-label Banking-as-a-Service.";
