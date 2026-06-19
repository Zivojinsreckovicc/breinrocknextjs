import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export type ProcessStep = {
  title: string;
  description: string;
};

type ProcessStepsProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  steps: ProcessStep[];
  tone?: "frame" | "raised";
};

/**
 * Numbered "how it works" steps with a connecting line on desktop. Reusable
 * across product/marketing pages.
 */
export function ProcessSteps({
  eyebrow,
  title,
  subtitle,
  steps,
  tone = "raised",
}: ProcessStepsProps) {
  const badgeBg = tone === "raised" ? "bg-midnight-raised" : "bg-midnight-frame";

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

        <div className="relative mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-action-blue/0 via-action-blue/40 to-action-blue/0 sm:block"
          />
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 100}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span
                className={`relative z-10 flex size-14 items-center justify-center rounded-full border border-action-blue/30 text-lg font-bold text-action-blue ${badgeBg}`}
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-arctic-white">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-steel-neutral/70 sm:max-w-none">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
