"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type PointerGlowProps = {
  /** "hover" reveals on enter; "always" stays lit and just tracks the cursor. */
  mode?: "hover" | "always";
  className?: string;
};

/**
 * Drop-in cursor-following radial glow. Place as a child of any
 * `position: relative` element — it attaches to its parent and tracks the
 * pointer via CSS custom properties (no per-frame React renders).
 */
export function PointerGlow({ mode = "hover", className }: PointerGlowProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = ref.current;
    const el = span?.parentElement;
    if (!span || !el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      span.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      span.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => (span.style.opacity = "1");
    const onLeave = () => (span.style.opacity = "0");

    el.addEventListener("pointermove", onMove);
    if (mode === "hover") {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    } else {
      span.style.opacity = "1";
    }

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mode]);

  return <span ref={ref} aria-hidden="true" className={cn("pointer-glow", className)} />;
}
