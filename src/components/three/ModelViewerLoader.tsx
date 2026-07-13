"use client";

import dynamic from "next/dynamic";

/**
 * WebGL/Canvas must never be part of the prerendered HTML — static export
 * (output: "export") bakes client components into build-time HTML, which
 * causes a hydration mismatch with R3F's Canvas and crashes the WebGL
 * context ("Context Lost") once the client takes over. ssr: false forces
 * it to mount only after hydration, client-side only.
 */
export const ModelViewer = dynamic(
  () => import("./ModelViewer").then((mod) => mod.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full rounded-sm bg-[var(--color-paper-muted)] sm:h-[520px]" />
    ),
  },
);
