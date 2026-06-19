"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import type { GlobeArc, GlobeMarker } from "@/components/ui/Globe";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { offices as defaultOffices } from "@/data/home";
import type { Office } from "@/data/home";

// The globe pulls in three.js — keep it client-only and out of the SSR/initial
// bundle so it loads lazily once the section renders (lg+ viewports only).
const Globe = dynamic(
  () => import("@/components/ui/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

/** Tailwind `lg` — entire section is desktop-only for performance. */
const DESKTOP_MQ = "(min-width: 1024px)";

type GlobalPresenceProps = {
  offices?: Office[];
};

/**
 * Global presence anchored by a large 3D globe rising from the bottom of the
 * section, with arcs linking every office back to HQ. A horizontal row of
 * locations rotates the globe and reveals each entity's regulatory detail.
 *
 * The full section (heading, offices, globe) is omitted below `lg` so three.js
 * never loads on mobile.
 */
export function GlobalPresence({ offices = defaultOffices }: GlobalPresenceProps) {
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const markers = useMemo<GlobeMarker[]>(
    () =>
      offices.map((office) => ({
        location: office.coordinates,
        size: office.hq ? 0.06 : 0.04,
      })),
    [offices]
  );

  // Connect HQ (first office) to every other location, plus a couple of
  // cross-links so the network reads as a mesh rather than a star.
  const arcs = useMemo<GlobeArc[]>(() => {
    if (offices.length === 0) return [];
    const hqOffice = offices.find((office) => office.hq) ?? offices[0];
    const hq = hqOffice.coordinates;
    const spokes = offices
      .filter((office) => office.entity !== hqOffice.entity)
      .map((office) => ({ from: hq, to: office.coordinates }));
    const cross: GlobeArc[] = [];
    if (offices.length > 4) {
      cross.push({ from: offices[1].coordinates, to: offices[2].coordinates });
      cross.push({ from: offices[2].coordinates, to: offices[4].coordinates });
    }
    return [...spokes, ...cross];
  }, [offices]);

  if (!isDesktop) return null;

  const focus = active !== null ? offices[active].coordinates : null;
  const activeOffice = active !== null ? offices[active] : null;

  return (
    <section className="relative isolate overflow-hidden bg-midnight-frame pt-24 lg:pt-32">
      <div
        className="animate-blob absolute left-1/2 top-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-action-blue/12 blur-[160px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Locations"
            title="Global Presence"
            subtitle="Six offices across four continents, delivering local expertise with global reach."
          />
        </Reveal>

        <Reveal delay={120}>
          <div
            role="group"
            aria-label="Office locations"
            onMouseLeave={() => setActive(null)}
            className="mt-12 flex flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10"
          >
            {offices.map((office, index) => {
              const isActive = active === index;
              return (
                <button
                  key={office.entity}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="group flex flex-col items-center gap-2 outline-none"
                >
                  <span
                    className={cn(
                      "relative flex size-3 items-center justify-center rounded-full border transition-colors duration-300",
                      isActive
                        ? "border-action-blue bg-action-blue"
                        : "border-steel-neutral/40 bg-transparent group-hover:border-action-blue"
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-action-blue/60" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold transition-colors duration-300",
                      isActive
                        ? "text-arctic-white"
                        : "text-arctic-white/80 group-hover:text-arctic-white"
                    )}
                  >
                    {office.city}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-steel-neutral/50">
                    {office.country}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mx-auto mt-8 flex min-h-[5.5rem] max-w-xl flex-col items-center text-center">
          <div
            className={cn(
              "transition-opacity duration-300",
              activeOffice ? "opacity-100" : "opacity-0"
            )}
          >
            {activeOffice && (
              <>
                <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold text-arctic-white">
                    {activeOffice.entity}
                  </span>
                  {activeOffice.hq && (
                    <span className="rounded-full bg-action-blue/15 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-action-blue">
                      HQ
                    </span>
                  )}
                  <span className="font-mono text-xs text-action-blue/90">
                    {activeOffice.license}
                  </span>
                </p>
                <address className="mt-1.5 text-sm not-italic text-steel-neutral/70">
                  {activeOffice.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-4 h-[540px]">
        <div className="absolute left-1/2 top-[-6%] w-[1000px] max-w-[150%] -translate-x-1/2">
          <Globe markers={markers} arcs={arcs} focus={focus} />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-midnight-frame"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
