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
