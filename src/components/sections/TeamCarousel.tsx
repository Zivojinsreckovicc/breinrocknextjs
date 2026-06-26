"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { ChevronDownIcon } from "@/components/layout/icons";
import { team as defaultTeam } from "@/data/team";
import type { TeamMember } from "@/data/team";

type TeamCarouselProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
};

/**
 * Horizontal, scroll-snap team carousel with prev/next controls. Uses native
 * scrolling (touch / trackpad friendly); buttons scroll by ~one viewport and
 * disable at each end.
 */
export function TeamCarousel({
  eyebrow = "Our people",
  title = "Meet the team",
  subtitle = "The people behind Breinrock — combining deep payments expertise with real, human support.",
  members = defaultTeam,
}: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Mouse drag-to-swipe state (touch/trackpad use native scrolling).
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scrollByCards = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // leave native touch/pen scrolling alone
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 3) drag.moved = true;
    el.scrollLeft = drag.startScroll - dx;
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
  };

  // Swallow the click that follows a drag so cards don't trigger on release.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="left"
        />

        <Reveal className="mt-12">
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
            className={cn(
              "flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              dragging ? "cursor-grabbing select-none [&_img]:pointer-events-none" : "cursor-grab"
            )}
          >
            {members.map((member, index) => (
              <article
                key={`${member.image}-${index}`}
                className="group flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl border border-action-blue/40 bg-[#080c1c] sm:w-64"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <Image
                    src={member.image}
                    alt={member.role ? `${member.name}, ${member.role}` : member.name}
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col items-center px-4 pb-6 pt-4 text-center">
                  <p className="text-lg font-bold leading-snug text-arctic-white">
                    {member.name}
                  </p>
                  {member.role && (
                    <p className="mt-3 text-sm leading-relaxed tracking-wide text-steel-neutral/75">
                      {member.role}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center gap-3">
          <CarouselButton
            direction="prev"
            disabled={atStart}
            onClick={() => scrollByCards(-1)}
          />
          <CarouselButton
            direction="next"
            disabled={atEnd}
            onClick={() => scrollByCards(1)}
          />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous team members" : "Next team members"}
      className="flex size-11 items-center justify-center rounded-full border border-arctic-white/20 text-arctic-white transition-colors hover:border-action-blue hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue disabled:cursor-not-allowed disabled:opacity-30"
    >
      <ChevronDownIcon
        className={cn("size-5", direction === "prev" ? "rotate-90" : "-rotate-90")}
      />
    </button>
  );
}
