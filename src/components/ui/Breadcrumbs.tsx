import Link from "next/link";
import { ChevronDownIcon } from "@/components/layout/icons";

export type Crumb = {
  label: string;
  href?: string;
};

/**
 * Accessible breadcrumb trail with BreadcrumbList JSON-LD for SEO. The last
 * item is treated as the current page. Reusable across any page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.breinrock.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-steel-neutral/60 transition-colors hover:text-action-blue"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-arctic-white" : "text-steel-neutral/60"}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronDownIcon
                  className="size-4 -rotate-90 text-steel-neutral/40"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
