import type { ReactNode, SVGProps } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const APP_STORE_URL = "https://apps.apple.com/ca/app/breinrock/id6587565526";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.breinrock.ebankingmobile";

/** Apple logo glyph (monochrome, currentColor). */
function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.043 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
    </svg>
  );
}

/** Google Play logo glyph (monochrome, currentColor). */
function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54z" />
    </svg>
  );
}

function StoreLink({
  href,
  label,
  icon,
  top,
  bottom,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-3 rounded-xl border border-arctic-white/20 bg-white/5 px-5 py-3 text-arctic-white backdrop-blur-md transition-colors hover:border-action-blue/40 hover:bg-white/10"
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[0.65rem] uppercase tracking-wide text-steel-neutral/70">
          {top}
        </span>
        <span className="text-base font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

/**
 * "Download Our Mobile App" — store links on the left, phone mockup on the
 * right. Store buttons open the App Store / Google Play listings in a new tab.
 */
export function MobileApp() {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left: copy + store links */}
        <Reveal>
          <span className="font-eyebrow text-base italic tracking-wide text-action-blue">
            Mobile App
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Download Our Mobile App
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-neutral/70 sm:text-lg">
            Manage your accounts, move money across borders, and stay in control
            of your finances — anywhere, anytime. The full power of Breinrock, in
            your pocket.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <StoreLink
              href={APP_STORE_URL}
              label="Download Breinrock on the Apple App Store"
              icon={<AppleIcon className="size-7" />}
              top="Download on the"
              bottom="App Store"
            />
            <StoreLink
              href={GOOGLE_PLAY_URL}
              label="Get Breinrock on Google Play"
              icon={<GooglePlayIcon className="size-6" />}
              top="Get it on"
              bottom="Google Play"
            />
          </div>
        </Reveal>

        {/* Right: phone mockup */}
        <Reveal delay={150} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-action-blue/15 blur-3xl"
              aria-hidden="true"
            />
            <Image
              src="/imgs/mobile-app-phone.webp"
              alt="Breinrock mobile app shown on a smartphone"
              width={1024}
              height={1536}
              sizes="(max-width: 1024px) 70vw, 22rem"
              className="h-auto w-full max-w-[22rem] drop-shadow-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
