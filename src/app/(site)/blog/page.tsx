import { buildMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { LinkedInFeed } from "@/components/sections/LinkedInFeed";
import { getPosts } from "@/sanity/fetch";
import { getLinkedInPosts } from "@/lib/curator";
import { getMailchimpConfig } from "@/lib/server/mailchimp";

export const metadata = buildMetadata({
  title: "Breinrock Blog | Global Banking & Fintech Insights",
  description:
    "Explore the latest insights from Breinrock on global banking, international payments, fintech trends, and financial innovation worldwide.",
  keywords:
    "breinrock, international banking, finance, finance solutions, global payments",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, linkedInPosts, mailchimp] = await Promise.all([
    getPosts(6),
    getLinkedInPosts(6),
    Promise.resolve(getMailchimpConfig()),
  ]);

  return (
    <main className="bg-midnight-frame">
      <GoogleAnalytics />
      {/* Header */}
      <PageHero>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-arctic-white sm:text-5xl lg:text-6xl">
          Insights on modern payments
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-neutral/80">
          Perspectives on global payments, foreign exchange, cards, and the
          infrastructure behind borderless banking.
        </p>
      </PageHero>

      {/* Posts grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-steel-neutral/70">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  delay={(index % 3) * 80}
                  priority={index < 3}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stay Informed — newsletter signup */}
      {mailchimp && (
        <section className="px-6 pb-24 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-3xl rounded-3xl border border-arctic-white/10 bg-white/[0.03] px-8 py-12 text-center sm:px-12">
            <span className="font-eyebrow text-base italic tracking-wide text-action-blue">
              Newsletter
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-arctic-white sm:text-4xl">
              Stay Informed
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-steel-neutral/70 sm:text-lg">
              Subscribe to our newsletter and never miss the latest updates on
              fintech, international payments, and banking innovations.
            </p>
            <NewsletterForm
              mailchimp={mailchimp}
              formId="mc-embedded-subscribe-form-news"
              emailId="mce-EMAIL-news"
              submitId="mc-embedded-subscribe-news"
              submitLabel="Subscribe Now"
              className="mx-auto mt-8 max-w-xl"
            />
          </div>
        </section>
      )}

      {/* Live LinkedIn feed (Curator.io) — hides itself when unavailable */}
      <LinkedInFeed posts={linkedInPosts} />
    </main>
  );
}
