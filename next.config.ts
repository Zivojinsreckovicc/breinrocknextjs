import type { NextConfig } from "next";
import { getLegacyRedirects } from "./legacy-redirects";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return getLegacyRedirects();
  },
  images: {
    remotePatterns: [
      // Sanity image CDN — the Studio lives in a separate repo/domain, so
      // cover and body images are served from here.
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Curator.io — hosts the images for the LinkedIn feed on /blog.
      { protocol: "https", hostname: "curator-assets.b-cdn.net" },
      { protocol: "https", hostname: "cdn.curator.io" },
    ],
  },
};

export default nextConfig;
