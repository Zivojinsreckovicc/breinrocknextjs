"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/layout/icons";
import { offices as defaultOffices } from "@/data/home";
import type { Office } from "@/data/home";

type OfficesAccordionProps = {
  offices?: Office[];
};

/**
 * Accordion list of global offices. One panel open at a time; each reveals the
 * entity, regulator/license, and registered address.
 */
export function OfficesAccordion({ offices = defaultOffices }: OfficesAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex flex-col gap-3">
      {offices.map((office, index) => {
        const isOpen = open === index;
        return (
          <li
            key={office.entity}
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
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <Image
                  src={office.flag}
                  alt={office.country}
                  width={40}
                  height={28}
                  className="h-7 w-10 shrink-0 rounded-sm object-cover"
                />
                <span className="flex flex-1 flex-wrap items-center gap-x-2">
                  <span className="text-base font-bold text-arctic-white">{office.city}</span>
                  <span className="text-xs uppercase tracking-wide text-steel-neutral/50">
                    {office.country}
                  </span>
                </span>
                {office.hq && (
                  <span className="rounded-full bg-action-blue/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-action-blue">
                    HQ
                  </span>
                )}
                <ChevronDownIcon
                  className={cn(
                    "size-5 shrink-0 text-action-blue transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5">
                  <p className="text-sm font-semibold text-arctic-white">{office.entity}</p>
                  <p className="mt-1 font-mono text-xs text-action-blue/90">{office.license}</p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-steel-neutral/70">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
