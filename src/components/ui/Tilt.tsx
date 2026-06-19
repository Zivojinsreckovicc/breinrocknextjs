"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
};

/**
 * Subtle 3D perspective tilt that follows the pointer. Automatically inert on
 * touch / reduced-motion devices (those don't fire hover, so the transform
 * simply never applies).
 */
export function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const allowTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !allowTilt()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (py - 0.5) * -2 * max;
    const rotateY = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "h-full transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
