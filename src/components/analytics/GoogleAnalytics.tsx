"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA4_ID } from "@/constants/tracking";

/**
 * Google Analytics 4 page tracking.
 *
 * Rendered ONLY on the main marketing pages that should be measured in GA4
 * (about, accounts, products + product pages, contact, blog index). Google Ads
 * is loaded globally in the root layout, so gtag.js already exists — this just
 * adds the GA4 config / page_view on top of it for the pages that opt in.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA4_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}
