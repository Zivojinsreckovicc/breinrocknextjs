import { NextResponse } from "next/server";
import {
  postMakeWebhook,
  submitToWeb3Forms,
  usesMakeWebhook,
  usesWelcomeWebhook,
  verifyRecaptcha,
} from "@/lib/server/forms";

type DemoPayload = {
  pageSlug?: string;
  name?: string;
  email?: string;
  industry?: string;
  company_size?: string;
  phone?: string;
  refParam?: string | null;
  recaptchaToken?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function formError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: Request) {
  let body: DemoPayload;

  try {
    body = (await request.json()) as DemoPayload;
  } catch {
    return formError("Invalid request body", 400);
  }

  const pageSlug = body.pageSlug?.trim();
  if (
    !pageSlug ||
    !isNonEmptyString(body.name) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.industry) ||
    !isNonEmptyString(body.company_size) ||
    !isNonEmptyString(body.phone)
  ) {
    return formError("Please fill in all required fields", 400);
  }

  try {
    if (!(await verifyRecaptcha(body.recaptchaToken, "demo_request"))) {
      return formError("Verification failed. Please try again.", 400);
    }

    if (usesMakeWebhook(pageSlug)) {
      if (usesWelcomeWebhook(pageSlug)) {
        await postMakeWebhook("welcome", {
          name: body.name.trim(),
          email: body.email.trim(),
          ref: body.refParam?.trim() ?? "",
        });
      } else {
        await postMakeWebhook("demo", {
          name: body.name.trim(),
          email: body.email.trim(),
          page: `${pageSlug}.html`,
        });
      }
    }

    const result = await submitToWeb3Forms({
      subject: "New Demo Request",
      from_name: "Breinrock Website",
      name: body.name.trim(),
      email: body.email.trim(),
      industry: body.industry.trim(),
      company_size: body.company_size.trim(),
      phone: body.phone.trim(),
      page: pageSlug,
      "g-recaptcha-response": body.recaptchaToken,
    });

    if (!result.success) {
      return formError(result.message || "Submission failed", 502);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Missing required environment variable")) {
      return formError("Form service is not configured", 503);
    }
    return formError("Submission failed", 500);
  }
}
