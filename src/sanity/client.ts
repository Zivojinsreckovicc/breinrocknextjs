import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only Sanity client. `useCdn` serves cached content from Sanity's edge
 * CDN — ideal for a public marketing site fetching published content.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
