import Link from "next/link";
import type { ModelSummary } from "@/data/models";

export function ModelCard({ model }: { model: ModelSummary }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="group block border-b border-[var(--color-border)] py-8 first:pt-0 last:border-b-0"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="text-2xl transition-opacity group-hover:opacity-60 sm:text-3xl">
          {model.name}
        </h3>
        <span className="cta-label shrink-0 text-xs text-[var(--color-ink-soft)]">
          Explore &rarr;
        </span>
      </div>
      <p className="mt-2 max-w-lg text-[var(--color-ink-soft)]">
        {model.summary}
      </p>
      <p className="eyebrow mt-4 text-xs text-[var(--color-ink-soft)]">
        From {model.priceFrom}
      </p>
    </Link>
  );
}
