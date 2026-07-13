import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand } from "@/lib/brand";
import { getModel, getModels } from "@/data/models";
import { ModelViewer } from "@/components/three/ModelViewerLoader";

const brand = getBrand();

export function generateStaticParams() {
  return getModels(brand.id).map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  return { title: model ? `${model.name} | ${brand.name}` : brand.name };
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  if (!model) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/models"
        className="cta-label text-xs text-[var(--color-ink-soft)]"
      >
        &larr; All models
      </Link>

      <h1 className="mt-4 text-4xl sm:text-5xl">{model.name}</h1>
      <p className="mt-3 max-w-lg text-[var(--color-ink-soft)]">
        {model.summary}
      </p>

      <div className="mt-10">
        <ModelViewer accent={brand.colors.accent} modelUrl={model.modelUrl} />
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
    </div>
  );
}
