import { pushDemoConversion } from "@/lib/landing-tracking";

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

/** Demo popup submit — posts to the server Route Handler (Make.com + Web3Forms). */
export async function submitDemoForm({
  pageSlug,
  values,
  recaptchaToken,
  refParam,
}: SubmitDemoFormOptions): Promise<void> {
  const token = recaptchaToken ?? (await getRecaptchaToken());

  const response = await fetch("/api/forms/demo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      pageSlug,
      name: values.name,
      email: values.email,
      industry: values.industry,
      company_size: values.company_size,
      phone: values.phone,
      refParam,
      recaptchaToken: token,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submission failed");
  }

  pushDemoConversion({
    name: values.name,
    email: values.email,
    industry: values.industry,
    company_size: values.company_size,
  });
}
