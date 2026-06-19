"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon } from "./icons";

type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "companyName"
  | "companyWebsite"
  | "interest"
  | "message"
  | "marketing";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const INTERESTS = [
  "All Products",
  "Multicurrency Accounts",
  "Foreign Exchange",
  "Payments",
  "Prepaid Cards",
  "White-Label BaaS",
  "Other",
];

const labelBase = "text-xs font-semibold uppercase tracking-wider text-arctic-white/90";
const inputBase =
  "w-full rounded-lg border bg-midnight-frame/50 px-4 py-3.5 text-sm text-arctic-white placeholder:text-steel-neutral/40 transition-colors focus:outline-none focus:border-action-blue/60 focus:ring-2 focus:ring-action-blue/30";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const EMPTY: Record<Field, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  interest: INTERESTS[0],
  message: "",
  marketing: "",
};

type ContactFormProps = {
  className?: string;
  /** Optional async submit handler; defaults to a local simulation. */
  onSubmit?: (data: Record<Field, string>) => Promise<void>;
};

/**
 * Reusable contact form. Visible uppercase labels, on-blur + on-submit
 * validation, inline errors announced to assistive tech, and a loading →
 * success state.
 */
export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validateField = (field: Field, value: string): string | undefined => {
    switch (field) {
      case "firstName":
        return value.trim() ? undefined : "Please enter your first name.";
      case "lastName":
        return value.trim() ? undefined : "Please enter your last name.";
      case "email":
        if (!value.trim()) return "Please enter your email.";
        return isEmail(value) ? undefined : "Enter a valid email address.";
      default:
        return undefined;
    }
  };

  const setField = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: Field) => {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: Errors = {};
    (["firstName", "lastName", "email"] as Field[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    try {
      setStatus("submitting");
      if (onSubmit) await onSubmit(values);
      else await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center rounded-2xl border border-action-blue/30 bg-white/[0.03] p-10 text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-action-blue/15 text-action-blue">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-arctic-white">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-steel-neutral/70">
          Thanks for reaching out. A member of our team will get back to you within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
          }}
          className="mt-6 rounded-lg bg-action-blue px-6 py-3 text-sm font-bold uppercase tracking-wider text-arctic-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-frame"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("flex flex-col gap-5", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="cf-first" required error={errors.firstName}>
          <input
            id="cf-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            value={values.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "cf-first-error" : undefined}
            className={cn(inputBase, errors.firstName ? "border-red-400/70" : "border-arctic-white/15")}
          />
        </Field>

        <Field label="Last name" htmlFor="cf-last" required error={errors.lastName}>
          <input
            id="cf-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            value={values.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "cf-last-error" : undefined}
            className={cn(inputBase, errors.lastName ? "border-red-400/70" : "border-arctic-white/15")}
          />
        </Field>

        <Field label="Email" htmlFor="cf-email" required error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={cn(inputBase, errors.email ? "border-red-400/70" : "border-arctic-white/15")}
          />
        </Field>

        <Field label="Phone number" htmlFor="cf-phone">
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 000 000 0000"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={cn(inputBase, "border-arctic-white/15")}
          />
        </Field>

        <Field label="Company name" htmlFor="cf-company">
          <input
            id="cf-company"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            value={values.companyName}
            onChange={(e) => setField("companyName", e.target.value)}
            className={cn(inputBase, "border-arctic-white/15")}
          />
        </Field>

        <Field label="Company website" htmlFor="cf-website">
          <input
            id="cf-website"
            name="companyWebsite"
            type="url"
            autoComplete="url"
            placeholder="https://"
            value={values.companyWebsite}
            onChange={(e) => setField("companyWebsite", e.target.value)}
            className={cn(inputBase, "border-arctic-white/15")}
          />
        </Field>
      </div>

      <Field label="I'm interested in" htmlFor="cf-interest">
        <select
          id="cf-interest"
          name="interest"
          value={values.interest}
          onChange={(e) => setField("interest", e.target.value)}
          className={cn(inputBase, "border-arctic-white/15")}
        >
          {INTERESTS.map((interest) => (
            <option key={interest} value={interest} className="bg-midnight-frame">
              {interest}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Anything else you'd like to know?" htmlFor="cf-message">
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Tell us more about your needs…"
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          className={cn(inputBase, "resize-y border-arctic-white/15")}
        />
      </Field>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-steel-neutral/80">
        <input
          type="checkbox"
          name="marketing"
          checked={values.marketing === "on"}
          onChange={(e) => setField("marketing", e.target.checked ? "on" : "")}
          className="size-4 shrink-0 rounded border-arctic-white/30 bg-midnight-frame accent-action-blue"
        />
        I&rsquo;d like to receive product news, updates and events from Breinrock.
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-gradient-to-r from-action-blue to-breinrock-blue py-4 text-sm font-bold uppercase tracking-wider text-arctic-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-frame disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <span aria-live="polite">
        {status === "error" && (
          <span className="text-sm text-red-400">
            Something went wrong. Please try again or email welcome@breinrock.com.
          </span>
        )}
      </span>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelBase}>
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
