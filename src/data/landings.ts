/**
 * Marketing landing pages. Every landing shares the exact same sections — only
 * the hero heading and subheading differ between them. Add a new entry here to
 * publish another landing at `/<slug>` (the slug is served from the domain root
 * via the `app/(landing)/[slug]` route group — no `/landing` prefix in the URL).
 */
import type { FaqItem } from "./cards";

export type LandingWhyBreinrockItem = {
  id: string;
  title: string;
  titleLine2?: string;
  description: string;
};

/** Shared “Why Breinrock” section — identical on every landing page. */
export const landingWhyBreinrock = {
  eyebrow: "Why Breinrock",
  title: "Why Breinrock?",
  subtitle:
    "Breinrock combines world-class financial infrastructure with personal relationship management.",
  items: [
    {
      id: "operate-locally",
      title: "Operate Locally",
      description:
        "Access domestic payment rails within the UAE, UK, EU, US, and Canada for faster, local transactions.",
    },
    {
      id: "all-in-one",
      title: "All-in-One",
      titleLine2: "Platform",
      description:
        "Manage foreign exchange, digital assets, and multi-currency accounts from a single secure dashboard.",
    },
    {
      id: "human-support",
      title: "Human",
      titleLine2: "Support",
      description:
        "Every Breinrock client is assigned a dedicated relationship manager for personalized guidance and ongoing support.",
    },
    {
      id: "global-reach",
      title: "Global",
      titleLine2: "Reach",
      description:
        "Send and receive payments in 40+ SWIFT currencies and 60+ local payout currencies worldwide.",
    },
  ] satisfies LandingWhyBreinrockItem[],
} as const;

/** Shared FAQ — identical on every Google Ads landing page (visible + JSON-LD). */
export const landingFaqs: FaqItem[] = [
  {
    question: "What is a Breinrock Corporate IBAN?",
    answer:
      "A dedicated business account to send, receive, and hold funds locally in the UAE, UK, EU, US, and Canada, plus payouts to 60+ countries via Breinrock Payment Network International.",
  },
  {
    question: "How is Breinrock different from a traditional bank?",
    answer:
      "Global access through one platform — local and international payments, multi-currency management, and digital asset functionality, all with a dedicated relationship manager.",
  },
  {
    question: "What currencies and regions are supported?",
    answer:
      "40+ SWIFT currencies, local payments in UAE, UK, EU, US, and Canada, and local payouts to 60+ countries through BPN International.",
  },
  {
    question: "Do I need multiple accounts for different regions?",
    answer:
      "No. One account covers multiple regions. Your relationship manager can structure IBANs by project, region, or client.",
  },
  {
    question: "Who can open a Breinrock corporate account?",
    answer:
      "Registered businesses, corporate entities, and professional service providers that need cross-border payment capabilities.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Typically 1–3 business days after documentation is complete, depending on jurisdiction and compliance checks.",
  },
  {
    question: "Is my money safe with Breinrock?",
    answer:
      "Yes. Breinrock operates under regulated financial entities in multiple jurisdictions with compliance, AML, and data protection standards.",
  },
  {
    question: "Will I have a direct contact person?",
    answer:
      "Yes. Every client gets a dedicated Relationship Manager for onboarding, account structure, and ongoing transactions.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click Sign Up to start onboarding, or Get In Touch to speak with a Breinrock specialist.",
  },
];

export type LandingPage = {
  slug: string;
  heading: string;
  subheading: string;
};

export const landingPages: LandingPage[] = [
  {
    slug: "landing",
    heading: "Frustrated with slow international transfers and hidden fees?",
    subheading:
      "Effortlessly collect, hold, and disburse funds like a local in over 35 currencies with Breinrock's global collection accounts. Simplify your international operations",
  },
  {
    slug: "welcome",
    heading: "Do Business Globally, Bank Locally",
    subheading:
      "Manage international operations through one Breinrock corporate IBAN with local payment rails in 60+ countries, global transfers, FX and expert human support built in",
  },
  {
    slug: "welcome-1",
    heading: "Do Business Globally, Bank Locally with a Corporate IBAN",
    subheading:
      "Manage international operations through one Breinrock corporate IBAN with local payment rails in 60+ countries, global transfers, FX and expert human support built in",
  },
  {
    slug: "welcome-2",
    heading: "Do Business Globally, Bank Locally with a Corporate IBAN",
    subheading:
      "Manage international operations through one Breinrock corporate IBAN with local payment rails in 60+ countries, global transfers, FX and expert human support built in",
  },
  {
    slug: "business-account-1",
    heading: "Business Accounts With Built-In Global Payment Networks",
    subheading:
      "Send and receive payments through local rails within the EU, UK, CA, US & UAE, and global payouts in 60+ countries, all from your Breinrock business account",
  },
  {
    slug: "business-account-2",
    heading: "One Business Account for Global Operations",
    subheading:
      "Manage international payments, receive and send funds locally, handle FX, and make global payouts from one business account",
  },
  {
    slug: "business-account-3",
    heading: "Reduce FX Costs With a Multi-Currency Account",
    subheading:
      "Avoid unnecessary conversions and manage global cash flow more efficiently with multi-currency business accounts",
  },
  {
    slug: "corporate-iban-1",
    heading: "Corporate IBANs With Local Business Payments",
    subheading:
      "Open a corporate account with dedicated IBANs, access to 40+ SWIFT currencies, 60+ local payout countries, built-in FX, and a personal relationship manager who supports your operations every step of the way",
  },
  {
    slug: "corporate-iban-2",
    heading: "Do Business Globally, Bank Locally with a Corporate IBAN",
    subheading:
      "Manage international operations through one Breinrock corporate IBAN with local payment rails in 60+ countries, global transfers, FX and expert human support built in",
  },
  {
    slug: "corporate-iban-3",
    heading: "A Corporate IBAN With Dedicated Human Support",
    subheading:
      "Every Breinrock corporate client is assigned a dedicated relationship manager to help structure accounts, optimize payments, and simplify cross-border transactions",
  },
  {
    slug: "foreign-exchange-1",
    heading: "FX Accounts Built for Global Business",
    subheading:
      "Execute foreign exchange transactions with transparent pricing and integrated settlement for international payments",
  },
  {
    slug: "foreign-exchange-2",
    heading: "Built-In Foreign Exchange for Business Payments",
    subheading:
      "Convert currencies directly within your account and streamline international payments without third-party FX providers",
  },
  {
    slug: "foreign-exchange-3",
    heading: "Simplify FX and Cross-Border Payments",
    subheading:
      "Manage currency exchange and international transfers in one place to reduce operational complexity",
  },
  {
    slug: "local-payments-1",
    heading: "Fast Local Payments Across Key Markets",
    subheading:
      "Send and receive local payments quickly through domestic rails in the EU, UK, US, Canada & UAE",
  },
  {
    slug: "local-payments-2",
    heading: "Local Payment Rails for Global Businesses",
    subheading:
      "Collect and distribute funds locally in major markets without setting up multiple bank accounts",
  },
  {
    slug: "local-payments-3",
    heading: "Local Payments With Expert Support",
    subheading:
      "Our team supports your local payment operations and helps optimize routing across regions",
  },
  {
    slug: "local-payouts-1",
    heading: "Fast Payouts to 60+ Countries",
    subheading:
      "Distribute funds globally with reliable payout networks covering 60+ countries",
  },
  {
    slug: "local-payouts-2",
    heading: "Global Payouts Without Operational Complexity",
    subheading:
      "Scale international payouts without opening local bank accounts in every country",
  },
  {
    slug: "local-payouts-3",
    heading: "Global Payouts Supported by your Personal Manager",
    subheading:
      "Work with a dedicated team to manage high-volume international payouts efficiently and securely",
  },
  {
    slug: "multi-currency-account-1",
    heading: "Multi-Currency Accounts for International Businesses",
    subheading:
      "Hold, manage, and transact in multiple currencies through one account designed for cross-border business needs",
  },
  {
    slug: "multi-currency-account-2",
    heading: "Hold and Transact in Multiple Currencies",
    subheading:
      "Access multiple currencies under one account with built-in FX and seamless international transfers",
  },
  {
    slug: "multi-currency-account-3",
    heading: "Instant Exchange With Multi-Currency Accounts",
    subheading:
      "Avoid unnecessary conversions and manage global cash flow more efficiently with multi-currency business accounts",
  },
];

export const landingSlugs = landingPages.map((page) => page.slug);

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.slug === slug);
}
