"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { useDemoPopupOptional } from "@/components/landing/DemoPopupProvider";

type BannerCtaActionsProps = {
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  useDemoPopup?: boolean;
  primaryHref: string;
};

export function BannerCtaActions({
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  useDemoPopup = false,
  primaryHref,
}: BannerCtaActionsProps) {
  const demo = useDemoPopupOptional();
  const openDemo = useDemoPopup && demo;

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      {openDemo ? (
        <Button variant="primary" size="lg" onClick={demo.open}>
          {primaryLabel}
          <ArrowRightIcon className="size-5" />
        </Button>
      ) : (
        <Button href={primaryHref} variant="primary" size="lg">
          {primaryLabel}
          <ArrowRightIcon className="size-5" />
        </Button>
      )}
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-arctic-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-arctic-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
