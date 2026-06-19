"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronDownIcon, ArrowRightIcon } from "@/components/layout/icons";
import { BriefcaseIcon, CodeIcon, MapPinIcon } from "./icons";
import { jobOpenings as defaultJobs } from "@/data/careers";
import type { JobOpening } from "@/data/careers";

type JobOpeningsProps = {
  jobs?: JobOpening[];
};

/**
 * Expandable list of open roles. Each card toggles ("Learn more") to reveal the
 * full description and an "Apply Now" action — no standalone job page.
 */
export function JobOpenings({ jobs = defaultJobs }: JobOpeningsProps) {
  const [open, setOpen] = useState<string | null>(jobs[0]?.id ?? null);

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-10 text-center">
        <p className="text-steel-neutral/80">
          No open positions right now — but we&rsquo;re always glad to meet great
          people.
        </p>
        <a
          href="mailto:welcome@breinrock.com?subject=Speculative%20application"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors hover:text-arctic-white"
        >
          Send us your CV
          <ArrowRightIcon className="size-4" />
        </a>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {jobs.map((job, index) => {
        const isOpen = open === job.id;
        const panelId = `job-panel-${job.id}`;
        return (
          <Reveal key={job.id} delay={index * 60}>
            <li
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors duration-300",
                isOpen
                  ? "border-action-blue/40 bg-white/[0.05]"
                  : "border-arctic-white/10 bg-white/[0.02] hover:border-arctic-white/20"
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : job.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-arctic-white">
                      {job.title}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      <Badge icon={<BriefcaseIcon className="size-3.5" />}>{job.type}</Badge>
                      <Badge icon={<CodeIcon className="size-3.5" />}>{job.department}</Badge>
                      <Badge icon={<MapPinIcon className="size-3.5" />}>{job.location}</Badge>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue">
                    {isOpen ? "Show less" : "Learn more"}
                    <ChevronDownIcon
                      className={cn("size-5 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-arctic-white/10 px-6 py-6">
                    <p className="max-w-2xl text-sm leading-relaxed text-steel-neutral/80">
                      {job.description}
                    </p>
                    <Button href={job.applyHref} variant="primary" className="mt-6">
                      Apply now
                      <ArrowRightIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-arctic-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-steel-neutral/80">
      <span className="text-action-blue">{icon}</span>
      {children}
    </span>
  );
}
