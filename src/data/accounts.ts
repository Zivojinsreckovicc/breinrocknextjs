/** Multicurrency accounts page content. */

export type AccountIcon =
  | "coins"
  | "exchange"
  | "send"
  | "bolt"
  | "users"
  | "layers"
  | "shield";

export type AccountFeature = {
  icon: AccountIcon;
  title: string;
  description: string;
};

export const accountFeatures: AccountFeature[] = [
  {
    icon: "coins",
    title: "Dedicated IBANs",
    description:
      "Hold funds in CAD, USD, EUR and GBP depending on your jurisdiction, while sending and receiving across 40+ currencies from a single account.",
  },
  {
    icon: "exchange",
    title: "Multicurrency Flexibility",
    description:
      "Pay and receive in over 40 currencies through one account. Simplify international trade and remove unnecessary complexity.",
  },
  {
    icon: "send",
    title: "Local & Global Payments",
    description:
      "Send and receive payments worldwide via SWIFT, SEPA, CHAPS, ACH, Fedwire, FPS and local rails in 5 jurisdictions.",
  },
  {
    icon: "bolt",
    title: "Instant Onboarding",
    description:
      "Quick digital onboarding with KYC verification guided by our in-house compliance experts.",
  },
  {
    icon: "users",
    title: "Corporate & Personal",
    description:
      "Tailored solutions for both businesses and individuals. Multi-user access with role-based permissions.",
  },
  {
    icon: "layers",
    title: "Full eBanking Platform",
    description:
      "Manage transactions, FX, cards, and reporting in one modern dashboard.",
  },
];

export const accountSupport: AccountFeature[] = [
  {
    icon: "users",
    title: "Dedicated Relationship Manager",
    description:
      "Every client is assigned a personal account manager who understands your business and guides you through onboarding and beyond.",
  },
  {
    icon: "shield",
    title: "Trusted Compliance",
    description:
      "Licensed and regulated across multiple jurisdictions with enterprise-grade security, 2FA, and in-house compliance teams.",
  },
];
