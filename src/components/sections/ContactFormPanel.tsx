"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { cn } from "@/lib/cn";
import { ContactForm } from "./ContactForm";
import { submitToWeb3Forms } from "@/lib/web3forms";
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
 * Standalone contact form panel — submits directly to Web3Forms from the
 * browser (the free plan only accepts client-side submissions).
 */
export function ContactFormPanel({ className }: ContactFormPanelProps) {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, string>) => {
    const token = await getRecaptchaToken();

    await submitToWeb3Forms({
      subject: `New contact enquiry${data.interest ? ` — ${data.interest}` : ""}`,
      from_name: "Breinrock Website",
      name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim(),
      company: data.companyName?.trim(),
      website: data.companyWebsite?.trim(),
      interest: data.interest?.trim(),
      message: data.message?.trim(),
      marketing_opt_in: data.marketing === "on" ? "Yes" : "No",
      "g-recaptcha-response": token,
    });

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
