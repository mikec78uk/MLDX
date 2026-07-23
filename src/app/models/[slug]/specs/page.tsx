import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brand";
import { getModel } from "@/data/models";
import { getModelSpecs } from "@/data/modelSpecs";
import { SpecsSection } from "@/components/models/SpecsSection";

const brand = getBrand();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  return { title: model ? `${model.name} Specs | ${brand.name}` : brand.name };
}

export default async function ModelSpecsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  if (!model) notFound();

  const specs = getModelSpecs(slug);
  return <SpecsSection modelName={model.name} specs={specs} />;
}
