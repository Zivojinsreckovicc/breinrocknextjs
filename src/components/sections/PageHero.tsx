import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  children: ReactNode;
  /** Right column content (e.g. landing hero comparison table). */
  aside?: ReactNode;
  /** Full viewport height with vertically centred content (landing pages). */
  fullHeight?: boolean;
  /** Extra classes for the section (e.g. override vertical padding). */
  className?: string;
};

/**
 * Shared page header used beneath the navbar on interior pages. Renders the
 * same animated "liquid" brand gradient as the home hero, with its content
 * (breadcrumbs, eyebrow, title, etc.) centred. All motion is decorative and
 * disabled under reduced-motion via the underlying gradient utilities.
 *
 * Pass `aside` for a two-column layout (landing pages): main copy left, aside right.
 */
export function PageHero({ children, aside, fullHeight = false, className }: PageHeroProps) {
  const split = Boolean(aside);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-midnight-frame",
        fullHeight
          ? "flex min-h-[100svh] items-center pt-28 pb-16 lg:pt-32"
          : "pt-32 pb-16 lg:pt-36",
        className
      )}
    >
      {/* Animated liquid brand gradient — matches the home hero */}
      <div
        className="bg-liquid animate-liquid absolute inset-0 -z-20"
        aria-hidden="true"
      />
      {/* Fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-midnight-frame"
        aria-hidden="true"
      />

      <div
        className={cn(
          "animate-rise mx-auto w-full px-6 lg:px-8",
          split
            ? "grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16"
            : "flex max-w-4xl flex-col items-center text-center"
        )}
      >
        <div className={cn(split && "text-left")}>{children}</div>
        {aside ? <div className="w-full min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}
