import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats as defaultStats } from "@/data/home";
import type { Stat } from "@/data/home";

/**
 * Band of animated counters. Reusable — pass `items` to reuse elsewhere.
 */
export function StatsCounters({ items = defaultStats }: { items?: Stat[] }) {
  return (
    <section className="border-y border-arctic-white/10 bg-midnight-frame">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-6 lg:grid-cols-4 lg:px-8">
        {items.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 100}
            className="flex flex-col items-center gap-2 px-4 py-12 text-center lg:py-16"
          >
            <span className="text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
              <CountUp end={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm font-medium uppercase tracking-wide text-steel-neutral/70">
              {stat.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
