import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { ArrowRightIcon } from "@/components/layout/icons";
import { formatDate } from "@/lib/format";
import { getPolicy, getPolicyParams } from "@/sanity/fetch";
import { getCountry } from "@/data/policy-countries";

type PageProps = {
  params: Promise<{ country: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = await getPolicyParams();
  // Only generate params for known countries.
  return params.filter((p) => Boolean(getCountry(p.country)));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countrySlug, slug } = await params;
  const country = getCountry(countrySlug);
  const policy = country ? await getPolicy(countrySlug, slug) : null;
  if (!country || !policy) return { title: "Policy not found — Breinrock" };

  const title = policy.seo?.metaTitle ?? `${policy.title} (${country.name})`;
  return {
    title: `${title} — Breinrock`,
    description:
      policy.seo?.metaDescription ??
      policy.summary ??
      `${policy.title} for Breinrock in ${country.name}.`,
    alternates: { canonical: `/policies/${country.slug}/${policy.slug}` },
    robots: policy.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function PolicyPage({ params }: PageProps) {
  const { country: countrySlug, slug } = await params;
  const country = getCountry(countrySlug);
  if (!country) notFound();

  const policy = await getPolicy(country.slug, slug);
  if (!policy) notFound();

  return (
    <main className="bg-midnight-frame">
      <article className="pt-36 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href={`/policies/${country.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-steel-neutral/70 transition-colors hover:text-action-blue"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
            {country.name} policies
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-action-blue">
            {country.name}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl">
            {policy.title}
          </h1>
          {policy.effectiveDate && (
            <p className="mt-3 text-sm text-steel-neutral/60">
              Last updated {formatDate(policy.effectiveDate)}
            </p>
          )}

          <div className="mt-10 border-t border-arctic-white/10 pt-8">
            {policy.body && policy.body.length > 0 && <RichText value={policy.body} />}
          </div>
        </div>
      </article>
    </main>
  );
}
