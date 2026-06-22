import { landingSlugs } from "./src/data/landings";

type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Permanent 301 — legacy Apache `.html` URLs and renamed paths from SITE-URLS.md */
const permanent = true as const;

function htmlOnly(path: string): LegacyRedirect {
  return { source: `${path}.html`, destination: path, permanent };
}

/** Legacy path (with and without `.html`) → new destination when the slug changed. */
function moved(legacyPath: string, destination: string): LegacyRedirect[] {
  const rules: LegacyRedirect[] = [
    { source: `${legacyPath}.html`, destination, permanent },
  ];
  if (legacyPath !== destination) {
    rules.push({ source: legacyPath, destination, permanent });
  }
  return rules;
}

function policyMoved(
  legacyCountry: string,
  legacySlug: string,
  newCountry: string,
  newSlug: string
): LegacyRedirect[] {
  const destination = `/policies/${newCountry}/${newSlug}`;
  const legacyPath = `/policies/${legacyCountry}/${legacySlug}`;
  const rules: LegacyRedirect[] = [
    { source: `${legacyPath}.html`, destination, permanent },
  ];
  // Skip the no-extension rule when the slug is unchanged — it would redirect
  // the page to itself (ERR_TOO_MANY_REDIRECTS).
  if (legacyPath !== destination) {
    rules.push({ source: legacyPath, destination, permanent });
  }
  return rules;
}

function policyHub(
  legacyCountry: string,
  legacySlug: string,
  newCountry: string
): LegacyRedirect[] {
  const destination = `/policies/${newCountry}`;
  return [
    {
      source: `/policies/${legacyCountry}/${legacySlug}.html`,
      destination,
      permanent,
    },
    {
      source: `/policies/${legacyCountry}/${legacySlug}`,
      destination,
      permanent,
    },
  ];
}

/** Legacy blog post slugs (file lived under `/blog/posts/`). */
const LEGACY_BLOG_POST_SLUGS = [
  "baas-news",
  "crossborder-advantages",
  "fintech-ai",
  "local-payments-evolving",
  "local-rails-vs-swift-payments",
  "multycurrency-account",
  "neobank-considerations",
  "realestate-investing",
  "what-is-baas",
] as const;

/** Pages whose Next.js route matches the legacy extensionless path — only `.html` needed. */
const SAME_PATH_PAGES = [
  "about",
  "accounts",
  "contact",
  "careers",
  "products",
] as const;

/** Legacy root filename → new App Router path (product renames, legal hub, etc.). */
const MOVED_ROOT_PAGES: ReadonlyArray<readonly [string, string]> = [
  ["index", "/"],
  ["baas", "/products/banking-as-a-service"],
  ["bpn-international", "/products/bpn-international"],
  ["breinrock-payment-network", "/products/payment-network"],
  ["foreign-exchange", "/products/foreign-exchange"],
  ["prepaid-cards", "/products/personal-cards"],
  ["thankyou", "/thank-you"],
  ["legal", "/legal"],
  ["cookiepolicy", "/cookie-policy"],
  ["privacypolicy", "/privacy-policy"],
  ["terms-of-use", "/terms-of-use"],
  ["job-details", "/careers"],
];

/** Legacy `/policies/{country}/` folder → new country slug. */
const MOVED_POLICY_COUNTRIES: ReadonlyArray<readonly [string, string]> = [
  ["ca", "canada"],
  ["cz", "czech-republic"],
];

/**
 * Legacy policy HTML filenames → new `/policies/{country}/{slug}` paths.
 * Country folders `uae` and `uk` are unchanged; `ca` → `canada`, `cz` → `czech-republic`.
 */
const MOVED_POLICIES: ReadonlyArray<
  readonly [legacyCountry: string, legacySlug: string, newCountry: string, newSlug: string]
> = [
  // Canada
  ["ca", "ca-disclaimer", "canada", "disclaimer"],
  ["ca", "ca-termsandconditions", "canada", "terms-and-conditions"],
  ["ca", "ca-termsofservice", "canada", "terms-of-service"],
  // Czech Republic
  ["cz", "cz-account-cancellation", "czech-republic", "account-cancellation"],
  ["cz", "cz-account-opening", "czech-republic", "opening-and-using-account"],
  ["cz", "cz-aml", "czech-republic", "aml"],
  ["cz", "cz-client-payments", "czech-republic", "client-payment-methods"],
  ["cz", "cz-client-rights", "czech-republic", "client-rights-and-obligations"],
  ["cz", "cz-data-protection", "czech-republic", "personal-data-protection"],
  ["cz", "cz-final-provisions", "czech-republic", "final-provisions"],
  ["cz", "cz-general-terms", "czech-republic", "basic-provisions"],
  ["cz", "cz-payment-management", "czech-republic", "client-payment-methods"],
  ["cz", "cz-precontractual-info", "czech-republic", "pre-contractual-information"],
  ["cz", "cz-provider-rights", "czech-republic", "provider-rights-and-obligations"],
  ["cz", "cz-service-availability", "czech-republic", "service-availability"],
  ["cz", "cz-topups-info", "czech-republic", "top-ups-and-payment-info"],
  // UAE
  ["uae", "client-money-disclosure", "uae", "client-money-disclosure"],
  ["uae", "uae-complaints", "uae", "complaints"],
  ["uae", "uae-payments-terms", "uae", "payment-platform-terms"],
  // UK
  ["uk", "pushpayment", "uk", "app-fraud-awareness"],
  ["uk", "uk-complaints-log", "uk", "complaints"],
  ["uk", "uk-complaints", "uk", "complaints"],
  ["uk", "uk-contact", "uk", "contact-details"],
  ["uk", "uk-disclaimers", "uk", "disclaimers-and-statements"],
  ["uk", "uk-money-protection", "uk", "how-is-your-money-protected"],
  ["uk", "uk-vulnerability", "uk", "customer-vulnerability"],
];

/** Policies with no direct successor — send to the country hub. */
const POLICY_HUB_REDIRECTS: ReadonlyArray<
  readonly [legacyCountry: string, legacySlug: string, newCountry: string]
> = [
  ["cz", "cz-complaints", "czech-republic"],
  ["cz", "cz-prohibited-activities", "czech-republic"],
];

/**
 * All legacy URL redirects for the static HTML site → Next.js App Router.
 * See `SITE-URLS.md` for the full inventory.
 */
export function getLegacyRedirects(): LegacyRedirect[] {
  const redirects: LegacyRedirect[] = [];

  // Google Ads landings — same slug, strip `.html` only.
  for (const slug of landingSlugs) {
    redirects.push(htmlOnly(`/${slug}`));
  }

  // Marketing pages with unchanged paths.
  for (const page of SAME_PATH_PAGES) {
    redirects.push(htmlOnly(`/${page}`));
  }

  // Renamed root pages.
  for (const [legacyPath, destination] of MOVED_ROOT_PAGES) {
    redirects.push(...moved(`/${legacyPath}`, destination));
  }

  // Blog index + posts (legacy used `/blog/posts/{slug}`).
  redirects.push(
    { source: "/blog/index.html", destination: "/blog", permanent },
    { source: "/blog.html", destination: "/blog", permanent },
    { source: "/blog/posts/:slug.html", destination: "/blog/:slug", permanent },
    { source: "/blog/posts/:slug", destination: "/blog/:slug", permanent }
  );

  // Wrong canonical paths that omitted `/posts/` (SITE-URLS.md § Blog legacy mismatches).
  for (const slug of LEGACY_BLOG_POST_SLUGS) {
    redirects.push(htmlOnly(`/blog/${slug}`));
  }

  // Policy country folder renames (`/policies/ca` → `/policies/canada`).
  for (const [legacyCountry, newCountry] of MOVED_POLICY_COUNTRIES) {
    redirects.push(
      ...moved(`/policies/${legacyCountry}`, `/policies/${newCountry}`)
    );
  }

  // Individual policy documents.
  for (const [legacyCountry, legacySlug, newCountry, newSlug] of MOVED_POLICIES) {
    redirects.push(
      ...policyMoved(legacyCountry, legacySlug, newCountry, newSlug)
    );
  }

  for (const [legacyCountry, legacySlug, newCountry] of POLICY_HUB_REDIRECTS) {
    redirects.push(...policyHub(legacyCountry, legacySlug, newCountry));
  }

  // Broken path referenced in llms.txt — no page ever existed.
  redirects.push(...moved("/news-pages", "/blog"));

  return redirects;
}
