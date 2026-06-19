import { landingSlugs } from "@/data/landings";

/** True when the pathname is a Google Ads landing page (e.g. `/corporate-iban-1`). */
export function isLandingPath(pathname: string): boolean {
  const slug = pathname.replace(/^\//, "").split("/")[0];
  return landingSlugs.includes(slug);
}

export function landingSlugFromPath(pathname: string): string {
  return pathname.replace(/^\//, "").split("/")[0];
}
