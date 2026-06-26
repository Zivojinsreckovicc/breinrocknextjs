import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Tilt } from "@/components/ui/Tilt";
import { ArrowRightIcon } from "@/components/layout/icons";
import { SIGN_UP_URL } from "@/constants/links";
import { cardTiers } from "@/data/cards";

/**
 * Prepaid-cards hero: headline + a fanned, gently floating stack of the three
 * card tiers with pointer-driven 3D tilt. The page's single `h1` lives here.
 */
export function CardsHero() {
  // Order the fan back-to-front: gold Elite+, black Elite, then Standard on top.
  const [standard, elite, elitePlus] = cardTiers;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-midnight-frame pt-28 pb-4 lg:pt-32">
      {/* Ambient depth */}
      <div
        className="animate-blob absolute -left-32 top-1/4 -z-10 size-[30rem] rounded-full bg-action-blue/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="bg-grid animate-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Copy */}
        <div className="animate-rise max-w-xl">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
            Prepaid cards that{" "}
            <span className="text-shimmer bg-gradient-to-r from-action-blue via-steel-neutral to-action-blue bg-clip-text text-transparent">
              keep you in control
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-steel-neutral/80">
            Secure, global transactions with Breinrock&rsquo;s prepaid
            Mastercards — for everyday spending, corporate use, or premium
            travel.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={SIGN_UP_URL} variant="primary" size="lg">
              Get started
              <ArrowRightIcon className="size-5" />
            </Button>
            <Link
              href="#choose-your-card"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-arctic-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-arctic-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Compare cards
            </Link>
          </div>
        </div>

        {/* Fanned card stack */}
        <div className="flex justify-center lg:justify-end">
          <Tilt max={10} className="animate-card-float w-full max-w-md [perspective:1400px]">
            <div className="cards-stack relative aspect-[1261/854] w-full [transform-style:preserve-3d]">
              <Image
                src={elite.image}
                alt={elite.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="card-spread absolute inset-0 object-contain drop-shadow-2xl"
                style={
                  {
                    "--card-rest": "rotate(-20deg)",
                    "--card-hover": "rotate(-27deg)",
                    "--card-spread-delay": "0ms",
                  } as CSSProperties
                }
              />
              <Image
                src={elitePlus.image}
                alt={elitePlus.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="card-spread absolute inset-0 object-contain drop-shadow-2xl"
                style={
                  {
                    "--card-rest": "rotate(-6deg)",
                    "--card-hover": "rotate(-8deg)",
                    "--card-spread-delay": "90ms",
                  } as CSSProperties
                }
              />
              <Image
                src={standard.image}
                alt={standard.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="card-spread absolute inset-0 object-contain drop-shadow-2xl"
                style={
                  {
                    "--card-rest": "rotate(8deg)",
                    "--card-hover": "rotate(14deg)",
                    "--card-spread-delay": "180ms",
                  } as CSSProperties
                }
              />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
