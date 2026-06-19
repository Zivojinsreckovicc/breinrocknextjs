import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PointerGlow } from "@/components/ui/PointerGlow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { BannerCta } from "@/components/sections/BannerCta";
import { BaasHeroScene } from "@/components/sections/BaasHeroScene";
import { ArrowRightIcon } from "@/components/layout/icons";
import {
  PaletteIcon,
  CodeIcon,
  SlidersIcon,
  BadgeIcon,
  ShieldCheckIcon,
  BoltIcon,
  BuildingIcon,
  UsersIcon,
  ExchangeIcon,
  CoinsIcon,
  SendIcon,
  CreditCardIcon,
} from "@/components/sections/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { platformFeatures, baasServices } from "@/data/baas";

export const metadata = buildMetadata({
  title: "Banking as a Service (BaaS) - Breinrock | White-Label Banking Solutions",
  description:
    "Breinrock BaaS solutions provide APIs for accounts, payments, FX, and prepaid cards without requiring a full banking license.",
  keywords:
    "banking as a service, BaaS, white-label banking, banking API, embedded banking, fintech infrastructure, banking platform, turnkey banking solutions, API banking, digital banking platform, banking software, financial services API",
  path: "/products/banking-as-a-service",
  ogTitle: "Banking as a Service (BaaS) - Breinrock | White-Label Banking",
  ogDescription:
    "Offer comprehensive banking services to your customers without being a fully-licensed bank. Turnkey solutions and API integration available.",
});

const platformIcons = {
  palette: <PaletteIcon className="size-6" />,
  code: <CodeIcon className="size-6" />,
  sliders: <SlidersIcon className="size-6" />,
  badge: <BadgeIcon className="size-6" />,
  shield: <ShieldCheckIcon className="size-6" />,
  bolt: <BoltIcon className="size-6" />,
} as const;

const serviceIcons = {
  building: <BuildingIcon className="size-6" />,
  users: <UsersIcon className="size-6" />,
  exchange: <ExchangeIcon className="size-6" />,
  coins: <CoinsIcon className="size-6" />,
  send: <SendIcon className="size-6" />,
  card: <CreditCardIcon className="size-6" />,
} as const;

const platformItems: FeatureGridItem[] = platformFeatures.map((feature) => ({
  icon: platformIcons[feature.icon],
  title: feature.title,
  description: feature.description,
  href: feature.href,
  linkLabel: feature.linkLabel,
}));

const serviceItems: FeatureGridItem[] = baasServices.map((service) => ({
  icon: serviceIcons[service.icon],
  title: service.title,
  description: service.description,
}));

export default function BankingAsAServicePage() {
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
        <PointerGlow mode="always" className="-z-10 [--glow-size:480px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
          <div className="animate-rise">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Banking as a Service" },
              ]}
            />
            <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
              Your Brand,{" "}
              <span className="text-shimmer bg-gradient-to-r from-action-blue via-steel-neutral to-action-blue bg-clip-text text-transparent">
                Your Bank
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-neutral/80">
              Enable your business to offer a comprehensive range of banking and
              payment services to your customers — without having to be a
              fully-licensed bank.
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

          {/* three.js infrastructure visual */}
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            <div
              className="absolute inset-[12%] -z-10 rounded-full bg-action-blue/15 blur-3xl"
              aria-hidden="true"
            />
            <BaasHeroScene />
            <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs font-medium uppercase tracking-widest text-steel-neutral/50">
              Hover to dissolve
            </span>
          </div>
        </div>
      </section>

      {/* Platform */}
      <FeatureGrid
        eyebrow="Platform"
        title="Your Brand, Our Infrastructure"
        items={platformItems}
      />

      {/* Services */}
      <FeatureGrid
        eyebrow="Services"
        title="Expand Your Client's Financial Horizons"
        items={serviceItems}
      />

      <BannerCta />
    </main>
  );
}
