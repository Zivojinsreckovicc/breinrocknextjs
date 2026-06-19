import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { MailchimpConfig } from "@/types/mailchimp";

type NewsletterFormProps = {
  mailchimp: MailchimpConfig;
  /** Mailchimp form id, e.g. "mc-embedded-subscribe-form". */
  formId: string;
  /** Email input id, e.g. "mce-EMAIL". */
  emailId: string;
  /** Submit button id, e.g. "mc-embedded-subscribe". */
  submitId: string;
  submitLabel?: string;
  className?: string;
};

/**
 * Mailchimp embedded newsletter form. A standard HTML form that POSTs directly
 * to Mailchimp (no backend / no AJAX) — Mailchimp shows its own confirmation
 * page. Config is injected from server env vars so list IDs are not in source.
 */
export function NewsletterForm({
  mailchimp,
  formId,
  emailId,
  submitId,
  submitLabel = "Subscribe",
  className,
}: NewsletterFormProps) {
  const gdprId = `${emailId}-gdpr`;

  return (
    <form
      action={mailchimp.action}
      method="post"
      id={formId}
      name={formId}
      target="_self"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor={emailId}>
          Email
        </label>
        <input
          type="email"
          name="EMAIL"
          id={emailId}
          required
          placeholder="Email"
          autoComplete="email"
          className="w-full flex-1 rounded-md border border-arctic-white/20 bg-white/[0.03] px-4 py-3 text-sm text-arctic-white placeholder:text-steel-neutral/60 focus:border-action-blue focus:outline-none"
        />
        <Button
          type="submit"
          name="subscribe"
          id={submitId}
          variant="primary"
          className="shrink-0 uppercase tracking-wide"
        >
          {submitLabel}
        </Button>
      </div>

      <label
        htmlFor={gdprId}
        className="flex items-start gap-2.5 text-left text-xs leading-relaxed text-steel-neutral/70"
      >
        <input
          type="checkbox"
          name={mailchimp.gdprField}
          id={gdprId}
          value="Y"
          className="mt-0.5 size-4 shrink-0 rounded border-arctic-white/30 bg-midnight-frame accent-action-blue"
        />
        <span>
          <span className="font-semibold text-arctic-white">Email</span> — I agree
          to receive marketing emails from Breinrock. You can unsubscribe at any
          time using the link in our emails.
        </span>
      </label>

      <input type="hidden" name="tags" value={mailchimp.tags} />

      <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
        <input
          type="text"
          name={mailchimp.honeypot}
          tabIndex={-1}
          defaultValue=""
          autoComplete="off"
        />
      </div>
    </form>
  );
}
