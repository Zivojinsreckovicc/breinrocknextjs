/**
 * Jurisdictions Breinrock operates in. The `slug` is the URL segment
 * (/policies/<slug>) and must match the `country` value used in the Sanity
 * Studio (`studio/countries.ts`). The two repos are decoupled, so each keeps
 * its own copy of this list.
 */
/** A selectable language for a policy set, used by the modal's EN/CZ toggle. */
export type PolicyLanguageOption = {
  /** The country slug whose policies are shown for this language. */
  slug: string;
  /** Label shown on the toggle (in its own language). */
  label: string;
};

export type PolicyCountry = {
  slug: string;
  name: string;
  flag: string;
  /**
   * Language variants of this policy set. When present, the popup shows a
   * toggle so users can switch between e.g. English and Czech versions. Both
   * the default and the variant country reference the same list so the toggle
   * appears on either side. Translations are separate, hand-authored documents
   * in the CMS — there is no automatic translation.
   */
  languageOptions?: PolicyLanguageOption[];
  /** Hidden from the /policies hub grid (e.g. alternate-language policy sets). */
  hidden?: boolean;
  /**
   * Regulatory disclaimer shown in the policy popup beneath a
   * "You have selected: <name>" line (e.g. the licensed entity and license
   * number for the jurisdiction).
   */
  disclaimer?: string;
};

/** Shared EN/CZ toggle for the Czech Republic policy set and its Czech variant. */
const CZECH_LANGUAGE_OPTIONS: PolicyLanguageOption[] = [
  { slug: "czech-republic", label: "English" },
  { slug: "czech-republic-cz", label: "Čeština" },
];

export const policyCountries: PolicyCountry[] = [
  {
    slug: "switzerland",
    name: "Switzerland",
    flag: "/imgs/icons/swiss-flag.webp",
    disclaimer:
      "Helvetic Digital Finance AG is a company registered in Switzerland with address Bahnhofplatz, 6300 Zug, Switzerland, and is a member of VQF with license number 101286.",
  },
  { slug: "uae", name: "United Arab Emirates", flag: "/imgs/icons/uae.webp" },
  { slug: "cyprus", name: "Cyprus", flag: "/imgs/icons/cyprus.webp" },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    flag: "/imgs/icons/czech.webp",
    languageOptions: CZECH_LANGUAGE_OPTIONS,
  },
  { slug: "uk", name: "United Kingdom", flag: "/imgs/icons/uk.webp" },
  { slug: "canada", name: "Canada", flag: "/imgs/icons/canada.webp" },
  // Czech-language version of the Czech Republic policies. Routable and indexed,
  // but reached through the language toggle on the Czech popup rather than as a
  // separate jurisdiction card in the /policies hub.
  {
    slug: "czech-republic-cz",
    name: "Czech Republic",
    flag: "/imgs/icons/czech.webp",
    languageOptions: CZECH_LANGUAGE_OPTIONS,
    hidden: true,
  },
];

/** Countries shown on the public /policies hub (excludes language variants). */
export const visiblePolicyCountries = policyCountries.filter((c) => !c.hidden);

export function getCountry(slug: string): PolicyCountry | undefined {
  return policyCountries.find((country) => country.slug === slug);
}
