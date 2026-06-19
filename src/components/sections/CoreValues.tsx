import { Reveal } from "@/components/ui/Reveal";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { coreValues as defaultValues } from "@/data/home";
import type { CoreValue } from "@/data/home";
import { MedalIcon, ShieldCheckIcon, SparkIcon, UsersIcon } from "./icons";

const iconMap = {
  innovation: SparkIcon,
  client: UsersIcon,
  experience: MedalIcon,
  commitment: ShieldCheckIcon,
} as const;

type CoreValuesProps = {
  values?: CoreValue[];
};

/**
 * "Trust Our Experience" — the brand's core values rendered as a row of
 * cards, each with an icon, label, and short description.
 */
export function CoreValues({ values = defaultValues }: CoreValuesProps) {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-eyebrow text-sm font-semibold uppercase tracking-[0.25em] text-action-blue">
              Our Values
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Trust Our Experience
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <Reveal key={value.label} delay={index * 80} className="h-full">
                <div className="group relative flex h-full flex-col items-center gap-4 rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]">
                  <PointerGlow />
                  <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-xl bg-action-blue/15 text-action-blue ring-1 ring-action-blue/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative z-10 text-lg font-semibold text-arctic-white">
                    {value.label}
                  </h3>
                  <p className="relative z-10 text-sm leading-relaxed text-steel-neutral/70">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
