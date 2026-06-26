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

/**
 * Currencies/regions with local-rail payout support, used by the BPN
 * International search. `keywords` holds search aliases (country names are
 * matched from `regions` automatically).
 */
export type PayoutCurrency = {
  code: string;
  regions: string[];
  keywords: string[];
};

export const payoutCurrencies: PayoutCurrency[] = [
  { code: "AUD", regions: ["Australia"], keywords: ["aussie", "oz"] },
  { code: "BGN", regions: ["Bulgaria"], keywords: ["lev"] },
  { code: "CAD", regions: ["Canada"], keywords: ["canadian"] },
  { code: "CLP", regions: ["Chile"], keywords: ["chilean", "peso"] },
  {
    code: "EUR",
    regions: ["European Union"],
    keywords: ["euro", "eu", "europe", "eurozone"],
  },
  {
    code: "GBP",
    regions: ["United Kingdom", "Isle of Man", "Jersey", "Guernsey"],
    keywords: ["uk", "gb", "great britain", "britain", "england", "pound", "sterling"],
  },
  { code: "HKD", regions: ["Hong Kong"], keywords: ["hk"] },
  { code: "HUF", regions: ["Hungary"], keywords: ["forint"] },
  { code: "ILS", regions: ["Israel"], keywords: ["shekel"] },
  { code: "ISK", regions: ["Iceland"], keywords: ["krona"] },
  { code: "KES", regions: ["Kenya"], keywords: ["shilling"] },
  { code: "MAD", regions: ["Morocco"], keywords: ["dirham"] },
  { code: "MGA", regions: ["Madagascar"], keywords: ["ariary"] },
  { code: "MZN", regions: ["Mozambique"], keywords: ["metical"] },
  { code: "NAD", regions: ["Namibia"], keywords: ["namibian"] },
  { code: "NOK", regions: ["Norway"], keywords: ["krone"] },
  { code: "NZD", regions: ["New Zealand"], keywords: ["kiwi", "nz"] },
  { code: "PLN", regions: ["Poland"], keywords: ["zloty"] },
  { code: "RWF", regions: ["Rwanda"], keywords: ["franc"] },
  { code: "SAR", regions: ["Saudi Arabia"], keywords: ["saudi", "riyal"] },
  { code: "SEK", regions: ["Sweden"], keywords: ["krona"] },
  { code: "SGD", regions: ["Singapore"], keywords: ["sing dollar"] },
  { code: "TND", regions: ["Tunisia"], keywords: ["dinar"] },
  { code: "TZS", regions: ["Tanzania"], keywords: ["shilling"] },
  {
    code: "USD",
    regions: [
      "United States",
      "Puerto Rico",
      "United States Minor Outlying Islands",
      "U.S. Virgin Islands",
    ],
    keywords: ["usa", "us", "america", "american", "dollar"],
  },
  {
    code: "XAF",
    regions: [
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Republic of the Congo",
      "Equatorial Guinea",
      "Gabon",
    ],
    keywords: ["central africa", "cfa", "cfa franc"],
  },
  {
    code: "XOF",
    regions: [
      "Benin",
      "Burkina Faso",
      "Côte d'Ivoire",
      "Guinea-Bissau",
      "Mali",
      "Niger",
      "Senegal",
      "Togo",
    ],
    keywords: ["west africa", "cfa", "cfa franc", "ivory coast"],
  },
];
