import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brand";
import { getModel, getModels } from "@/data/models";
import { getModelHero } from "@/data/modelHero";
import { ModelStickyNav } from "@/components/models/ModelStickyNav";

const brand = getBrand();

export function generateStaticParams() {
  return getModels(brand.id).map((model) => ({ slug: model.slug }));
}

export default async function ModelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModel(brand.id, slug);
  if (!model) notFound();
  const hero = getModelHero(slug);

  return (
    <div>
      <ModelStickyNav
        modelName={model.name}
        modelSlug={model.slug}
        inStockAvailable
        overviewHasHero={hero.hasData}
      />
      {children}
    </div>
  );
}
