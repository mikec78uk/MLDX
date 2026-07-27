import { notFound } from "next/navigation";
import { getModel, getModels } from "@/data/models";
import { ModelStickyNav } from "@/components/models/ModelStickyNav";

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

  return (
    <div className="bg-[var(--color-paper-muted)]">
      <ModelStickyNav
        modelName={model.name}
        modelSlug={model.slug}
        inStockAvailable
      />
      {children}
    </div>
  );
}
