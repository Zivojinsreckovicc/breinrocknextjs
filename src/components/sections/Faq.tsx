"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";
import { PlusIcon } from "./icons";
import type { FaqItem } from "@/data/cards";

type FaqProps = {
  eyebrow?: string;
  title?: string;
  items: FaqItem[];
  /** Index of the panel open on first render; `null` = all closed. */
  defaultOpenIndex?: number | null;
};

/**
 * Accessible accordion FAQ. Answers stay in the DOM when collapsed (grid
 * collapse) so crawlers can still read them; landing pages also ship FAQPage
 * JSON-LD.
 */
export function Faq({
  eyebrow = "FAQ",
  title = "Frequently Asked Questions",
  items,
  defaultOpenIndex = 0,
}: FaqProps) {
  const [open, setOpen] = useState<number | null>(defaultOpenIndex);

  return (
    <section className="bg-midnight-frame py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <ul className="mt-12 flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-xl border transition-colors duration-300",
                  isOpen
                    ? "border-action-blue/40 bg-white/[0.05]"
                    : "border-arctic-white/10 bg-white/[0.02]"
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-arctic-white">
                      {item.question}
                    </span>
                    <PlusIcon
                      className={cn(
                        "size-5 shrink-0 text-action-blue transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-steel-neutral/70">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
