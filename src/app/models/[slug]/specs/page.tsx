import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import { getModel } from "@/data/models";
import { getModelVariants } from "@/data/modelVariants";
import { ModelVariantsSection } from "@/components/models/ModelVariantsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  return { title: model ? `${model.name} Models | ${brand.name}` : brand.name };
}

export default async function ModelVariantsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const variants = getModelVariants(slug);
  return (
    <ModelVariantsSection
      modelName={model.name}
      modelSlug={slug}
      variants={variants}
    />
  );
}
