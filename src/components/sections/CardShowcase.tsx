"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Tilt } from "@/components/ui/Tilt";
import { SectionHeading } from "./SectionHeading";
import { CheckIcon } from "./icons";
import { ArrowRightIcon } from "@/components/layout/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { cardTiers as defaultTiers } from "@/data/cards";
import type { CardTier } from "@/data/cards";

type CardShowcaseProps = {
  tiers?: CardTier[];
};

/**
 * Scroll-driven card showcase. On desktop a single card sticks in view, swaps
 * between tiers as their panels scroll past, and rotates with scroll progress
 * (transform-only — cheap on the GPU). On mobile / reduced-motion it degrades
 * to a clean stacked layout with no scroll listener attached.
 */
export function CardShowcase({ tiers = defaultTiers }: CardShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Active tier follows whichever panel is centred in the viewport.
  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [tiers]);

  // Continuous rotation driven by scroll — desktop + motion only.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduceMotion) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      const card = cardRef.current;
      if (!section || !card) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      const ry = (progress * 2 - 1) * 18;
      const rx = Math.sin(progress * Math.PI) * -6;
      card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tiers]);

  const scrollToPanel = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="choose-your-card"
      className="scroll-mt-20 bg-midnight-frame pt-24 lg:pt-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Card Products"
          title="Choose Your Card"
          subtitle="Three tiers, one platform. Pick the level of benefits that fits how you spend and travel."
        />

        {/* Tier tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {tiers.map((tier, index) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => scrollToPanel(index)}
              aria-current={active === index}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300",
                active === index
                  ? "border-action-blue bg-action-blue text-arctic-white"
                  : "border-arctic-white/15 text-steel-neutral/80 hover:border-arctic-white/40 hover:text-arctic-white"
              )}
            >
              {tier.name}
            </button>
          ))}
        </div>
      </div>

      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Sticky rotating card — desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center [perspective:1600px]">
            <div
              ref={cardRef}
              style={{ transform: "rotateY(var(--ry,0deg)) rotateX(var(--rx,0deg))" }}
              className="relative aspect-[1261/854] w-full max-w-md [transform-style:preserve-3d] will-change-transform"
            >
              {tiers.map((tier, index) => (
                <Image
                  key={tier.id}
                  src={tier.image}
                  alt={tier.alt}
                  fill
                  sizes="28rem"
                  className={cn(
                    "object-contain drop-shadow-2xl transition-opacity duration-700",
                    active === index ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling tier panels */}
        <div>
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              data-idx={index}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center py-12 lg:min-h-screen lg:py-0"
            >
              {/* Inline card — mobile only */}
              <div className="mb-8 lg:hidden">
                <Tilt max={8} className="mx-auto w-full max-w-sm [perspective:1200px]">
                  <div className="relative aspect-[1261/854] w-full">
                    <Image
                      src={tier.image}
                      alt={tier.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 24rem"
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </Tilt>
              </div>

              <span className="font-eyebrow text-base italic tracking-wide text-action-blue">
                {tier.name}
              </span>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl">
                {tier.tagline}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-steel-neutral/70">
                {tier.description}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-action-blue/15">
                      <CheckIcon className="size-4 text-action-blue" />
                    </span>
                    <span className="text-sm text-steel-neutral/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={SIGN_UP_URL}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors hover:text-arctic-white"
                >
                  Choose {tier.name}
                  <ArrowRightIcon className="size-4 transition-transform hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
