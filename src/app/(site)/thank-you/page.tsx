import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { CheckIcon } from "@/components/sections/icons";
import { buildMetadata } from "@/lib/seo";

// Confirmation page — keep it out of search results.
export const metadata = buildMetadata({
  title: "Thank You | Breinrock",
  description:
    "Thanks for reaching out to Breinrock. A member of our team will get back to you within one business day.",
  path: "/thank-you",
  robots: { index: false, follow: true },
  hreflang: false,
});

export default function ThankYouPage() {
  return (
    <main className="bg-midnight-frame">
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-midnight-frame pt-32 pb-24 lg:pt-36">
        {/* Animated liquid brand gradient — matches the home/page heroes */}
        <div
          className="bg-liquid animate-liquid absolute inset-0 -z-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-midnight-frame"
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-8">
          <span className="flex size-20 items-center justify-center rounded-full border border-action-blue/30 bg-action-blue/15 text-action-blue">
            <CheckIcon className="size-10" />
          </span>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
            Thank you for reaching out
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-neutral/80">
            We&rsquo;ve received your message and a member of our team will get
            back to you within one business day. In the meantime, explore what
            Breinrock can do for your business.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/products" variant="primary" size="lg">
              Explore our products
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back to home
            </Button>
          </div>

          <p className="mt-10 text-sm text-steel-neutral/60">
            Need a faster response? Email us at{" "}
            <a
              href="mailto:welcome@breinrock.com"
              className="text-action-blue transition-colors hover:text-arctic-white"
            >
              welcome@breinrock.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
