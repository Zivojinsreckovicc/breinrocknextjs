import type { PortableTextBlock } from "@portabletext/types";

export type PolicySeo = {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
};

/** Listing shape (no body). */
export type PolicyListItem = {
  _id: string;
  title: string;
  slug: string;
  country: string;
  summary?: string;
  effectiveDate?: string;
};

/** Full policy with body. */
export type Policy = PolicyListItem & {
  body?: PortableTextBlock[];
  seo?: PolicySeo;
};

/**
 * Company-wide legal page (Cookie Policy, Privacy Policy, Terms of Use, Legal).
 * Not tied to a jurisdiction; served at the site root (e.g. /cookie-policy).
 */
export type WebsitePolicy = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  effectiveDate?: string;
  body?: PortableTextBlock[];
  seo?: PolicySeo;
};
