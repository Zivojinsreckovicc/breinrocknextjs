import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/layout/icons";
import { formatDate } from "@/lib/format";
import { getPoliciesByCountry } from "@/sanity/fetch";
import { policyCountries, getCountry } from "@/data/policy-countries";

type PageProps = {
  params: Promise<{ country: string }>;
};

export function generateStaticParams() {
  return policyCountries.map((country) => ({ country: country.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = getCountry(countrySlug);
  if (!country) return { title: "Policies not found — Breinrock" };
  return {
    title: `${country.name} Policies — Breinrock`,
    description: `Legal and regulatory policies for Breinrock in ${country.name}.`,
    alternates: { canonical: `/policies/${country.slug}` },
  };
}

export default async function CountryPoliciesPage({ params }: PageProps) {
  const { country: countrySlug } = await params;
  const country = getCountry(countrySlug);
  if (!country) notFound();

  const policies = await getPoliciesByCountry(country.slug);

  return (
    <main className="bg-midnight-frame">
      <section className="relative isolate overflow-hidden pt-36 pb-24 lg:pt-40 lg:pb-32">
        <div
          className="bg-grid animate-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-steel-neutral/70 transition-colors hover:text-action-blue"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
            All jurisdictions
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <Image
              src={country.flag}
              alt={country.name}
              width={56}
              height={40}
              className="h-10 w-14 rounded-sm object-cover"
            />
            <h1 className="text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl">
              {country.name}
            </h1>
          </div>
          <p className="mt-4 text-lg text-steel-neutral/80">
            Legal and regulatory policies for Breinrock in {country.name}.
          </p>

          {policies.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-8">
              <p className="text-steel-neutral/80">
                For policy information specific to {country.name}, please get in
                touch and our team will assist you.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Contact us
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="mt-12 flex flex-col gap-4">
              {policies.map((policy, index) => (
                <Reveal key={policy._id} delay={index * 60}>
                  <Link
                    href={`/policies/${country.slug}/${policy.slug}`}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-arctic-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]"
                  >
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-arctic-white transition-colors group-hover:text-action-blue">
                        {policy.title}
                      </h2>
                      {policy.summary && (
                        <p className="mt-1 text-sm text-steel-neutral/70">{policy.summary}</p>
                      )}
                      {policy.effectiveDate && (
                        <p className="mt-2 text-xs text-steel-neutral/50">
                          Last updated {formatDate(policy.effectiveDate)}
                        </p>
                      )}
                    </div>
                    <ArrowRightIcon className="size-5 shrink-0 text-action-blue transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
