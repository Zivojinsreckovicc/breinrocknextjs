import type { ReactNode } from "react";
import {
  AU, BG, CA, CL, EU, GB, HK, HU, IL, KE, MA, NO, NZ, PL, SA, SE, SG, TN, US,
} from "country-flag-icons/react/1x1";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import type { SupportedCurrency } from "@/data/bpn";

/**
 * Square (1x1) flag SVGs keyed by ISO 3166-1 alpha-2 code. Named imports keep
 * this tree-shaken to just the flags actually used. Add a flag here when a new
 * supported currency is introduced.
 */
const FLAGS: Record<string, typeof US> = {
  AU, BG, CA, CL, EU, GB, HK, HU, IL, KE, MA, NO, NZ, PL, SA, SE, SG, TN, US,
};

type CurrencyCoverageProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  currencies: SupportedCurrency[];
  tone?: "frame" | "raised";
};

/**
 * Compact grid of supported currencies (code chip + country). One reveal wraps
 * the whole grid to stay light even with many items.
 */
export function CurrencyCoverage({
  eyebrow,
  title,
  subtitle,
  currencies,
  tone = "raised",
}: CurrencyCoverageProps) {
  return (
    <section
      className={
        tone === "raised"
          ? "bg-midnight-raised py-24 lg:py-32"
          : "bg-midnight-frame py-24 lg:py-32"
      }
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Reveal className="mt-14">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {currencies.map((currency) => {
              const Flag = FLAGS[currency.countryCode];
              return (
              <li
                key={currency.code}
                className="flex items-center gap-3 rounded-xl border border-arctic-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-action-blue/15 text-sm font-bold text-action-blue ring-1 ring-inset ring-white/15">
                  {Flag ? (
                    <Flag
                      role="img"
                      aria-label={`${currency.country} flag`}
                      className="size-full object-cover"
                    />
                  ) : (
                    currency.code
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-arctic-white">
                    {currency.code}
                  </span>
                  <span className="block truncate text-xs text-steel-neutral/60">
                    {currency.country}
                  </span>
                </span>
              </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
