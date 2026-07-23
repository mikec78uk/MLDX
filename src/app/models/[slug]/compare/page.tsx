import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brand";
import { getModel } from "@/data/models";
import { getModelSpecs } from "@/data/modelSpecs";
import { CompareSection } from "@/components/models/CompareSection";

const brand = getBrand();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  return {
    title: model ? `Compare ${model.name} | ${brand.name}` : brand.name,
  };
}

export default async function ModelComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  if (!model) notFound();

  const specs = getModelSpecs(slug);
  return <CompareSection modelName={model.name} specs={specs} />;
}
