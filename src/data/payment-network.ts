import type { FaqItem } from "./cards";

/** Breinrock Payment Network page content. */

export type PaymentRail = {
  /** Currency code shown in the badge; omit for the SWIFT (global) card. */
  code?: string;
  swift?: boolean;
  title: string;
  description: string;
};

export const paymentRails: PaymentRail[] = [
  {
    code: "GBP",
    title: "FPS & CHAPS",
    description:
      "Instant and same-day GBP payments within the UK via Faster Payments and CHAPS.",
  },
  {
    code: "EUR",
    title: "SEPA Transfers",
    description:
      "EUR payments across the European Economic Area — fast, low-cost, and fully automated.",
  },
  {
    code: "USD",
    title: "ACH & Fedwire",
    description:
      "USD domestic payments in the United States via ACH batch processing and Fedwire real-time.",
  },
  {
    code: "CAD",
    title: "EFT & Interac",
    description:
      "CAD domestic payments in Canada through Electronic Funds Transfer and Interac networks.",
  },
  {
    code: "AED",
    title: "Local AED Payments",
    description:
      "Process dirham payments domestically within the UAE banking system.",
  },
  {
    swift: true,
    title: "SWIFT International",
    description:
      "Cross-border payments in 40+ currencies to over 180 countries via our global network.",
  },
];

export type PaymentAdvantage = {
  icon: "percent" | "clock" | "layers";
  stat?: string;
  title: string;
  description: string;
};

export const paymentAdvantages: PaymentAdvantage[] = [
  {
    icon: "percent",
    title: "Lower Costs",
    description:
      "Domestic processing fees are significantly lower than international wire transfers.",
  },
  {
    icon: "clock",
    stat: "<1h",
    title: "Faster Settlement",
    description:
      "Avoid international wire delays. Payments process through local rails for quicker access to funds.",
  },
  {
    icon: "layers",
    stat: "1",
    title: "One Account",
    description:
      "No need for multiple accounts. One Breinrock account with dedicated IBANs for each region.",
  },
];

export const paymentFaqs: FaqItem[] = [
  {
    question: "Which currencies are supported?",
    answer:
      "You can process GBP, EUR, USD, CAD, and AED on local rails, and send or receive in 40+ currencies via SWIFT to over 160 countries.",
  },
  {
    question: "How does this differ from a SWIFT transfer?",
    answer:
      "Local rails process payments as domestic transfers within each region (FPS/CHAPS, SEPA, ACH/Fedwire, EFT/Interac, local AED), which is typically faster and cheaper than an international SWIFT wire. SWIFT remains available for currencies and countries not covered by local rails.",
  },
  {
    question: "Can I both send and receive payments?",
    answer:
      "Yes. Your account supports both inbound and outbound payments on every supported rail.",
  },
  {
    question: "Do I need multiple accounts to access each market?",
    answer:
      "No. A single Breinrock account with dedicated IBANs for each region gives you access to all supported rails.",
  },
  {
    question: "Who can use the Payment Network?",
    answer:
      "Both corporate and personal Breinrock clients, subject to onboarding and compliance checks.",
  },
];
