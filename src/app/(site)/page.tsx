import { buildMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsCounters } from "@/components/sections/StatsCounters";
import { Mission } from "@/components/sections/Mission";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { Comparison } from "@/components/sections/Comparison";
import { Testimonials } from "@/components/sections/Testimonials";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { MobileApp } from "@/components/sections/MobileApp";
import { BannerCta } from "@/components/sections/BannerCta";
import { PolicyCountryModal } from "@/components/policies/PolicyCountryModal";
import { policyCountries } from "@/data/policy-countries";

export const metadata = buildMetadata({
  title: "Breinrock | Global Payments & Banking Solutions",
  description:
    "Unlock your financial potential with Breinrock's neo banking platform. Manage payments in 110+ countries and 40+ currencies globally.",
  keywords:
    "breinrock, international banking, global payments, neo banking, financial services, cross-border payments, multi-currency accounts, SWIFT, SEPA, prepaid cards, foreign exchange, BaaS, banking as a service, fintech, corporate banking, personal banking, payment solutions",
  path: "/",
  ogTitle: "Breinrock - Global Payments & International Banking Solutions",
  ogDescription:
    "Unlock your financial potential with Breinrock's unified neo banking platform. Manage global payments across 110+ countries in 40+ currencies.",
});

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsCounters />
      <Mission />
      <LogoMarquee />
      <WhatWeOffer />
      <Comparison />
      <Testimonials />
      <MobileApp />
      <GlobalPresence />
      <BannerCta />

      <Suspense fallback={null}>
        <PolicyCountryModal countries={policyCountries} />
      </Suspense>
    </main>
  );
}
