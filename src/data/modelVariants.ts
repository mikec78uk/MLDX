export type FuelTag = "Petrol" | "Diesel" | "Hybrid";

export interface ModelVariant {
  slug: string;
  name: string;
  image: string;
  priceFrom: string;
  fuelTags: FuelTag[];
  keyFeatures: string[];
}

export interface ModelVariantsData {
  hasData: boolean;
  variants: ModelVariant[];
}

const EMPTY: ModelVariantsData = { hasData: false, variants: [] };

/**
 * Variant cards for the model-specific "Models" tab (browsing derivatives of
 * this model, distinct from the Compare tab's attribute-matrix table).
 * Sourced from the same landrover.co.uk spec page as modelSpecs.ts, but
 * Trophy Edition is split into its two paint options here since each gets
 * its own photo/card, unlike the merged single row in the Compare matrix.
 */
const defender110: ModelVariantsData = {
  hasData: true,
  variants: [
    {
      slug: "s",
      name: "Defender S",
      image: "/models/variants/defender-110-s.png",
      priceFrom: "£64,315",
      fuelTags: ["Diesel", "Hybrid"],
      keyFeatures: [
        "19\" Style 6010 wheels",
        "Body-coloured roof",
        "LED headlights with signature DRL",
        "Meridian™ Sound System",
        "Resist and Resolve seats",
        "12-way heated semi-powered front seats",
        "Terrain Response",
      ],
    },
    {
      slug: "x-dynamic-se",
      name: "Defender X-Dynamic SE",
      image: "/models/variants/defender-110-x-dynamic-se.png",
      priceFrom: "£69,820",
      fuelTags: ["Petrol", "Diesel", "Hybrid"],
      keyFeatures: [
        "20\" Style 5098 wheels",
        "Black contrast roof",
        "Resist seats",
        "12-way heated, electric memory front seats with 2-way manual headrests",
      ],
    },
    {
      slug: "x-dynamic-hse",
      name: "Defender X-Dynamic HSE",
      image: "/models/variants/defender-110-x-dynamic-hse.png",
      priceFrom: "£74,270",
      fuelTags: ["Diesel", "Hybrid"],
      keyFeatures: [
        "20\" Style 5098, Satin Dark Grey wheels",
        "Sliding panoramic roof",
        "Matrix LED headlights with signature DRL",
        "Meridian™ Surround Sound System",
        "Windsor leather seats",
        "14-way heated and cooled electric memory front seats with 4-way manual headrests",
        "Electrically adjustable steering column",
      ],
    },
    {
      slug: "x",
      name: "Defender X",
      image: "/models/variants/defender-110-x.png",
      priceFrom: "£97,125",
      fuelTags: ["Petrol", "Diesel", "Hybrid"],
      keyFeatures: [
        "22\" Style 7030 Diamond Turned, Dark Grey wheels",
        "Windsor leather and forged textile seats",
        "14-way heated and cooled electric memory front seats with 4-way manual winged headrests",
        "Signature interior upgrade",
        "Orange front brake calipers",
        "Orange exposed rear recovery eyes",
        "Black contrast bonnet",
      ],
    },
    {
      slug: "vertex",
      name: "Defender Vertex",
      image: "/models/variants/defender-110-vertex.png",
      priceFrom: "£98,270",
      fuelTags: ["Petrol", "Diesel"],
      keyFeatures: [
        "22\" Style 7030, Diamond Turned, Satin Dark Grey tinted wheels with Carpathian Grey contrast",
        "Yellow front brake calipers",
        "Extended front and rear bumper",
        "Gloss Black tail door spoiler",
        "Yellow exposed rear recovery eyes",
      ],
    },
    {
      slug: "trophy-yellow",
      name: "Defender Trophy Edition in Deep Sandglow Yellow",
      image: "/models/variants/defender-110-trophy-yellow.png",
      priceFrom: "£84,345",
      fuelTags: ["Diesel", "Hybrid"],
      keyFeatures: [
        "Trophy Edition badge",
        "All-Terrain Tyres (Vmax 130mph)",
        "20\" Style 9013, Gloss Black wheels",
        "Trophy Edition bonnet decal",
        "Illuminated metal treadplates with Trophy Edition branding",
      ],
    },
    {
      slug: "trophy-black",
      name: "Defender Trophy Edition in Santorini Black",
      image: "/models/variants/defender-110-trophy-black.png",
      priceFrom: "£84,345",
      fuelTags: ["Diesel", "Hybrid"],
      keyFeatures: [
        "Trophy Edition badge",
        "All-Terrain Tyres (Vmax 130mph)",
        "20\" Style 9013, Gloss Black wheels",
        "Trophy Edition bonnet decal",
        "Illuminated metal treadplates with Trophy Edition branding",
      ],
    },
  ],
};

const variantsBySlug: Record<string, ModelVariantsData> = {
  "defender-110": defender110,
};

export function getModelVariants(slug: string): ModelVariantsData {
  return variantsBySlug[slug] ?? EMPTY;
}
