import type { OwnershipContent } from "@/data/ownership";

export function FinancePromo({
  promo,
}: {
  promo: OwnershipContent["financePromo"];
}) {
  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div
          className="aspect-[4/3] w-full bg-[var(--color-paper-muted)] bg-cover bg-center"
          style={
            promo.image ? { backgroundImage: `url(${promo.image})` } : undefined
          }
          aria-hidden
        />
        <div>
          <h2 className="text-2xl sm:text-3xl">{promo.title}</h2>
          <p className="mt-4 max-w-md text-[var(--color-ink-soft)]">
            {promo.description}
          </p>
          <button
            type="button"
            className="cta-label mt-6 bg-[var(--color-ink)] px-6 py-3 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            {promo.ctaLabel}
          </button>
          <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
            {promo.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
