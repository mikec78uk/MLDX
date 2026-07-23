import Link from "next/link";
import type { ModelSummary } from "@/data/models";
import { ModelViewer } from "@/components/three/ModelViewerLoader";

export function OverviewSection({
  model,
  accent,
}: {
  model: ModelSummary;
  accent: string;
}) {
  return (
    <section
      id="overview"
      className="mx-auto max-w-5xl scroll-mt-32 px-6 py-16"
    >
      <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Overview</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{model.name}</h1>
      <p className="mt-3 max-w-lg text-[var(--color-ink-soft)]">
        {model.summary}
      </p>

      <div className="mt-10">
        <ModelViewer accent={accent} modelUrl={model.modelUrl} />
        <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
          {model.modelUrl
            ? "Drag to rotate."
            : `Drag to rotate. Placeholder geometry — swap for the real ${model.name} model once 3D assets are supplied.`}
        </p>
      </div>

      <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-6">
        <div>
          <dt className="eyebrow text-xs text-[var(--color-ink-soft)]">
            From
          </dt>
          <dd className="mt-1 text-lg">{model.priceFrom}</dd>
        </div>
        <div>
          <dt className="eyebrow text-xs text-[var(--color-ink-soft)]">
            Ownership
          </dt>
          <dd className="mt-1 text-lg">
            <Link href="/ownership" className="underline underline-offset-4">
              View details
            </Link>
          </dd>
        </div>
      </dl>

      <p className="mt-12 max-w-lg text-sm text-[var(--color-ink-soft)]">
        Full storytelling content for this model — lifestyle imagery, feature
        highlights, films — lands in a later content pass.
      </p>
    </section>
  );
}
