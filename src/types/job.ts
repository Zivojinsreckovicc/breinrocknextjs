import type { PortableTextBlock } from "@portabletext/types";

export type JobSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
};

/** Normalized shape consumed by the careers listing cards. */
export type JobCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  employmentType: string;
  department: string;
  location: string;
  /** Ready-to-use href: external apply URL or a pre-filled mailto. */
  applyHref: string;
  date: string;
  featured?: boolean;
};

/** Full job posting, including rich-text body. */
export type Job = JobCard & {
  body?: PortableTextBlock[];
  seo?: JobSeo;
};
