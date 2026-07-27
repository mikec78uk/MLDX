import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import { getModel } from "@/data/models";
import { OverviewSection } from "@/components/models/OverviewSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  return { title: model ? `${model.name} | ${brand.name}` : brand.name };
}

export default async function ModelOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  return (
    <OverviewSection
      model={model}
      accent={brand.colors.accent}
      brandShortName={brand.shortName}
    />
  );
}
