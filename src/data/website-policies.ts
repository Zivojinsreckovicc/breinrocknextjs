/**
 * Company-wide legal pages, served at the site root (e.g. /cookie-policy).
 * Unlike country policies (/policies/<country>/<slug>), these are not tied to a
 * jurisdiction. The `slug` is the root URL segment and must match both the
 * route folder under app/(site)/ and the `slug` of the matching `websitePolicy`
 * document in Sanity ("Website Policies" folder).
 */
export type WebsitePolicyMeta = {
  slug: string;
  title: string;
};

export const websitePolicies: WebsitePolicyMeta[] = [
  { slug: "cookie-policy", title: "Cookie Policy" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-of-use", title: "Terms of Use" },
  { slug: "legal", title: "Legal" },
];
