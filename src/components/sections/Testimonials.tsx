import { SectionHeading } from "./SectionHeading";
import { testimonials as defaultTestimonials } from "@/data/home";
import type { Testimonial } from "@/data/home";

type TestimonialsProps = {
  heading?: string;
  items?: Testimonial[];
};

function TestimonialCard({ item, hidden }: { item: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="flex w-[20rem] shrink-0 flex-col justify-between rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:w-[24rem]"
    >
      <span aria-hidden="true" className="font-eyebrow text-5xl leading-none text-action-blue/60">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-base leading-relaxed text-steel-neutral/90">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-action-blue/15 text-sm font-bold text-action-blue">
          {item.initial}
        </span>
        <span className="text-sm font-semibold text-arctic-white">{item.name}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Auto-scrolling marquee of client testimonials. Pauses on hover and stops
 * under reduced-motion (the full set stays readable either way).
 */
export function Testimonials({
  heading = "Trusted by Clients Worldwide",
  items = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={heading} />
      </div>

      <div className="marquee-track marquee-mask group mt-14 overflow-hidden">
        <div className="animate-marquee flex w-max gap-6 px-3" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {[...items, ...items].map((item, index) => (
            <TestimonialCard
              key={`${item.name}-${index}`}
              item={item}
              hidden={index >= items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
