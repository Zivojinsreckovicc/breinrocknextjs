import type { PortableTextBlock } from "@portabletext/types";

export type BlogAuthor = {
  name: string;
  role?: string;
  imageUrl?: string;
  bio?: string;
};

/** Normalized shape consumed by cards and listings. */
export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  date: string;
  category?: string;
  featured?: boolean;
  author: BlogAuthor;
};

export type BlogPostSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
};

/** Full post, including rich-text body. */
export type BlogPost = BlogPostCard & {
  body?: PortableTextBlock[];
  seo?: BlogPostSeo;
};
