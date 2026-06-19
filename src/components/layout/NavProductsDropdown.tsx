"use client";

import { ProductsMegaMenu } from "./ProductsMegaMenu";

type NavProductsDropdownProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
};

/** Desktop products mega menu — stays mounted; fades and slides in/out smoothly. */
export function NavProductsDropdown({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: NavProductsDropdownProps) {
  return (
    <div
      className="nav-mega-menu-panel absolute inset-x-0 top-full z-40 hidden origin-top transform-gpu lg:block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!isOpen}
      data-open={isOpen ? "true" : "false"}
    >
      <ProductsMegaMenu onNavigate={onNavigate} />
    </div>
  );
}
