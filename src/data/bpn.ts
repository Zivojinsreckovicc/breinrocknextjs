/** BPN International page content. */

export type BpnIcon = "globe" | "bolt" | "percent" | "shield" | "users" | "send";

export type BpnAdvantage = {
  icon: BpnIcon;
  title: string;
  description: string;
};

export const bpnAdvantages: BpnAdvantage[] = [
  {
    icon: "globe",
    title: "Local Reach, Global Scale",
    description:
      "Make payouts in 60+ countries. Payments land as local transactions in the recipient's currency.",
  },
  {
    icon: "bolt",
    title: "Faster Access to Funds",
    description:
      "Shorten settlement times compared to international wires, improving cash flow and predictability.",
  },
  {
    icon: "percent",
    title: "Lower Transaction Costs",
    description:
      "Reduce fees by using local rails instead of traditional cross-border SWIFT transfer methods.",
  },
  {
    icon: "shield",
    title: "Reliable & Compliant",
    description:
      "Built on Breinrock's regulated infrastructure with strict compliance standards for every payout.",
  },
  {
    icon: "users",
    title: "Personal & Corporate",
    description:
      "Ideal for businesses managing international obligations or individuals making regular global transfers.",
  },
  {
    icon: "send",
    title: "No Recipient Account Needed",
    description:
      "Recipients don't need a Breinrock account. Funds are delivered directly to their local bank.",
  },
];

export type SupportedCurrency = {
  code: string;
  country: string;
  /** ISO 3166-1 alpha-2 code used to render the country flag. */
  countryCode: string;
};

export const supportedCurrencies: SupportedCurrency[] = [
  { code: "AUD", country: "Australia", countryCode: "AU" },
  { code: "BGN", country: "Bulgaria", countryCode: "BG" },
  { code: "CAD", country: "Canada", countryCode: "CA" },
  { code: "CLP", country: "Chile", countryCode: "CL" },
  { code: "EUR", country: "European Union", countryCode: "EU" },
  { code: "GBP", country: "United Kingdom", countryCode: "GB" },
  { code: "HKD", country: "Hong Kong", countryCode: "HK" },
  { code: "HUF", country: "Hungary", countryCode: "HU" },
  { code: "ILS", country: "Israel", countryCode: "IL" },
  { code: "KES", country: "Kenya", countryCode: "KE" },
  { code: "MAD", country: "Morocco", countryCode: "MA" },
  { code: "NOK", country: "Norway", countryCode: "NO" },
  { code: "NZD", country: "New Zealand", countryCode: "NZ" },
  { code: "PLN", country: "Poland", countryCode: "PL" },
  { code: "SAR", country: "Saudi Arabia", countryCode: "SA" },
  { code: "SEK", country: "Sweden", countryCode: "SE" },
  { code: "SGD", country: "Singapore", countryCode: "SG" },
  { code: "TND", country: "Tunisia", countryCode: "TN" },
  { code: "USD", country: "United States", countryCode: "US" },
];
