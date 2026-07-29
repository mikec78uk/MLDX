export interface OverlaySectionItem {
  headline: string;
  body: string;
  image?: string;
  /** "FIND OUT MORE" — Ownership pair items only; no real destination yet. */
  cta?: string;
}

export interface OverlaySection {
  layout: "standalone" | "image-text" | "text-image" | "image-then-text" | "pair" | "three-col";
  headline?: string;
  /** "\n\n" separates paragraphs where Figma has more than one. */
  body?: string;
  image?: string;
  /** "FIND OUT MORE" — Ownership sections only; no real destination yet. */
  cta?: string;
  /** "pair" (2 items) / "three-col" (3 items). */
  items?: OverlaySectionItem[];
  /** Renders a horizontal rule after this section (before the next one, or the footnote). */
  dividerAfter?: boolean;
}

export interface CategoryOverlayContent {
  hasData: boolean;
  title: string;
  heroImage: string;
  sections: OverlaySection[];
  legalFootnote?: string;
}

const EMPTY: CategoryOverlayContent = {
  hasData: false,
  title: "",
  heroImage: "",
  sections: [],
};

const LEGAL_FOOTNOTE =
  "†The figures provided are as a result of official manufacturer's tests in accordance with EU legislation. For comparison purposes only. Real world figures may differ. CO₂ and fuel economy figures may vary according to factors such as driving styles, environmental conditions, load, wheel fitment and accessories fitted.\n\nFigures shown are for European EU6 markets. Other market fuel economy certification and figures published are available from local your market retailer.\n\n‡Charging times will vary dependent on many factors, including but not limited to: the age, condition, temperature and existing charge of the battery; facility used and duration of charge.\n\n‡‡Please read the policy wording for full terms, conditions, exclusions and excesses. Land Rover Insurance is arranged and administered by Wrisk Transfer Limited, authorised and regulated by the Financial Conduct Authority. Offer not for circulation. Only available for clients purchasing or leasing a new car from a participating Land Rover retailer. Drivers must be aged 30 - 85. No monetary alternative will be provided. Offer may be changed or removed at any point.";

const capability: CategoryOverlayContent = {
  hasData: true,
  title: "Capability",
  heroImage: "/models/overview/capability/hero.png",
  sections: [
    {
      layout: "standalone",
      headline: "Built to endure",
      body: "Designed to withstand the most punishing terrain. Defender's suspension systems distribute impact effectively, helping to reduce wear and maintaining stability over rugged surfaces.",
    },
    {
      layout: "image-text",
      headline: "Designed with purpose",
      body: "A solid stance and impressive ground clearance create an iconic silhouette with assured stability. A raised bonnet, sculpted grille and flush tail lights define Defender's unmistakable character.",
      image: "/models/overview/capability/designed-with-purpose.png",
    },
    {
      layout: "text-image",
      headline: "Unstoppable. Anywhere.",
      body: "Go from road, to mud, to snow, to anywhere. Terrain Response 2 automatically adjusts Defender's settings for optimum power and traction. The Adaptive Off-Road Cruise Control option keeps the pace on any surface.",
      image: "/models/overview/capability/unstoppable-anywhere.png",
    },
    {
      layout: "image-then-text",
      headline: "Move Mountains",
      body: "Haul everything from trailers to horse boxes, up to 3,500 kg. Advanced Tow Assist takes care of the counter steer. Pull through any challenge with the ability to winch up to 4,536 kg.",
      image: "/models/overview/capability/move-mountains.png",
      dividerAfter: true,
    },
    {
      layout: "image-text",
      headline: "Space upon space",
      body: "Bring even more, with the 168 kg dynamic roof load. Once you're parked up, the 300 kg static load means your adventure can continue overnight with the optional Rooftop Tent.",
      image: "/models/overview/capability/space-upon-space.png",
    },
    {
      layout: "text-image",
      headline: "Wade into Adventure",
      body: "Confidently cross waters with a maximum 900 mm wading depth. Defender's 3D Surround Camera displays water depth while identifying optimum entry and exit points.",
      image: "/models/overview/capability/wade-into-adventure.png",
      dividerAfter: true,
    },
  ],
  legalFootnote: LEGAL_FOOTNOTE,
};

const design: CategoryOverlayContent = {
  hasData: true,
  title: "Design",
  heroImage: "/models/overview/design/hero.png",
  sections: [
    {
      layout: "text-image",
      headline: "Built for brightness",
      body: "In touch with your surroundings. The Alpine lights pay homage to the original Defender design and fill the cabin with natural light.",
      image: "/models/overview/design/built-for-brightness.png",
    },
    {
      layout: "image-text",
      headline: "Become immersed",
      body: "The cinematic soundtrack to your adventure. The Meridian™ system creates powerful, lifelike sound. Now available as part of the new Technology Pack.",
      image: "/models/overview/design/become-immersed.png",
    },
    {
      layout: "image-then-text",
      headline: "Room for everyone",
      body: "Ultimate versatility. Create a seven-seat set-up with an optional third row. Or make space up front with the addition of a jump seat. Optional new Captain Chairs provide space and versatility for second-row passengers, with aisle access to the third row.",
      image: "/models/overview/design/room-for-everyone.png",
      dividerAfter: true,
    },
    {
      layout: "text-image",
      headline: "Tested to the extreme",
      body: "Defender's unique monocoque chassis and reinforced steel subframe offer a formidable combination of lightweight rigidity and unmatched durability.",
      image: "/models/overview/design/tested-to-the-extreme.png",
    },
  ],
};

const technology: CategoryOverlayContent = {
  hasData: true,
  title: "Technology",
  heroImage: "/models/overview/technology/hero.png",
  sections: [
    {
      layout: "standalone",
      headline: "Intuitive as standard",
      body: "Control at your fingertips. Complete up to 90% of tasks in just two-taps of the award-winning Pivi Pro infotainment system's 13.1-inch Touchscreen.",
    },
    {
      layout: "image-then-text",
      headline: "Leave nothing behind",
      body: "Pack everything with a loadspace of up to 2,279 litres behind the first row. Even with the bags piled high, the ClearSight rear view mirror gives you a full view behind. Now available as part of the new Technology Pack.",
      image: "/models/overview/technology/leave-nothing-behind.png",
      dividerAfter: true,
    },
    {
      layout: "pair",
      items: [
        {
          headline: "Stay informed",
          body: "Placing vehicle, navigation, and driving information in your eyeline. The 12.3-inch Interactive Driver Display and optional Head-up Display keep you informed while you focus on the path ahead. Now available as part of the new Technology Pack.",
          image: "/models/overview/technology/stay-informed.png",
        },
        {
          headline: "A breath of fresh air",
          body: "Take a deep breath. CO2 Management enhances wellbeing and alertness. Nanoe™ X and PM2.5 technology filters odours, allergens and pathogens including the SARS-CoV-2 virus.",
          image: "/models/overview/technology/breath-of-fresh-air.png",
        },
      ],
      dividerAfter: true,
    },
    {
      layout: "three-col",
      headline: "Security and protection",
      body: "Protect your Defender 110 with innovative technologies. Explore our latest security features.",
      items: [
        {
          headline: "Remote Security",
          body: "Carry a sense of security with you, check and control your vehicle anywhere with the InControl Remote app.",
          image: "/models/overview/technology/remote-security.png",
        },
        {
          headline: "Vehicle Tracking",
          body: "Secure Tracker and Secure Tracker Pro will alert you and the Stolen Vehicle Tracking Centre of attempted theft.",
          image: "/models/overview/technology/vehicle-tracking.png",
        },
        {
          headline: "Live Alerts",
          body: "Feel peace of mind wherever you are with alerts of unauthorised interactions through Guardian Mode.",
          image: "/models/overview/technology/live-alerts.png",
        },
      ],
      dividerAfter: true,
    },
  ],
  legalFootnote: LEGAL_FOOTNOTE,
};

const ownership: CategoryOverlayContent = {
  hasData: true,
  title: "Ownership",
  heroImage: "/models/overview/ownership/hero.png",
  sections: [
    {
      layout: "text-image",
      headline: "Stay InControl",
      body: "Designed to make every journey more enjoyable, InControl is the technological heart of your Land Rover's cabin. Surround yourself with precise environment control, smart navigation, entertainment and security features.",
      image: "/models/overview/ownership/stay-incontrol.png",
      cta: "FIND OUT MORE",
      dividerAfter: true,
    },
    {
      layout: "pair",
      items: [
        {
          headline: "Roadside assistance",
          body: "Mountain passes. Road trips. The school run. We'll send an expert technician to you, whether you're in the UK or exploring Europe. If the problem can't be fixed there and then, we'll take your vehicle to the nearest Approved Service Centre or one near your home.",
          image: "/models/overview/ownership/roadside-assistance.png",
          cta: "FIND OUT MORE",
        },
        {
          headline: "Accident assistance",
          body: "Adventure sometimes comes with surprises. That's why we created Roadside Assistance and Accident Management. Our complimentary support service is here guide you through every step of the journey when the unexpected happens. Even if your warranty has expired.",
          image: "/models/overview/ownership/accident-assistance.png",
          cta: "FIND OUT MORE",
        },
      ],
      dividerAfter: true,
    },
    {
      layout: "image-then-text",
      headline: "Complimentary drive away insurance",
      body: "Don't delay your drive any longer. We offer Complimentary Driveaway Insurance for new vehicles, with cover beginning the moment you collect your Defender 110 and staying in place for 5 days. Speak to your Retailer for more information.\n\nContinue your insurance with a monthly subscription for access to genuine parts and approved technicians. It's the cover you and your vehicle deserve.\n\nImage is for reference only, rear window comes with privacy glass.",
      image: "/models/overview/ownership/drive-away-insurance.png",
      cta: "FIND OUT MORE",
      dividerAfter: true,
    },
  ],
  legalFootnote: LEGAL_FOOTNOTE,
};

const overlaysByKey: Record<string, CategoryOverlayContent> = {
  capability,
  design,
  technology,
  ownership,
};

export function getCategoryOverlayContent(key: string): CategoryOverlayContent {
  return overlaysByKey[key] ?? EMPTY;
}
