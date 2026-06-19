import { groq } from "next-sanity";

/** Card projection shared by list queries. */
const cardFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  "category": categories[0]->title,
  author->{ name, role, image }
`;

/** Most recent posts for the blog index. */
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] {
    ${cardFields}
  }
`;

/** A single post by slug, including body + SEO. */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${cardFields},
    body,
    seo,
    author->{ name, role, image, bio }
  }
`;

/** All slugs, for static generation. */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

/* ----------------------------------- Policies ---------------------------- */

/** All policies for one country, for the country index page. */
export const policiesByCountryQuery = groq`
  *[_type == "policy" && country == $country && defined(slug.current)]
    | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    country,
    summary,
    "effectiveDate": effectiveDate
  }
`;

/** A single policy by country + slug. */
export const policyQuery = groq`
  *[_type == "policy" && country == $country && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    country,
    summary,
    "effectiveDate": effectiveDate,
    body,
    seo
  }
`;

/** Every country + slug pair, for static generation. */
export const policyParamsQuery = groq`
  *[_type == "policy" && defined(slug.current)] {
    country,
    "slug": slug.current
  }
`;
