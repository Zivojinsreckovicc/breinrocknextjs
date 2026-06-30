import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/layout/icons";
import { BriefcaseIcon, MapPinIcon } from "./icons";
import type { JobCard } from "@/types/job";

type JobOpeningsProps = {
  jobs: JobCard[];
};

/**
 * List of open roles. Each card links through to its standalone page
 * (/careers/<slug>) where candidates read the full description and apply.
 */
export function JobOpenings({ jobs }: JobOpeningsProps) {
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
      {jobs.map((job, index) => (
        <Reveal key={job._id} delay={index * 60}>
          <li className="rounded-2xl border border-arctic-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]">
            <Link
              href={`/careers/${job.slug}`}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex-1">
                <span className="block text-lg font-bold text-arctic-white">
                  {job.title}
                </span>
                <span className="mt-3 flex flex-wrap gap-2">
                  <Badge icon={<BriefcaseIcon className="size-3.5" />}>
                    {job.employmentType}
                  </Badge>
                  <Badge>{job.department}</Badge>
                  <Badge icon={<MapPinIcon className="size-3.5" />}>{job.location}</Badge>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue">
                Learn more
                <ArrowRightIcon className="size-4" />
              </span>
            </Link>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

function Badge({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-arctic-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-steel-neutral/80">
      {icon && <span className="text-action-blue">{icon}</span>}
      {children}
    </span>
  );
}
