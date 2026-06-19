import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Build a transformable URL for a Sanity image source. */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
