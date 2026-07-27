export interface ModelSummary {
  slug: string;
  name: string;
  summary: string;
  priceFrom: string;
  /** Path to a real glTF (.glb) under /public. Falls back to placeholder geometry when unset. */
  modelUrl?: string;
}

/**
 * Placeholder catalogue content — round, illustrative pricing only.
 * Real model line-up, copy, imagery and pricing land in the content pass
 * once supplied.
 */
const models: ModelSummary[] = [
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
    modelUrl: "/models/defender-110.glb",
  },
  {
    slug: "defender-130",
    name: "Defender 130",
    summary: "Eight-seat capability for the whole family.",
    priceFrom: "£70,000",
  },
];

export function getModels(): ModelSummary[] {
  return models;
}

export function getModel(slug: string): ModelSummary | undefined {
  return models.find((model) => model.slug === slug);
}
