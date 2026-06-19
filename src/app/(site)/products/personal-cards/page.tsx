import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CardsHero } from "@/components/sections/CardsHero";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { Faq } from "@/components/sections/Faq";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { BannerCta } from "@/components/sections/BannerCta";
import {
  BellIcon,
  CreditCardIcon,
  GlobeIcon,
  LockIcon,
  PlaneIcon,
  SlidersIcon,
} from "@/components/sections/icons";
import { cardFeatures, cardFaqs } from "@/data/cards";

export const metadata = buildMetadata({
  title: "Prepaid Cards - Breinrock | Rock 'N' Pay Mastercard Prepaid Cards",
  description:
    "Breinrock prepaid cards offer global spending with total control — Standard, Elite, and Elite Plus prepaid Mastercard options with global acceptance and real-time controls.",
  keywords:
    "breinrock prepaid cards, prepaid mastercard, rock n pay cards, standard prepaid card, elite prepaid card, elite plus card, prepaid debit card, corporate prepaid cards, international prepaid cards, multi-currency prepaid card, prepaid card features",
  path: "/products/personal-cards",
  ogTitle: "Prepaid Cards - Breinrock | Rock 'N' Pay Mastercard",
  ogDescription:
    "Breinrock prepaid cards offer global spending with total control. Standard, Elite, and Elite Plus prepaid Mastercard options.",
});

const featureIcons = {
  card: <CreditCardIcon className="size-6" />,
  globe: <GlobeIcon className="size-6" />,
  sliders: <SlidersIcon className="size-6" />,
  bell: <BellIcon className="size-6" />,
  lock: <LockIcon className="size-6" />,
  plane: <PlaneIcon className="size-6" />,
} as const;

const featureItems: FeatureGridItem[] = cardFeatures.map((feature) => ({
  icon: featureIcons[feature.icon],
  title: feature.title,
  description: feature.description,
}));

// FAQPage structured data for richer search results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cardFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function PrepaidCardsPage() {
  return (
    <main>
      <GoogleAnalytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CardsHero />
      <CardShowcase />
      <FeatureGrid
        eyebrow="Why Choose Us"
        title="Total Control Over Your Spending"
        items={featureItems}
        tone="frame"
      />
      <Faq items={cardFaqs} />
      <GlobalPresence />
      <BannerCta />
    </main>
  );
}
