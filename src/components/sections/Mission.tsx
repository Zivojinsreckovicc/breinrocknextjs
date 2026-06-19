import { Reveal } from "@/components/ui/Reveal";
import { trustIndicators as defaultIndicators } from "@/data/home";
import type { TrustIndicator } from "@/data/home";
import {
  MedalIcon,
  ShieldCheckIcon,
  SparkIcon,
  UsersIcon,
} from "./icons";

const iconMap = {
  innovation: SparkIcon,
  client: UsersIcon,
  experience: MedalIcon,
  commitment: ShieldCheckIcon,
} as const;

type MissionProps = {
  indicators?: TrustIndicator[];
};

/**
 * Centred mission statement: eyebrow, the headline mission statement, a
 * supporting paragraph, and the brand's four trust indicators rendered as
 * a row of pills.
 */
export function Mission({ indicators = defaultIndicators }: MissionProps) {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-8">
        <Reveal className="flex flex-col items-center">
          <span className="font-eyebrow text-sm font-semibold uppercase tracking-[0.25em] text-action-blue">
            Our Mission
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            To deliver a unified neo-banking platform offering efficient and
            secure financial payment solutions.
          </h2>

          <span
            className="mt-8 block h-1 w-12 rounded-full bg-action-blue"
            aria-hidden="true"
          />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-neutral/70 sm:text-lg">
            At Breinrock, we go beyond offering fintech payment solutions. We
            tailor financial journeys to your needs, with a focus on both
            personal and corporate accounts — powered by local rails and real
            human support across six global offices.
          </p>
        </Reveal>

        <Reveal
          delay={150}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {indicators.map((indicator) => {
            const Icon = iconMap[indicator.icon];
            return (
              <span
                key={indicator.label}
                className="inline-flex items-center gap-2 rounded-full border border-arctic-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-steel-neutral backdrop-blur-sm transition-colors duration-300 hover:border-action-blue/40 hover:text-arctic-white"
              >
                <Icon className="size-4 text-action-blue" />
                {indicator.label}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
