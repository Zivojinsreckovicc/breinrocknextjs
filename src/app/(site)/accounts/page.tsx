import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AccountFeaturesPath } from "@/components/sections/AccountFeaturesPath";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import {
  CoinsIcon,
  ExchangeIcon,
  SendIcon,
  BoltIcon,
  UsersIcon,
  LayersIcon,
  ShieldCheckIcon,
} from "@/components/sections/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { accountFeatures, accountSupport } from "@/data/accounts";

export const metadata = buildMetadata({
  title: "Corporate and Personal Accounts - Breinrock | Multi-Currency Banking Solutions",
  description:
    "Open corporate or personal accounts with dedicated IBANs through Breinrock. Hold and receive funds globally in 40+ currencies with secure payment rails.",
  keywords:
    "corporate accounts, personal banking, multi-currency accounts, dedicated IBAN, international banking, cross-border payments, corporate banking, business accounts, Breinrock accounts, global banking solutions",
  path: "/accounts",
  ogTitle: "Corporate and Personal Accounts - Breinrock | Multi-Currency Banking",
  ogDescription:
    "Open corporate or personal accounts with dedicated IBANs. Hold funds in multiple currencies and access local and international payment rails.",
});

const iconFor = {
  coins: <CoinsIcon className="size-6" />,
  exchange: <ExchangeIcon className="size-6" />,
  send: <SendIcon className="size-6" />,
  bolt: <BoltIcon className="size-6" />,
  users: <UsersIcon className="size-6" />,
  layers: <LayersIcon className="size-6" />,
  shield: <ShieldCheckIcon className="size-6" />,
} as const;

const featureItems = accountFeatures.map((feature) => ({
  icon: iconFor[feature.icon],
  title: feature.title,
  description: feature.description,
}));

const supportItems: FeatureGridItem[] = accountSupport.map((item) => ({
  icon: iconFor[item.icon],
  title: item.title,
  description: item.description,
}));

export default function AccountsPage() {
  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Hero */}
      <PageHero>
        <div className="flex w-full justify-center">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accounts" }]} />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Corporate &amp; Personal Accounts
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Manage your finances with clarity and confidence. Breinrock accounts
          give you direct access to local and international payment rails,
          supported by expert compliance and onboarding teams.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={SIGN_UP_URL} variant="primary" size="lg">
            Open an account
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

      {/* Features — scroll-drawn path */}
      <AccountFeaturesPath
        eyebrow="Features"
        title="Everything You Need"
        features={featureItems}
      />

      {/* Support */}
      <FeatureGrid
        eyebrow="Support"
        title="Personal Service at Scale"
        items={supportItems}
        columns={2}
      />

      <BannerCta />
    </main>
  );
}
