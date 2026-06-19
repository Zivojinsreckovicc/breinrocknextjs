import type { SVGProps } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";
import type { LinkedInPost } from "@/lib/curator";

const COMPANY_URL = "https://www.linkedin.com/company/breinrock/";

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

/**
 * Live LinkedIn feed (via Curator.io). Renders real Breinrock LinkedIn posts as
 * branded cards linking back to LinkedIn. Hides itself when the feed is empty,
 * so the blog page degrades gracefully if the feed is unavailable.
 */
export function LinkedInFeed({ posts }: { posts: LinkedInPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-midnight-frame px-6 pb-24 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="font-eyebrow text-base italic tracking-wide text-action-blue">
            From LinkedIn
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl">
            Follow us on LinkedIn
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-neutral/70 sm:text-lg">
            The latest updates, milestones, and moments from the Breinrock team.
          </p>
        </div>

        <Reveal className="mt-14">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id} className="h-full">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-arctic-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-action-blue/40 hover:bg-white/[0.05]"
                >
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-action-blue">
                      <LinkedInIcon className="size-4" />
                      <span>{post.network}</span>
                      {post.date && (
                        <>
                          <span className="text-steel-neutral/40">·</span>
                          <span className="font-normal text-steel-neutral/60">
                            {formatDate(post.date)}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-steel-neutral/80">
                      {post.text}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-action-blue transition-colors group-hover:text-arctic-white">
                      View on LinkedIn
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 text-center">
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-arctic-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-arctic-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <LinkedInIcon className="size-5" />
            Visit our LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
