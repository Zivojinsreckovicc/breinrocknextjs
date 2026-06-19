import type { PortableTextBlock } from "@portabletext/types";
import type { Policy } from "@/types/policy";
import { policyCountries } from "./policy-countries";

/**
 * Placeholder policies shown until real ones are published in Sanity. The set
 * of documents per country mirrors each jurisdiction's actual policy list, so
 * the structure (and the footer popup) is correct from day one. Bodies are an
 * honest placeholder — editors replace the text in the CMS. Countries with an
 * empty list (Switzerland, Cyprus) direct users to contact instead.
 * AGENTS.md permits clean placeholders.
 */

let keySeed = 0;
const key = () => `pk${(keySeed += 1)}`;

function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

function placeholderBody(title: string, countryName: string): PortableTextBlock[] {
  return [
    p(
      `The ${title} for Breinrock in ${countryName} is being finalised and will be published here shortly.`
    ),
    p(
      "This page is managed in the content management system. Once the document is published, its full text will appear here automatically."
    ),
    p("For the current version in the meantime, contact welcome@breinrock.com."),
  ];
}

type PolicyStub = { slug: string; title: string };

/** Policy documents per country (slug → list). Empty = contact-only. */
const POLICIES_BY_COUNTRY: Record<string, PolicyStub[]> = {
  switzerland: [],
  cyprus: [],
  uae: [
    { slug: "payment-platform-terms", title: "Payment Platform Terms (DIFC)" },
    { slug: "complaints", title: "UAE Complaints" },
    { slug: "client-money-disclosure", title: "Client Money Disclosure" },
  ],
  "czech-republic": [
    { slug: "basic-provisions", title: "Basic provisions of the Terms and Conditions" },
    { slug: "pre-contractual-information", title: "Pre-contractual Information" },
    { slug: "opening-and-using-account", title: "Opening and using the Client's account in the system" },
    { slug: "client-payment-methods", title: "Client Payment Methods" },
    { slug: "top-ups-and-payment-info", title: "Top-ups and Payment Info" },
    { slug: "provider-rights-and-obligations", title: "Rights and obligations of the Provider" },
    { slug: "client-rights-and-obligations", title: "Rights and obligations of the Client" },
    { slug: "account-cancellation", title: "Account Cancellation" },
    { slug: "service-availability", title: "Service Availability" },
    { slug: "personal-data-protection", title: "Personal data protection" },
    { slug: "aml", title: "AML (Anti-Money Laundering)" },
    { slug: "final-provisions", title: "Final Provisions, Changes to the Terms and Conditions" },
  ],
  uk: [
    { slug: "app-fraud-awareness", title: "APP Fraud Awareness" },
    { slug: "complaints", title: "Complaints" },
    { slug: "contact-details", title: "Contact Details" },
    { slug: "customer-vulnerability", title: "Customer Vulnerability" },
    { slug: "disclaimers-and-statements", title: "Disclaimers & Statements" },
    { slug: "how-is-your-money-protected", title: "How Is Your Money Protected?" },
  ],
  canada: [
    { slug: "terms-and-conditions", title: "Terms and Conditions" },
    { slug: "terms-of-service", title: "Terms of Service" },
    { slug: "disclaimer", title: "Disclaimer" },
  ],
};

export const fallbackPolicies: Policy[] = policyCountries.flatMap((country) =>
  (POLICIES_BY_COUNTRY[country.slug] ?? []).map((stub) => ({
    _id: `fallback-${country.slug}-${stub.slug}`,
    title: stub.title,
    slug: stub.slug,
    country: country.slug,
    effectiveDate: undefined,
    body: placeholderBody(stub.title, country.name),
  }))
);
