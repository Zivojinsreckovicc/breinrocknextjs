"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CloseIcon, ArrowRightIcon } from "@/components/layout/icons";
import type { PolicyCountry } from "@/data/policy-countries";
import type { PolicyListItem } from "@/types/policy";

/**
 * Policy picker dialog opened via the `?country=<slug>` query param (set by the
 * footer flags). Policy lists are fetched on demand when the modal opens.
 * Driven entirely by the URL so it's shareable and the browser back button
 * closes it. Accessible: focus trap, ESC + click-scrim to dismiss, scroll lock,
 * restored focus, and reduced-motion support.
 */
export function PolicyCountryModal({ countries }: { countries: PolicyCountry[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [policyCache, setPolicyCache] = useState<Record<string, PolicyListItem[]>>({});
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const countrySlug = searchParams.get("country");
  const activeCountry = countrySlug
    ? countries.find((c) => c.slug === countrySlug) ?? null
    : null;

  const policies = activeCountry ? (policyCache[activeCountry.slug] ?? null) : null;
  const isLoading = Boolean(activeCountry && loadingSlug === activeCountry.slug);
  const hasError = Boolean(activeCountry && fetchError && !policies && !isLoading);

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("country");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  // Switch the policy set to another language variant (keeps the modal open).
  const switchLanguage = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("country", slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (!activeCountry) return;
    if (policyCache[activeCountry.slug]) return;

    const controller = new AbortController();
    setLoadingSlug(activeCountry.slug);
    setFetchError(null);

    fetch(`/api/policies/${activeCountry.slug}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load policies");
        return response.json() as Promise<PolicyListItem[]>;
      })
      .then((items) => {
        setPolicyCache((prev) => ({ ...prev, [activeCountry.slug]: items }));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFetchError("Unable to load policies. Please try again.");
      })
      .finally(() => {
        setLoadingSlug((current) => (current === activeCountry.slug ? null : current));
      });

    return () => controller.abort();
  }, [activeCountry, policyCache]);

  // Scroll lock, ESC, focus trap, focus restore.
  useEffect(() => {
    if (!activeCountry) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const focusTimer = requestAnimationFrame(() => getFocusable()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "Tab") {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [activeCountry, close]);

  if (!activeCountry) return null;

  const policyList = policies ?? [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close policies"
        tabIndex={-1}
        onClick={close}
        className="animate-scrim-in absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        className="animate-modal-in relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-arctic-white/10 bg-midnight-raised shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-3 border-b border-arctic-white/10 p-5">
          <Image
            src={activeCountry.flag}
            alt=""
            width={40}
            height={28}
            className="h-7 w-10 rounded-sm object-cover"
          />
          <h2 id="policy-modal-title" className="flex-1 text-lg font-bold text-arctic-white">
            {activeCountry.name} Policies
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-10 items-center justify-center rounded-full text-steel-neutral/70 transition-colors hover:bg-white/10 hover:text-arctic-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {activeCountry.disclaimer && (
          <div className="border-b border-arctic-white/10 px-5 py-4">
            <p className="text-sm font-semibold text-arctic-white">
              You have selected: {activeCountry.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-steel-neutral/70">
              {activeCountry.disclaimer}
            </p>
          </div>
        )}

        {activeCountry.languageOptions && (
          <div
            role="group"
            aria-label="Policy language"
            className="flex gap-1.5 border-b border-arctic-white/10 px-5 py-3"
          >
            {activeCountry.languageOptions.map((language) => {
              const isActive = language.slug === activeCountry.slug;
              return (
                <button
                  key={language.slug}
                  type="button"
                  onClick={() => !isActive && switchLanguage(language.slug)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue ${
                    isActive
                      ? "bg-action-blue text-arctic-white"
                      : "text-steel-neutral/70 hover:bg-white/10 hover:text-arctic-white"
                  }`}
                >
                  {language.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {isLoading ? (
            <ul className="flex flex-col gap-2 px-3 py-2" aria-busy="true" aria-live="polite">
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="h-14 animate-pulse rounded-xl bg-white/[0.06]"
                />
              ))}
            </ul>
          ) : hasError ? (
            <div className="px-3 py-6 text-center">
              <p className="text-sm text-steel-neutral/70">{fetchError}</p>
              <Link
                href={`/policies/${activeCountry.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
              >
                View policies page
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          ) : policyList.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-sm text-steel-neutral/70">
                For policy information specific to {activeCountry.name}, please get in touch.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
              >
                Contact us
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col">
              {policyList.map((policy) => (
                <li key={policy._id}>
                  <Link
                    href={`/policies/${activeCountry.slug}/${policy.slug}`}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
                  >
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-arctic-white">
                        {policy.title}
                      </span>
                      {policy.summary && (
                        <span className="mt-0.5 block text-xs text-steel-neutral/60">
                          {policy.summary}
                        </span>
                      )}
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 text-action-blue transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isLoading && !hasError && policyList.length > 0 && (
          <div className="border-t border-arctic-white/10 p-4">
            <Link
              href={`/policies/${activeCountry.slug}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors hover:text-arctic-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue focus-visible:rounded"
            >
              View all {activeCountry.name} policies
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
