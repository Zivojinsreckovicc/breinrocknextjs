import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";

export const metadata: Metadata = {
  title: "Page Not Found | Breinrock",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="bg-midnight-frame">
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-midnight-frame pt-32 pb-24 lg:pt-36">
        {/* Animated liquid brand gradient — matches the site heroes */}
        <div
          className="bg-liquid animate-liquid absolute inset-0 -z-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-midnight-frame"
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center lg:px-8">
          <span className="font-eyebrow text-base italic tracking-wide text-action-blue">
            Error 404
          </span>
          <h1 className="mt-3 text-6xl font-bold tracking-tight text-arctic-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-steel-neutral/80">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
            Let&rsquo;s get you back on track.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/" variant="primary" size="lg">
              Back to home
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button href="/products" variant="secondary" size="lg">
              Explore products
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
