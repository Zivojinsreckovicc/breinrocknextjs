import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CoreValues } from "@/components/sections/CoreValues";
import { Mission } from "@/components/sections/Mission";
import { TeamCarousel } from "@/components/sections/TeamCarousel";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = buildMetadata({
  title: "About Us - Breinrock | Our Team, Licenses & Experience in Global Banking",
  description:
    "Learn about Breinrock, a global banking platform licensed in Canada, the UK, UAE, and Czech Republic, delivering secure financial solutions worldwide.",
  keywords:
    "breinrock about us, international banking team, fintech payment solutions, global banking licenses, banking experience, financial services company, corporate banking, personal banking solutions",
  path: "/about",
  ogTitle: "About Us - Breinrock | Our Team, Licenses & Experience",
  ogDescription:
    "Learn about Breinrock - a trusted global banking platform with licenses in Canada, UK, UAE, and Czech Republic. Meet our experienced team.",
});

export default function AboutPage() {
  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Header */}
      <PageHero className="pb-6! lg:pb-8!">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Banking built around people
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Breinrock is a neo-banking platform delivering efficient, secure
          payment solutions for individuals and businesses — powered by local
          rails and real human support across six global offices.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </PageHero>

      <CoreValues />
      <Mission />
      <TeamCarousel />
      <GlobalPresence />
      <ContactSection />
    </main>
  );
}
