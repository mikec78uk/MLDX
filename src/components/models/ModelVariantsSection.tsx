"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { ModelVariant, ModelVariantsData, VariantRow } from "@/data/modelVariants";
import { getFullSpecs } from "@/data/modelFullSpecs";
import { ArrowRightIcon } from "@/components/icons";
import { SpecsFlyout } from "@/components/models/SpecsFlyout";

/**
 * "See full specs" opens the flyout shell and "Start exploring" links to
 * the Help Me Choose flow; "Build and order" has no real destination yet —
 * rendered as a real-looking but inert control, matching the pattern
 * already used for undetermined links elsewhere.
 */
export function ModelVariantsSection({
  modelSlug,
  variants,
  modelName,
}: {
  modelName: string;
  modelSlug: string;
  variants: ModelVariantsData;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  // Keeps showing the last-opened variant's content while the flyout
  // slides closed — the flyout stays permanently mounted (see below) so
  // its CSS transition has a "before" state to animate from, which means
  // its content can't just disappear the instant openSlug clears.
  const [displayedSlug, setDisplayedSlug] = useState<string | null>(null);
  if (openSlug && openSlug !== displayedSlug) {
    setDisplayedSlug(openSlug);
  }
  const displayedVariant =
    variants.variants.find((variant) => variant.slug === displayedSlug) ??
    variants.variants[0];

  return (
    <section className="bg-[var(--color-paper-muted)]">
      {!variants.hasData ? (
        <div className="px-6 py-16">
          <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Models</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{modelName} Model Variants</h2>
          <p className="mt-8 max-w-lg text-[var(--color-ink-soft)]">
            Model variants for {modelName} are coming soon.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-16 py-16">
            {variants.rows.map((row) => (
              <VariantRowSection
                key={row.headline}
                row={row}
                variants={variants.variants}
                onSeeSpecs={setOpenSlug}
              />
            ))}
          </div>

          <div className="px-6 pb-16">
            <div className="border border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-16 text-center">
              <h3 className="text-2xl sm:text-3xl">Need help deciding?</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-ink-soft)]">
                Tell us what matters to you, and we&rsquo;ll help you find the
                Defender that best fits you.
              </p>
              <Link
                href="/help-me-choose"
                className="cta-label mt-6 inline-flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-4 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon />
                Start exploring
              </Link>
            </div>
          </div>
        </>
      )}

      {variants.hasData && displayedVariant && (
        <SpecsFlyout
          open={Boolean(openSlug)}
          onClose={() => setOpenSlug(null)}
          variantName={displayedVariant.name}
          variantImage={displayedVariant.image}
          fullSpecs={getFullSpecs(modelSlug, displayedVariant.slug)}
        />
      )}
    </section>
  );
}

function VariantRowSection({
  row,
  variants,
  onSeeSpecs,
}: {
  row: VariantRow;
  variants: ModelVariant[];
  onSeeSpecs: (slug: string) => void;
}) {
  const rowVariants = row.variantSlugs
    .map((slug) => variants.find((variant) => variant.slug === slug))
    .filter((variant): variant is ModelVariant => Boolean(variant));
  if (rowVariants.length === 0) return null;

  return (
    <div>
      <div className="px-6">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">{row.subheading}</p>
        <h3 className="mt-3 text-3xl sm:text-4xl">{row.headline}</h3>
        <p className="mt-3 max-w-lg text-[var(--color-ink-soft)]">{row.body}</p>
      </div>

      <div className="mt-10 px-6">
        {rowVariants.length === 1 ? (
          <div className="mx-auto max-w-xl">
            <VariantCard variant={rowVariants[0]} onSeeSpecs={() => onSeeSpecs(rowVariants[0].slug)} />
          </div>
        ) : (
          <div
            className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:gap-8 lg:overflow-visible lg:pb-0 ${
              rowVariants.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            {rowVariants.map((variant) => (
              <div
                key={variant.slug}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto lg:shrink"
              >
                <VariantCard variant={variant} onSeeSpecs={() => onSeeSpecs(variant.slug)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VariantCard({
  variant,
  onSeeSpecs,
}: {
  variant: ModelVariant;
  onSeeSpecs: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-paper)] p-6 sm:p-8">
      <div className="relative aspect-[640/360] w-full bg-[var(--color-paper-muted)]">
        <Image src={withBasePath(variant.image)} alt={variant.name} fill className="object-cover" />
      </div>

      <p className="text-xl">{variant.name}</p>
      <p className="-mt-2 text-sm text-[var(--color-ink-soft)]">
        OTR Price from {variant.priceFrom}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {variant.fuelTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-paper-muted)] px-3 py-1 text-xs text-[var(--color-ink)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">Key Features</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-ink-soft)]">
          {variant.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onSeeSpecs}
          className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-4 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          <ArrowRightIcon />
          See full specs
        </button>
        <button
          type="button"
          className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-4 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
        >
          <ArrowRightIcon />
          Build and order
        </button>
      </div>
    </div>
  );
}
