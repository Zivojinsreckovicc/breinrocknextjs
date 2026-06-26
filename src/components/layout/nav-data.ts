export type ProductItem = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type ProductSection = {
  label: string;
  icon: string;
  items: ProductItem[];
};

const ICONS = "/imgs/icons/products-dropdown-icons";

export const productColumns: ProductSection[][] = [
  [
    {
      label: "Accounts",
      icon: `${ICONS}/icons8-bank-account-24.png`,
      items: [
        {
          title: "Multicurrency Accounts",
          description:
            "For personal and corporate accounts. Accounts in EUR, GBP, USD and CAD. Send and receive in 40+ currencies.",
          href: "/accounts",
          icon: `${ICONS}/icons8-bank-account-24.png`,
        },
      ],
    },
    {
      label: "Foreign Exchange",
      icon: `${ICONS}/icons8-exchange-24.png`,
      items: [
        {
          title: "Foreign Exchange",
          description:
            "Access and exchange between major currencies in your account.",
          href: "/products/foreign-exchange",
          icon: `${ICONS}/icons8-exchange-24.png`,
        },
      ],
    },
  ],
  [
    {
      label: "Payments",
      icon: `${ICONS}/icons8-connection-24.png`,
      items: [
        {
          title: "Breinrock Payment Network",
          description:
            "Access local payment rails within the UK, EU, US, Canada, and UAE.",
          href: "/products/payment-network",
          icon: `${ICONS}/icons8-connection-24.png`,
        },
        {
          title: "BPN International",
          description:
            "Local payments in 60+ countries. Bulk, automated, and multi-currency disbursements.",
          href: "/products/bpn-international",
          icon: `${ICONS}/icons8-web-24.png`,
        },
      ],
    },
  ],
  [
    {
      label: "Cards",
      icon: `${ICONS}/icons8-credit-card-24-2.png`,
      items: [
        {
          title: "Personal Cards",
          description:
            "Standard, Elite, and Elite Plus. Physical and virtual prepaid cards for personal use.",
          href: "/products/personal-cards",
          icon: `${ICONS}/icons8-credit-card-24.png`,
        },
      ],
    },
    {
      label: "Solutions",
      icon: `${ICONS}/icons8-layers-24.png`,
      items: [
        {
          title: "Banking-as-a-Service",
          description:
            "White-label infrastructure. Embed accounts, FX and cards via API.",
          href: "/products/banking-as-a-service",
          icon: `${ICONS}/icons8-layers-24.png`,
        },
      ],
    },
  ],
];

export const aboutLinks = [
  { label: "Learn More About Breinrock", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];
