"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
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

/**
 * Available Cars, Test drive and Configure have no real destinations yet (they're
 * meant to link out to separate tools/sites per the brief) — rendered as
 * real-looking but inert controls until those are supplied, matching the
 * pattern already used for undetermined links on the ownership page.
 */
export function ModelStickyNav({
  modelName,
  modelSlug,
  inStockAvailable,
}: {
  modelName: string;
  modelSlug: string;
  inStockAvailable: boolean;
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

  return (
    <div
      className={`sticky top-[var(--header-height)] z-40 transition-transform duration-300 motion-reduce:transition-none ${
        headerHidden ? "translate-y-[calc(var(--header-height)*-1)]" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 pt-3">
        <div className="flex flex-col gap-y-3 rounded-[5px] bg-[var(--color-paper)] px-6 py-3 text-[var(--color-ink)] shadow-[0_8px_24px_rgba(20,20,20,0.12)] lg:flex-row lg:items-center lg:justify-between lg:gap-x-8">
          <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:gap-x-8">
            <span className="font-[family-name:var(--font-display-bold)] text-base uppercase tracking-tight">
              {modelName}
            </span>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
                        : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {section.label}
                  </Link>
                );
              })}
              <button
                type="button"
                className="cta-label flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent pb-1 text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                Available Cars
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
              className="cta-label whitespace-nowrap border border-[var(--color-ink)] px-4 py-2 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
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
    </div>
  );
}
