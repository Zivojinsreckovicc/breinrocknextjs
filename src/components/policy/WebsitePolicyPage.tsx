import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { formatDate } from "@/lib/format";
import { getWebsitePolicy } from "@/sanity/fetch";

/**
 * Shared renderer + metadata for the company-wide legal pages served at the
 * site root (Cookie Policy, Privacy Policy, Terms of Use, Legal). Each root
 * route is a thin wrapper that passes its fixed slug. Content comes from the
 * `websitePolicy` documents in Sanity ("Website Policies").
 */

export async function buildWebsitePolicyMetadata(slug: string): Promise<Metadata> {
  const policy = await getWebsitePolicy(slug);
  if (!policy) return { title: "Page not found — Breinrock" };

  const title = policy.seo?.metaTitle ?? policy.title;
  return {
    title: `${title} — Breinrock`,
    description:
      policy.seo?.metaDescription ?? policy.summary ?? `${policy.title} for Breinrock.`,
    alternates: { canonical: `/${policy.slug}` },
    robots: policy.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export async function WebsitePolicyPage({ slug }: { slug: string }) {
  const policy = await getWebsitePolicy(slug);
  if (!policy) notFound();

  return (
    <main className="bg-midnight-frame">
      <article className="pt-36 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-action-blue">
            Legal
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
