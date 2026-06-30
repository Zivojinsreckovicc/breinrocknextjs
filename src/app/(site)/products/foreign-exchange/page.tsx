import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FxConverter } from "@/components/sections/FxConverter";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import {
  ExchangeIcon,
  ClockIcon,
  PercentIcon,
  BoltIcon,
  GlobeIcon,
  LayersIcon,
} from "@/components/sections/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { fxCapabilities, fxSteps } from "@/data/fx";

export const metadata = buildMetadata({
  title: "Foreign Exchange - Breinrock | Multi-Currency FX Services for Global Business",
  description:
    "Exchange currencies with Breinrock. Send and receive 40+ SWIFT and 60+ local payout currencies worldwide.",
  keywords:
    "foreign exchange, currency exchange, FX services, multi-currency accounts, SWIFT payments, international currency conversion, USD EUR GBP CAD exchange, global FX trading, corporate foreign exchange, international payments",
  path: "/products/foreign-exchange",
  ogTitle: "Foreign Exchange - Breinrock | Multi-Currency FX Services",
  ogDescription:
    "Exchange currencies directly within your Breinrock account. Support for 40+ SWIFT currencies, 60+ local payout currencies across 5 jurisdictions.",
  twitterDescription:
    "Exchange currencies directly within your Breinrock account. Support for 40+ SWIFT currencies, 60+ local payout currencies.",
});

const capabilityIcons = {
  exchange: <ExchangeIcon className="size-6" />,
  clock: <ClockIcon className="size-6" />,
  percent: <PercentIcon className="size-6" />,
  bolt: <BoltIcon className="size-6" />,
  globe: <GlobeIcon className="size-6" />,
  layers: <LayersIcon className="size-6" />,
} as const;

const capabilityItems: FeatureGridItem[] = fxCapabilities.map((capability) => ({
  icon: capabilityIcons[capability.icon],
  title: capability.title,
  description: capability.description,
}));

export default function ForeignExchangePage() {
  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-midnight-frame pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div
          className="bg-liquid animate-liquid absolute inset-0 -z-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-midnight-frame"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
          <div className="animate-rise">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Foreign Exchange" },
              ]}
            />
            <h1 className="mt-8 text-4xl font-bold leading-[1.07] tracking-tight text-arctic-white sm:text-5xl">
              Foreign Exchange Built for{" "}
              <span className="text-shimmer bg-gradient-to-r from-action-blue via-steel-neutral to-action-blue bg-clip-text text-transparent">
                Global Business
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-neutral/80">
              Exchange currencies directly within your Breinrock account. Convert
              between USD, EUR, GBP, and CAD instantly, with access to 40+
              SWIFT currencies and 60+ local payout currencies.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
          </div>

          {/* Interactive converter */}
          <div className="flex justify-center lg:justify-end">
            <FxConverter />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <FeatureGrid
        eyebrow="Capabilities"
        title="Exchange on Your Terms"
        items={capabilityItems}
      />

      {/* How it works */}
      <ProcessSteps eyebrow="How It Works" title="Three Simple Steps" steps={fxSteps} tone="frame" />

      <BannerCta />
    </main>
  );
}
