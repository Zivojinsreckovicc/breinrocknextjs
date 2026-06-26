import { offices } from "@/data/home";

/** Maps office country labels to policy-modal slugs (`/?country=<slug>`). */
const countrySlugByName: Record<string, string> = {
  Cyprus: "cyprus",
  Canada: "canada",
  "United Kingdom": "uk",
  "Czech Republic": "czech-republic",
  UAE: "uae",
  "United Arab Emirates": "uae",
  Switzerland: "switzerland",
};

export type FooterOffice = {
  entity: string;
  license: string;
  addressLines: string[];
  flag: string;
  flagAlt: string;
  countrySlug: string;
  hq?: boolean;
};

export const footerOffices: FooterOffice[] = offices.map((office) => ({
  entity: office.entity,
  license: office.license,
  addressLines: office.addressLines,
  flag: office.flag,
  flagAlt: office.country === "United Arab Emirates" ? "UAE" : office.country,
  countrySlug: countrySlugByName[office.country] ?? office.country.toLowerCase(),
  hq: office.hq,
}));

export const footerSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/breinrock/posts/?feedView=all",
    icon: "/imgs/icons/socials/breinrock-linked-in.webp",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Breinrock/about/",
    icon: "/imgs/icons/socials/breinrock-facebook.webp",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/breinrock/?hl=hr",
    icon: "/imgs/icons/socials/breinrock-instagram.webp",
  },
  { label: "X", href: "#", icon: null },
  { label: "YouTube", href: "#", icon: null },
] as const;

export const footerNavLinks = [
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Legal", href: "/legal" },
];
