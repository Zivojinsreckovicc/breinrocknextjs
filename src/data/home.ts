/**
 * Home page content. Kept separate from the section components so the
 * sections stay reusable across the site with different data sets.
 */

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 40, suffix: "+", label: "Currencies" },
  { value: 110, suffix: "+", label: "Payment Countries" },
  { value: 100, suffix: "%", label: "Client-Centric Support" },
  { value: 52, label: "Local Payment Routes" },
];

export type TrustIndicator = {
  label: string;
  /** Maps to an icon in the Mission section. */
  icon: "innovation" | "client" | "experience" | "commitment";
};

export const trustIndicators: TrustIndicator[] = [
  { label: "Innovation", icon: "innovation" },
  { label: "Client Focused", icon: "client" },
  { label: "Experience", icon: "experience" },
  { label: "Commitment", icon: "commitment" },
];

export type CoreValue = {
  label: string;
  description: string;
  /** Maps to an icon in the Core Values section. */
  icon: "innovation" | "client" | "experience" | "commitment";
};

export const coreValues: CoreValue[] = [
  {
    label: "Innovation",
    icon: "innovation",
    description:
      "We elevate everyday banking with modern tools — multi-currency accounts, online FX, and white-label infrastructure built for how you actually move money.",
  },
  {
    label: "Client Focused",
    icon: "client",
    description:
      "We build long-term relationships by tailoring payment and banking solutions around each client's needs, not the other way around.",
  },
  {
    label: "Experience",
    icon: "experience",
    description:
      "Our team brings deep expertise across banking and payments, paired with personal support from real people in six global offices.",
  },
  {
    label: "Committed",
    icon: "commitment",
    description:
      "We treat every financial challenge as our own, working to give you more control, clarity, and confidence over your money.",
  },
];

export const paymentNetworks = [
  "SWIFT",
  "SEPA",
  "CHAPS",
  "ACH",
  "Fedwire",
  "EFT",
  "Interac",
  "Mastercard",
  "Visa",
];

export type ProductFeature = {
  label: string;
  detail: string;
};

/** Picks which illustrative panel the "What We Offer" card renders. */
export type ProductVisual = "networks" | "fx" | "features" | "cards";

export type Product = {
  title: string;
  description: string;
  icon: string;
  href: string;
  image?: string;
  imageUnoptimized?: boolean;
  featured?: boolean;
  features?: ProductFeature[];
  visual?: ProductVisual;
};

export const products: Product[] = [
  {
    title: "Local & Cross Border Payments",
    description:
      "Facilitate preferred currency transactions worldwide using SWIFT, SEPA, CHAPS, ACH, Fedwire, EFT, and Interac.",
    icon: "/imgs/icons/localcrossborder.webp",
    href: "/products/payment-network",
    visual: "networks",
  },
  {
    title: "Online Foreign Exchange",
    description:
      "Manage FX conversions 24/7 via our eBanking platform and stay ahead of market changes with competitive rates.",
    icon: "/imgs/icons/onlineforeign.webp",
    href: "/products/foreign-exchange",
    visual: "fx",
  },
  {
    title: "White-Label BaaS",
    description:
      "Offer accounts, payments, and currency exchange to your clients without the need for a full banking license.",
    icon: "/imgs/icons/baasicon.webp",
    href: "/products/banking-as-a-service",
    visual: "features",
    features: [
      { label: "White Label", detail: "Your brand & UI" },
      { label: "API Access", detail: "Full integration" },
      { label: "Configurable", detail: "Tailored products" },
      { label: "No License", detail: "We handle compliance" },
      { label: "Regulated", detail: "Multi-jurisdiction" },
    ],
  },
  {
    title: "Rock “N” Pay Prepaid Cards",
    description:
      "Mastercard-enabled cards for domestic and international use with real-time online spending tracking.",
    icon: "/imgs/icons/prepaidcard.webp",
    href: "/products/personal-cards",
    image: "/imgs/cardimages/card-gold-mockup.webp",
    visual: "cards",
  },
];

export type CatalogProduct = {
  title: string;
  description: string;
  href: string;
  /** Maps to an icon in the products catalog. */
  icon: "accounts" | "network" | "international" | "cards" | "fx" | "baas";
};

export const productCatalog: CatalogProduct[] = [
  {
    title: "Corporate & Personal Accounts",
    description:
      "Multi-currency IBAN accounts for businesses and individuals with full online banking.",
    href: "/accounts",
    icon: "accounts",
  },
  {
    title: "Breinrock Payment Network",
    description:
      "Local payment rails across UK, EU, US, Canada, and UAE for fast domestic transfers.",
    href: "/products/payment-network",
    icon: "network",
  },
  {
    title: "BPN International",
    description:
      "Cross-border SWIFT payments in 40+ currencies to 180+ countries worldwide.",
    href: "/products/bpn-international",
    icon: "international",
  },
  {
    title: "Prepaid Cards",
    description:
      "Mastercard-enabled physical and virtual cards with real-time spending controls.",
    href: "/products/personal-cards",
    icon: "cards",
  },
  {
    title: "Foreign Exchange",
    description:
      "Competitive FX rates with 24/7 online conversion between 60+ currency pairs.",
    href: "/products/foreign-exchange",
    icon: "fx",
  },
  {
    title: "Banking as a Service",
    description:
      "White-label banking infrastructure — offer accounts, payments, and FX under your brand.",
    href: "/products/banking-as-a-service",
    icon: "baas",
  },
];

export type CompareRow = {
  feature: string;
  breinrock: string;
  /** `null` means a typical provider does not offer it at all. */
  typical: string | null;
};

export type HeroCompareRow = {
  feature: string;
  breinrock: string;
};

/** Compact Breinrock-only rows for landing page hero comparison panel. */
export const landingHeroComparisonRows: HeroCompareRow[] = [
  {
    feature: "SWIFT Payments (40+ Currencies)",
    breinrock: "Available directly",
  },
  {
    feature: "Local Payouts (60+ Currencies)",
    breinrock: "Through BPN International",
  },
  {
    feature: "Local Payments in 5 Major Markets",
    breinrock: "Domestic transfers",
  },
  {
    feature: "Built-In Foreign Exchange",
    breinrock: "Instant exchange",
  },
  {
    feature: "Digital Assets Integration",
    breinrock: "Fully integrated",
  },
  {
    feature: "Dedicated Relationship Manager",
    breinrock: "Personal support",
  },
];

export const comparisonRows: CompareRow[] = [
  {
    feature: "SWIFT Payments (40+ Currencies)",
    breinrock: "Available directly from your account",
    typical: "Limited",
  },
  {
    feature: "Local Payouts (60+ Currencies)",
    breinrock: "Through BPN International",
    typical: "Limited",
  },
  {
    feature: "Local Payments in UAE, UK, EU, US & Canada",
    breinrock: "Processed as domestic transfers",
    typical: null,
  },
  {
    feature: "Built-In Foreign Exchange",
    breinrock: "Instant exchange between USD, EUR, GBP, CAD, AED",
    typical: "Limited",
  },
  {
    feature: "Digital Assets (Fiat ↔ Crypto Conversion)",
    breinrock: "Fully integrated within your account",
    typical: "Limited",
  },
  {
    feature: "Dedicated Relationship Manager",
    breinrock: "Every client assigned personal support",
    typical: null,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  initial: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "In the current financial landscape, trust in your partners has never been more important. Breinrock delivers on that trust every day.",
    name: "Ales H.",
    initial: "A",
  },
  {
    quote:
      "The technology is outstanding, and their customer support team is top-notch. A truly modern banking experience.",
    name: "Lambros L.",
    initial: "L",
  },
  {
    quote:
      "Tailor-made solutions that will definitely deliver. Breinrock understands what businesses actually need.",
    name: "Stelios P.",
    initial: "S",
  },
  {
    quote:
      "Breinrock has no competitors when it comes to combining global reach with personal service.",
    name: "Danylo K.",
    initial: "D",
  },
  {
    quote:
      "Thank you for making banking human again. The experience is refreshing and genuinely personal.",
    name: "Andre",
    initial: "A",
  },
];

export type Office = {
  city: string;
  country: string;
  entity: string;
  license: string;
  addressLines: string[];
  flag: string;
  /** [latitude, longitude] — used to place markers on the 3D globe. */
  coordinates: [number, number];
  hq?: boolean;
};

export const offices: Office[] = [
  {
    city: "Toronto",
    country: "Canada",
    entity: "Breinrock Limited",
    license: "FINTRAC M20573982 · Bank of Canada REG-2278",
    addressLines: [
      "100 King Street West, Suite 5700",
      "Toronto M5X 1C7 ON Canada",
    ],
    flag: "/imgs/icons/canada.webp",
    coordinates: [43.651, -79.347],
  },
  {
    city: "London",
    country: "United Kingdom",
    entity: "Breinrock UK Ltd",
    license: "FCA FRN925836",
    addressLines: ["73 Mornington Street", "London NW1 7QE, UK"],
    flag: "/imgs/icons/uk.webp",
    coordinates: [51.507, -0.127],
  },
  {
    city: "Prague",
    country: "Czech Republic",
    entity: "Breinrock s.r.o.",
    license: "042 86 329",
    addressLines: [
      "Lazarská 1718/3, Nové Město,",
      "110 00 Prague 1,",
      "Czech Republic",
    ],
    flag: "/imgs/icons/czech.webp",
    coordinates: [50.081, 14.421],
  },
  {
    city: "Limassol",
    country: "Cyprus",
    entity: "Breinrock Ltd.",
    license: "HE 39088",
    addressLines: [
      "4 Thekla Lysioti, Harmony House",
      "Office 11, 1st Floor",
      "3030 Limassol, Cyprus",
    ],
    flag: "/imgs/icons/cyprus.webp",
    coordinates: [34.707, 33.022],
    hq: true,
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    entity: "Breinrock (DIFC) Tech Ltd",
    license: "DFSA F007440",
    addressLines: ["Emirates Financial Tower, S2109,", "DIFC, Dubai, UAE"],
    flag: "/imgs/icons/uae.webp",
    coordinates: [25.204, 55.27],
  },
  {
    city: "Zug",
    country: "Switzerland",
    entity: "Helvetic Digital Finance AG",
    license: "VQF License 101236",
    addressLines: ["Bahnhofplatz, 6300", "Zug, Switzerland"],
    flag: "/imgs/icons/swiss-flag.webp",
    coordinates: [47.166, 8.515],
  },
];
