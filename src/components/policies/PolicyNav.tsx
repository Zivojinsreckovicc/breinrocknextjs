"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@/components/layout/icons";
import { cn } from "@/lib/cn";
import type { PolicyListItem } from "@/types/policy";

/**
 * Jump-to dropdown for navigating between the policies of the same country (and
 * the same language — Czech-language policies live under their own country slug,
 * so this list is already language-scoped). Shown on every policy detail page so
 * a reader can move through a jurisdiction's documents without going back to the
 * index. Client component: it needs interactivity and programmatic navigation.
 */
export function PolicyNav({
  countrySlug,
  currentSlug,
  policies,
}: {
  countrySlug: string;
  currentSlug: string;
  policies: PolicyListItem[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = policies.find((p) => p.slug === currentSlug);

  // Close on outside click and Escape; keep focus inside the trigger on close.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Nothing to navigate to if this is the only policy in the set.
  if (policies.length <= 1) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-arctic-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-arctic-white transition-colors hover:border-action-blue/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
      >
        <span className="min-w-0 truncate">
          {current?.title ?? "Browse policies"}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-action-blue transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Jump to policy"
          className="absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-arctic-white/10 bg-midnight-raised p-1.5 shadow-2xl shadow-black/40"
        >
          {policies.map((policy) => {
            const isCurrent = policy.slug === currentSlug;
            return (
              <li key={policy._id} role="option" aria-selected={isCurrent}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (!isCurrent) {
                      router.push(`/policies/${countrySlug}/${policy.slug}`);
                    }
                  }}
                  className={cn(
                    "block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue",
                    isCurrent
                      ? "bg-action-blue/15 font-semibold text-action-blue"
                      : "text-steel-neutral/80 hover:bg-white/[0.06] hover:text-arctic-white"
                  )}
                >
                  {policy.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
