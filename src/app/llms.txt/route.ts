import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/constants/site";
import { SIGN_IN_URL, SIGN_UP_URL } from "@/constants/links";
import { policyCountries } from "@/data/policy-countries";
import { landingPages } from "@/data/landings";
import { getPosts } from "@/sanity/fetch";

// Served at /llms.txt — a curated, link-rich overview for AI/answer engines
// (the llmstxt.org convention). Refreshed hourly to track new blog content.
export const revalidate = 3600;

const products = [
  {
    title: "Local & Cross-Border Payments",
    path: "/products/payment-network",
    description:
      "Local payment rails across the UK, EU, US, Canada and UAE, plus SWIFT to 180+ countries.",
  },
  {
    title: "BPN International",
    path: "/products/bpn-international",
    description:
      "Local payouts in 60+ countries in the recipient's currency — faster and cheaper than SWIFT.",
  },
  {
    title: "Online Foreign Exchange",
    path: "/products/foreign-exchange",
    description: "24/7 currency conversion between 60+ pairs at competitive rates.",
  },
  {
    title: "White-Label BaaS",
    path: "/products/banking-as-a-service",
    description:
      "Offer accounts, payments and FX under your own brand without a full banking licence.",
  },
  {
    title: "Rock 'N' Pay Prepaid Cards",
    path: "/products/personal-cards",
    description:
      "Mastercard-enabled prepaid cards for domestic and international use with real-time tracking.",
  },
];

const keyPages = [
  {
    title: "Accounts",
    path: "/accounts",
    description: "Multi-currency IBAN accounts for businesses and individuals.",
  },
  {
    title: "About",
    path: "/about",
    description: "Breinrock's mission, team and global presence.",
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Get in touch with the Breinrock team.",
  },
  {
    title: "Careers",
    path: "/careers",
    description: "Open roles at Breinrock.",
  },
  {
    title: "Blog",
    path: "/blog",
    description: "Insights on payments, foreign exchange and modern banking.",
  },
];

/** One `- [title](url): description` list item with whitespace collapsed. */
function link(title: string, url: string, description: string): string {
  const clean = description.replace(/\s+/g, " ").trim();
  return `- [${title}](${url})${clean ? `: ${clean}` : ""}`;
}

export async function GET() {
  const posts = await getPosts(50);

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Breinrock is a financial technology company offering multi-currency accounts, local and cross-border payments, online foreign exchange, prepaid cards, and white-label Banking-as-a-Service through regulated entities across six jurisdictions (Switzerland, the UAE, Cyprus, the Czech Republic, the United Kingdom, and Canada).",
    "",
    "## Products",
    ...products.map((p) => link(p.title, `${SITE_URL}${p.path}`, p.description)),
    "",
    "## Key pages",
    ...keyPages.map((p) => link(p.title, `${SITE_URL}${p.path}`, p.description)),
    "",
    "## Google Ads landing pages",
    ...landingPages.map((p) =>
      link(p.heading, `${SITE_URL}/${p.slug}`, p.subheading)
    ),
    "",
    "## Blog",
    ...posts.map((p) =>
      link(p.title, `${SITE_URL}/blog/${p.slug}`, p.excerpt || "Breinrock blog post.")
    ),
    "",
    "## Policies",
    ...policyCountries.map((c) =>
      link(
        `${c.name} policies`,
        `${SITE_URL}/policies/${c.slug}`,
        `Legal and regulatory policies for Breinrock in ${c.name}.`
      )
    ),
    "",
    "## Account access",
    link("Log in", SIGN_IN_URL, "Sign in to the Breinrock eBanking portal."),
    link("Sign up", SIGN_UP_URL, "Open a Breinrock account."),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
