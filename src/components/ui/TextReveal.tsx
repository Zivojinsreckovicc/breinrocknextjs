"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { landingSlugs } from "@/data/landings";

/** Headings + paragraphs inside the page's <main> are the reveal targets. */
const SELECTOR = "main h1, main h2, main h3, main h4, main p";

/** Containers whose text should NOT be auto-revealed. */
const EXCLUDE = ".reveal, [data-reveal-skip], .marquee-track";

function isLandingPath(pathname: string) {
  const slug = pathname.replace(/^\//, "");
  return landingSlugs.includes(slug);
}

/**
 * Site-wide text reveal. Mounted once in the root layout, it gives every
 * heading and paragraph a lightweight, framer-motion-style entrance (fade +
 * lift + de-blur) as it scrolls into view — without wrapping each element by
 * hand.
 *
 * It only manages elements that start *below the fold*: hiding off-screen
 * content can't flash and doesn't affect LCP, and anything already visible (or
 * added later by a modal / accordion) is simply left alone, so nothing is ever
 * stuck invisible. Elements already handled by <Reveal>, opted out with
 * [data-reveal-skip], or inside a moving marquee are skipped. Fully disabled
 * under prefers-reduced-motion. Re-runs on client-side navigation.
 */
export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isLandingPath(pathname)) return;

    let observer: IntersectionObserver | null = null;

    // Defer one frame so freshly-navigated content is in the DOM and laid out.
    const raf = requestAnimationFrame(() => {
      const reveal = (el: HTMLElement, delay: number) => {
        if (delay) el.style.setProperty("--reveal-text-delay", `${delay}ms`);
        el.classList.add("reveal-in");
      };

      observer = new IntersectionObserver(
        (entries) => {
          let staggered = 0;
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement, Math.min(staggered, 5) * 70);
              observer?.unobserve(entry.target);
              staggered++;
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
      );

      const viewportH = window.innerHeight;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (
          el.classList.contains("reveal-text") ||
          el.closest(EXCLUDE) ||
          !el.textContent?.trim()
        ) {
          return;
        }
        // Leave anything already on screen untouched — only animate text that
        // starts fully below the fold, so there's no flash and no LCP impact.
        if (el.getBoundingClientRect().top < viewportH) return;
        el.classList.add("reveal-text");
        observer!.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
