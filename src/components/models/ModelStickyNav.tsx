"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronIcon, ExternalLinkIcon } from "@/components/icons";
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
];

/**
 * Roughly the Overview hero's own min-height (see OverviewHero.tsx) — past
 * this point the hero is scrolled out of view, so the nav solidifies.
 */
const SCROLL_THRESHOLD = 560;

/**
 * "Configure" deep-links to the Build & Order section on Overview — a real
 * working anchor, not a placeholder. "In Stock Vehicles" has no inventory
 * tool to link to yet, so it stays a real-looking but inert control,
 * matching the pattern already used for undetermined links elsewhere (hero
 * CTAs, ownership page).
 */
export function ModelStickyNav({
  modelName,
  modelSlug,
  hasHero,
}: {
  modelName: string;
  modelSlug: string;
  hasHero: boolean;
}) {
  const pathname = usePathname();
  const basePath = `/models/${modelSlug}`;
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Only the Overview route has a hero to be transparent over.
  const hasTransparentHero = pathname === basePath && hasHero;

  useEffect(() => {
    if (!hasTransparentHero) return;
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTransparentHero]);

  // Mobile is never transparent (see cardClassName below) — only the
  // desktop card picks this up, via lg:-prefixed overrides.
  const transparent = hasTransparentHero && !scrolled;

  // The site header hides on scroll-down; slide up by its height too so
  // this bar closes the gap instead of leaving a blank strip above it.
  const headerHidden = useSyncExternalStore(
    subscribeToHeaderHidden,
    getHeaderHiddenSnapshot,
    getServerHeaderHiddenSnapshot,
  );

  const activeLabel =
    SECTIONS.find((section) => pathname === `${basePath}${section.path}`)?.label ?? "Overview";

  const cardClassName = transparent
    ? "bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[0_8px_24px_rgba(20,20,20,0.12)] lg:bg-transparent lg:text-white lg:shadow-none"
    : "bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[0_8px_24px_rgba(20,20,20,0.12)]";

  const inactiveTabClassName = transparent
    ? "text-white/70 hover:text-white"
    : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]";

  function tabClassName(isActive: boolean) {
    return `cta-label border-b-2 pb-1 text-xs transition-colors ${
      isActive ? "border-[var(--color-accent)]" : `border-transparent ${inactiveTabClassName}`
    }`;
  }

  return (
    <div
      className={`sticky top-[var(--header-height)] z-40 transition-transform duration-300 motion-reduce:transition-none ${
        headerHidden ? "translate-y-[calc(var(--header-height)*-1)]" : "translate-y-0"
      }`}
    >
      <div className="lg:px-6 lg:pt-3">
        <div
          className={`rounded-none px-6 py-3 transition-colors duration-300 lg:rounded-[5px] ${cardClassName}`}
        >
          {/* Desktop: full tab row, transparent-over-hero on Overview */}
          <nav className="hidden items-center gap-x-8 lg:flex">
            <span className="font-[family-name:var(--font-display-bold)] text-base uppercase tracking-tight">
              {modelName}
            </span>
            {SECTIONS.map((section) => {
              const href = `${basePath}${section.path}`;
              const isActive = pathname === href;
              return (
                <Link key={section.path} href={href} className={tabClassName(isActive)}>
                  {section.label}
                </Link>
              );
            })}
            <Link href={`${basePath}#build-and-order`} className={tabClassName(false)}>
              Configure
            </Link>
            <button
              type="button"
              className={`cta-label flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent pb-1 text-xs transition-colors ${inactiveTabClassName}`}
            >
              In Stock Vehicles
              <ExternalLinkIcon />
            </button>
          </nav>

          {/* Mobile: compact expandable "{modelName} / {activeLabel}" row.
              The panel floats over the page (absolute) when expanded,
              rather than pushing the content below it down. */}
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="flex flex-col">
                <span className="font-[family-name:var(--font-display-bold)] text-base uppercase tracking-tight">
                  {modelName}
                </span>
                <span className="text-xs text-[var(--color-ink-soft)]">{activeLabel}</span>
              </span>
              <ChevronIcon direction={expanded ? "up" : "down"} />
            </button>

            {expanded && (
              <div className="absolute inset-x-0 top-full z-10 flex flex-col gap-y-3 border-t border-[var(--color-border)] bg-[var(--color-paper)] py-3 shadow-[0_8px_24px_rgba(20,20,20,0.12)]">
                {SECTIONS.map((section) => {
                  const href = `${basePath}${section.path}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={section.path}
                      href={href}
                      onClick={() => setExpanded(false)}
                      className={`cta-label text-xs ${
                        isActive ? "font-semibold text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      {section.label}
                    </Link>
                  );
                })}
                <Link
                  href={`${basePath}#build-and-order`}
                  onClick={() => setExpanded(false)}
                  className="cta-label text-xs text-[var(--color-ink-soft)]"
                >
                  Configure
                </Link>
                <button
                  type="button"
                  className="cta-label flex items-center gap-2 whitespace-nowrap text-xs text-[var(--color-ink-soft)]"
                >
                  In Stock Vehicles
                  <ExternalLinkIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
