import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brand";
import { getModel } from "@/data/models";
import { getModelVariants } from "@/data/modelVariants";
import { ModelVariantsSection } from "@/components/models/ModelVariantsSection";

const brand = getBrand();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  return { title: model ? `${model.name} Models | ${brand.name}` : brand.name };
}

export default async function ModelVariantsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  if (!model) notFound();

  const variants = getModelVariants(slug);
  return <ModelVariantsSection modelName={model.name} variants={variants} />;
}
