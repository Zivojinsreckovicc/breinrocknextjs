/**
 * Jurisdictions Breinrock operates in. The `slug` is the URL segment
 * (/policies/<slug>) and must match the `country` value used in the Sanity
 * Studio (`studio/countries.ts`). The two repos are decoupled, so each keeps
 * its own copy of this list.
 */
export type PolicyCountry = {
  slug: string;
  name: string;
  flag: string;
};

export const policyCountries: PolicyCountry[] = [
  { slug: "switzerland", name: "Switzerland", flag: "/imgs/icons/swiss-flag.webp" },
  { slug: "uae", name: "United Arab Emirates", flag: "/imgs/icons/uae.webp" },
  { slug: "cyprus", name: "Cyprus", flag: "/imgs/icons/cyprus.webp" },
  { slug: "czech-republic", name: "Czech Republic", flag: "/imgs/icons/czech.webp" },
  { slug: "uk", name: "United Kingdom", flag: "/imgs/icons/uk.webp" },
  { slug: "canada", name: "Canada", flag: "/imgs/icons/canada.webp" },
];

export function getCountry(slug: string): PolicyCountry | undefined {
  return policyCountries.find((country) => country.slug === slug);
}
