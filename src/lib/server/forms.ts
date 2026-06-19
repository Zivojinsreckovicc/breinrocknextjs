import "server-only";
import { getOptionalServerEnv, getRequiredServerEnv } from "./env";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function usesWelcomeWebhook(pageSlug: string): boolean {
  return pageSlug === "welcome";
}

export function usesMakeWebhook(pageSlug: string): boolean {
  return pageSlug !== "landing";
}

export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction?: string
): Promise<boolean> {
  const secret = getOptionalServerEnv("RECAPTCHA_SECRET_KEY");
  if (!secret) return true;

  if (!token) return false;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  if (!result.success) return false;
  if (expectedAction && result.action && result.action !== expectedAction) return false;
  if (typeof result.score === "number" && result.score < 0.5) return false;

  return true;
}

export async function submitToWeb3Forms(
  payload: Record<string, unknown>
): Promise<{ success: boolean; message?: string }> {
  const accessKey =
    getOptionalServerEnv("WEB3FORMS_ACCESS_KEY") ??
    getOptionalServerEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY");

  if (!accessKey) {
    throw new Error("Missing required environment variable: WEB3FORMS_ACCESS_KEY");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      botcheck: "",
      ...payload,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!response.ok || !result.success) {
    return {
      success: false,
      message: result.message || "Submission failed",
    };
  }

  return { success: true };
}

export async function postMakeWebhook(
  type: "demo" | "welcome",
  body: Record<string, string>
): Promise<void> {
  const url = getRequiredServerEnv(
    type === "welcome" ? "MAKE_WELCOME_WEBHOOK" : "MAKE_DEMO_WEBHOOK"
  );

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    // Best-effort — Web3Forms still receives the lead if Make fails.
  }
}
