import type { PortableTextBlock } from "@portabletext/types";
import type { Job } from "@/types/job";

/**
 * Static fallback job postings. Rendered when the Sanity dataset has no
 * published jobs yet (or cannot be reached), so the careers page is
 * presentable before any content is authored. AGENTS.md permits static
 * fallback content. Once real jobs exist in Sanity, they replace these
 * automatically.
 */

let keySeed = 0;
const key = () => `j${(keySeed += 1)}`;

/** Build a normal paragraph block. */
function p(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

/** Build a heading block. */
function h(text: string, style: "h2" | "h3" = "h2"): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

/** Build a bulleted list item block. */
function li(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

export const fallbackJobs: Job[] = [
  {
    _id: "fallback-python-support-engineer",
    title: "Python Support Engineer",
    slug: "python-support-engineer",
    excerpt:
      "Join our growing fintech team in Limassol as a Python Engineer combining software engineering with internal technical support — solving practical business problems, automating workflows, and building tools that improve efficiency across the company.",
    employmentType: "Full-time",
    department: "Engineering",
    location: "Limassol, Cyprus",
    applyHref:
      "mailto:welcome@breinrock.com?subject=Application%20%E2%80%94%20Python%20Support%20Engineer",
    date: "2026-01-01",
    featured: true,
    body: [
      p(
        "We're looking for a Python Support Engineer to join our growing fintech team in Limassol. This role combines hands-on software engineering with internal technical support — you'll solve practical business problems, automate workflows, and build the tools that keep the company moving efficiently."
      ),
      h("What you'll do"),
      li("Build and maintain internal tools and automations in Python."),
      li("Investigate and resolve technical issues raised across the business."),
      li("Improve data flows and integrations between internal systems."),
      li("Document solutions clearly so the wider team can self-serve."),
      h("What we're looking for"),
      li("Solid Python experience, ideally in a production environment."),
      li("A problem-solving mindset and strong written communication."),
      li("Comfort working directly with non-technical colleagues."),
      li("An interest in fintech, payments, or banking is a plus."),
      h("Why Breinrock"),
      p(
        "You'll work alongside a global team building payments and banking infrastructure across 110+ countries, with the autonomy to make a real impact from day one."
      ),
    ],
  },
];
