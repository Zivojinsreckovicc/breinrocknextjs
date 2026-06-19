"use client";

import { usePathname } from "next/navigation";
import { landingSlugFromPath } from "@/lib/is-landing-path";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { DemoPopupProvider } from "./DemoPopupProvider";

/** Landing layout shell — demo popup provider + landing-specific navigation. */
export function LandingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageSlug = landingSlugFromPath(pathname);

  return (
    <DemoPopupProvider pageSlug={pageSlug}>
      <LandingNavbar />
      {children}
    </DemoPopupProvider>
  );
}
