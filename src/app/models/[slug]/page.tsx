import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brand";
import { getModel, getModels } from "@/data/models";
import { getModelSpecs } from "@/data/modelSpecs";
import { ModelStickyNav } from "@/components/models/ModelStickyNav";
import { OverviewSection } from "@/components/models/OverviewSection";
import { SpecsSection } from "@/components/models/SpecsSection";
import { CompareSection } from "@/components/models/CompareSection";

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

  const specs = getModelSpecs(slug);

  return (
    <div>
      <ModelStickyNav modelName={model.name} inStockAvailable />
      <OverviewSection model={model} accent={brand.colors.accent} />
      <SpecsSection modelName={model.name} specs={specs} />
      <CompareSection modelName={model.name} />
    </div>
  );
}
