import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand } from "@/lib/brand";
import { getAllOwnershipCards, getOwnershipCard } from "@/data/ownership";

const brand = getBrand();

export function generateStaticParams() {
  return getAllOwnershipCards(brand.id).map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = getOwnershipCard(brand.id, slug);
  return { title: card ? `${card.title} | ${brand.name}` : brand.name };
}

export default async function OwnershipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = getOwnershipCard(brand.id, slug);
  if (!card) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/ownership"
        className="cta-label text-xs text-[var(--color-ink-soft)]"
      >
        &larr; Ownership
      </Link>
      <h1 className="mt-4 text-4xl sm:text-5xl">{card.title}</h1>
      <p className="mt-4 max-w-lg text-[var(--color-ink-soft)]">
        {card.detail}
      </p>
      <p className="mt-12 text-xs text-[var(--color-ink-soft)]">
        Full content for this section is coming in a later pass.
      </p>
    </div>
  );
}
