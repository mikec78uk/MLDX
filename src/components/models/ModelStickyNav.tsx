"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@/components/icons";

interface NavSection {
  path: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { path: "", label: "Overview" },
  { path: "/specs", label: "Specs" },
  { path: "/compare", label: "Compare" },
];

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
}: {
  modelName: string;
  modelSlug: string;
  inStockAvailable: boolean;
}) {
  const pathname = usePathname();
  const basePath = `/models/${modelSlug}`;

  return (
    <div className="sticky top-16 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-y-3 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-x-8">
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
                      ? "border-[var(--color-accent)] text-[var(--color-ink)]"
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
  );
}
