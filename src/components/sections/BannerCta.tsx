import { Reveal } from "@/components/ui/Reveal";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { SIGN_UP_URL } from "@/constants/links";
import { BannerCtaActions } from "./BannerCtaActions";

type BannerCtaProps = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Opens the demo popup instead of linking out (landing pages). */
  useDemoPopup?: boolean;
};

/**
 * Conversion banner. Reusable across pages — defaults to the sign-up CTA.
 */
export function BannerCta({
  title = "Ready to get started?",
  subtitle = "Join thousands of businesses and individuals who trust Breinrock for their global payment needs.",
  primaryHref = SIGN_UP_URL,
  primaryLabel = "Get started",
  secondaryHref = "/contact",
  secondaryLabel = "Talk to us",
  useDemoPopup = false,
}: BannerCtaProps) {
  return (
    <section className="bg-midnight-frame px-6 pb-24 lg:px-8 lg:pb-32">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl border border-arctic-white/10 bg-gradient-to-br from-breinrock-blue via-midnight-raised to-midnight-frame px-8 py-16 text-center sm:px-16 sm:py-20">
          <PointerGlow mode="always" className="[--glow-size:520px]" />
          {/* Animated grid texture */}
          <div
            className="bg-grid animate-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            aria-hidden="true"
          />
          {/* Ambient glow */}
          <div
            className="animate-blob absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-action-blue/25 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-action-blue/10 blur-[110px]"
            aria-hidden="true"
          />

          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-steel-neutral/80">
            {subtitle}
          </p>

          <BannerCtaActions
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            secondaryHref={secondaryHref}
            secondaryLabel={secondaryLabel}
            useDemoPopup={useDemoPopup}
          />
        </div>
      </Reveal>
    </section>
  );
}
