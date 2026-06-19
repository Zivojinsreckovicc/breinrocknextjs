"use client";

import { useEffect, useRef, useState } from "react";

export type NavbarDropdownKey = "products" | "about";

/** Shared scroll, dropdown, and mobile-menu state for main + landing navbars. */
export function useNavbarState() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavbarDropdownKey | null>(null);
  const [dropdownClosing, setDropdownClosing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeAnimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (closeAnimTimer.current) clearTimeout(closeAnimTimer.current);
    };
  }, []);

  const clearCloseAnimTimer = () => {
    if (closeAnimTimer.current) {
      clearTimeout(closeAnimTimer.current);
      closeAnimTimer.current = null;
    }
    setDropdownClosing(false);
  };

  const openDropdownNow = (key: NavbarDropdownKey) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    clearCloseAnimTimer();
    setOpenDropdown(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setDropdownClosing(true);
      closeAnimTimer.current = setTimeout(() => {
        setDropdownClosing(false);
        closeAnimTimer.current = null;
      }, 300);
    }, 150);
  };

  const closeAll = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    clearCloseAnimTimer();
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isSolid = scrolled || openDropdown !== null || dropdownClosing || mobileOpen;

  return {
    openDropdown,
    setOpenDropdown,
    mobileOpen,
    setMobileOpen,
    openDropdownNow,
    scheduleClose,
    closeAll,
    isSolid,
  };
}
