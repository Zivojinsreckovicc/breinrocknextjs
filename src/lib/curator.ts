/**
 * Curator.io social feed — powers the live LinkedIn posts on /blog.
 *
 * Curator.io aggregates Breinrock's real LinkedIn posts; we read them through
 * its public, read-only feed API. Fetched server-side and cached (ISR) so the
 * posts render in the initial HTML with no client-side JS. The section hides
 * itself when the feed is unavailable or empty.
 *
 * Credentials are public feed identifiers (overridable via env).
 */
const CURATOR_API_KEY =
  process.env.CURATOR_API_KEY ?? "1673163c-d155-40ac-b2da-acb53c3d1867";
const CURATOR_FEED_ID =
  process.env.CURATOR_FEED_ID ?? "87b96bb3-05c7-4972-aa05-d875a1dbec44";

/** Re-fetch the feed at most once an hour. */
const REVALIDATE_SECONDS = 3600;

export type LinkedInPost = {
  id: number;
  text: string;
  image: string | null;
  url: string;
  network: string;
  authorName: string;
  date: string | null;
  likes: number;
  comments: number;
};

type CuratorPost = {
  id: number;
  text?: string;
  image?: string;
  image_large?: string;
  url?: string;
  network_name?: string;
  user_full_name?: string;
  source_created_at?: string;
  likes?: number;
  comments?: number;
};

const COMPANY_URL = "https://www.linkedin.com/company/breinrock/";

export async function getLinkedInPosts(limit = 6): Promise<LinkedInPost[]> {
  if (!CURATOR_API_KEY || !CURATOR_FEED_ID) return [];

  try {
    const res = await fetch(
      `https://api.curator.io/v1/feeds/${CURATOR_FEED_ID}/posts?api_key=${CURATOR_API_KEY}&limit=${limit}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return [];

    const json = (await res.json()) as { success?: boolean; posts?: CuratorPost[] };
    if (!json.success || !Array.isArray(json.posts)) return [];

    return json.posts.map((post) => ({
      id: post.id,
      text: post.text?.trim() ?? "",
      image: post.image_large?.trim() || post.image?.trim() || null,
      url: post.url?.trim() || COMPANY_URL,
      network: post.network_name ?? "LinkedIn",
      authorName: post.user_full_name ?? "Breinrock",
      date: post.source_created_at ?? null,
      likes: post.likes ?? 0,
      comments: post.comments ?? 0,
    }));
  } catch {
    return [];
  }
}
