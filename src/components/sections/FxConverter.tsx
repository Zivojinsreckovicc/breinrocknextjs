"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ExchangeIcon } from "./icons";

/** Primary currencies and their indicative units per 1 USD. */
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AED"] as const;
type Currency = (typeof CURRENCIES)[number];
const BASE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AED: 3.67,
};

const money = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const selectStyles =
  "rounded-lg border border-arctic-white/15 bg-midnight-frame/60 px-3 py-2 text-sm font-semibold text-arctic-white focus:border-action-blue/60 focus:outline-none focus:ring-2 focus:ring-action-blue/30";

/**
 * Lightweight, on-brand FX converter for the hero. Indicative cross-rates among
 * the primary currencies, with a gentle "drift" so rates feel live (disabled
 * under reduced-motion). No network calls — purely illustrative.
 */
export function FxConverter({ className }: { className?: string }) {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("EUR");
  const [rates, setRates] = useState<Record<Currency, number>>(BASE_RATES);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      // Re-derive from the base table with small noise so values stay realistic.
      setRates(() => {
        const next = { ...BASE_RATES };
        for (const c of CURRENCIES) {
          if (c === "USD") continue;
          next[c] = +(BASE_RATES[c] * (1 + (Math.random() - 0.5) * 0.004)).toFixed(4);
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const numericAmount = Number(amount) || 0;
  const crossRate = rates[to] / rates[from];
  const converted = numericAmount * crossRate;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-sm rounded-2xl border border-arctic-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-arctic-white">
          <ExchangeIcon className="size-4 text-action-blue" />
          Currency exchange
        </span>
        <span className="flex items-center gap-1.5 text-xs text-steel-neutral/60">
          <span className="size-1.5 animate-pulse rounded-full bg-action-blue" />
          Indicative
        </span>
      </div>

      {/* From */}
      <div className="mt-5">
        <label htmlFor="fx-amount" className="text-xs font-medium uppercase tracking-wide text-steel-neutral/60">
          You send
        </label>
        <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-arctic-white/15 bg-midnight-frame/40 p-2 pl-4">
          <input
            id="fx-amount"
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-lg font-bold text-arctic-white tabular-nums focus:outline-none"
          />
          <label className="sr-only" htmlFor="fx-from">From currency</label>
          <select
            id="fx-from"
            value={from}
            onChange={(e) => setFrom(e.target.value as Currency)}
            className={selectStyles}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c} className="bg-midnight-frame">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap */}
      <div className="my-2 flex justify-center">
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          className="flex size-9 items-center justify-center rounded-full border border-arctic-white/15 bg-midnight-frame text-action-blue transition-colors hover:border-action-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-blue"
        >
          <ExchangeIcon className="size-4 rotate-90" />
        </button>
      </div>

      {/* To */}
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-steel-neutral/60">
          Recipient gets
        </span>
        <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-action-blue/30 bg-action-blue/10 p-2 pl-4">
          <output className="w-full text-lg font-bold text-arctic-white tabular-nums">
            {money.format(converted)}
          </output>
          <label className="sr-only" htmlFor="fx-to">To currency</label>
          <select
            id="fx-to"
            value={to}
            onChange={(e) => setTo(e.target.value as Currency)}
            className={selectStyles}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c} className="bg-midnight-frame">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-steel-neutral/60">
        1 {from} = <span className="font-semibold text-arctic-white tabular-nums">{crossRate.toFixed(4)}</span> {to}
      </p>
    </div>
  );
}
