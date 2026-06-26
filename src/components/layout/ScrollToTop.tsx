"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces every client-side navigation to start at the top of the page.
 *
 * Next.js usually scrolls to the top on route change, but it skips this when a
 * focused element or a layout shift interferes — which is why landing on a new
 * page from a footer link sometimes left the viewport mid-page. Resetting scroll
 * on each pathname change guarantees consistent top-of-page entry. Keyed on
 * pathname only (not search params) so opening/closing the policy modal — which
 * toggles `?country=` — doesn't jump the page. Hash links (`#section`) are left
 * alone so in-page anchors still work.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
