/** Foreign Exchange page content. */

export type FxIcon = "exchange" | "clock" | "percent" | "bolt" | "globe" | "layers";

export type FxCapability = {
  icon: FxIcon;
  title: string;
  description: string;
};

export const fxCapabilities: FxCapability[] = [
  {
    icon: "exchange",
    title: "Primary Currency Exchange",
    description:
      "Instantly convert between USD, EUR, GBP, and CAD directly within your Breinrock account.",
  },
  {
    icon: "clock",
    title: "24/7 Availability",
    description:
      "Execute conversions anytime through our eBanking platform — no need to call or wait for market hours.",
  },
  {
    icon: "percent",
    title: "Competitive Rates",
    description:
      "Institutional-grade FX rates with transparent pricing. No hidden markups or surprise fees.",
  },
  {
    icon: "bolt",
    title: "Instant Execution",
    description:
      "Conversions between primary currency accounts are instant, with real-time rate locking.",
  },
  {
    icon: "globe",
    title: "40+ SWIFT Currencies",
    description:
      "Send and receive international payments through the SWIFT network in more than 40 currencies.",
  },
  {
    icon: "layers",
    title: "Integrated Platform",
    description:
      "Manage FX, local payments, cards, and accounts all in one secure ecosystem.",
  },
];

export type FxStep = {
  title: string;
  description: string;
};

export const fxSteps: FxStep[] = [
  {
    title: "Fund Your Account",
    description:
      "Deposit into your Breinrock account in your preferred primary currency.",
  },
  {
    title: "Exchange",
    description:
      "Convert funds between supported currencies — USD, EUR, GBP, and CAD.",
  },
  {
    title: "Send Globally",
    description:
      "Use SWIFT or Breinrock's Payment Networks for international or local payouts.",
  },
];
