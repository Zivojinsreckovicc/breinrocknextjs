import { Button } from "@/components/ui/Button";
import type { ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type PreIpoButtonProps = {
  size?: ButtonSize;
  className?: string;
};

/** Pre-IPO CTA — reserved for a future launch; not wired into navigation yet. */
export function PreIpoButton({ size = "sm", className }: PreIpoButtonProps) {
  return (
    <Button type="button" variant="gold" size={size} className={cn(className)}>
      Pre-IPO
    </Button>
  );
}
