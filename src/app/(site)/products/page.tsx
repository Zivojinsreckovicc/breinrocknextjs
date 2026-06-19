import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { BannerCta } from "@/components/sections/BannerCta";

export const metadata = buildMetadata({
  title: "Products - Breinrock | Banking Solutions, Prepaid Cards & Payment Services",
  description:
    "Explore Breinrock products including corporate accounts, prepaid cards, FX, and Banking as a Service solutions for global finance needs.",
  keywords:
    "breinrock products, corporate accounts, personal banking, prepaid cards, foreign exchange, BaaS, banking as a service, fintech products, payment solutions, multi-currency accounts, international banking services",
  path: "/products",
  ogTitle: "Products - Breinrock | Banking Solutions & Payment Services",
  ogDescription:
    "Explore Breinrock's innovative fintech products: corporate accounts, prepaid cards, foreign exchange, BaaS solutions.",
});

export default function ProductsPage() {
  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Header */}
      <PageHero>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products" }]}
        />
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          All Products
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          A comprehensive suite of financial products designed for global
          businesses and individuals.
        </p>
      </PageHero>

      <ProductCatalog />
      <BannerCta />
    </main>
  );
}
