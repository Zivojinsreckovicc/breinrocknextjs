import { WEB3FORMS_ACCESS_KEY } from "@/constants/forms";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Submit a payload to Web3Forms directly from the browser. Web3Forms access
 * keys are public, and the free plan only accepts client-side submissions
 * (server IPs are rejected), so forms post straight from the client.
 * Throws with a user-facing message on failure.
 */
export async function submitToWeb3Forms(
  payload: Record<string, unknown>
): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error("Form service is not configured");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      botcheck: "",
      ...payload,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submission failed");
  }
}
