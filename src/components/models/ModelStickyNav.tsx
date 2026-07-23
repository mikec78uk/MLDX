"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specs" },
  { id: "compare", label: "Compare" },
];

/**
 * In-Stock, Test drive and Configure have no real destinations yet (they're
 * meant to link out to separate tools/sites per the brief) — rendered as
 * real-looking but inert controls until those are supplied, matching the
 * pattern already used for undetermined links on the ownership page.
 */
export function ModelStickyNav({
  modelName,
  inStockAvailable,
}: {
  modelName: string;
  inStockAvailable: boolean;
}) {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((section) => ({
      id: section.id,
      el: document.getElementById(section.id),
    })).filter(
      (entry): entry is { id: string; el: HTMLElement } => entry.el !== null,
    );
    if (elements.length === 0) return;

    // Active section is the last one whose top has scrolled up past the
    // two stacked sticky bars — a fixed-offset check, not a proportional
    // "middle of viewport" one, so it holds regardless of viewport height
    // or how tall a given section's content is.
    const OFFSET = 140;

    function updateActive() {
      // Scrolled to the foot of the page: the last section may be too
      // short for its top to ever cross OFFSET, so force it active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      let current = elements[0].id;
      for (const { id, el } of elements) {
        if (el.getBoundingClientRect().top <= OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <div className="sticky top-16 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-y-3 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-x-8">
        <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:gap-x-8">
          <span className="font-[family-name:var(--font-display-bold)] text-base uppercase tracking-tight">
            {modelName}
          </span>
          <nav className="flex items-center gap-6">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`cta-label border-b-2 pb-1 text-xs transition-colors ${
                  activeId === section.id
                    ? "border-[var(--color-accent)] text-[var(--color-ink)]"
                    : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                }`}
              >
                {section.label}
              </a>
            ))}
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
