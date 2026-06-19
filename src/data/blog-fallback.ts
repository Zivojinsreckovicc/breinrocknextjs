import type { PortableTextBlock } from "@portabletext/types";
import type { BlogPost } from "@/types/blog";

/**
 * Static fallback blog posts. Rendered when the Sanity dataset has no
 * published posts yet (or cannot be reached), so the blog is presentable
 * before any content is authored. AGENTS.md permits static fallback content.
 * Once real posts exist in Sanity, they replace these automatically.
 */

let keySeed = 0;
const key = () => `k${(keySeed += 1)}`;

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

function sampleBody(intro: string): PortableTextBlock[] {
  return [
    p(intro),
    h("Why it matters"),
    p(
      "Moving money across borders has historically meant slow settlement, opaque fees, and limited visibility. Modern infrastructure changes that equation by combining local rails with transparent pricing and real-time tracking."
    ),
    p(
      "For finance teams, the practical impact is fewer reconciliation headaches and faster access to funds — without sacrificing the controls and reporting that regulated operations require."
    ),
    h("What to look for"),
    p(
      "Evaluate providers on coverage, settlement speed, currency support, and the quality of human support behind the platform. The right partner pairs strong technology with people who understand your business."
    ),
  ];
}

export const fallbackPosts: BlogPost[] = [
  {
    _id: "fallback-1",
    title: "How local payment rails cut cross-border settlement times",
    slug: "local-payment-rails-settlement-times",
    excerpt:
      "Routing payments over domestic rails — rather than legacy correspondent banking — can turn multi-day transfers into same-day settlement.",
    coverImageUrl: "/imgs/world-blue.webp",
    coverImageAlt: "Stylized world map representing global payment routes",
    date: "2026-05-28T09:00:00.000Z",
    category: "Payments",
    featured: true,
    author: { name: "Anastasia", role: "Head of Payments", imageUrl: "/imgs/team/anastasia.webp" },
    body: sampleBody(
      "Local payment rails let businesses pay recipients as if they were a domestic counterparty, sidestepping the delays and intermediary fees of traditional correspondent banking."
    ),
  },
  {
    _id: "fallback-2",
    title: "A practical guide to multicurrency accounts for SMEs",
    slug: "multicurrency-accounts-guide-smes",
    excerpt:
      "Holding and converting EUR, GBP, USD and CAD in one place gives growing businesses control over timing, costs, and cash flow.",
    coverImageUrl: "/imgs/mobile-app-phone.webp",
    coverImageAlt: "Mobile banking app showing account balances",
    date: "2026-05-20T09:00:00.000Z",
    category: "Guides",
    author: { name: "Angela", role: "Product Lead", imageUrl: "/imgs/team/angela.webp" },
    body: sampleBody(
      "A multicurrency account lets a business receive, hold, and send in several currencies without forced conversions — useful for any company with international suppliers or customers."
    ),
  },
  {
    _id: "fallback-3",
    title: "What white-label BaaS means for your product roadmap",
    slug: "white-label-baas-product-roadmap",
    excerpt:
      "Banking-as-a-Service lets you embed accounts, payments, and FX under your own brand — without holding a full banking licence.",
    coverImageUrl: "/imgs/baas-group.webp",
    coverImageAlt: "Illustration of banking-as-a-service building blocks",
    date: "2026-05-12T09:00:00.000Z",
    category: "Product",
    author: { name: "Jean-Daniel", role: "Solutions Architect", imageUrl: "/imgs/team/jeandaniel.webp" },
    body: sampleBody(
      "White-label BaaS gives product teams the building blocks of a bank — accounts, payments, cards, and FX — exposed through APIs and presented under their own brand."
    ),
  },
  {
    _id: "fallback-4",
    title: "Understanding 3D Secure and card fraud prevention",
    slug: "3d-secure-card-fraud-prevention",
    excerpt:
      "How modern authentication reduces online card fraud while keeping the checkout experience fast for legitimate customers.",
    coverImageUrl: "/imgs/cardimages/card-gold-mockup.webp",
    coverImageAlt: "Breinrock gold prepaid Mastercard",
    date: "2026-05-04T09:00:00.000Z",
    category: "Compliance",
    author: { name: "Paula", role: "Risk & Compliance", imageUrl: "/imgs/team/paularg.webp" },
    body: sampleBody(
      "3D Secure adds an authentication step to online card payments, shifting much of the fraud risk away from merchants while improving trust for cardholders."
    ),
  },
  {
    _id: "fallback-5",
    title: "Inside Breinrock's six-office global support model",
    slug: "global-support-model",
    excerpt:
      "Six offices across four continents mean local expertise and real human support — wherever your business operates.",
    coverImageUrl: "/imgs/landingcontact.webp",
    coverImageAlt: "Breinrock support team at work",
    date: "2026-04-26T09:00:00.000Z",
    category: "Company",
    author: { name: "Anastasia", role: "Head of Payments", imageUrl: "/imgs/team/anastasia.webp" },
    body: sampleBody(
      "Global reach only matters if there are people behind it. Breinrock pairs its platform with relationship managers and support teams across six offices."
    ),
  },
  {
    _id: "fallback-6",
    title: "Choosing between SWIFT, SEPA, and local payouts",
    slug: "swift-sepa-local-payouts",
    excerpt:
      "A quick framework for deciding which payment method fits each transaction by speed, cost, currency, and destination.",
    coverImageUrl: "/imgs/phone.webp",
    coverImageAlt: "Phone showing a payment being sent",
    date: "2026-04-18T09:00:00.000Z",
    category: "Payments",
    author: { name: "Angela", role: "Product Lead", imageUrl: "/imgs/team/angela.webp" },
    body: sampleBody(
      "SWIFT, SEPA, and local payout networks each have a sweet spot. Matching the method to the transaction keeps costs down and recipients happy."
    ),
  },
];
