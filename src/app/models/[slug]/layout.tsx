import { notFound } from "next/navigation";
import { getModel, getModels } from "@/data/models";
import { getModelHero } from "@/data/modelHero";
import { ModelStickyNav } from "@/components/models/ModelStickyNav";
import { FloatingModelCTA } from "@/components/models/FloatingModelCTA";

export function generateStaticParams() {
  return getModels().map((model) => ({ slug: model.slug }));
}

export default async function ModelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();
  const hasHero = getModelHero(model.slug).hasData;

  return (
    <div className="bg-[var(--color-paper-muted)]">
      <ModelStickyNav modelName={model.name} modelSlug={model.slug} hasHero={hasHero} />
      {children}
      <FloatingModelCTA modelSlug={model.slug} hasHero={hasHero} />
    </div>
  );
}
