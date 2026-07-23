export interface SpecTableRow {
  label: string;
  value: string;
}

export interface SpecCategory {
  title: string;
  count?: number;
  /** Bullet-style category (e.g. Standard Features groups). */
  items?: string[];
  /** Table-style category (e.g. Engine & Specifications groups). */
  rows?: SpecTableRow[];
}

export interface FullSpecs {
  hasData: boolean;
  engines: string[];
  retailPrice: string;
  onTheRoadPrice: string;
  keyFeatures: string[];
  standardFeatures: SpecCategory[];
  engineSpecs: SpecCategory[];
}

const EMPTY: FullSpecs = {
  hasData: false,
  engines: [],
  retailPrice: "",
  onTheRoadPrice: "",
  keyFeatures: [],
  standardFeatures: [],
  engineSpecs: [],
};

/**
 * Category names (and, where given, item counts) come from the full-specs
 * wireframe — these are the same generic groupings across every Defender
 * 110 variant. Only the categories with real content below (Exterior
 * Lighting's 8 items, Performance's 2 rows — both for the S, from the same
 * wireframe) are populated; everything else renders its "coming soon"
 * placeholder when expanded, since no other category/variant combination
 * has real content yet.
 */
const STANDARD_FEATURE_TEMPLATE: { title: string; count: number }[] = [
  { title: "Exterior Lighting", count: 8 },
  { title: "Interior Feature", count: 16 },
  { title: "Infotainment", count: 9 },
  { title: "Convenience", count: 5 },
  { title: "Towing", count: 1 },
  { title: "Transmission and Dynamics", count: 13 },
  { title: "Driver Assistance", count: 6 },
];

const ENGINE_SPEC_TEMPLATE: string[] = [
  "Performance",
  "Fuel Economy",
  "Powertrain",
  "Weights",
  "Towing",
  "Roof Carrying",
  "Dimensions",
  "Headroom",
  "Legroom",
  "Loadspace Capacity",
  "Ground Clearance Standard",
  "Ground Clearance Off Road",
  "Wading Depth",
  "Turning Circle",
  "WLTP Fuel Economy",
];

const exteriorLightingItems = [
  "Automatic headlights and rain sensing wipers",
  "Automatic Headlight Levelling",
  "Front fog lights",
  "Puddle lights",
  "Follow me home lighting",
  "Centre high-mounted stop light",
  "Darkened tail lights",
  "Rear fog light(s)",
];

const performanceRows: SpecTableRow[] = [
  { label: "Maximum Speed", value: "117" },
  { label: "Acceleration secs 0-60mph", value: "7.9" },
];

function standardFeaturesFor(withExteriorLighting: boolean): SpecCategory[] {
  return STANDARD_FEATURE_TEMPLATE.map((category) =>
    withExteriorLighting && category.title === "Exterior Lighting"
      ? { ...category, items: exteriorLightingItems }
      : category,
  );
}

function engineSpecsFor(withPerformance: boolean): SpecCategory[] {
  return ENGINE_SPEC_TEMPLATE.map((title) =>
    withPerformance && title === "Performance"
      ? { title, rows: performanceRows }
      : { title },
  );
}

const defender110: Record<string, FullSpecs> = {
  s: {
    hasData: true,
    engines: ["D250 Diesel Mild Hybrid", "Petrol Plug-in Hybrid"],
    retailPrice: "£60,840",
    onTheRoadPrice: "£64,315",
    keyFeatures: [
      "19\" Style 6010 wheels",
      "Body-coloured roof",
      "LED headlights with signature DRL",
      "Meridian™ Sound System",
      "Resist and Resolve seats",
      "12-way heated semi-powered front seats",
      "Terrain Response",
    ],
    standardFeatures: standardFeaturesFor(true),
    engineSpecs: engineSpecsFor(true),
  },
  "x-dynamic-se": {
    hasData: true,
    engines: [
      "D250 Diesel Mild Hybrid",
      "D350 Diesel Mild Hybrid",
      "P380 Petrol",
      "Petrol Plug-in Hybrid",
    ],
    retailPrice: "—",
    onTheRoadPrice: "£69,820",
    keyFeatures: [
      "20\" Style 5098 wheels",
      "Black contrast roof",
      "Resist seats",
      "12-way heated, electric memory front seats with 2-way manual headrests",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
  "x-dynamic-hse": {
    hasData: true,
    engines: ["D250 Diesel Mild Hybrid", "Petrol Plug-in Hybrid"],
    retailPrice: "—",
    onTheRoadPrice: "£74,270",
    keyFeatures: [
      "20\" Style 5098, Satin Dark Grey wheels",
      "Sliding panoramic roof",
      "Matrix LED headlights with signature DRL",
      "Meridian™ Surround Sound System",
      "Windsor leather seats",
      "14-way heated and cooled electric memory front seats with 4-way manual headrests",
      "Electrically adjustable steering column",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
  x: {
    hasData: true,
    engines: ["D350 Diesel Mild Hybrid", "P380 Petrol", "Petrol Plug-in Hybrid"],
    retailPrice: "—",
    onTheRoadPrice: "£97,125",
    keyFeatures: [
      "22\" Style 7030 Diamond Turned, Dark Grey wheels",
      "Windsor leather and forged textile seats",
      "14-way heated and cooled electric memory front seats with 4-way manual winged headrests",
      "Signature interior upgrade",
      "Orange front brake calipers",
      "Orange exposed rear recovery eyes",
      "Black contrast bonnet",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
  vertex: {
    hasData: true,
    engines: ["D350 Diesel Mild Hybrid", "P380 Petrol"],
    retailPrice: "—",
    onTheRoadPrice: "£98,270",
    keyFeatures: [
      "22\" Style 7030, Diamond Turned, Satin Dark Grey tinted wheels with Carpathian Grey contrast",
      "Yellow front brake calipers",
      "Extended front and rear bumper",
      "Gloss Black tail door spoiler",
      "Yellow exposed rear recovery eyes",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
  "trophy-yellow": {
    hasData: true,
    engines: ["D350 Diesel Mild Hybrid", "Petrol Plug-in Hybrid"],
    retailPrice: "—",
    onTheRoadPrice: "£84,345",
    keyFeatures: [
      "Trophy Edition badge",
      "All-Terrain Tyres (Vmax 130mph)",
      "20\" Style 9013, Gloss Black wheels",
      "Trophy Edition bonnet decal",
      "Illuminated metal treadplates with Trophy Edition branding",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
  "trophy-black": {
    hasData: true,
    engines: ["D350 Diesel Mild Hybrid", "Petrol Plug-in Hybrid"],
    retailPrice: "—",
    onTheRoadPrice: "£84,345",
    keyFeatures: [
      "Trophy Edition badge",
      "All-Terrain Tyres (Vmax 130mph)",
      "20\" Style 9013, Gloss Black wheels",
      "Trophy Edition bonnet decal",
      "Illuminated metal treadplates with Trophy Edition branding",
    ],
    standardFeatures: standardFeaturesFor(false),
    engineSpecs: engineSpecsFor(false),
  },
};

const fullSpecsByModelSlug: Record<string, Record<string, FullSpecs>> = {
  "defender-110": defender110,
};

export function getFullSpecs(modelSlug: string, variantSlug: string): FullSpecs {
  return fullSpecsByModelSlug[modelSlug]?.[variantSlug] ?? EMPTY;
}
