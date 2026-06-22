import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";
import type { BlogPostCard } from "@/types/blog";

type BlogCardProps = {
  post: BlogPostCard;
  /** Stagger delay for the reveal animation. */
  delay?: number;
  /** Prioritise the cover image (above-the-fold cards). */
  priority?: boolean;
};

export function BlogCard({ post, delay = 0, priority = false }: BlogCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative h-full overflow-hidden rounded-2xl border border-arctic-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-action-blue/40 hover:bg-white/[0.05]">
        <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.category && (
              <span className="absolute left-4 top-4 rounded-full bg-midnight-frame/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-action-blue backdrop-blur-md">
                {post.category}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-bold leading-snug text-arctic-white transition-colors group-hover:text-action-blue">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-steel-neutral/70">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-arctic-white/10 pt-4">
              {post.author.imageUrl ? (
                <Image
                  src={post.author.imageUrl}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-action-blue/15 text-xs font-bold text-action-blue">
                  {post.author.name.charAt(0)}
                </span>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-arctic-white">
                  {post.author.name}
                </span>
                <time dateTime={post.date} className="text-xs text-steel-neutral/50">
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
