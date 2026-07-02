import Link from "next/link";
import { getBrand } from "@/lib/brand";
import { getModels } from "@/data/models";
import { Hero } from "@/components/home/Hero";
import { ModelCard } from "@/components/models/ModelCard";

const brand = getBrand();

export default function Home() {
  const featuredModels = getModels(brand.id).slice(0, 3);

  return (
    <>
      <Hero brand={brand} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl sm:text-4xl">The range</h2>
          <Link href="/models" className="cta-label text-xs">
            View all &rarr;
          </Link>
        </div>
        <div className="mt-10">
          {featuredModels.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-paper-muted)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl">Ownership, simplified</h2>
          <p className="mt-4 max-w-lg text-[var(--color-ink-soft)]">
            From servicing to warranty and finance, see what it takes to
            live with a {brand.shortName}.
          </p>
          <Link
            href="/ownership"
            className="cta-label mt-8 inline-block border border-[var(--color-ink)] px-6 py-3 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            Explore ownership
          </Link>
        </div>
      </section>
    </>
  );
}
