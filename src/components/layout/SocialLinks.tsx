import Image from "next/image";
import { cn } from "@/lib/cn";
import { footerSocialLinks } from "./footer-data";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {footerSocialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          {...(social.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={social.label}
          className="text-steel-neutral/60 transition-colors hover:text-arctic-white"
        >
          {social.icon ? (
            <Image src={social.icon} alt="" width={18} height={18} className="size-[18px]" />
          ) : social.label === "X" ? (
            <XIcon />
          ) : (
            <YouTubeIcon />
          )}
        </a>
      ))}
    </div>
  );
}
