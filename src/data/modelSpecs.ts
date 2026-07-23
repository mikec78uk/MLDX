export interface Trim {
  name: string;
  priceFrom: string;
  highlights: string[];
}

export interface ModelSpecs {
  /** False shows a "coming soon" placeholder instead of the trim table. */
  hasData: boolean;
  engineOptions: string[];
  trims: Trim[];
}

const EMPTY_SPECS: ModelSpecs = {
  hasData: false,
  engineOptions: [],
  trims: [],
};

/**
 * Trim names, prices and feature differentiators sourced from
 * landrover.co.uk/defender/defender-110/models-and-specifications.html.
 * Engine options are listed as a shared range rather than paired to a
 * specific trim, since the source page doesn't confirm that mapping.
 */
const defender110: ModelSpecs = {
  hasData: true,
  engineOptions: [
    "D250 Diesel Mild Hybrid",
    "D300 Diesel Mild Hybrid",
    "D350 Diesel Mild Hybrid",
    "P400 Petrol Mild Hybrid",
    "Petrol Plug-in Hybrid",
  ],
  trims: [
    {
      name: "Defender 110 S",
      priceFrom: "£64,315",
      highlights: [
        "12-way heated semi-powered front seats",
        "LED headlights",
        "10\" touchscreen with Apple CarPlay & Android Auto",
        "8-speed automatic, All Wheel Drive",
      ],
    },
    {
      name: "Defender 110 X-Dynamic SE",
      priceFrom: "£69,820",
      highlights: [
        "Matrix LED headlights",
        "13.1\" touchscreen, Meridian Sound System",
        "Blind Spot Assist, Rear Collision Monitor",
        "3D Surround Camera",
      ],
    },
    {
      name: "Defender 110 X-Dynamic HSE",
      priceFrom: "£74,270",
      highlights: [
        "Panoramic roof",
        "Leather seats",
        "Adaptive Cruise Control, Lane Keep Assist",
        "360° Parking Aid",
      ],
    },
    {
      name: "Defender 110 X",
      priceFrom: "£97,125",
      highlights: [
        "22\" wheels",
        "Terrain Response 2",
        "Electronic Active Differential",
        "Premium interior finishes",
      ],
    },
    {
      name: "Defender 110 Vertex",
      priceFrom: "£98,270",
      highlights: [
        "Distinctive styling accents",
        "22\" wheels",
        "Terrain Response 2",
        "Electronic Active Differential",
      ],
    },
    {
      name: "Defender 110 Trophy Edition",
      priceFrom: "£84,345",
      highlights: [
        "Deep Sandglow Yellow or Santorini Black",
        "All-terrain tyres",
        "Trophy Edition badging and graphics",
        "Trailer Stability Assist",
      ],
    },
  ],
};

const specsBySlug: Record<string, ModelSpecs> = {
  "defender-110": defender110,
};

export function getModelSpecs(slug: string): ModelSpecs {
  return specsBySlug[slug] ?? EMPTY_SPECS;
}
