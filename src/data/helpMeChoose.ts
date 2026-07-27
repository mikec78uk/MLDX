import { getModels, type ModelSummary } from "@/data/models";
import { getFullSpecs } from "@/data/modelFullSpecs";

export interface Option {
  key: string;
  title: string;
  description?: string;
}

export interface RequirementsSubQuestion {
  key: "carry" | "tow" | "drive";
  heading: string;
  helper: string;
  multi: boolean;
  options: Option[];
}

export interface QuestionStep {
  id: "usage" | "passengers" | "requirements" | "priorities" | "journeys";
  eyebrow: string;
  heading: string;
  helper: string;
  /** Present for every step except "requirements", which has three grouped sub-questions instead. */
  options?: Option[];
  multi?: boolean;
  maxSelect?: number;
  skipLabel?: string;
  subQuestions?: RequirementsSubQuestion[];
}

export const STEPS: QuestionStep[] = [
  {
    id: "usage",
    eyebrow: "Usage",
    heading: "How will you use your Defender?",
    helper: "Choose up to two activities",
    multi: true,
    maxSelect: 2,
    options: [
      { key: "everyday", title: "Everyday Life", description: "Commuting, errands and everything in between" },
      { key: "family-travel", title: "Family & travel", description: "People, luggage and plans that keep changing" },
      { key: "long-distance", title: "Long-distance touring", description: "Comfort and confidence over great distances" },
      { key: "off-road", title: "Off-road exploration", description: "Routes that continue when the road ends" },
      { key: "towing", title: "Towing", description: "Caravans, horseboxes, boats or working loads" },
      { key: "professional", title: "Professional use", description: "A dependable partner for demanding work" },
    ],
  },
  {
    id: "passengers",
    eyebrow: "Passengers",
    heading: "How many people do you regularly carry?",
    helper: "This helps us recommend the right balance of seating and load space.",
    options: [
      { key: "1-2", title: "Mostly 1-2", description: "Compact needs, maximum freedom" },
      { key: "3-5", title: "Usually 3-5", description: "Room for family, friends and equipment" },
      { key: "6-7", title: "Regularly 6-7", description: "Three rows are part of everyday life" },
      { key: "8", title: "I need up to 8 seats", description: "Maximum passenger capacity matters" },
      { key: "varies", title: "My needs change", description: "Passenger and luggage needs vary often" },
    ],
  },
  {
    id: "requirements",
    eyebrow: "Requirements",
    heading: "What does your Defender need to handle?",
    helper: "Choose everything that regularly forms part of your plans.",
    subQuestions: [
      {
        key: "carry",
        heading: "What will you carry?",
        helper: "Select all that apply",
        multi: true,
        options: [
          { key: "bags", title: "Everyday bags and shopping" },
          { key: "luggage", title: "Family luggage" },
          { key: "sports", title: "Outdoor or sports equipment" },
          { key: "bulky", title: "Large or bulky equipment" },
          { key: "max-space", title: "Maximum space load" },
        ],
      },
      {
        key: "tow",
        heading: "What will you tow?",
        helper: "Choose one",
        multi: false,
        options: [
          { key: "nothing", title: "Nothing" },
          { key: "small-trailer", title: "A small trailer" },
          { key: "boat", title: "Boat or leisure equipment" },
          { key: "caravan", title: "A caravan or horsebox" },
          { key: "heavy", title: "Heavy or frequent loads" },
          { key: "not-sure", title: "I'm not sure" },
        ],
      },
      {
        key: "drive",
        heading: "Where will you drive?",
        helper: "Select all that apply",
        multi: true,
        options: [
          { key: "towns", title: "Towns & motorways" },
          { key: "country", title: "Country roads & poor surfaces" },
          { key: "snow", title: "Snow, mud or loose surfaces" },
          { key: "off-road", title: "Regularly off-road" },
          { key: "remote", title: "Challenging or remote terrain" },
          { key: "mixture", title: "A mixture of everything" },
        ],
      },
    ],
  },
  {
    id: "priorities",
    eyebrow: "Priorities",
    heading: "What matters most to you?",
    helper: "Choose one priority and, if you like, add a second.",
    multi: true,
    maxSelect: 2,
    skipLabel: "No single priority - show me the best all-rounder",
    options: [
      { key: "versatility", title: "Versatility", description: "Flexible space for changing plans." },
      { key: "comfort", title: "Comfort & refinement", description: "A calm, premium experience on every journey." },
      { key: "all-terrain", title: "All-terrain capability", description: "Confidence across demanding terrain and conditions." },
      { key: "performance", title: "Performance", description: "Greater power and more engaging dynamics." },
      { key: "efficiency", title: "Efficiency", description: "Lower fuel use for everyday journeys." },
    ],
  },
  {
    id: "journeys",
    eyebrow: "Your Journeys",
    heading: "What do your typical journeys look like?",
    helper: "Choose the option that represents most of your driving.",
    options: [
      { key: "short", title: "Short, everyday journeys", description: "Mostly local trips, commuting and urban driving" },
      { key: "mixture", title: "A mixture of short and long", description: "Everyday journeys with occasional longer trips" },
      { key: "long-distance", title: "Frequent long-distance travel", description: "Regular motorway driving, touring or extended journeys" },
      { key: "towing", title: "Regular towing or heavy loads", description: "Frequent towing, full loads or demanding work" },
      { key: "performance", title: "Performance-focused driving", description: "Power and responsiveness matter most" },
      { key: "not-sure", title: "I'm not sure yet", description: "Show me the most balanced recommendation" },
    ],
  },
];

export interface Answers {
  usage: string[];
  passengers?: string;
  carry: string[];
  tow?: string;
  drive: string[];
  priorities: string[];
  journeys?: string;
}

export const EMPTY_ANSWERS: Answers = {
  usage: [],
  carry: [],
  drive: [],
  priorities: [],
};

/**
 * Sequential interstitial copy — per the Figma annotation on this frame,
 * this is meant to play briefly (~1-2s) and never artificially hold the
 * user once a result is ready. See HelpMeChooseFlow's GSAP timeline.
 */
export const INTERSTITIAL_MESSAGES = [
  "Considering your passenger needs…",
  "Checking space and towing requirements…",
  "Balancing versatility and capability…",
  "Your Defender is ready.",
];

export interface HighlightCard {
  title: string;
  body: string;
}

export interface Recommendation {
  model: ModelSummary;
  runnerUp: ModelSummary;
  /** Short trim-character blurb shown under the price in the hero (Figma's "Why it matches:" line) — falls back to model.summary when there's no trim data. */
  heroSpecBlurb: string;
  /** Longer paragraph under the "Why {model}" heading — compares against the other two models. */
  whyModelParagraph: string;
  /** Short one-liner for the "Also Consider" cross-sell card. */
  alsoConsiderBlurb: string;
  /** Real trim/engine content, only populated for defender-110 today — see modelFullSpecs.ts. */
  trim?: {
    engine: string;
    alsoAvailableAs?: string;
    onTheRoadPrice: string;
    whyEngineParagraph: string;
    highlights: HighlightCard[];
  };
}

const WHY_MODEL_PARAGRAPH: Record<string, string> = {
  "defender-90":
    "Defender 90 is your strongest match — a compact, manoeuvrable footprint suited to how you plan to use it, without giving up genuine all-terrain capability. It's easier to manoeuvre day-to-day than Defender 110 or Defender 130, while still covering everything you've told us matters.",
  "defender-110":
    "Defender 110 is your strongest match — it balances passenger space, everyday practicality and genuine all-terrain capability. It offers more flexibility than Defender 90, while remaining easier to manoeuvre than Defender 130.",
  "defender-130":
    "Defender 130 is your strongest match — the extra length pays off in seating and load space for what you've told us you need, without compromising capability. It offers significantly more room than Defender 90 or Defender 110.",
};

const ALSO_CONSIDER_BLURB: Record<string, string> = {
  "defender-90": "If manoeuvrability and a compact footprint matter more than outright space.",
  "defender-110": "If you want the most versatile all-rounder in the range.",
  "defender-130": "If you regularly carry more people or need extra luggage space.",
};

/** Real, only for defender-110 X-Dynamic HSE — reproduced from the Figma design. */
const DEFENDER_110_SPEC_BLURB =
  "A refined, adventure-ready specification combining distinctive exterior details, premium cabin materials and technology suited to both everyday journeys and more demanding trips.";
const DEFENDER_110_ENGINE_PARAGRAPH =
  "A strong balance of range, efficiency and torque for mixed journeys and confident capability.";
const DEFENDER_110_HIGHLIGHTS: HighlightCard[] = [
  {
    title: "Unstoppable. Anywhere.",
    body: "Go from road, to mud, to snow, to anywhere. Terrain Response 2 automatically adjusts Defender's settings for optimum power and traction. The Adaptive Off-Road Cruise Control option keeps the pace on any surface.",
  },
  {
    title: "Confidence at every turn",
    body: "Stay focused on long drives with the Driver Attention Monitor. A camera monitors drowsiness and alerts drivers for peace of mind on longer adventures.",
  },
  {
    title: "Move mountains",
    body: "Haul everything from trailers to horse boxes, up to 3,500 kg — Advanced Tow Assist takes care of the counter steer. Pull through any challenge with the ability to winch up to 4,536 kg.",
  },
];

/**
 * A prototype heuristic, not a real configurator algorithm — scores the
 * three real models on the answers that most obviously differentiate them
 * (passenger count and load/towing needs above all). Ties keep the
 * catalogue's natural 90/110/130 order (Array.sort is stable and getModels()
 * is already sorted that way), which nudges the ever-present 110 forward as
 * the sensible "all-rounder" default — matching Defender's own positioning.
 */
export function recommendModel(answers: Answers): Recommendation {
  const models = getModels();
  const scores: Record<string, number> = Object.fromEntries(
    models.map((model) => [model.slug, 0]),
  );

  const add = (slug: string, amount: number) => {
    scores[slug] = (scores[slug] ?? 0) + amount;
  };

  if (answers.passengers === "1-2") add("defender-90", 3);
  if (answers.passengers === "3-5") add("defender-110", 3);
  if (answers.passengers === "6-7" || answers.passengers === "8") add("defender-130", 3);
  if (answers.passengers === "varies") add("defender-110", 1);

  if (answers.usage.includes("off-road")) add("defender-90", 1);
  if (answers.usage.includes("everyday")) add("defender-90", 1);
  if (answers.usage.includes("family-travel")) {
    add("defender-110", 1);
    add("defender-130", 1);
  }
  if (answers.usage.includes("long-distance")) add("defender-110", 1);
  if (answers.usage.includes("towing") || answers.usage.includes("professional")) add("defender-130", 1);

  if (answers.carry.includes("max-space") || answers.carry.includes("bulky")) add("defender-130", 1);
  if (answers.tow && answers.tow !== "nothing" && answers.tow !== "not-sure") add("defender-130", 1);
  if (answers.drive.includes("off-road") || answers.drive.includes("remote")) add("defender-90", 1);

  if (answers.priorities.includes("versatility")) add("defender-110", 1);
  if (answers.priorities.includes("all-terrain")) add("defender-90", 1);
  if (answers.priorities.includes("comfort") || answers.priorities.includes("performance")) add("defender-130", 1);
  if (answers.priorities.includes("efficiency")) add("defender-90", 1);

  if (answers.journeys === "towing") add("defender-130", 1);
  if (answers.journeys === "long-distance") add("defender-110", 1);
  if (answers.journeys === "short") add("defender-90", 1);

  const ranked = models
    .map((model, index) => ({ model, index, score: scores[model.slug] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  // Temporary: always recommend Defender 110 regardless of the answers
  // above, per explicit request — the scoring logic stays in place so it
  // can be switched back on later, it's just not read for the final pick.
  const model = models.find((m) => m.slug === "defender-110") ?? ranked[0].model;
  const runnerUp = ranked.find((r) => r.model.slug !== model.slug)?.model ?? ranked[1].model;

  const fullSpecs =
    model.slug === "defender-110" ? getFullSpecs("defender-110", "x-dynamic-hse") : undefined;

  return {
    model,
    runnerUp,
    heroSpecBlurb: fullSpecs?.hasData ? DEFENDER_110_SPEC_BLURB : model.summary,
    whyModelParagraph: WHY_MODEL_PARAGRAPH[model.slug] ?? model.summary,
    alsoConsiderBlurb: ALSO_CONSIDER_BLURB[runnerUp.slug] ?? runnerUp.summary,
    trim: fullSpecs?.hasData
      ? {
          engine: fullSpecs.engines[0],
          alsoAvailableAs:
            fullSpecs.engines.length > 1
              ? `Also available as ${fullSpecs.engines.slice(1).join(" and ")}`
              : undefined,
          onTheRoadPrice: fullSpecs.onTheRoadPrice,
          whyEngineParagraph: DEFENDER_110_ENGINE_PARAGRAPH,
          highlights: DEFENDER_110_HIGHLIGHTS,
        }
      : undefined,
  };
}
