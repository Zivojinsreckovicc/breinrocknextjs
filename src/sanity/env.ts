/**
 * Sanity connection settings.
 *
 * The Studio and this Next.js site live in separate repos (and potentially
 * separate domains), so the project is connected purely through these public
 * values / environment variables — no shared code. Override per environment
 * via `.env.local`; the defaults point at the existing Breinrock project so
 * the blog works out of the box.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l0o6i6ub";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
