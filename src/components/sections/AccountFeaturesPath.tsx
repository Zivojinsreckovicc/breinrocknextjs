"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

type AccountFeaturesPathProps = {
  eyebrow?: string;
  title: ReactNode;
  features: Feature[];
};

/**
 * Features laid out in an alternating (left/right) timeline, connected by an
 * SVG path that draws itself as you scroll — weaving left to right from card to
 * card. The path is desktop-only; the drawing is driven by stroke-dashoffset
 * (transform/paint only) and disabled under reduced-motion. No state writes per
 * frame — the DOM is updated directly so there are no React re-renders.
 */
export function AccountFeaturesPath({
  eyebrow,
  title,
  features,
}: AccountFeaturesPathProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!wrap || !svg || !path) return;

    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let total = 0;

    const recompute = () => {
      if (!isDesktop()) {
        path.setAttribute("d", "");
        return;
      }
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const wrapRect = wrap.getBoundingClientRect();
      const pts = cardRefs.current
        .filter(Boolean)
        .map((el, i) => {
          const r = (el as HTMLDivElement).getBoundingClientRect();
          const left = i % 2 === 0;
          return {
            x: (left ? r.right : r.left) - wrapRect.left,
            y: r.top - wrapRect.top + r.height / 2,
          };
        });
      if (pts.length < 2) return;

      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const my = (p0.y + p1.y) / 2;
        d += ` C ${p0.x.toFixed(1)} ${my.toFixed(1)} ${p1.x.toFixed(1)} ${my.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }
      path.setAttribute("d", d);
      total = path.getTotalLength();
      path.style.strokeDasharray = `${total}`;
      applyProgress();
    };

    const applyProgress = () => {
      if (!isDesktop() || total === 0) return;
      if (reduceMotion) {
        path.style.strokeDashoffset = "0";
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        Math.max((vh * 0.8 - rect.top) / (rect.height * 0.78), 0),
        1
      );
      path.style.strokeDashoffset = `${total * (1 - progress)}`;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyProgress();
      });
    };

    // Initial measure (after layout settles).
    const initial = requestAnimationFrame(recompute);
    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(initial);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [features.length]);

  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div ref={wrapRef} className="relative mt-16 flex flex-col gap-12 lg:mt-24 lg:gap-8">
          {/* Scroll-drawn connector (desktop only) */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          >
            <defs>
              <linearGradient id="acc-path" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1664c4" />
                <stop offset="1" stopColor="#4f8ff0" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              fill="none"
              stroke="url(#acc-path)"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(22,100,196,0.45))" }}
            />
          </svg>

          {features.map((feature, index) => {
            const left = index % 2 === 0;
            return (
              <div
                key={feature.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "lg:w-[46%]",
                  left ? "lg:mr-auto" : "lg:ml-auto"
                )}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-action-blue/15 text-action-blue ring-1 ring-action-blue/20">
                      {feature.icon}
                    </span>
                    <h3 className="text-lg font-bold text-arctic-white">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-steel-neutral/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
