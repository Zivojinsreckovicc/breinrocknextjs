import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { ArrowRightIcon } from "@/components/layout/icons";
import { SectionHeading } from "./SectionHeading";

export type FeatureGridItem = {
  id?: string;
  icon: ReactNode;
  title: ReactNode;
  description: string;
  /** Optional inline link rendered under the description. */
  href?: string;
  linkLabel?: string;
};

type FeatureGridProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  items: FeatureGridItem[];
  /** Background tone for alternating sections. */
  tone?: "frame" | "raised";
  /** Max columns at desktop. 2 renders a centered, narrower grid. */
  columns?: 2 | 3;
};

/**
 * Generic icon + title + description grid. Reusable across product and
 * marketing pages — the caller supplies the icons and copy.
 */
export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  tone = "frame",
  columns = 3,
}: FeatureGridProps) {
  const gridClass =
    columns === 2
      ? "mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2"
      : "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section
      className={
        tone === "raised"
          ? "bg-midnight-raised py-24 lg:py-32"
          : "bg-midnight-frame py-24 lg:py-32"
      }
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </Reveal>

        <div className={gridClass}>
          {items.map((item, index) => (
            <Reveal
              key={item.id ?? (typeof item.title === "string" ? item.title : index)}
              delay={index * 80}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]">
                <PointerGlow />
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-action-blue/15 text-action-blue transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </span>
                <h3 className="mt-5 text-lg font-bold text-arctic-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-neutral/70">
                  {item.description}
                </p>
                {item.href && item.linkLabel && (
                  <Link
                    href={item.href}
                    className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors hover:text-arctic-white"
                  >
                    {item.linkLabel}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
