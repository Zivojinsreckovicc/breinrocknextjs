import { SITE_NAME, SITE_URL } from "@/constants/site";
import type { FaqItem } from "@/data/cards";
import type { LandingPage } from "@/data/landings";

/** JSON-LD for Google Ads landing pages — WebPage + FAQPage in one graph. */
export function buildLandingJsonLd(page: LandingPage, faqs: FaqItem[]) {
  const url = `${SITE_URL}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.heading,
        description: page.subheading,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
