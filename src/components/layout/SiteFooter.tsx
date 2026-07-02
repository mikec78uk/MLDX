import type { BrandConfig } from "@/lib/brand";

export function SiteFooter({ brand }: { brand: BrandConfig }) {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-paper-muted)]">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[var(--color-ink-soft)]">
        <p className="font-[family-name:var(--font-display)] uppercase tracking-wide text-[var(--color-ink)]">
          {brand.name}
        </p>
        <p className="mt-2 max-w-md">{brand.description}</p>
        <p className="mt-8 text-xs">
          Usability prototype — not for public distribution.
        </p>
      </div>
    </footer>
  );
}
