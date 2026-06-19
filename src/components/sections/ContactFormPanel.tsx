"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { cn } from "@/lib/cn";
import { ContactForm } from "./ContactForm";
import { RECAPTCHA_SITE_KEY, THANK_YOU_PATH } from "@/constants/forms";

type ContactFormPanelProps = {
  className?: string;
};

async function getRecaptchaToken(): Promise<string | undefined> {
  if (!RECAPTCHA_SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
    return undefined;
  }
  try {
    await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve));
    return await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, {
      action: "contact",
    });
  } catch {
    return undefined;
  }
}

/**
 * Standalone contact form panel — submits via `/api/forms/contact` so Web3Forms
 * credentials never ship in the browser bundle.
 */
export function ContactFormPanel({ className }: ContactFormPanelProps) {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, string>) => {
    const token = await getRecaptchaToken();

    const response = await fetch("/api/forms/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        recaptchaToken: token,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Submission failed");
    }

    router.push(THANK_YOU_PATH);
    await new Promise<never>(() => {});
  };

  return (
    <div className={cn("bg-white/[0.03] p-8 lg:p-10", className)}>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}
