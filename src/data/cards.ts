/**
 * Rock "N" Pay prepaid card content. Kept separate from the section
 * components so the card sections stay reusable with different data.
 */

export type CardTier = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
};

export const cardTiers: CardTier[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Simple. Secure. Global.",
    description:
      "A streamlined solution for everyday spending — security and ease of use across 150+ countries. Available in EUR and GBP.",
    features: [
      "Physical & virtual card",
      "Real-time monitoring",
      "Global Mastercard acceptance",
    ],
    image: "/imgs/cardimages/breinrock-credit-card.webp",
    alt: "Breinrock Standard prepaid Mastercard",
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Smart Payments, Exclusive Benefits",
    description:
      "Premium benefits for frequent travellers, with concierge services, lounge access, and comprehensive travel insurance.",
    features: [
      "1,700+ airport lounges",
      "Concierge services",
      "Comprehensive travel insurance",
      "Multi-currency support",
    ],
    image: "/imgs/cardimages/breinrock-black-mockup.webp",
    alt: "Breinrock Elite prepaid Mastercard",
  },
  {
    id: "elite-plus",
    name: "Elite+",
    tagline: "The Ultimate Financial Experience",
    description:
      "Designed for high-net-worth individuals and frequent travellers. All Elite benefits plus an exclusive payments concierge.",
    features: [
      "All Elite benefits",
      "Exclusive payments concierge",
      "Priority support & higher limits",
      "Multi-currency support",
    ],
    image: "/imgs/cardimages/card-gold-mockup.webp",
    alt: "Breinrock Elite+ gold prepaid Mastercard",
  },
];

export type CardFeature = {
  title: string;
  description: string;
  icon: "card" | "globe" | "sliders" | "bell" | "lock" | "plane";
};

export const cardFeatures: CardFeature[] = [
  {
    title: "Physical & Virtual Cards",
    description:
      "Get a physical Mastercard delivered to your door, or issue a virtual card instantly for online use.",
    icon: "card",
  },
  {
    title: "Global Acceptance",
    description:
      "Accepted at over 50 million locations and ATMs in 150+ countries worldwide.",
    icon: "globe",
  },
  {
    title: "Real-Time Controls",
    description:
      "Set spending limits, freeze and unfreeze cards, and monitor every transaction as it happens.",
    icon: "sliders",
  },
  {
    title: "Instant Notifications",
    description:
      "Receive real-time alerts for every transaction so you always know where your money goes.",
    icon: "bell",
  },
  {
    title: "3D Secure",
    description:
      "Enhanced fraud protection with 3D Secure authentication for online purchases.",
    icon: "lock",
  },
  {
    title: "Travel Ready",
    description:
      "Multi-currency support with no hidden FX markup. Airport lounge access on Elite tiers.",
    icon: "plane",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const cardFaqs: FaqItem[] = [
  {
    question: "What is a prepaid Mastercard?",
    answer:
      "A prepaid Mastercard lets you load funds in advance and spend up to your available balance anywhere Mastercard is accepted. There is no credit line and no overdraft — you spend only what you load.",
  },
  {
    question: "What should I do if my card is lost or stolen?",
    answer:
      "Freeze the card instantly from your Breinrock account or eBanking app, then contact support to report it. We'll cancel the affected card and arrange a replacement.",
  },
  {
    question: "Can I withdraw cash from ATMs?",
    answer:
      "Yes. Your physical card works at ATMs displaying the Mastercard logo across 150+ countries. ATM operator and daily limits may apply.",
  },
  {
    question: "How do I apply for a prepaid card?",
    answer:
      "Sign in to your Breinrock account, choose your card tier, and complete the short application. Once approved, your virtual card is issued instantly and your physical card is shipped.",
  },
  {
    question: "How do I activate my card?",
    answer:
      "Activate your physical card from your Breinrock account when it arrives. Virtual cards are active as soon as they are issued.",
  },
  {
    question: "How can I load money onto my card?",
    answer:
      "Top up from your Breinrock account balance or via supported transfer methods. Funds become available as soon as they settle.",
  },
  {
    question: "Is my prepaid Mastercard secure?",
    answer:
      "Yes. Every card supports 3D Secure for online purchases, real-time transaction alerts, and instant freeze and unfreeze controls.",
  },
  {
    question: "How do I check my balance and transaction history?",
    answer:
      "Your balance and full transaction history are available anytime in your Breinrock account and eBanking app.",
  },
  {
    question: "Are there any fees?",
    answer:
      "Fees depend on your card tier and region. The full fee schedule is shown during application and is always available in your account.",
  },
  {
    question: "How do I find my card PIN?",
    answer:
      "View or reset your PIN securely from your Breinrock account. For your protection, PINs are never sent by email.",
  },
];
