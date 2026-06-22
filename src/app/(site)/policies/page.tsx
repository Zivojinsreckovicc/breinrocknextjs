import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/layout/icons";
import { policyCountries } from "@/data/policy-countries";

export const metadata: Metadata = {
  title: "Legal & Policies — Breinrock",
  description:
    "Breinrock legal and regulatory policies by jurisdiction — Switzerland, UAE, Cyprus, Czech Republic, United Kingdom, and Canada.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesHubPage() {
  return (
    <main className="bg-midnight-frame">
      <section className="relative isolate overflow-hidden pt-36 pb-24 lg:pt-40 lg:pb-32">
        <div
          className="bg-grid animate-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl">
            Policies by jurisdiction
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
            Breinrock operates through regulated entities across six
            jurisdictions. Select a country to view its policies.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {policyCountries.map((country, index) => (
              <Reveal key={country.slug} delay={(index % 3) * 80} className="h-full">
                <Link
                  href={`/policies/${country.slug}`}
                  className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-blue/40 hover:bg-white/[0.05]"
                >
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={48}
                    height={34}
                    className="h-9 w-12 shrink-0 rounded-sm object-cover"
                  />
                  <span className="flex-1 text-lg font-bold text-arctic-white">
                    {country.name}
                  </span>
                  <ArrowRightIcon className="size-5 text-action-blue transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
