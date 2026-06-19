"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { CloseIcon } from "@/components/layout/icons";
import { CheckIcon } from "@/components/sections/icons";
import { Button } from "@/components/ui/Button";
import { RECAPTCHA_SITE_KEY, THANK_YOU_PATH } from "@/constants/forms";
import { submitDemoForm } from "@/lib/submit-demo-form";

const INDUSTRIES = [
  "Technology",
  "E-commerce",
  "Finance",
  "Services",
  "Other",
] as const;

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-1000", label: "201-1,000" },
  { value: "1001+", label: "1,001+" },
] as const;

const FEATURES = [
  "International payment coverage to 200 countries in 120 currencies",
  "50+ global payment methods including SEPA, ACH and more",
  "Self-service payment portal and payee onboarding",
  "International tax and regulatory compliance, with automated tax ID validation",
] as const;

const inputClass =
  "w-full rounded-xl border border-arctic-white/10 bg-[rgb(12,13,41)] px-4 py-3.5 text-sm text-arctic-white placeholder:text-steel-neutral/45 transition-[border-color,box-shadow] focus:border-action-blue/50 focus:outline-none focus:ring-2 focus:ring-action-blue/25";

type DemoPopupProps = {
  pageSlug: string;
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  email: string;
  industry: string;
  company_size: string;
  phone: string;
  consent: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  industry: "",
  company_size: "",
  phone: "",
  consent: false,
};

export function DemoPopup({ pageSlug, isOpen, onClose }: DemoPopupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setError(null);
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
    resetForm();
  }, [isSubmitting, onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const focusTimer = requestAnimationFrame(() => getFocusable()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
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
      previouslyFocused.current?.focus();
    };
  }, [isOpen, handleClose]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!form.name.trim() || !form.email.trim() || !form.industry || !form.company_size) {
      setError("Please complete all required fields.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitDemoForm({
        pageSlug,
        values: form,
        refParam: searchParams.get("ref"),
      });

      const params = new URLSearchParams(searchParams.toString());
      const thankYouUrl = params.toString()
        ? `${THANK_YOU_PATH}?${params.toString()}`
        : THANK_YOU_PATH;

      window.setTimeout(() => {
        router.push(thankYouUrl);
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        role="presentation"
      >
        <button
          type="button"
          aria-label="Close demo request"
          tabIndex={-1}
          onClick={handleClose}
          disabled={isSubmitting}
          className="animate-scrim-in absolute inset-0 cursor-default bg-[rgb(12,13,41)]/92 backdrop-blur-md"
        />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-popup-title"
          className="animate-modal-in relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-arctic-white/10 bg-[rgb(12,13,41)] shadow-2xl shadow-black/50"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-action-blue/20 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-breinrock-blue/30 blur-[90px]"
            aria-hidden
          />

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full border border-arctic-white/10 bg-[rgb(12,13,41)]/80 text-steel-neutral backdrop-blur-sm transition-colors hover:border-arctic-white/20 hover:text-arctic-white disabled:opacity-50 sm:right-5 sm:top-5"
            aria-label="Close"
          >
            <CloseIcon className="size-5" />
          </button>

          <div className="relative overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center pr-0 lg:pr-4">
                <span className="font-eyebrow text-sm italic tracking-wide text-action-blue">
                  Request a demo
                </span>
                <h2
                  id="demo-popup-title"
                  className="mt-3 text-2xl font-bold leading-tight tracking-tight text-arctic-white sm:text-3xl lg:text-4xl"
                >
                  Simplify international payments at scale
                </h2>
                <p className="mt-4 text-base leading-relaxed text-steel-neutral/75">
                  Automate international mass payments with an unrivalled global pay
                  platform for businesses.
                </p>
                <ul className="mt-8 space-y-3.5">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-steel-neutral/80">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-action-blue/15 text-action-blue">
                        <CheckIcon className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                <p className="mb-6 text-sm leading-relaxed text-steel-neutral/75">
                  Complete the form below and we&apos;ll contact you to schedule your
                  tailored demo.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <input
                    type="text"
                    name="website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                  />

                  <input
                    type="text"
                    required
                    placeholder="Your name *"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClass}
                    aria-label="Your name"
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work email address *"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClass}
                    aria-label="Work email address"
                    disabled={isSubmitting}
                  />
                  <select
                    required
                    value={form.industry}
                    onChange={(e) => setField("industry", e.target.value)}
                    className={cn(inputClass, !form.industry && "text-steel-neutral/45")}
                    aria-label="Industry"
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Industry *
                    </option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry} className="bg-[rgb(12,13,41)]">
                        {industry}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    value={form.company_size}
                    onChange={(e) => setField("company_size", e.target.value)}
                    className={cn(inputClass, !form.company_size && "text-steel-neutral/45")}
                    aria-label="Company size"
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Company size *
                    </option>
                    {COMPANY_SIZES.map((size) => (
                      <option key={size.value} value={size.value} className="bg-[rgb(12,13,41)]">
                        {size.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className={inputClass}
                    aria-label="Phone number"
                    disabled={isSubmitting}
                  />

                  <label className="flex items-start gap-3 pt-1 text-xs leading-relaxed text-steel-neutral/65">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-0.5 size-4 rounded border-arctic-white/20 accent-action-blue"
                      disabled={isSubmitting}
                      required
                    />
                    <span>
                      I consent to the use of my personal information in accordance with
                      the{" "}
                      <Link
                        href="/policies"
                        className="text-action-blue underline-offset-2 hover:text-arctic-white hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {error && (
                    <p
                      className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting…" : "Send message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
