"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";
import { CheckIcon } from "./icons";
import { payoutCurrencies } from "@/data/bpn";
import type { PayoutCurrency } from "@/data/bpn";

/**
 * Decide whether an entry matches the (lowercased, trimmed) query. Rules are
 * checked in priority order: exact code → code prefix → keyword/region prefix →
 * region substring. Mirrors the legacy BPN International search behaviour.
 */
function matchesQuery(entry: PayoutCurrency, q: string): boolean {
  const code = entry.code.toLowerCase();
  // 1 — exact 3-letter currency code
  if (q.length === 3 && q === code) return true;
  // 2 — currency code starts with query (min 2 chars)
  if (q.length >= 2 && code.startsWith(q)) return true;
  // 3 — keyword/region exact or prefix match (min 2 chars)
  const terms = [...entry.keywords, ...entry.regions.map((r) => r.toLowerCase())];
  if (q.length >= 2 && terms.some((t) => t === q || t.startsWith(q))) return true;
  // 4 — region name contains query (min 3 chars)
  if (q.length >= 3 && entry.regions.some((r) => r.toLowerCase().includes(q))) return true;
  return false;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * Client-side autocomplete that lets visitors check whether Breinrock supports
 * local-rail payouts for a given region or currency. Selecting a result only
 * highlights it — nothing is submitted or navigated.
 */
export function CurrencySearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? payoutCurrencies.filter((entry) => matchesQuery(entry, q)) : []),
    [q]
  );
  const showResults = open && q.length > 0 && results.length > 0;

  const clear = () => {
    setQuery("");
    setSelected(null);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <section className="bg-midnight-frame px-6 pt-16 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Pay out internationally in the below currencies using local rails"
          subtitle="Faster and simpler for global operations."
        />

        <div className="relative mt-8">
          {/* Search input */}
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-steel-neutral/50" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                // Delay so a result click registers before the list hides.
                blurTimer.current = setTimeout(() => setOpen(false), 200);
              }}
              aria-label="Search for a region or currency"
              placeholder="Search region or currency (e.g., Australia, AUD, European Union)"
              className="w-full rounded-full border border-arctic-white/15 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-arctic-white placeholder:text-steel-neutral/45 transition-colors focus:border-action-blue/60 focus:outline-none focus:ring-2 focus:ring-action-blue/30"
            />
            {query && (
              <button
                type="button"
                onClick={clear}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-steel-neutral/60 transition-colors hover:bg-white/10 hover:text-arctic-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-4"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {showResults && (
            <ul
              role="list"
              aria-label="Search results list"
              // Keep focus on the input so clicks select instead of blurring.
              onMouseDown={(e) => {
                e.preventDefault();
                if (blurTimer.current) clearTimeout(blurTimer.current);
              }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 max-h-[400px] overflow-y-auto rounded-2xl border border-arctic-white/12 bg-[#0c1330] p-2 shadow-2xl shadow-black/40"
            >
              {results.map((entry) => {
                const isSelected = selected === entry.code;
                return (
                  <li key={entry.code}>
                    <button
                      type="button"
                      onClick={() => setSelected(entry.code)}
                      aria-pressed={isSelected}
                      aria-label={`${entry.regions.join(", ")}, currency code ${entry.code}`}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                        isSelected
                          ? "border-action-blue/50 bg-action-blue/15"
                          : "border-transparent hover:border-arctic-white/10 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-arctic-white">
                          {entry.regions.join(", ")}
                        </span>
                        <span className="mt-0.5 block text-xs font-medium tracking-wide text-steel-neutral/55">
                          {entry.code}
                        </span>
                      </span>
                      <CheckIcon
                        className={cn(
                          "size-5 shrink-0 text-action-blue transition-opacity",
                          isSelected ? "opacity-100" : "opacity-70"
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
