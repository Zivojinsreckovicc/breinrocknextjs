import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { JobOpenings } from "@/components/sections/JobOpenings";
import { ContactSection } from "@/components/sections/ContactSection";
import { getJobs } from "@/sanity/fetch";

export const metadata = buildMetadata({
  title: "Careers - Breinrock | Join Our Global Fintech Team",
  description:
    "Explore careers at Breinrock. Browse our open positions and apply to help build the future of global payments and banking across our offices worldwide.",
  keywords:
    "breinrock careers, fintech jobs, python support engineer, banking jobs, global payments careers, work at breinrock, job openings",
  path: "/careers",
  ogDescription:
    "Browse open positions at Breinrock and apply to help build the future of global payments and banking.",
  twitterDescription:
    "Browse open positions at Breinrock and apply to join our team.",
});

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="bg-midnight-frame">
      {/* Header */}
      <PageHero>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Build the future of global finance
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          We&rsquo;re a global fintech team powering payments and banking across
          110+ countries. Join us and help millions of people and businesses
          move money without borders.
        </p>
      </PageHero>

      {/* Open positions */}
      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Open positions"
              title="Find your role"
              subtitle="Browse our current openings below. Click a role to learn more, then apply in a couple of clicks."
            />
          </Reveal>
          <div className="mt-12 lg:mt-16">
            <JobOpenings jobs={jobs} />
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
