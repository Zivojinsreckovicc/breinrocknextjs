import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { Faq } from "@/components/sections/Faq";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import {
  GlobeIcon,
  PercentIcon,
  ClockIcon,
  LayersIcon,
} from "@/components/sections/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { paymentRails, paymentAdvantages, paymentFaqs } from "@/data/payment-network";

export const metadata = buildMetadata({
  title: "Payment Network - Breinrock | Local Payments in UAE, UK, EU, US & Canada",
  description:
    "Send and receive local payments with Breinrock across the UAE, UK, EU, US, and Canada using fast domestic payment rails.",
  keywords:
    "payment network, local payments, domestic payment rails, AED GBP EUR USD CAD transfers, local currency payments, domestic banking, payment infrastructure, cross-border payments, local payment network, faster settlement, cost-effective transfers",
  path: "/products/payment-network",
  ogTitle: "Payment Network - Breinrock | Local Payments in 5 Jurisdictions",
  ogDescription:
    "Send and receive local currency payments within the UAE, UK, EU, US, and Canada. Fast settlement, cost-effective transfers through domestic payment rails.",
  twitterTitle: "Payment Network - Breinrock | Local Payments in 5 Jurisdictions",
  twitterDescription:
    "Send and receive local currency payments within the UAE, UK, EU, US, and Canada. Fast settlement, cost-effective transfers.",
});

const railItems: FeatureGridItem[] = paymentRails.map((rail) => ({
  icon: rail.swift ? (
    <GlobeIcon className="size-6" />
  ) : (
    <span className="text-sm font-bold tracking-tight">{rail.code}</span>
  ),
  title: rail.title,
  description: rail.description,
}));

const advantageIcons = {
  percent: <PercentIcon className="size-6" />,
  clock: <ClockIcon className="size-6" />,
  layers: <LayersIcon className="size-6" />,
} as const;

const advantageItems: FeatureGridItem[] = paymentAdvantages.map((advantage) => ({
  icon: advantageIcons[advantage.icon],
  title: advantage.title,
  description: advantage.description,
}));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: paymentFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function PaymentNetworkPage() {
  return (
    <main className="bg-midnight-frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <PageHero>
        <div className="flex w-full justify-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Payment Network" },
            ]}
          />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Breinrock Payment Network
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Access local payment rails across the UK, EU, US, Canada, and UAE.
          Process domestic payments faster and cheaper than traditional
          cross-border transfers.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={SIGN_UP_URL} variant="primary" size="lg">
            Get started
            <ArrowRightIcon className="size-5" />
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-arctic-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-arctic-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Talk to us
          </Link>
        </div>
      </PageHero>

      {/* Local rails */}
      <FeatureGrid
        eyebrow="Local Rails"
        title="Domestic Processing, Global Reach"
        items={railItems}
      />

      {/* Advantages */}
      <FeatureGrid
        eyebrow="Advantage"
        title="Why Use Local Rails"
        items={advantageItems}
      />

      {/* FAQ */}
      <Faq items={paymentFaqs} />

      {/* Locations + globe */}
      <GlobalPresence />

      <BannerCta />
    </main>
  );
}
