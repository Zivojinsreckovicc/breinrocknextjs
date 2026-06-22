import type { PortableTextBlock } from "@portabletext/types";
import type { WebsitePolicy } from "@/types/policy";
import { websitePolicies } from "./website-policies";

/**
 * Placeholder content for the company-wide legal pages, shown until the real
 * documents are published in Sanity ("Website Policies"). Bodies are an honest
 * placeholder — editors replace the text in the CMS. AGENTS.md permits clean
 * placeholders.
 */

let keySeed = 0;
const key = () => `wpk${(keySeed += 1)}`;

function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

function placeholderBody(title: string): PortableTextBlock[] {
  return [
    p(`The ${title} for Breinrock is being finalised and will be published here shortly.`),
    p(
      "This page is managed in the content management system. Once the document is published, its full text will appear here automatically."
    ),
    p("For the current version in the meantime, contact welcome@breinrock.com."),
  ];
}

export const fallbackWebsitePolicies: WebsitePolicy[] = websitePolicies.map((page) => ({
  _id: `fallback-${page.slug}`,
  title: page.title,
  slug: page.slug,
  effectiveDate: undefined,
  body: placeholderBody(page.title),
}));
