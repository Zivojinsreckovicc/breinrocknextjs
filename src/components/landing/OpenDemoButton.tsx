"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { useDemoPopup } from "./DemoPopupProvider";
import type { ButtonSize, ButtonVariant } from "@/components/ui/Button";

type OpenDemoButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showArrow?: boolean;
};

/** Primary CTA that opens the demo request popup (landing pages). */
export function OpenDemoButton({
  children = "Get in touch",
  variant = "primary",
  size = "lg",
  className,
  showArrow = true,
}: OpenDemoButtonProps) {
  const { open } = useDemoPopup();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      type="button"
      onClick={open}
    >
      {children}
      {showArrow && <ArrowRightIcon className="size-5" />}
    </Button>
  );
}
