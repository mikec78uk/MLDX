import type { BrandId } from "@/lib/brand";

export interface ModelSummary {
  slug: string;
  name: string;
  summary: string;
  priceFrom: string;
}

/**
 * Placeholder catalogue content — round, illustrative pricing only.
 * Real model line-up, copy, imagery and pricing land in the content pass
 * (the "20%" of the client's 70/20/10 reskin split) once supplied.
 */
const modelsByBrand: Record<BrandId, ModelSummary[]> = {
  "range-rover": [
    {
      slug: "range-rover",
      name: "Range Rover",
      summary: "The pinnacle of modern luxury.",
      priceFrom: "£100,000",
    },
    {
      slug: "range-rover-sport",
      name: "Range Rover Sport",
      summary: "Dynamic design meets refined performance.",
      priceFrom: "£85,000",
    },
    {
      slug: "range-rover-velar",
      name: "Range Rover Velar",
      summary: "Reductive design, avant-garde technology.",
      priceFrom: "£60,000",
    },
    {
      slug: "range-rover-evoque",
      name: "Range Rover Evoque",
      summary: "Compact, versatile, unmistakably Range Rover.",
      priceFrom: "£45,000",
    },
  ],
  defender: [
    {
      slug: "defender-90",
      name: "Defender 90",
      summary: "Two-door capability, purpose-built.",
      priceFrom: "£57,000",
    },
    {
      slug: "defender-110",
      name: "Defender 110",
      summary: "The most versatile Defender.",
      priceFrom: "£62,000",
    },
    {
      slug: "defender-130",
      name: "Defender 130",
      summary: "Eight-seat capability for the whole family.",
      priceFrom: "£70,000",
    },
  ],
};

export function getModels(brandId: BrandId): ModelSummary[] {
  return modelsByBrand[brandId];
}

export function getModel(
  brandId: BrandId,
  slug: string,
): ModelSummary | undefined {
  return getModels(brandId).find((model) => model.slug === slug);
}
