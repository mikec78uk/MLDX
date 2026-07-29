"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { ModelVariantsData } from "@/data/modelVariants";
import type { BuildGalleryCategory, ExteriorColor } from "@/data/modelOverviewContent";
import { ArrowRightIcon, ChevronIcon } from "@/components/icons";

/**
 * Mirrors the real Build and Order configurator pattern (model radio, trim
 * tabs, a main-viewer-plus-thumbnails gallery, an Exterior/Interior/Wheels/
 * Accessories sub-gallery, colour swatches, price + CTAs) rather than a
 * from-scratch layout. "Defender OCTA" is a real-looking but permanently
 * disabled radio — it isn't a model this app has any page/spec content
 * for, only included so the picker matches visually.
 */
export function BuildAndOrderSection({
  modelName,
  modelSlug,
  variants,
  colors,
  defaultColor,
  galleryCategories,
}: {
  modelName: string;
  modelSlug: string;
  variants: ModelVariantsData;
  colors: ExteriorColor[];
  defaultColor: string;
  galleryCategories: BuildGalleryCategory[];
}) {
  const [activeSlug, setActiveSlug] = useState(variants.variants[0]?.slug);
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [activeCategoryKey, setActiveCategoryKey] = useState(galleryCategories[0]?.key);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const active = variants.variants.find((v) => v.slug === activeSlug) ?? variants.variants[0];
  const activeCategory =
    galleryCategories.find((c) => c.key === activeCategoryKey) ?? galleryCategories[0];

  if (!variants.hasData || !active || !activeCategory) return null;

  // The "Exterior" category leads with this trim's own photo; every other
  // category only has shared stand-in photography (no real per-trim
  // interior/wheel/accessory shots exist yet).
  const images =
    activeCategory.key === "exterior"
      ? [active.image, "/models/overview/category-exterior.png", "/models/overview/hero-background.png"]
      : activeCategory.images;

  function selectCategory(key: string) {
    setActiveCategoryKey(key);
    setActiveImageIndex(0);
  }

  function stepImage(direction: 1 | -1) {
    setActiveImageIndex((index) => (index + direction + images.length) % images.length);
  }

  return (
    <div className="px-6">
      <h2 className="cta-label text-3xl sm:text-4xl">Build and Order</h2>
      <p className="mt-3 text-[var(--color-ink-soft)]">
        Choose a Defender. Then make it yours.
      </p>

      <div className="mt-8 flex flex-wrap gap-8">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="build-model"
            checked
            readOnly
            className="h-5 w-5 accent-[var(--color-ink)]"
          />
          <span className="cta-label text-xs">{modelName}</span>
        </label>
        <label className="flex items-center gap-2 text-[var(--color-ink-soft)]">
          <input type="radio" name="build-model" disabled className="h-5 w-5" />
          <span className="cta-label text-xs">Defender OCTA</span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-8">
        {variants.variants.map((variant) => (
          <button
            key={variant.slug}
            type="button"
            onClick={() => setActiveSlug(variant.slug)}
            className={`cta-label whitespace-nowrap border-b-2 pb-3 text-xs font-semibold transition-colors ${
              activeSlug === variant.slug
                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {variant.name.replace(/^Defender /, "")}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="relative aspect-[753/456] w-full overflow-hidden rounded-[5px] bg-[var(--color-paper-muted)]">
            <Image
              src={withBasePath(images[activeImageIndex])}
              alt={active.name}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => stepImage(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-ink)]"
              >
                <ChevronIcon direction="left" className="h-2.5 w-2" />
              </button>
              <span className="cta-label text-xs text-[var(--color-ink-soft)]">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => stepImage(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-ink)]"
              >
                <ChevronIcon direction="right" className="h-2.5 w-2" />
              </button>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="grid gap-4">
            {images.slice(1, 3).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImageIndex(index + 1)}
                className="relative aspect-[444/223] w-full overflow-hidden rounded-[5px] bg-[var(--color-paper-muted)]"
              >
                <Image src={withBasePath(image)} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        {galleryCategories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => selectCategory(category.key)}
            className={`cta-label whitespace-nowrap border-b-2 pb-3 text-xs font-semibold transition-colors ${
              activeCategoryKey === category.key
                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-8">
        <div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                onClick={() => setActiveColor(color.name)}
                className={`relative h-[70px] w-[70px] overflow-hidden rounded-[4px] border-2 transition-colors ${
                  activeColor === color.name
                    ? "border-[var(--color-icon-default,#595959)]"
                    : "border-transparent"
                }`}
              >
                <Image src={withBasePath(color.image)} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold">{activeColor}</p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="text-xs text-[var(--color-ink-soft)]">From</p>
            <p className="text-2xl">{active.priceFrom}</p>
          </div>
          <button
            type="button"
            className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <ArrowRightIcon />
            Build your own
          </button>
          <Link
            href={`/models/${modelSlug}/compare`}
            className="cta-label flex items-center gap-2 whitespace-nowrap text-xs transition-colors hover:text-[var(--color-ink-soft)]"
          >
            <ArrowRightIcon />
            Compare models
          </Link>
        </div>
      </div>
    </div>
  );
}
