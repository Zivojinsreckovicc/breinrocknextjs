import { paymentNetworks as defaultNetworks } from "@/data/home";

type LogoMarqueeProps = {
  heading?: string;
  items?: string[];
};

/**
 * Continuously scrolling row of payment-network names. Text-only by design.
 * The track is duplicated so the CSS marquee loops seamlessly; it pauses on
 * hover and is disabled under reduced-motion.
 */
export function LogoMarquee({
  heading = "Powered by global payment networks",
  items = defaultNetworks,
}: LogoMarqueeProps) {
  return (
    <section className="bg-midnight-frame py-14">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-steel-neutral/60">
        {heading}
      </p>

      <div className="marquee-track marquee-mask group relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...items, ...items].map((name, index) => (
            <span
              key={`${name}-${index}`}
              aria-hidden={index >= items.length}
              className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold tracking-wide text-steel-neutral/80"
            >
              <span className="text-action-blue" aria-hidden="true">
                •
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
