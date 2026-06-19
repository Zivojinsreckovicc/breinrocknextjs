import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { PageHero } from "@/components/sections/PageHero";
import { LandingHeroComparison } from "@/components/sections/LandingHeroComparison";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import type { FeatureGridItem } from "@/components/sections/FeatureGrid";
import { Comparison } from "@/components/sections/Comparison";
import { CardShowcase } from "@/components/sections/CardShowcase";
import { BannerCta } from "@/components/sections/BannerCta";
import { MobileApp } from "@/components/sections/MobileApp";
import { Faq } from "@/components/sections/Faq";
import {
  GlobeIcon,
  LayersIcon,
  MapPinIcon,
  UsersIcon,
} from "@/components/sections/icons";
import { buildMetadata } from "@/lib/seo";
import { buildLandingJsonLd } from "@/lib/landing-seo";
import { SIGN_UP_URL } from "@/constants/links";
import { getLandingPage, landingFaqs, landingSlugs, landingWhyBreinrock } from "@/data/landings";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every landing at build time — full HTML for crawlers, no client fetch. */
export const dynamic = "force-static";

// Only the defined landing slugs resolve; any other root path 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return landingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: `${page.heading} — Breinrock`,
    description: page.subheading,
    path: `/${slug}`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  });
}

const whyBreinrockIcons = {
  "operate-locally": <MapPinIcon className="size-6" />,
  "all-in-one": <LayersIcon className="size-6" />,
  "human-support": <UsersIcon className="size-6" />,
  "global-reach": <GlobeIcon className="size-6" />,
} as const;

const whyBreinrock: FeatureGridItem[] = landingWhyBreinrock.items.map((item) => ({
  id: item.id,
  icon: whyBreinrockIcons[item.id as keyof typeof whyBreinrockIcons],
  title: item.titleLine2 ? (
    <>
      {item.title}
      <br />
      {item.titleLine2}
    </>
  ) : (
    item.title
  ),
  description: item.description,
}));

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const structuredData = buildLandingJsonLd(page, landingFaqs);

  return (
    <main className="landing-crawl-safe bg-midnight-frame" data-reveal-skip>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero fullHeight aside={<LandingHeroComparison />}>
        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          {page.heading}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          {page.subheading}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={SIGN_UP_URL} variant="primary" size="lg">
            Sign up now
            <ArrowRightIcon className="size-5" />
          </Button>
        </div>
      </PageHero>

      <FeatureGrid
        eyebrow={landingWhyBreinrock.eyebrow}
        title={landingWhyBreinrock.title}
        subtitle={landingWhyBreinrock.subtitle}
        items={whyBreinrock}
        columns={2}
      />

      <Comparison showSignUpCta />

      <CardShowcase />

      <BannerCta primaryLabel="Sign up now" />

      <MobileApp />

      <Faq items={landingFaqs} defaultOpenIndex={null} />
    </main>
  );
}
