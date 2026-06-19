/**
 * Marketing / analytics tag IDs.
 *
 * These are public, client-side measurement IDs (safe to expose to the browser)
 * and map 1:1 to the legacy static site — see TRACKING-AND-WEBHOOKS-GUIDE.md:
 *
 * - Google Ads (`AW-…`)  → loaded site-wide on every page.
 * - Google Analytics 4 (`G-…`) → loaded only on the main marketing pages.
 *
 * Values can be overridden per environment via `NEXT_PUBLIC_*` env vars.
 */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17816976579";

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-WW6R5ZQT5V";
