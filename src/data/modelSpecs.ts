export interface SpecTrim {
  slug: string;
  name: string;
  priceFrom: string;
}

/** One comparable attribute row. Keyed by trim slug; "—" means not specified for that trim. */
export interface SpecRow {
  label: string;
  values: Record<string, string>;
  /** Placeholder rows (e.g. dimensions, colours) awaiting real source data. */
  placeholder?: boolean;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

export interface ModelSpecs {
  /** False shows a "coming soon" placeholder instead of the spec table. */
  hasData: boolean;
  trims: SpecTrim[];
  groups: SpecGroup[];
  /** Notes that apply across trims rather than to a single row/column. */
  footnotes: string[];
}

const EMPTY_SPECS: ModelSpecs = {
  hasData: false,
  trims: [],
  groups: [],
  footnotes: [],
};

const NA = "—";

/**
 * Trim names, prices, engine availability, wheels and equipment
 * differentiators sourced from
 * landrover.co.uk/defender/defender-110/models-and-specifications.html.
 * Trophy Edition's two paint options (Deep Sandglow Yellow / Santorini
 * Black) are the same trim/price and are merged into one column.
 *
 * Engine performance figures (power, torque, 0-60, top speed, CO2,
 * economy) are deliberately omitted — these vary by the specific engine
 * chosen in the configurator rather than by trim, and aren't published
 * on the source page in a trim-comparable form.
 *
 * Dimensions and the exterior colour palette are placeholder rows
 * (identical "TBC" values across every trim) pending real source data —
 * every trim genuinely does not yet have this data, so this isn't
 * fabricating a fact, just marking the gap explicitly.
 */
const defender110: ModelSpecs = {
  hasData: true,
  trims: [
    { slug: "s", name: "Defender 110 S", priceFrom: "£64,315" },
    { slug: "x-dynamic-se", name: "Defender 110 X-Dynamic SE", priceFrom: "£69,820" },
    { slug: "x-dynamic-hse", name: "Defender 110 X-Dynamic HSE", priceFrom: "£74,270" },
    { slug: "trophy", name: "Defender 110 Trophy Edition", priceFrom: "£84,345" },
    { slug: "x", name: "Defender 110 X", priceFrom: "£97,125" },
    { slug: "vertex", name: "Defender 110 Vertex", priceFrom: "£98,270" },
  ],
  groups: [
    {
      title: "Engines",
      rows: [
        {
          label: "Available engines",
          values: {
            s: "D250 Diesel Mild Hybrid, Petrol Plug-in Hybrid",
            "x-dynamic-se":
              "D250 Diesel Mild Hybrid, D350 Diesel Mild Hybrid, P380 Petrol, Petrol Plug-in Hybrid",
            "x-dynamic-hse": "D250 Diesel Mild Hybrid, Petrol Plug-in Hybrid",
            trophy: "D350 Diesel Mild Hybrid, Petrol Plug-in Hybrid",
            x: "D350 Diesel Mild Hybrid, P380 Petrol, Petrol Plug-in Hybrid",
            vertex: "D350 Diesel Mild Hybrid, P380 Petrol",
          },
        },
      ],
    },
    {
      title: "Exterior",
      rows: [
        {
          label: "Headlights",
          values: {
            s: "LED with signature DRL",
            "x-dynamic-se": "Matrix LED",
            "x-dynamic-hse": "Matrix LED",
            trophy: NA,
            x: NA,
            vertex: NA,
          },
        },
        {
          label: "Wheels",
          values: {
            s: "19\" Style 6010",
            "x-dynamic-se": "20\" Style 5098",
            "x-dynamic-hse": "20\" Style 5098, Satin Dark Grey",
            trophy: "20\" Style 9013, Gloss Black",
            x: "22\" Style 7030, Diamond Turned, Dark Grey",
            vertex: "22\" Style 7030, Diamond Turned, Satin Dark Grey with Carpathian Grey",
          },
        },
        {
          label: "Roof",
          values: {
            s: NA,
            "x-dynamic-se": NA,
            "x-dynamic-hse": "Sliding panoramic roof",
            trophy: NA,
            x: NA,
            vertex: NA,
          },
        },
        {
          label: "Treadplates",
          values: {
            s: NA,
            "x-dynamic-se": "Illuminated, \"DEFENDER\" script",
            "x-dynamic-hse": NA,
            trophy: "Illuminated, Trophy Edition branding",
            x: NA,
            vertex: NA,
          },
        },
        {
          label: "Brake callipers",
          values: { s: NA, "x-dynamic-se": NA, "x-dynamic-hse": NA, trophy: NA, x: "Orange", vertex: "Yellow" },
        },
        {
          label: "Recovery eyes",
          values: {
            s: NA,
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: NA,
            x: "Orange, exposed rear",
            vertex: "Yellow, exposed",
          },
        },
        {
          label: "Bonnet",
          values: {
            s: NA,
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: "Trophy Edition bonnet decal",
            x: "Black contrast bonnet",
            vertex: NA,
          },
        },
        {
          label: "Bumpers",
          values: { s: NA, "x-dynamic-se": NA, "x-dynamic-hse": NA, trophy: NA, x: NA, vertex: "Extended front and rear" },
        },
        {
          label: "Tail spoiler",
          values: { s: NA, "x-dynamic-se": NA, "x-dynamic-hse": NA, trophy: NA, x: NA, vertex: "Gloss Black tail door spoiler" },
        },
        {
          label: "Tyres",
          values: { s: NA, "x-dynamic-se": NA, "x-dynamic-hse": NA, trophy: "All-Terrain Tyres (Vmax 130mph)", x: NA, vertex: NA },
        },
        {
          label: "Badging",
          values: {
            s: NA,
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: "Trophy Edition badge; IP end caps laser-etched with Trophy Edition graphic",
            x: NA,
            vertex: NA,
          },
        },
      ],
    },
    {
      title: "Interior & comfort",
      rows: [
        {
          label: "Seat material",
          values: {
            s: "Resist and Resolve",
            "x-dynamic-se": "Resist",
            "x-dynamic-hse": "Windsor leather",
            trophy: "Windsor leather",
            x: "Windsor leather and forged textile",
            vertex: "Windsor leather and Kvadrat",
          },
        },
        {
          label: "Front seat adjustment",
          values: {
            s: "12-way heated, semi-powered",
            "x-dynamic-se": "12-way heated, electric, memory",
            "x-dynamic-hse": "14-way heated and cooled, electric, memory, electrically adjustable steering column",
            trophy: NA,
            x: "14-way heated and cooled, winged headrests",
            vertex: NA,
          },
        },
        {
          label: "Climate control",
          values: {
            s: "Two-zone",
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: NA,
            x: NA,
            vertex: "Three-zone, Air Quality Sensor, Cabin Air Purification Plus",
          },
        },
        {
          label: "Sound system",
          values: {
            s: "Meridian Sound System",
            "x-dynamic-se": NA,
            "x-dynamic-hse": "Meridian Surround Sound System",
            trophy: NA,
            x: NA,
            vertex: NA,
          },
        },
      ],
    },
    {
      title: "Technology & safety",
      rows: [
        {
          label: "Touchscreen",
          values: { s: "13.1\" Pivi Pro", "x-dynamic-se": NA, "x-dynamic-hse": NA, trophy: NA, x: NA, vertex: NA },
        },
        {
          label: "Parking & cameras",
          values: {
            s: "3D Surround Camera, 360° Parking Aid",
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: NA,
            x: NA,
            vertex: NA,
          },
        },
        {
          label: "Driver assist",
          values: {
            s: "Adaptive Cruise Control, Lane Keep Assist, Emergency Braking",
            "x-dynamic-se": "Blind Spot Assist, Rear Collision Monitor, Rear Traffic Monitor",
            "x-dynamic-hse": NA,
            trophy: NA,
            x: "Adaptive Off-Road Cruise Control",
            vertex: NA,
          },
        },
      ],
    },
    {
      title: "Performance & capability",
      rows: [
        {
          label: "Drivetrain",
          values: {
            s: "All Wheel Drive, 8-speed automatic, Terrain Response",
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: NA,
            x: NA,
            vertex: NA,
          },
        },
        {
          label: "Terrain system",
          values: {
            s: NA,
            "x-dynamic-se": NA,
            "x-dynamic-hse": NA,
            trophy: NA,
            x: "Terrain Response 2, Electronic Active Differential with Torque Vectoring, Wade Sensing, Adaptive Dynamics",
            vertex: NA,
          },
        },
      ],
    },
    {
      title: "Dimensions",
      rows: [
        "Overall length",
        "Overall width",
        "Overall height",
        "Wheelbase",
        "Ground clearance",
        "Wading depth",
        "Boot capacity (seats up)",
        "Boot capacity (seats down)",
        "Gross vehicle weight",
        "Towing capacity",
      ].map((label) => ({
        label,
        placeholder: true,
        values: { s: "TBC", "x-dynamic-se": "TBC", "x-dynamic-hse": "TBC", trophy: "TBC", x: "TBC", vertex: "TBC" },
      })),
    },
    {
      title: "Exterior colours",
      rows: [
        {
          label: "Available colours",
          placeholder: true,
          values: {
            s: "Colour palette to be confirmed",
            "x-dynamic-se": "Colour palette to be confirmed",
            "x-dynamic-hse": "Colour palette to be confirmed",
            trophy: "Colour palette to be confirmed",
            x: "Colour palette to be confirmed",
            vertex: "Colour palette to be confirmed",
          },
        },
      ],
    },
  ],
  footnotes: [
    "Plug-in Hybrid models are only available with 5 seats, due to battery geometry in the loadspace.",
    "Pricing and specification shown are placeholder content for usability testing purposes only.",
  ],
};

const specsBySlug: Record<string, ModelSpecs> = {
  "defender-110": defender110,
};

export function getModelSpecs(slug: string): ModelSpecs {
  return specsBySlug[slug] ?? EMPTY_SPECS;
}
