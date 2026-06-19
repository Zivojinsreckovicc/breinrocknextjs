"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GOOGLE_ADS_ID } from "@/constants/tracking";

/**
 * Site-wide Google Ads (gtag.js) tag.
 *
 * Loads the gtag library once and configures the Ads tag for the whole site
 * (this is what every page in the legacy build had in its <head>). gtag.js is
 * shared, so the per-page <GoogleAnalytics /> component only needs to add a GA4
 * config on top of this.
 *
 * Because the App Router navigates client-side (no full reload), we also send a
 * page_view on every route change so traffic is counted like the old static
 * pages were.
 */
export function GoogleAds() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The inline init script below already fires the initial page_view via
    // gtag('config'); skip the first effect run so it isn't double-counted.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GOOGLE_ADS_ID, { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
