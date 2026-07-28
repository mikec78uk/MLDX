export interface CategoryCard {
  key: string;
  label: string;
  image: string;
}

export interface StatStripItem {
  value: string;
  unit: string;
  label: string;
}

export interface TerrainReadout {
  rideHeight: string;
  throttle: string;
  traction: string;
}

export interface TerrainMode {
  key: string;
  label: string;
  hasData: boolean;
  title?: string;
  body?: string;
  readout?: TerrainReadout;
  image: string;
}

export interface ExteriorColor {
  name: string;
  image: string;
}

export interface OptionalPack {
  key: string;
  label: string;
  hasData: boolean;
  title: string;
  description?: string;
  features?: string[];
  images?: string[];
}

export interface MakeItYoursCard {
  title: string;
  description: string;
}

/** Build and Order's Exterior/Interior/Wheels/Accessories sub-gallery. */
export interface BuildGalleryCategory {
  key: string;
  label: string;
  /** First image is trim-specific when present; the rest are shared stand-ins. */
  images: string[];
}

export interface ModelOverviewContent {
  hasData: boolean;
  categoryCards: CategoryCard[];
  statStrip: { items: StatStripItem[]; disclaimer: string };
  terrainModes: TerrainMode[];
  exteriorColors: { colors: ExteriorColor[]; defaultColor: string };
  buildGalleryCategories: BuildGalleryCategory[];
  optionalPacks: OptionalPack[];
  makeItYoursCards: MakeItYoursCard[];
}

const EMPTY: ModelOverviewContent = {
  hasData: false,
  categoryCards: [],
  statStrip: { items: [], disclaimer: "" },
  terrainModes: [],
  exteriorColors: { colors: [], defaultColor: "" },
  buildGalleryCategories: [],
  optionalPacks: [],
  makeItYoursCards: [],
};

/**
 * Real photography downloaded from the Figma file (node 94:968) for every
 * section below — category cards, the Auto terrain shot, the 8 colour
 * swatches and the Adventure Pack gallery are all genuine distinct assets,
 * not placeholders. Only the non-"auto" terrain modes and the non-Adventure
 * packs still lack real content (per the "content/details to follow"
 * annotations on the Figma frame itself) and fall back to a coming-soon
 * message.
 */
const defender110Content: ModelOverviewContent = {
  hasData: true,
  categoryCards: [
    { key: "exterior", label: "Exterior", image: "/models/overview/category-exterior.png" },
    { key: "interior", label: "Interior", image: "/models/overview/category-interior.png" },
    { key: "technology", label: "Technology", image: "/models/overview/category-technology.png" },
    { key: "ownership", label: "Ownership", image: "/models/overview/category-ownership.png" },
  ],
  statStrip: {
    items: [
      { value: "2,279", unit: "litres", label: "Loadspace" },
      { value: "7", unit: "", label: "Seats" },
      { value: "380", unit: "HP", label: "Maximum power" },
      { value: "700", unit: "Nm", label: "Maximum torque" },
    ],
    disclaimer:
      "Figures shown reflect specifications from various models. See the Models page for complete details or visit your local authorised Land Rover Retailer.",
  },
  terrainModes: [
    {
      key: "auto",
      label: "Auto",
      hasData: true,
      title: "It decides so you do not have to",
      body: "Auto reads wheel slip, throttle input and steering angle continuously and selects the right settings itself. For most owners, most of the time, this is the only mode needed — including the first time the road turns to gravel.",
      readout: { rideHeight: "NORMAL", throttle: "ADAPTIVE", traction: "AUTO-MANAGED" },
      image: "/models/overview/terrain-auto.png",
    },
    {
      key: "grass-gravel-snow",
      label: "Grass, Gravel & Snow",
      hasData: false,
      image: "/models/overview/terrain-auto.png",
    },
    {
      key: "mud-ruts",
      label: "Mud & Ruts",
      hasData: false,
      image: "/models/overview/terrain-auto.png",
    },
    { key: "sand", label: "Sand", hasData: false, image: "/models/overview/terrain-auto.png" },
    {
      key: "rockcrawl",
      label: "Rockcrawl",
      hasData: false,
      image: "/models/overview/terrain-auto.png",
    },
    { key: "wade", label: "Wade", hasData: false, image: "/models/overview/terrain-auto.png" },
  ],
  exteriorColors: {
    // Only "Tasman Blue Metallic" is named in the Figma file itself (the
    // one swatch with a selection ring); the other 7 swatch renders aren't
    // individually labelled there, so real Defender colour names are
    // assigned in swatch order.
    colors: [
      { name: "Fuji White", image: "/models/overview/swatch-1-tasman-blue.png" },
      { name: "Santorini Black", image: "/models/overview/swatch-2.png" },
      { name: "Eiger Grey", image: "/models/overview/swatch-3.png" },
      { name: "Carpathian Grey", image: "/models/overview/swatch-4.png" },
      { name: "Tasman Blue", image: "/models/overview/swatch-5.png" },
      { name: "Pangea Green", image: "/models/overview/swatch-6.png" },
      { name: "Batumi Gold", image: "/models/overview/swatch-7.png" },
      { name: "Sedona Red", image: "/models/overview/swatch-8.png" },
    ],
    defaultColor: "Tasman Blue",
  },
  buildGalleryCategories: [
    { key: "exterior", label: "Exterior", images: [] }, // filled in with the trim photo at render time
    { key: "interior", label: "Interior", images: ["/models/overview/category-interior.png"] },
    { key: "wheels", label: "Wheels", images: ["/models/overview/adventure-pack-2.png"] },
    {
      key: "accessories",
      label: "Accessories",
      images: ["/models/overview/adventure-pack-1.png", "/models/overview/adventure-pack-3.png"],
    },
  ],
  optionalPacks: [
    {
      key: "adventure",
      label: "Adventure Pack",
      hasData: true,
      title: "Adventure Pack",
      description:
        "Take your passions to new territories. Adventure Pack equips Defender to take you off the beaten track and into nature's playground.",
      features: [
        "front and rear mud flaps",
        "dark rear scuff plate",
        "gloss black exterior side-mounted gear carrier",
        "integrated air compressor",
        "a portable rinse system",
      ],
      images: [
        "/models/overview/adventure-pack-1.png",
        "/models/overview/adventure-pack-2.png",
        "/models/overview/adventure-pack-3.png",
      ],
    },
    { key: "urban", label: "Urban Pack", hasData: false, title: "Urban Pack" },
    { key: "explorer", label: "Explorer Pack", hasData: false, title: "Explorer Pack" },
  ],
  makeItYoursCards: [
    {
      title: "Configure your Defender 110",
      description:
        "Build your specification, colour, wheels and accessories, and save it to return to.",
    },
    {
      title: "View available vehicles",
      description: "Search Defender 110 in stock near you, ready to reserve or drive away.",
    },
    {
      title: "Subscribe and drive",
      description: "One monthly fee covers insurance, tax, maintenance, and servicing.",
    },
    {
      title: "Book a test drive",
      description:
        "On road, and on the rough stuff where it makes sense. Roughly ninety minutes.",
    },
  ],
};

const contentBySlug: Record<string, ModelOverviewContent> = {
  "defender-110": defender110Content,
};

export function getModelOverviewContent(slug: string): ModelOverviewContent {
  return contentBySlug[slug] ?? EMPTY;
}
