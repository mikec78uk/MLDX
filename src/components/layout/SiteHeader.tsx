"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { BrandConfig } from "@/lib/brand";
import {
  getLookupSnapshot,
  getServerLookupSnapshot,
  subscribeToLookup,
} from "@/lib/ownership/session";

const NAV_LINKS = [
  { href: "/models", label: "Models" },
  { href: "/ownership", label: "Ownership" },
] as const;

/** How far you need to scroll before the header solidifies. */
const SCROLL_THRESHOLD = 80;

export function SiteHeader({ brand }: { brand: BrandConfig }) {
  const pathname = usePathname();
  // Coupling the shared header to the ownership lookup store is a
  // deliberate one-off: the ownership hero is the only place the header
  // needs to go transparent-over-image, and it's the only page with a
  // dark full-bleed hero directly under it. Revisit if a second page
  // needs the same treatment.
  const lookup = useSyncExternalStore(
    subscribeToLookup,
    getLookupSnapshot,
    getServerLookupSnapshot,
  );
  const [scrolled, setScrolled] = useState(false);

  const hasTransparentHero = pathname === "/ownership" && lookup?.status !== "found";

  useEffect(() => {
    if (!hasTransparentHero) return;
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTransparentHero]);

  const transparent = hasTransparentHero && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        transparent
          ? "border-white/15 bg-transparent"
          : "border-[var(--color-border)] bg-[var(--color-paper)]/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className={`font-[family-name:var(--font-display-bold)] text-lg tracking-tight uppercase ${
            transparent ? "text-white" : "text-[var(--color-ink)]"
          }`}
        >
          {brand.shortName}
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`cta-label text-xs transition-opacity hover:opacity-60 ${
                transparent ? "text-white" : "text-[var(--color-ink)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
