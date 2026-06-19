/** Banking-as-a-Service page content. */

export type PlatformIcon =
  | "palette"
  | "code"
  | "sliders"
  | "badge"
  | "shield"
  | "bolt";

export type PlatformFeature = {
  icon: PlatformIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export const platformFeatures: PlatformFeature[] = [
  {
    icon: "palette",
    title: "Full White-Labeling",
    description:
      "Custom branding, logo, colours, and domain. Launch via our turnkey solution or integrate through our developer-friendly API.",
  },
  {
    icon: "code",
    title: "API Integration",
    description:
      "RESTful APIs for accounts, payments, FX, and KYC. Build your own frontend or use our ready-made platform.",
    href: "/contact",
    linkLabel: "View API documentation",
  },
  {
    icon: "sliders",
    title: "Configurable Products",
    description:
      "Choose which products to offer and configure them for your market. Your clients enjoy an all-in-one experience.",
  },
  {
    icon: "badge",
    title: "No License Required",
    description:
      "Operate under our comprehensive global licensing network. We handle compliance and banking relationships in every region.",
  },
  {
    icon: "shield",
    title: "Compliance Built In",
    description:
      "KYC, AML, sanctions screening, and transaction monitoring — all handled by our compliance infrastructure.",
  },
  {
    icon: "bolt",
    title: "Fast Time to Market",
    description:
      "Launch your financial product in weeks, not years. We provide the entire regulated stack out of the box.",
  },
];

export type ServiceIcon =
  | "building"
  | "users"
  | "exchange"
  | "coins"
  | "send"
  | "card";

export type BaasService = {
  icon: ServiceIcon;
  title: string;
  description: string;
};

export const baasServices: BaasService[] = [
  { icon: "building", title: "Corporate Accounts", description: "Secure corporate IBANs in multiple currencies." },
  { icon: "users", title: "Personal Accounts", description: "Multicurrency accounts for individuals." },
  { icon: "exchange", title: "Foreign Exchange", description: "24/7 FX conversions via eBanking." },
  { icon: "coins", title: "Multi-Currency", description: "40+ currencies in one account." },
  { icon: "send", title: "Send & Receive", description: "Global transfers, fast and secure." },
  { icon: "card", title: "Prepaid Cards", description: "Branded cards for your clients." },
];
