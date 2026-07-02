import type { NextConfig } from "next";

/**
 * Static export is only used for the GitHub Pages skin preview (see
 * scripts/build-github-pages.mjs) — the Vercel deployments run the normal
 * Next.js server so src/proxy.ts (password gate) keeps working there.
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
