import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { getMailchimpConfig } from "@/lib/server/mailchimp";
import {
  footerNavLinks,
  footerOffices,
  footerSocialLinks,
} from "./footer-data";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const mailchimp = getMailchimpConfig();

  return (
    <footer className="bg-midnight-frame text-arctic-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Global offices grid */}
        <p className="text-center font-eyebrow text-sm uppercase tracking-[0.2em] text-steel-neutral/60">
          Global Offices &amp; Licenses
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {footerOffices.map((office) => (
            <Link
              key={office.entity}
              href={`/?country=${office.countrySlug}`}
              aria-label={`View ${office.flagAlt} policies`}
              className="group flex flex-col rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-5 transition-colors hover:border-action-blue/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={office.flag}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 shrink-0 rounded-full object-cover"
                  />
                  <p className="font-bold leading-snug text-arctic-white">{office.entity}</p>
                </div>
                {office.hq && (
                  <span className="shrink-0 rounded-md bg-action-blue/15 px-2 py-0.5 text-xs font-semibold text-action-blue">
                    HQ
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-snug text-action-blue">{office.license}</p>
              <address className="mt-2 text-xs not-italic leading-relaxed text-steel-neutral/70">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <span className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-action-blue underline decoration-action-blue/40 underline-offset-4 transition-colors group-hover:decoration-action-blue">
                View {office.flagAlt} policies
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        {mailchimp && (
          <div className="mx-auto mt-16 max-w-xl text-center">
            <h2 className="text-lg font-bold text-arctic-white">Newsletter</h2>
            <p className="mt-2 text-sm text-steel-neutral/80">
              Subscribe to our newsletter to hear about our updates and events.
            </p>
            <NewsletterForm
              mailchimp={mailchimp}
              formId="mc-embedded-subscribe-form"
              emailId="mce-EMAIL"
              submitId="mc-embedded-subscribe"
              className="mt-6"
            />
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-16 border-t border-arctic-white/10 pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6 lg:items-center">
              <Link href="/" aria-label="Breinrock home">
                <Image
                  src="/imgs/logo.webp"
                  alt="Breinrock"
                  width={908}
                  height={220}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-steel-neutral/70">
                &copy; {year} Breinrock. All rights reserved.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="text-steel-neutral/60 transition-colors hover:text-arctic-white"
                >
                  {social.icon ? (
                    <Image src={social.icon} alt="" width={18} height={18} className="size-[18px]" />
                  ) : social.label === "X" ? (
                    <XIcon />
                  ) : (
                    <YouTubeIcon />
                  )}
                </a>
              ))}
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-end"
            >
              {footerNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-steel-neutral/70 transition-colors hover:text-arctic-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
