"use client";

import { useState } from "react";
import Link from "next/link";
import type { ModelHeroHotspot } from "@/data/modelHero";

/**
 * Desktop-only: bg-cover on the hero crops the left/right edges much more
 * aggressively on narrow viewports, so a fixed (x, y) here would drift off
 * the vehicle (or straight into the text column) below the lg breakpoint.
 */
export function HeroHotspot({
  hotspot,
  specsHref,
}: {
  hotspot: ModelHeroHotspot;
  specsHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute z-20 hidden lg:block"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={
          open ? "Hide vehicle configuration details" : "View vehicle configuration details"
        }
        className="relative flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition-transform hover:scale-105"
      >
        {!open && (
          <span
            aria-hidden
            className="motion-safe:animate-ping absolute inset-0 rounded-full bg-white/30"
          />
        )}
        <span
          aria-hidden
          className={`text-lg leading-none transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-30 mt-3 w-64 -translate-x-1/2 rounded-sm border border-white/10 bg-[var(--color-ink)]/95 p-4 text-left text-[var(--color-paper)] shadow-xl backdrop-blur">
          <p className="eyebrow text-[10px] text-white/60">{hotspot.label}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-white/90">
            {hotspot.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <Link
            href={specsHref}
            className="cta-label mt-3 inline-block text-[10px] text-white/80 underline underline-offset-4 hover:text-white"
          >
            View specifications
          </Link>
        </div>
      )}
    </div>
  );
}
