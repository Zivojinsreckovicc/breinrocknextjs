import { NextResponse } from "next/server";
import { submitToWeb3Forms, verifyRecaptcha } from "@/lib/server/forms";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  companyWebsite?: string;
  interest?: string;
  message?: string;
  marketing?: string;
  recaptchaToken?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function formError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return formError("Invalid request body", 400);
  }

  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.message)
  ) {
    return formError("Please fill in all required fields", 400);
  }

  try {
    if (!(await verifyRecaptcha(body.recaptchaToken, "contact"))) {
      return formError("Verification failed. Please try again.", 400);
    }

    const result = await submitToWeb3Forms({
      subject: `New contact enquiry${body.interest ? ` — ${body.interest}` : ""}`,
      from_name: "Breinrock Website",
      name: `${body.firstName} ${body.lastName}`.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      company: body.companyName?.trim(),
      website: body.companyWebsite?.trim(),
      interest: body.interest?.trim(),
      message: body.message.trim(),
      marketing_opt_in: body.marketing === "on" ? "Yes" : "No",
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
