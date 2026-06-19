import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

/**
 * Served at /robots.txt. Open to all crawlers — including AI/answer engines
 * (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) for GEO — and points
 * them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
