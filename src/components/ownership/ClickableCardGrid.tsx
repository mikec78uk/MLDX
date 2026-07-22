import Link from "next/link";
import type { CardLink } from "@/data/ownership";

export function ClickableCardGrid({
  title,
  cards,
  columns = 3,
  variant = "compact",
}: {
  title: string;
  cards: CardLink[];
  columns?: 2 | 3;
  /** "tile" is the larger, centered treatment for feature-level cards. */
  variant?: "compact" | "tile";
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl">{title}</h2>
      <div
        className={`mt-8 grid gap-6 ${
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {cards.map((card) =>
          variant === "tile" ? (
            <Link
              key={card.slug}
              href={`/ownership/${card.slug}`}
              className="group flex min-h-[160px] flex-col items-center justify-center gap-3 border border-transparent bg-[var(--color-paper-muted)] p-6 text-center transition-colors hover:border-[var(--color-ink)] sm:min-h-[180px]"
            >
              <p className="text-xl sm:text-2xl">{card.title}</p>
              <span className="cta-label text-xs text-[var(--color-ink-soft)] underline underline-offset-4">
                Discover more{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  &rsaquo;
                </span>
              </span>
            </Link>
          ) : (
            <Link
              key={card.slug}
              href={`/ownership/${card.slug}`}
              className="group flex items-center justify-between gap-4 border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-ink)]"
            >
              <div>
                <p className="text-base">{card.title}</p>
                {card.summary && (
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                    {card.summary}
                  </p>
                )}
              </div>
              <span
                aria-hidden
                className="shrink-0 text-[var(--color-ink-soft)] transition-transform group-hover:translate-x-0.5"
              >
                &rsaquo;
              </span>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
