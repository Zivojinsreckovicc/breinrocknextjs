import type { CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/layout/icons";
import { SIGN_UP_URL } from "@/constants/links";

/**
 * Full-bleed hero with centred content over an animated "liquid" brand
 * gradient that flows from the dark bottom-right toward brighter brand
 * blues at the top-left. All motion is decorative and disabled under
 * reduced-motion.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-midnight-frame">
      {/* Animated liquid brand gradient */}
      <div
        className="bg-liquid animate-liquid absolute inset-0 -z-30"
        aria-hidden="true"
      />

      {/* Fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 -z-20 h-1/3 bg-gradient-to-b from-transparent to-midnight-frame"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-4xl px-6 pt-28 pb-20 text-center lg:px-8">
        <h1 className="animate-rise mx-auto max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-arctic-white sm:text-6xl lg:text-7xl">
          Making payments
          <br />
          <span className="text-shimmer bg-gradient-to-r from-action-blue via-steel-neutral to-action-blue bg-clip-text text-transparent">
            human again
          </span>
        </h1>

        <p
          className="animate-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel-neutral/80 sm:text-xl"
          style={{ "--rise-delay": "150ms" } as CSSProperties}
        >
          Send, receive, and move money globally — powered by local rails and
          real human support across six global offices.
        </p>

        <div
          className="animate-rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ "--rise-delay": "300ms" } as CSSProperties}
        >
          <Button href={SIGN_UP_URL} variant="primary" size="lg">
            Get started
            <ArrowRightIcon className="size-5" />
          </Button>
          <Link
            href="#what-we-offer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-arctic-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-arctic-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Learn more
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden="true"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-arctic-white/30 p-1.5">
          <span className="size-1.5 animate-bounce rounded-full bg-arctic-white/70" />
        </span>
      </div>
    </section>
  );
}
