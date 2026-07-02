import Link from "next/link";
import type { BrandConfig } from "@/lib/brand";

const NAV_LINKS = [
  { href: "/models", label: "Models" },
  { href: "/ownership", label: "Ownership" },
] as const;

export function SiteHeader({ brand }: { brand: BrandConfig }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-paper)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display-bold)] text-lg tracking-tight uppercase"
        >
          {brand.shortName}
        </Link>
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cta-label text-xs text-[var(--color-ink)] transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
