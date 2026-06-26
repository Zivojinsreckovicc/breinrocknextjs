import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { CurrencySearch } from "@/components/sections/CurrencySearch";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import {
  GlobeIcon,
  BoltIcon,
  PercentIcon,
  ShieldCheckIcon,
  UsersIcon,
  SendIcon,
} from "@/components/sections/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { bpnAdvantages } from "@/data/bpn";

export const metadata = buildMetadata({
  title: "BPN International - Breinrock | Local Payouts in 60+ Currencies",
  description:
    "Breinrock enables local payouts in 60+ currencies with faster global settlements and reduced reliance on traditional SWIFT transfers.",
  keywords:
    "payment network international, local payouts, 60+ currencies, international payouts, global payments, SWIFT alternative, cross-border payments, local payment rails, international money transfer, global payout network, multi-currency payouts",
  path: "/products/bpn-international",
  ogDescription:
    "Expand your reach with local payouts in over 60 currencies. Faster access to international markets and efficient global settlements.",
  twitterDescription:
    "Expand your reach with local payouts in over 60 currencies. Faster access to international markets.",
});

const advantageIcons = {
  globe: <GlobeIcon className="size-6" />,
  bolt: <BoltIcon className="size-6" />,
  percent: <PercentIcon className="size-6" />,
  shield: <ShieldCheckIcon className="size-6" />,
  users: <UsersIcon className="size-6" />,
  send: <SendIcon className="size-6" />,
} as const;

const advantageItems: FeatureGridItem[] = bpnAdvantages.map((advantage) => ({
  icon: advantageIcons[advantage.icon],
  title: advantage.title,
  description: advantage.description,
}));

export default function BpnInternationalPage() {
  return (
    <main className="bg-midnight-frame">
      {/* Hero */}
      <PageHero>
        <div className="flex w-full justify-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "BPN International" },
            ]}
          />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          BPN International
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Expand your reach with local payouts in more than 60 countries.
          Reduce reliance on traditional SWIFT transfers, with faster access to
          international markets.
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

      {/* Region / currency search */}
      <CurrencySearch />

      {/* Advantages */}
      <FeatureGrid
        eyebrow="Advantages"
        title="Why Use BPN International"
        items={advantageItems}
      />

      <BannerCta />
    </main>
  );
}
