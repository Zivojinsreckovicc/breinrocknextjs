"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useDemoPopup } from "@/components/landing/DemoPopupProvider";
import { productColumns, aboutLinks, primaryNavLinks } from "./nav-data";
import { ChevronDownIcon } from "./icons";

const productItems = productColumns.flat().flatMap((section) => section.items);

export function LandingMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const { open } = useDemoPopup();
  const [openSection, setOpenSection] = useState<"products" | "about" | null>(null);

  const toggleSection = (section: "products" | "about") => {
    setOpenSection((current) => (current === section ? null : section));
  };

  const openDemo = () => {
    onNavigate();
    open();
  };

  return (
    <div className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto bg-midnight-frame lg:hidden">
      <nav className="flex flex-col gap-1 px-6 py-6">
        <Link
          href={primaryNavLinks[0].href}
          onClick={onNavigate}
          className="py-3 text-sm font-semibold uppercase tracking-wide text-arctic-white"
        >
          {primaryNavLinks[0].label}
        </Link>

        <div className="border-t border-arctic-white/10">
          <button
            type="button"
            onClick={() => toggleSection("products")}
            aria-expanded={openSection === "products"}
            className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-wide text-arctic-white"
          >
            Products
            <ChevronDownIcon
              className={`size-4 transition-transform ${
                openSection === "products" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "products" && (
            <ul className="flex flex-col gap-1 pb-3">
              {productItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block py-2 text-sm text-steel-neutral/80 transition-colors hover:text-arctic-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-arctic-white/10">
          <button
            type="button"
            onClick={() => toggleSection("about")}
            aria-expanded={openSection === "about"}
            className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-wide text-arctic-white"
          >
            About Us
            <ChevronDownIcon
              className={`size-4 transition-transform ${
                openSection === "about" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "about" && (
            <ul className="flex flex-col gap-1 pb-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="block py-2 text-sm text-steel-neutral/80 transition-colors hover:text-arctic-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-arctic-white/10" />

        {primaryNavLinks.slice(1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="border-t border-arctic-white/10 py-3 text-sm font-semibold uppercase tracking-wide text-arctic-white first:border-t-0"
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 border-t border-arctic-white/10 pt-6">
          <Button type="button" variant="primary" className="w-full" onClick={openDemo}>
            Get In Touch
          </Button>
        </div>
      </nav>
    </div>
  );
}
