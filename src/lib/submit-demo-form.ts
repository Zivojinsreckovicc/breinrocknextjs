import { pushDemoConversion } from "@/lib/landing-tracking";
import { submitToWeb3Forms } from "@/lib/web3forms";

export type DemoFormValues = {
  name: string;
  email: string;
  industry: string;
  company_size: string;
  phone: string;
  consent: boolean;
};

type SubmitDemoFormOptions = {
  pageSlug: string;
  values: DemoFormValues;
  recaptchaToken?: string;
  refParam?: string | null;
};

async function getRecaptchaToken(): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
    return undefined;
  }
  try {
    await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve));
    return await window.grecaptcha!.execute(siteKey, { action: "demo_request" });
  } catch {
    return undefined;
  }
}

/**
 * Demo popup submit. Email delivery goes to Web3Forms directly from the browser
 * (the free plan only accepts client-side submissions). The referral parameter
 * is included so lead source is preserved in the email.
 */
export async function submitDemoForm({
  pageSlug,
  values,
  recaptchaToken,
  refParam,
}: SubmitDemoFormOptions): Promise<void> {
  const token = recaptchaToken ?? (await getRecaptchaToken());

  await submitToWeb3Forms({
    subject: "New Demo Request",
    from_name: "Breinrock Website",
    name: values.name,
    email: values.email,
    industry: values.industry,
    company_size: values.company_size,
    phone: values.phone,
    page: pageSlug,
    ref: refParam?.trim() || undefined,
    "g-recaptcha-response": token,
  });

  pushDemoConversion({
    name: values.name,
    email: values.email,
    industry: values.industry,
    company_size: values.company_size,
  });
}
