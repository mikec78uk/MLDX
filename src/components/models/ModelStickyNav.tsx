"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRightIcon } from "@/components/icons";
import {
  getHeaderHiddenSnapshot,
  getServerHeaderHiddenSnapshot,
  subscribeToHeaderHidden,
} from "@/lib/header/visibility";

interface NavSection {
  path: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { path: "", label: "Overview" },
  { path: "/specs", label: "Models" },
  { path: "/compare", label: "Compare" },
];

/** How far you need to scroll before the nav solidifies over the hero. */
const SCROLL_THRESHOLD = 80;

/**
 * In-Stock, Test drive and Configure have no real destinations yet (they're
 * meant to link out to separate tools/sites per the brief) — rendered as
 * real-looking but inert controls until those are supplied, matching the
 * pattern already used for undetermined links on the ownership page.
 */
export function ModelStickyNav({
  modelName,
  modelSlug,
  inStockAvailable,
  overviewHasHero,
}: {
  modelName: string;
  modelSlug: string;
  inStockAvailable: boolean;
  /** Whether the Overview route has a hero image to sit transparently over. */
  overviewHasHero: boolean;
}) {
  const pathname = usePathname();
  const basePath = `/models/${modelSlug}`;
  // The site header hides on scroll-down; slide up by its height too so
  // this bar closes the gap instead of leaving a blank strip above it.
  const headerHidden = useSyncExternalStore(
    subscribeToHeaderHidden,
    getHeaderHiddenSnapshot,
    getServerHeaderHiddenSnapshot,
  );

  // Transparent-over-hero only applies on the Overview route itself — Specs
  // and Compare start with plain page background, so the nav must stay
  // solid there even though this same component renders on every route.
  const immersive = overviewHasHero && pathname === basePath;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!immersive) return;
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [immersive]);

  const transparent = immersive && !scrolled;

  return (
    <div
      className={`sticky top-16 z-40 border-b transition-[background-color,border-color,transform] duration-300 motion-reduce:transition-none ${
        headerHidden ? "-translate-y-16" : "translate-y-0"
      } ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-y-3 px-6 py-3 transition-colors duration-300 motion-reduce:transition-none lg:flex-row lg:items-center lg:justify-between lg:gap-x-8 ${
          transparent ? "text-white" : "text-[var(--color-ink)]"
        }`}
      >
        <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:gap-x-8">
          <span className="font-[family-name:var(--font-display-bold)] text-base uppercase tracking-tight">
            {modelName}
          </span>
          <nav className="flex items-center gap-6">
            {SECTIONS.map((section) => {
              const href = `${basePath}${section.path}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={section.path}
                  href={href}
                  className={`cta-label border-b-2 pb-1 text-xs transition-colors ${
                    isActive
                      ? "border-[var(--color-accent)]"
                      : transparent
                        ? "border-transparent text-white/70 hover:text-white"
                        : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {section.label}
                </Link>
              );
            })}
            <button
              type="button"
              className={`cta-label flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent pb-1 text-xs transition-colors ${
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              }`}
            >
              In-Stock
              {inStockAvailable && (
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-red-600"
                />
              )}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`cta-label whitespace-nowrap border px-4 py-2 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] ${
              transparent ? "border-white/70" : "border-[var(--color-ink)]"
            }`}
          >
            Test drive
          </button>
          <button
            type="button"
            className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-4 py-2 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            Configure
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
