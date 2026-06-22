import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { OfficesAccordion } from "@/components/sections/OfficesAccordion";
import { ContactFormPanel } from "@/components/sections/ContactFormPanel";
import { SocialLinks } from "@/components/layout/SocialLinks";

export const metadata = buildMetadata({
  title: "Contact Us - Breinrock | Get in Touch for Global Banking Solutions",
  description:
    "Contact Breinrock for global banking, international payments, and financial solutions across Toronto, London, Prague, Limassol, and Dubai.",
  keywords:
    "contact breinrock, international banking contact, global payments contact, finance solutions contact, breinrock offices, toronto london prague limassol dubai, banking inquiry",
  path: "/contact",
  ogDescription:
    "Contact Breinrock for international banking and global payments. Offices in Toronto, London, Prague, Limassol, and Dubai.",
  twitterDescription:
    "Contact Breinrock for international banking and global payments. Offices in 5 locations worldwide.",
});

export default function ContactPage() {
  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Header */}
      <PageHero>
        <div className="flex w-full justify-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Let&rsquo;s talk
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Whether you&rsquo;re opening an account, exploring a partnership, or
          need support — our team is ready to help, with real people across six
          global offices.
        </p>
        <a
          href="mailto:welcome@breinrock.com"
          className="mt-8 inline-block text-lg text-action-blue transition-colors hover:text-arctic-white"
        >
          welcome@breinrock.com
        </a>
        <SocialLinks className="mt-4 justify-center" />
      </PageHero>

      {/* Offices + contact form */}
      <section className="mt-10 pb-24 lg:mt-16 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-arctic-white">Our offices</h2>
            <p className="mt-2 text-sm text-steel-neutral/70">
              Six regulated entities across four continents.
            </p>
            <div className="mt-6">
              <OfficesAccordion />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-arctic-white">Send us a message</h2>
            <p className="mt-2 text-sm text-steel-neutral/70">
              Tell us about your business and what you&rsquo;re looking for. Our
              team will get back to you within one business day.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-arctic-white/10">
              <ContactFormPanel />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
