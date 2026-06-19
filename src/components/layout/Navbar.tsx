"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { SIGN_IN_URL, SIGN_UP_URL } from "@/constants/links";
import { aboutLinks, primaryNavLinks } from "./nav-data";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";
import { NavProductsDropdown } from "./NavProductsDropdown";
import { useNavbarState } from "./use-navbar-state";

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((mod) => mod.MobileMenu),
  { ssr: false }
);

const navLinkStyles =
  "text-sm font-semibold uppercase tracking-wide text-arctic-white/90 transition-colors hover:text-arctic-white";

export function Navbar() {
  const {
    openDropdown,
    setOpenDropdown,
    mobileOpen,
    setMobileOpen,
    openDropdownNow,
    scheduleClose,
    closeAll,
    isSolid,
  } = useNavbarState();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isSolid ? "bg-midnight-frame shadow-lg shadow-black/20" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" onClick={closeAll} className="shrink-0">
          <Image
            src="/imgs/logo.webp"
            alt="Breinrock"
            width={148}
            height={36}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href={primaryNavLinks[0].href} className={navLinkStyles}>
            {primaryNavLinks[0].label}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => openDropdownNow("products")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onFocus={() => openDropdownNow("products")}
              aria-expanded={openDropdown === "products"}
              aria-haspopup="true"
              className={cn(navLinkStyles, "flex items-center gap-1.5")}
            >
              Products
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform duration-300",
                  openDropdown === "products" && "rotate-180"
                )}
              />
              {openDropdown === "products" && (
                <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-action-blue" />
              )}
            </button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => openDropdownNow("about")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onFocus={() => openDropdownNow("about")}
              aria-expanded={openDropdown === "about"}
              aria-haspopup="true"
              className={cn(navLinkStyles, "flex items-center gap-1.5")}
            >
              About Us
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform duration-300",
                  openDropdown === "about" && "rotate-180"
                )}
              />
              {openDropdown === "about" && (
                <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-action-blue" />
              )}
            </button>

            {openDropdown === "about" && (
              <div className="absolute left-0 top-full mt-4 min-w-64 rounded-lg border border-arctic-white/10 bg-midnight-frame py-2 shadow-2xl shadow-black/30">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeAll}
                    className="block px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-arctic-white/90 transition-colors hover:bg-arctic-white/5 hover:text-action-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryNavLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkStyles}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth links */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href={SIGN_IN_URL} className={navLinkStyles}>
            Log In
          </Link>
          <Button href={SIGN_UP_URL} variant="primary" size="sm">
            Sign Up
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => {
            setOpenDropdown(null);
            setMobileOpen((open) => !open);
          }}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="text-arctic-white lg:hidden"
        >
          {mobileOpen ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
        </button>
      </div>

      <NavProductsDropdown
        isOpen={openDropdown === "products"}
        onMouseEnter={() => openDropdownNow("products")}
        onMouseLeave={scheduleClose}
        onNavigate={closeAll}
      />

      {mobileOpen && <MobileMenu onNavigate={closeAll} />}
    </header>
  );
}
