import Link from "next/link";
import { cn } from "@/lib/cn";
import { ContactFormPanel } from "./ContactFormPanel";
import { MailIcon, MapPinIcon, ClockIcon } from "./icons";

type ContactSectionProps = {
  className?: string;
};

/**
 * Reusable contact block: a two-panel card with brand info on the left and the
 * reusable <ContactForm> on the right. Used on the Contact and About pages.
 */
export function ContactSection({ className }: ContactSectionProps) {
  return (
    <section className={cn("bg-midnight-frame py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-arctic-white/10 shadow-2xl shadow-black/30 lg:grid-cols-5">
          {/* Left: info panel */}
          <div className="relative flex flex-col gap-8 bg-gradient-to-br from-breinrock-blue to-midnight-frame p-8 lg:col-span-2 lg:p-10">
            <div>
              <span className="font-eyebrow text-sm uppercase tracking-[0.2em] text-action-blue">
                Get in touch
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-arctic-white sm:text-4xl">
                Let&rsquo;s start a <span className="text-action-blue">conversation</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-steel-neutral/80">
                Tell us about your business and what you&rsquo;re looking for. Our
                team will get back to you within one business day.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-action-blue/15 text-action-blue">
                  <MailIcon className="size-5" />
                </span>
                <a
                  href="mailto:welcome@breinrock.com"
                  className="text-sm text-arctic-white transition-colors hover:text-action-blue"
                >
                  welcome@breinrock.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-action-blue/15 text-action-blue">
                  <MapPinIcon className="size-5" />
                </span>
                <span className="text-sm leading-snug text-steel-neutral/80">
                  Toronto · London · Prague
                  <br />
                  Limassol · Dubai · Zug
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-action-blue/15 text-action-blue">
                  <ClockIcon className="size-5" />
                </span>
                <span className="text-sm text-steel-neutral/80">
                  Response within 1 business day
                </span>
              </li>
            </ul>

            <p className="mt-auto text-xs text-steel-neutral/50">
              By submitting, you agree to our{" "}
              <Link href="/policies" className="text-action-blue hover:text-arctic-white">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Right: form panel */}
          <ContactFormPanel className="lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}
