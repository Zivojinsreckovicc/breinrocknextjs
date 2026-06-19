import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { policyCountries } from "@/data/policy-countries";
import { landingSlugs } from "@/data/landings";
import { getPosts, getPolicyParams } from "@/sanity/fetch";

// Regenerate hourly so newly published CMS content is picked up.
export const revalidate = 3600;

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/payment-network", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/bpn-international", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/foreign-exchange", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/banking-as-a-service", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/personal-cards", priority: 0.8, changeFrequency: "monthly" },
  { path: "/accounts", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/policies", priority: 0.4, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const landingEntries: MetadataRoute.Sitemap = landingSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const countryEntries: MetadataRoute.Sitemap = policyCountries.map((country) => ({
    url: `${SITE_URL}/policies/${country.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  // CMS-driven routes. The fetchers fall back to static content when Sanity is
  // unconfigured/offline, so the sitemap always builds.
  const [posts, policies] = await Promise.all([
    getPosts(1000),
    getPolicyParams(),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const parsed = post.date ? new Date(post.date) : now;
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  const policyEntries: MetadataRoute.Sitemap = policies.map((policy) => ({
    url: `${SITE_URL}/policies/${policy.country}/${policy.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...staticEntries,
    ...landingEntries,
    ...countryEntries,
    ...postEntries,
    ...policyEntries,
  ];
}
