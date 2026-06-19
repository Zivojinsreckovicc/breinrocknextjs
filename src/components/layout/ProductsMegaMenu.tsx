import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { productColumns } from "./nav-data";
import { ArrowRightIcon } from "./icons";

const STAGGER_MS = 32;

function staggerStyle(index: number): CSSProperties {
  return { "--mega-menu-delay": `${index * STAGGER_MS}ms` } as CSSProperties;
}

export function ProductsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  let staggerIndex = 0;

  return (
    <div className="border-t border-arctic-white/10 bg-midnight-frame shadow-2xl shadow-black/30">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10 px-6 py-10 lg:px-8">
        {productColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(
              "flex flex-col gap-8",
              columnIndex > 0 && "border-l border-arctic-white/10 pl-10"
            )}
          >
            {column.map((section) => (
              <div key={section.label}>
                <div
                  className="mega-menu-fade-item mb-4 flex items-center gap-2 border-b border-arctic-white/10 pb-3"
                  style={staggerStyle(staggerIndex++)}
                >
                  <Image src={section.icon} alt="" width={18} height={18} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-steel-neutral/70">
                    {section.label}
                  </span>
                </div>
                <ul className="flex flex-col gap-6">
                  {section.items.map((item) => (
                    <li
                      key={item.title}
                      className="mega-menu-fade-item"
                      style={staggerStyle(staggerIndex++)}
                    >
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="group flex items-start gap-4"
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="mt-0.5 size-8 shrink-0"
                        />
                        <span>
                          <span className="block text-sm font-bold uppercase tracking-wide text-arctic-white transition-colors group-hover:text-action-blue">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm text-steel-neutral/60">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="mega-menu-fade-item border-t border-arctic-white/10 bg-arctic-white/[0.03]"
        style={staggerStyle(staggerIndex++)}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs uppercase tracking-wide text-steel-neutral/60">
            Every client gets a dedicated relationship manager
          </p>
          <Link
            href="/products"
            onClick={onNavigate}
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-action-blue transition-colors hover:text-arctic-white"
          >
            View all products
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
