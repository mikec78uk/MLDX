import type { ModelSpecs } from "@/data/modelSpecs";

export function SpecsSection({
  modelName,
  specs,
}: {
  modelName: string;
  specs: ModelSpecs;
}) {
  return (
    <section
      id="specs"
      className="scroll-mt-32 border-t border-[var(--color-border)] bg-[var(--color-paper-muted)]"
    >
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Specs</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Models and specifications</h2>

        {!specs.hasData ? (
          <p className="mt-8 max-w-lg text-[var(--color-ink-soft)]">
            Detailed specifications for {modelName} are coming soon.
          </p>
        ) : (
          <>
            <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
              Available with {specs.engineOptions.join(", ")}.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specs.trims.map((trim) => (
                <div
                  key={trim.name}
                  className="border border-[var(--color-border)] bg-[var(--color-paper)] p-6"
                >
                  <h3 className="text-lg">{trim.name}</h3>
                  <p className="eyebrow mt-1 text-xs text-[var(--color-ink-soft)]">
                    From {trim.priceFrom}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
                    {trim.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xs text-[var(--color-ink-soft)]">
              Pricing and specification shown are placeholder content for
              usability testing purposes only.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
