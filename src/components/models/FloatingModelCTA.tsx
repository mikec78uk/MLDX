"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Matches ModelStickyNav's own threshold — both solidify once the hero scrolls out of view. */
const SCROLL_THRESHOLD = 560;

/**
 * "Book A Test Drive" has no real destination yet — rendered as a
 * real-looking but inert control, matching the hero's own button of the
 * same name. Only ever shown on a route with a hero (Overview), scrolled
 * past it — never on Specs/Compare, which have no hero to scroll past.
 */
export function FloatingModelCTA({
  modelSlug,
  hasHero,
}: {
  modelSlug: string;
  hasHero: boolean;
}) {
  const pathname = usePathname();
  const basePath = `/models/${modelSlug}`;
  const [scrolled, setScrolled] = useState(false);

  const isOverviewWithHero = pathname === basePath && hasHero;

  useEffect(() => {
    if (!isOverviewWithHero) return;
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverviewWithHero]);

  const visible = isOverviewWithHero && scrolled;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 left-4 right-[88px] z-40 flex items-center justify-end gap-3 transition-all duration-300 motion-reduce:transition-none lg:left-auto lg:right-[100px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        href={`${basePath}#build-and-order`}
        className="cta-label whitespace-nowrap border border-[var(--color-ink)] bg-[var(--color-paper)] px-6 py-3.5 text-xs text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
      >
        Configure
      </Link>
      <button
        type="button"
        className="cta-label whitespace-nowrap border border-white bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
      >
        <span className="lg:hidden">Test Drive</span>
        <span className="hidden lg:inline">Book A Test Drive</span>
      </button>
    </div>
  );
}
