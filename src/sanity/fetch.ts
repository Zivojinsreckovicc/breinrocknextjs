import "server-only";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./client";
import { urlForImage } from "./image";
import {
  postsQuery,
  postBySlugQuery,
  postSlugsQuery,
  policiesByCountryQuery,
  policyQuery,
  policyParamsQuery,
} from "./queries";
import { fallbackPosts } from "@/data/blog-fallback";
import { fallbackPolicies } from "@/data/policy-fallback";
import type { BlogPost, BlogPostCard } from "@/types/blog";
import type { Policy, PolicyListItem } from "@/types/policy";

type ImageWithAlt = SanityImageSource & { alt?: string };

type RawAuthor = {
  name?: string;
  role?: string;
  bio?: string;
  image?: SanityImageSource;
};

type RawPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  coverImage?: ImageWithAlt;
  category?: string;
  author?: RawAuthor;
  body?: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
    noIndex?: boolean;
  };
};

const FETCH_OPTIONS = { next: { revalidate: 60 } } as const;

function imageUrl(source: SanityImageSource | undefined, w: number, h: number) {
  if (!source) return "";
  return urlForImage(source).width(w).height(h).fit("crop").auto("format").url();
}

function normalizeCard(raw: RawPost): BlogPostCard {
  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt ?? "",
    coverImageUrl: imageUrl(raw.coverImage, 1200, 675),
    coverImageAlt: raw.coverImage?.alt ?? raw.title,
    date: raw.publishedAt ?? "",
    category: raw.category,
    featured: raw.featured,
    author: {
      name: raw.author?.name ?? "Breinrock",
      role: raw.author?.role,
      imageUrl: raw.author?.image
        ? urlForImage(raw.author.image).width(96).height(96).fit("crop").url()
        : undefined,
    },
  };
}

function normalizePost(raw: RawPost): BlogPost {
  const card = normalizeCard(raw);
  return {
    ...card,
    coverImageUrl: imageUrl(raw.coverImage, 1600, 900),
    body: raw.body,
    author: { ...card.author, bio: raw.author?.bio },
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          ogImageUrl: raw.seo.ogImage
            ? urlForImage(raw.seo.ogImage).width(1200).height(630).fit("crop").url()
            : undefined,
          noIndex: raw.seo.noIndex,
        }
      : undefined,
  };
}

/** Latest posts for the blog index. Falls back to static test posts. */
export async function getPosts(limit = 6): Promise<BlogPostCard[]> {
  try {
    const raw = await client.fetch<RawPost[]>(postsQuery, { limit }, FETCH_OPTIONS);
    if (raw && raw.length > 0) return raw.map(normalizeCard);
  } catch {
    // Sanity unreachable / not configured — fall through to fallback content.
  }
  return fallbackPosts.slice(0, limit);
}

/** A single post by slug. Falls back to static test posts. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await client.fetch<RawPost | null>(postBySlugQuery, { slug }, FETCH_OPTIONS);
    if (raw) return normalizePost(raw);
  } catch {
    // ignore and fall back
  }
  return fallbackPosts.find((post) => post.slug === slug) ?? null;
}

/** All post slugs for static generation. */
export async function getPostSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery, {}, FETCH_OPTIONS);
    if (slugs && slugs.length > 0) return slugs;
  } catch {
    // ignore and fall back
  }
  return fallbackPosts.map((post) => post.slug);
}

/* ----------------------------------- Policies ---------------------------- */

/** All policies for a country. Falls back to placeholder policies. */
export async function getPoliciesByCountry(country: string): Promise<PolicyListItem[]> {
  try {
    const raw = await client.fetch<PolicyListItem[]>(
      policiesByCountryQuery,
      { country },
      FETCH_OPTIONS
    );
    if (raw && raw.length > 0) return raw;
  } catch {
    // ignore and fall back
  }
  return fallbackPolicies.filter((policy) => policy.country === country);
}

/** A single policy by country + slug. Falls back to a placeholder policy. */
export async function getPolicy(country: string, slug: string): Promise<Policy | null> {
  try {
    const raw = await client.fetch<Policy | null>(
      policyQuery,
      { country, slug },
      FETCH_OPTIONS
    );
    if (raw) return raw;
  } catch {
    // ignore and fall back
  }
  return (
    fallbackPolicies.find(
      (policy) => policy.country === country && policy.slug === slug
    ) ?? null
  );
}

/** Every country + slug pair for static generation. */
export async function getPolicyParams(): Promise<{ country: string; slug: string }[]> {
  try {
    const raw = await client.fetch<{ country: string; slug: string }[]>(
      policyParamsQuery,
      {},
      FETCH_OPTIONS
    );
    if (raw && raw.length > 0) return raw;
  } catch {
    // ignore and fall back
  }
  return fallbackPolicies.map((policy) => ({ country: policy.country, slug: policy.slug }));
}
