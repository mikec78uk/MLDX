import type { Metadata } from "next";
import { getBrand } from "@/lib/brand";
import { getModels } from "@/data/models";
import { ModelCard } from "@/components/models/ModelCard";

const brand = getBrand();

export const metadata: Metadata = {
  title: `Models | ${brand.name}`,
};

export default function ModelsPage() {
  const models = getModels(brand.id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
        The range
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Explore {brand.shortName}</h1>
      <div className="mt-12">
        {models.map((model) => (
          <ModelCard key={model.slug} model={model} />
        ))}
      </div>
      <p className="mt-12 text-xs text-[var(--color-ink-soft)]">
        Pricing and specification shown are placeholder content for usability
        testing purposes only.
      </p>
    </div>
  );
}
