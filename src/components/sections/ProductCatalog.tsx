import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/layout/icons";
import { productCatalog as defaultItems } from "@/data/home";
import type { CatalogProduct } from "@/data/home";
import {
  BuildingIcon,
  CreditCardIcon,
  ExchangeIcon,
  GlobeIcon,
  LayersIcon,
  SendIcon,
} from "./icons";

const iconMap = {
  accounts: BuildingIcon,
  network: SendIcon,
  international: GlobeIcon,
  cards: CreditCardIcon,
  fx: ExchangeIcon,
  baas: LayersIcon,
} as const;

type ProductCatalogProps = {
  items?: CatalogProduct[];
};

/**
 * "Explore Our Solutions" — a simple card grid of every Breinrock product,
 * each linking through to its dedicated page.
 */
export function ProductCatalog({ items = defaultItems }: ProductCatalogProps) {
  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Explore Our Solutions
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={index * 80} className="h-full">
                <Link
                  href={item.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-arctic-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-blue/40 hover:bg-white/[0.05]"
                >
                  <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-xl bg-action-blue/15 text-action-blue ring-1 ring-action-blue/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative z-10 mt-5 text-xl font-bold text-arctic-white">
                    {item.title}
                  </h3>
                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-steel-neutral/70">
                    {item.description}
                  </p>
                  <span className="relative z-10 mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors group-hover:text-arctic-white">
                    Learn more
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
