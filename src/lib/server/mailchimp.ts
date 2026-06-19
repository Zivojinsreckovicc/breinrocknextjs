import "server-only";
import type { MailchimpConfig } from "@/types/mailchimp";
import { getOptionalServerEnv, getRequiredServerEnv } from "./env";

export type { MailchimpConfig };

/** Returns Mailchimp embedded-form config when env vars are set. */
export function getMailchimpConfig(): MailchimpConfig | null {
  const action = getOptionalServerEnv("MAILCHIMP_ACTION");
  if (!action) return null;

  return {
    action,
    tags: getRequiredServerEnv("MAILCHIMP_TAGS"),
    gdprField: getRequiredServerEnv("MAILCHIMP_GDPR_FIELD"),
    honeypot: getRequiredServerEnv("MAILCHIMP_HONEYPOT"),
  };
}
