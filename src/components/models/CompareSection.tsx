export function CompareSection({ modelName }: { modelName: string }) {
  return (
    <section id="compare" className="scroll-mt-32 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Compare</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">
          Compare {modelName} configurations
        </h2>
        <p className="mt-4 max-w-lg text-[var(--color-ink-soft)]">
          Choose up to three configurations to compare side by side.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <button
              key={slot}
              type="button"
              className="flex min-h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-[var(--color-border)] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            >
              <span aria-hidden className="text-2xl">
                +
              </span>
              <span className="cta-label text-xs">Add a model</span>
            </button>
          ))}
        </div>

        <p className="mt-10 text-xs text-[var(--color-ink-soft)]">
          Full comparison tool coming soon.
        </p>
      </div>
    </section>
  );
}
