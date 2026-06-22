"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "./SectionHeading";
import { ArrowRightIcon } from "@/components/layout/icons";
import { testimonials as defaultTestimonials } from "@/data/home";
import type { Testimonial } from "@/data/home";

type TestimonialsProps = {
  heading?: string;
  items?: Testimonial[];
};

// Horizontal gap between cards (Tailwind gap-6 = 1.5rem).
const CARD_GAP = 24;

function TestimonialCard({ item, hidden }: { item: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="flex w-[20rem] shrink-0 flex-col justify-between rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:w-[24rem]"
    >
      <span aria-hidden="true" className="font-eyebrow text-5xl leading-none text-action-blue/60">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-base leading-relaxed text-steel-neutral/90">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-action-blue/15 text-sm font-bold text-action-blue">
          {item.initial}
        </span>
        <span className="text-sm font-semibold text-arctic-white">{item.name}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Auto-scrolling carousel of client testimonials. Drifts continuously, pauses
 * on hover, and exposes prev/next arrows so visitors can advance immediately
 * instead of waiting for the loop. Inert under reduced-motion (arrows still
 * work); the duplicated set keeps the loop seamless.
 */
export function Testimonials({
  heading = "Trusted by Clients Worldwide",
  items = defaultTestimonials,
}: TestimonialsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Auto-scroll is suspended while either flag is set (hover / manual nudge).
  const hoverRef = useRef(false);
  const lockRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const speed = 40; // px per second

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!hoverRef.current && !lockRef.current) {
        el.scrollLeft += speed * dt;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;

    // Briefly suspend auto-scroll so it doesn't fight the smooth scroll.
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 700);

    const half = el.scrollWidth / 2;
    const card = el.querySelector("figure");
    const amount = (card instanceof HTMLElement ? card.offsetWidth : 360) + CARD_GAP;

    // Jump by one copy of the list when near an edge to keep the loop seamless.
    if (direction < 0 && el.scrollLeft - amount < 0) el.scrollLeft += half;
    if (direction > 0 && el.scrollLeft + amount > half * 2) el.scrollLeft -= half;

    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={heading} />
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
        className="marquee-mask mt-14 flex gap-6 overflow-x-auto px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...items, ...items].map((item, index) => (
          <TestimonialCard
            key={`${item.name}-${index}`}
            item={item}
            hidden={index >= items.length}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => nudge(-1)}
          className="flex size-11 items-center justify-center rounded-full border border-arctic-white/15 bg-white/[0.03] text-arctic-white transition-colors hover:border-action-blue/50 hover:bg-action-blue/15"
        >
          <ArrowRightIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => nudge(1)}
          className="flex size-11 items-center justify-center rounded-full border border-arctic-white/15 bg-white/[0.03] text-arctic-white transition-colors hover:border-action-blue/50 hover:bg-action-blue/15"
        >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
    </section>
  );
}
