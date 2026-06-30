import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/ui/Button";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import { BriefcaseIcon, MapPinIcon } from "@/components/sections/icons";
import { getJob, getJobSlugs } from "@/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Position not found — Breinrock" };

  const title = job.seo?.metaTitle ?? `${job.title} — Careers`;
  const description = job.seo?.metaDescription ?? job.excerpt;
  const ogImage = job.seo?.ogImageUrl;

  return buildMetadata({
    title: `${title} — Breinrock`,
    description: description || undefined,
    keywords:
      "breinrock careers, fintech jobs, banking jobs, global payments careers, work at breinrock, job openings",
    path: `/careers/${job.slug}`,
    ogType: "article",
    ogTitle: title,
    ogDescription: description || undefined,
    twitterCard: ogImage ? "summary_large_image" : "summary",
    images: ogImage ? [ogImage] : undefined,
    publishedTime: job.date || undefined,
    robots: job.seo?.noIndex ? { index: false, follow: false } : undefined,
  });
}

export default async function JobPostPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <main className="bg-midnight-frame">
      <article className="pt-36 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-steel-neutral/70 transition-colors hover:text-action-blue"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
            Back to careers
          </Link>

          <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-arctic-white sm:text-4xl lg:text-5xl">
            {job.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge icon={<BriefcaseIcon className="size-3.5" />}>
              {job.employmentType}
            </Badge>
            <Badge>{job.department}</Badge>
            <Badge icon={<MapPinIcon className="size-3.5" />}>{job.location}</Badge>
          </div>

          {job.excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-steel-neutral/80">
              {job.excerpt}
            </p>
          )}

          <div className="mt-8 border-y border-arctic-white/10 py-5">
            <Button href={job.applyHref} variant="primary">
              Apply now
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl px-6 lg:px-8">
          {job.body && job.body.length > 0 && <RichText value={job.body} />}
        </div>

        {/* Apply footer */}
        <div className="mx-auto mt-12 max-w-3xl px-6 pb-24 lg:px-8 lg:pb-32">
          <div className="rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-xl font-bold text-arctic-white">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel-neutral/70">
              Send us your application for the {job.title} role and our team will
              be in touch.
            </p>
            <Button href={job.applyHref} variant="primary" className="mt-6">
              Apply now
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </article>

      <BannerCta />
    </main>
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
