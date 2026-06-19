import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { BannerCta } from "@/components/sections/BannerCta";
import { ArrowRightIcon } from "@/components/layout/icons";
import { getPost, getPostSlugs } from "@/sanity/fetch";
import { formatDate } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found — Breinrock" };

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const ogImage = post.seo?.ogImageUrl ?? post.coverImageUrl;

  return buildMetadata({
    title: `${title} — Breinrock`,
    description: description || undefined,
    keywords:
      "breinrock, international banking, finance, finance solutions, global payments",
    path: `/blog/${post.slug}`,
    ogType: "article",
    ogTitle: title,
    ogDescription: description || undefined,
    twitterCard: ogImage ? "summary_large_image" : "summary",
    images: ogImage ? [ogImage] : undefined,
    publishedTime: post.date || undefined,
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-midnight-frame">
      <article className="pt-36 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-steel-neutral/70 transition-colors hover:text-action-blue"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
            Back to blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            {post.category && (
              <span className="rounded-full bg-action-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-action-blue">
                {post.category}
              </span>
            )}
            <time dateTime={post.date} className="text-steel-neutral/60">
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-arctic-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-steel-neutral/80">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3 border-y border-arctic-white/10 py-5">
            {post.author.imageUrl ? (
              <Image
                src={post.author.imageUrl}
                alt={post.author.name}
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-11 items-center justify-center rounded-full bg-action-blue/15 text-base font-bold text-action-blue">
                {post.author.name.charAt(0)}
              </span>
            )}
            <div>
              <p className="text-sm font-semibold text-arctic-white">{post.author.name}</p>
              {post.author.role && (
                <p className="text-xs text-steel-neutral/60">{post.author.role}</p>
              )}
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImageUrl && (
          <div className="mx-auto mt-10 max-w-4xl px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-arctic-white/10">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl px-6 pb-24 lg:px-8 lg:pb-32">
          {post.body && post.body.length > 0 && <RichText value={post.body} />}
        </div>
      </article>

      <BannerCta />
    </main>
  );
}
