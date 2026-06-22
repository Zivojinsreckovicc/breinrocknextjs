import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/layout/icons";
import { products as defaultProducts } from "@/data/home";
import type { Product, ProductFeature } from "@/data/home";
import {
  BadgeIcon,
  CodeIcon,
  GlobeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SlidersIcon,
  SwapVerticalIcon,
} from "./icons";

/* -------------------------------------------------------------------------- */
/*  Illustrative visuals                                                      */
/* -------------------------------------------------------------------------- */

type NetworkTile = {
  label: string;
  subtitle: string;
  icon: "sepa" | "swift" | "flag";
  flag?: string;
};

const networkTiles: NetworkTile[] = [
  { label: "SEPA", subtitle: "EUR · EU", icon: "sepa" },
  { label: "SWIFT", subtitle: "40+ currencies", icon: "swift" },
  { label: "FPS · CHAPS", subtitle: "GBP · UK", icon: "flag", flag: "/imgs/licenses/sepa/uk.png" },
  { label: "ACH · Fedwire", subtitle: "USD · US", icon: "flag", flag: "/imgs/licenses/sepa/usa.png" },
  { label: "EFT · Interac", subtitle: "CAD · Canada", icon: "flag", flag: "/imgs/licenses/sepa/canada.png" },
  { label: "Local AED", subtitle: "AED · UAE", icon: "flag", flag: "/imgs/licenses/sepa/uae.png" },
];

function NetworkTileIcon({ tile }: { tile: NetworkTile }) {
  if (tile.icon === "sepa") {
    return <EuFlagIcon className="size-11 rounded-full ring-1 ring-white/10" />;
  }

  if (tile.icon === "swift") {
    return (
      <span className="flex size-11 items-center justify-center rounded-full border border-action-blue/40 bg-action-blue/30">
        <GlobeIcon className="size-5 text-action-blue" />
      </span>
    );
  }

  if (tile.flag) {
    return (
      <Image
        src={tile.flag}
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full object-cover ring-1 ring-white/10"
      />
    );
  }

  return null;
}

function NetworksVisual() {
  return (
    <div className="grid w-full grid-cols-3 gap-2.5">
      {networkTiles.map((tile) => (
        <div
          key={tile.label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#111a3c] px-1.5 pb-3.5 pt-4 text-center"
        >
          <span className="flex h-11 items-center justify-center">
            <NetworkTileIcon tile={tile} />
          </span>
          <span className="text-[11.5px] font-bold leading-snug tracking-wide text-arctic-white">
            {tile.label}
          </span>
          <span className="-mt-1 text-[10px] leading-snug text-white/[0.38]">{tile.subtitle}</span>
        </div>
      ))}
    </div>
  );
}

// Circular European-Union flag.
function EuFlagIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/imgs/licenses/sepa/eu.png"
      alt=""
      width={44}
      height={44}
      className={cn("rounded-full object-cover", className)}
    />
  );
}

function CurrencyPill({ code }: { code: "USD" | "EUR" }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] py-1 pl-1 pr-2.5 text-[11px] font-semibold text-arctic-white">
      {code === "USD" ? (
        <Image
          src="/imgs/licenses/sepa/usa.png"
          alt=""
          width={18}
          height={18}
          className="size-[18px] rounded-full object-cover"
        />
      ) : (
        <EuFlagIcon className="size-[18px]" />
      )}
      {code}
    </span>
  );
}

type FxLeg = {
  label: string;
  amount: string;
  balance: string;
  code: "USD" | "EUR";
};

function FxLegBox({ leg }: { leg: FxLeg }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-steel-neutral/55">
            {leg.label}
          </span>
          <span className="mt-1 text-[1.7rem] font-bold leading-none text-arctic-white">
            {leg.amount}
          </span>
          <span className="mt-1.5 text-[10px] leading-none text-steel-neutral/45">
            {leg.balance}
          </span>
        </div>
        <CurrencyPill code={leg.code} />
      </div>
    </div>
  );
}

function FxVisual() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0c0d29] p-3.5">
      <div className="relative flex flex-col gap-4">
        <FxLegBox
          leg={{
            label: "Sell",
            amount: "1,000.00",
            balance: "****4521 · Bal: 12,450.00",
            code: "USD",
          }}
        />
        <FxLegBox
          leg={{
            label: "Buy",
            amount: "920.40",
            balance: "****7833 · Bal: 3,200.00",
            code: "EUR",
          }}
        />

        <span
          className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#4f8ef0] to-[#1664c4] text-arctic-white shadow-[0_0_0_4px_#0c0d29,0_4px_14px_rgba(22,100,196,0.5)] ring-1 ring-white/25"
          aria-hidden="true"
        >
          <SwapVerticalIcon className="size-4" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <span className="flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center text-[11px] font-medium text-steel-neutral/55">
          1 USD = 0.9204 EUR
        </span>
        <span className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#5e9bf5] to-[#3267c9] px-3 py-3 text-xs font-semibold text-arctic-white shadow-[0_6px_16px_rgba(22,100,196,0.4)]">
          Convert
        </span>
      </div>
    </div>
  );
}

const featureIconMap = {
  "White Label": PaletteIcon,
  "API Access": CodeIcon,
  Configurable: SlidersIcon,
  "No License": BadgeIcon,
  Regulated: ShieldCheckIcon,
} as const;

function FeaturesVisual({ features }: { features: ProductFeature[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {features.map((feature) => {
        const Icon =
          featureIconMap[feature.label as keyof typeof featureIconMap] ??
          BadgeIcon;
        return (
          <div
            key={feature.label}
            className="flex w-[calc((100%-1.25rem)/3)] flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#111a3c] px-2 pb-3.5 pt-4 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-white/[0.05] text-steel-neutral ring-1 ring-white/10">
              <Icon className="size-[18px]" />
            </span>
            <span className="text-[11.5px] font-bold leading-snug text-arctic-white">
              {feature.label}
            </span>
            <span className="-mt-1 text-[10px] leading-snug text-white/[0.38]">
              {feature.detail}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const cardFan = [
  {
    src: "/imgs/cardimages/card-gold-mockup.webp",
    z: "z-10",
    // Left card — fans further out and rotates more on hover.
    transform:
      "-rotate-[15deg] -translate-x-12 transition-transform duration-500 ease-out group-hover:-translate-x-[5.5rem] group-hover:-rotate-[22deg]",
  },
  {
    src: "/imgs/cardimages/breinrock-credit-card.webp",
    z: "z-10",
    // Right card.
    transform:
      "rotate-[15deg] translate-x-12 transition-transform duration-500 ease-out group-hover:translate-x-[5.5rem] group-hover:rotate-[22deg]",
  },
  {
    src: "/imgs/cardimages/breinrock-black-mockup.webp",
    z: "z-20",
    // Centre card — lifts slightly on hover.
    transform:
      "transition-transform duration-500 ease-out group-hover:-translate-y-3",
  },
] as const;

function CardsVisual() {
  return (
    <div className="relative flex h-52 w-full items-center justify-center">
      {cardFan.map((card) => (
        <div
          key={card.src}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            card.z
          )}
        >
          <div className={card.transform}>
            <Image
              src={card.src}
              alt=""
              width={320}
              height={202}
              className="w-40 drop-shadow-2xl sm:w-44"
              sizes="176px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductVisualPanel({ product }: { product: Product }) {
  switch (product.visual) {
    case "networks":
      return <NetworksVisual />;
    case "fx":
      return <FxVisual />;
    case "features":
      return product.features ? (
        <FeaturesVisual features={product.features} />
      ) : null;
    case "cards":
      return <CardsVisual />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Card + section                                                            */
/* -------------------------------------------------------------------------- */

function ProductCard({ product }: { product: Product }) {
  const isNetworks = product.visual === "networks";

  return (
    <Link
      href={product.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0e1535] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-blue/40 hover:shadow-[0_20px_56px_rgba(62,116,214,0.13)]"
    >
      {/* Upper graphic — fixed height + dotted panel so every card aligns. */}
      <div
        className={cn(
          "relative z-10 flex h-[300px] shrink-0 items-center justify-center overflow-hidden bg-[#080f28] bg-dots",
          isNetworks ? "p-[22px]" : "px-8"
        )}
      >
        <div
          className={cn(
            "w-full transition-transform duration-500 ease-out",
            isNetworks && "group-hover:scale-[1.045]"
          )}
        >
          <ProductVisualPanel product={product} />
        </div>
      </div>

      {/* Text — consistent padding; "Learn more" pinned to the bottom. */}
      <div className="relative z-10 flex flex-1 flex-col px-8 pb-8 pt-7">
        <h3 className="text-[1.15rem] font-bold text-arctic-white transition-colors duration-300 group-hover:text-[#7ab4ff]">
          {product.title}
        </h3>
        <p className="mt-2.5 text-sm leading-[1.65] text-steel-neutral/70">
          {product.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors group-hover:text-arctic-white">
          Learn more
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/**
 * "What We Offer" — a two-column grid of products, each shown with an
 * illustrative panel (payment networks, an FX widget, BaaS feature tiles,
 * or a card mockup) above its title and description.
 */
export function WhatWeOffer({ items = defaultProducts }: { items?: Product[] }) {
  return (
    <section
      id="what-we-offer"
      className="scroll-mt-20 bg-midnight-frame py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-eyebrow text-sm font-semibold uppercase tracking-[0.25em] text-action-blue">
              Products
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              What We Offer
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((product, index) => (
            <Reveal key={product.title} delay={index * 80} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
