import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { ArrowRightIcon, ChevronIcon } from "@/components/icons";
import { STEPS, type Answers, type Recommendation } from "@/data/helpMeChoose";

const MODEL_IMAGE: Record<string, string> = {
  "defender-110": "/models/available-cars/vehicle-1.png",
};
const PLACEHOLDER_MODEL_IMAGE = "/models/variants/defender-110-x.png";

function summaryChips(answers: Answers): { label: string; values: string[]; stepIndex: number }[] {
  const [usage, passengers, requirements, priorities, journeys] = STEPS;
  const requirementsTitles = [
    ...answers.carry
      .map((key) => requirements.subQuestions?.[0].options.find((o) => o.key === key)?.title)
      .filter((v): v is string => Boolean(v)),
    ...(answers.tow
      ? [requirements.subQuestions?.[1].options.find((o) => o.key === answers.tow)?.title].filter(
          (v): v is string => Boolean(v),
        )
      : []),
    ...answers.drive
      .map((key) => requirements.subQuestions?.[2].options.find((o) => o.key === key)?.title)
      .filter((v): v is string => Boolean(v)),
  ];

  return [
    {
      label: usage.eyebrow,
      values: answers.usage.map((key) => usage.options?.find((o) => o.key === key)?.title ?? key),
      stepIndex: 0,
    },
    {
      label: passengers.eyebrow,
      values: answers.passengers
        ? [passengers.options?.find((o) => o.key === answers.passengers)?.title ?? answers.passengers]
        : [],
      stepIndex: 1,
    },
    { label: requirements.eyebrow, values: requirementsTitles, stepIndex: 2 },
    {
      label: priorities.eyebrow,
      values: answers.priorities.map((key) => priorities.options?.find((o) => o.key === key)?.title ?? key),
      stepIndex: 3,
    },
    {
      label: journeys.eyebrow,
      values: answers.journeys
        ? [journeys.options?.find((o) => o.key === answers.journeys)?.title ?? answers.journeys]
        : [],
      stepIndex: 4,
    },
  ];
}

/**
 * "Configure", "Book Test Drive", "Save suggestion" and "Email my
 * suggestion" have no real destinations yet — rendered as real-looking but
 * inert controls, matching the pattern used throughout this codebase (e.g.
 * NavigationMenu's model detail panel).
 */
export function RecommendationView({
  answers,
  recommendation,
  onEditStep,
  onReset,
}: {
  answers: Answers;
  recommendation: Recommendation;
  onEditStep: (stepIndex: number) => void;
  onReset: () => void;
}) {
  const { model, runnerUp, heroSpecBlurb, whyModelParagraph, alsoConsiderBlurb, trim } = recommendation;
  const image = MODEL_IMAGE[model.slug] ?? PLACEHOLDER_MODEL_IMAGE;
  const highlightsRef = useRef<HTMLDivElement>(null);

  function scrollHighlights(direction: 1 | -1) {
    const el = highlightsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="bg-[var(--color-paper-muted)]">
      <div className="px-6 py-16">
        {/* Hero: image leads on mobile (matching the reference mobile
            layout), text leads on desktop's side-by-side treatment. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="order-2 lg:order-none lg:max-w-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Your best match</p>
              <button
                type="button"
                onClick={onReset}
                className="cta-label flex items-center gap-1.5 whitespace-nowrap text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                ↺ Start again
              </button>
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl">{model.name}</h1>
            {trim && (
              <p className="mt-2 text-sm font-semibold">{trim.engine} (Recommended)</p>
            )}
            {trim?.alsoAvailableAs && (
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{trim.alsoAvailableAs}</p>
            )}
            <p className="mt-4 text-lg">{trim?.onTheRoadPrice ?? `From ${model.priceFrom}`}</p>
            <p className="mt-6 text-sm font-semibold">Why it matches:</p>
            <p className="mt-2 text-[var(--color-ink-soft)]">{heroSpecBlurb}</p>

            {/* Your answers, editable — sits directly under "Why it
                matches" in the same text column, not as a separate
                full-width section below the hero. */}
            <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {summaryChips(answers).map((category) => (
                <div key={category.label} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="eyebrow text-xs text-[var(--color-ink-soft)]">{category.label}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {category.values.length > 0 ? (
                        category.values.map((value) => (
                          <span
                            key={value}
                            className="cta-label rounded-full bg-[var(--color-paper)] px-3 py-1 text-[11px] tracking-[0.05em] text-[var(--color-ink-soft)] shadow-[0_1px_2px_rgba(20,20,20,0.08)]"
                          >
                            {value}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[var(--color-ink-soft)]">No preference given</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEditStep(category.stepIndex)}
                    className="cta-label shrink-0 text-xs underline underline-offset-4 transition-colors hover:text-[var(--color-ink-soft)]"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-start gap-3">
              <button
                type="button"
                className="cta-label inline-flex items-center gap-2 whitespace-nowrap text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                <ArrowRightIcon />
                Save suggestion
              </button>
              <button
                type="button"
                className="cta-label inline-flex items-center gap-2 whitespace-nowrap text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                <ArrowRightIcon />
                Email my suggestion
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-none">
            <div className="relative aspect-[16/10] w-full bg-[var(--color-paper)] shadow-[0_16px_40px_rgba(20,20,20,0.12)]">
              <Image src={withBasePath(image)} alt={model.name} fill className="object-cover" />
            </div>
            {/* Additional gallery shots aren't photographed yet — these
                stay as placeholders until real imagery is available. Sits
                directly on the page's own muted background, so it needs
                --color-border (not --color-paper-muted) to actually show up. */}
            <div className="mt-4 grid grid-cols-[3fr_2fr] gap-4">
              <div className="aspect-[319/199] w-full bg-[var(--color-border)]" />
              <div className="aspect-[210/199] w-full bg-[var(--color-border)]" />
              <div className="col-span-2 aspect-[550/293] w-full bg-[var(--color-border)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Why this model / why this engine — full-width strip, matching
          the Figma reference's distinct background band behind this text. */}
      <div className="bg-[var(--color-border)] py-16">
        <div className={`px-6 grid gap-10 ${trim ? "sm:grid-cols-2" : ""}`}>
          <div>
            <h2 className="text-2xl sm:text-3xl">Why the {model.name}</h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">{whyModelParagraph}</p>
          </div>
          {trim && (
            <div>
              <h2 className="text-2xl sm:text-3xl">Why {trim.engine}</h2>
              <p className="mt-4 text-[var(--color-ink-soft)]">{trim.whyEngineParagraph}</p>
            </div>
          )}
        </div>
      </div>

      {/* Highlights — full-bleed white band with an oversized, horizontally
          scrollable carousel (matching the Figma reference's overflow +
          arrow controls) rather than a fixed 3-column grid. */}
      <div className="bg-[var(--color-paper)] py-16">
        <div className="px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">Highlights</h2>
            {trim && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous highlight"
                  onClick={() => scrollHighlights(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-ink)]"
                >
                  <ChevronIcon direction="left" className="h-2.5 w-2" />
                </button>
                <button
                  type="button"
                  aria-label="Next highlight"
                  onClick={() => scrollHighlights(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  <ChevronIcon direction="right" className="h-2.5 w-2" />
                </button>
              </div>
            )}
          </div>

          {trim ? (
            <div
              ref={highlightsRef}
              className="mt-6 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {trim.highlights.map((highlight) => (
                <div key={highlight.title} className="w-[85%] shrink-0 snap-start sm:w-[440px]">
                  <div className="aspect-[16/9] w-full bg-[var(--color-paper-muted)]" />
                  <p className="mt-5 text-lg">{highlight.title}</p>
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{highlight.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-lg text-sm text-[var(--color-ink-soft)]">
              Full feature highlights for this model are coming in a later content pass.
            </p>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href={`/models/${model.slug}`}
              className="cta-label inline-flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
            >
              <ArrowRightIcon />
              Explore {model.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Make it yours — full-bleed promo band with a background image,
          reusing the same lifestyle shot used for the "build your own"
          promo card elsewhere in the models section. */}
      <div className="relative overflow-hidden py-24 text-white">
        <Image
          src={withBasePath("/models/available-cars/promo-background.png")}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div className="relative px-6">
          <h2 className="text-6xl leading-[0.95] sm:text-8xl">
            <span className="block">Make it</span>
            <span className="block font-[family-name:var(--font-display)] italic">yours</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-paper)] px-6 py-3.5 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
            >
              Configure this {model.name}
            </button>
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap border border-white/60 px-6 py-3.5 text-xs text-white transition-colors hover:bg-white hover:text-[var(--color-ink)]"
            >
              View available vehicles
            </button>
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap border border-white/60 px-6 py-3.5 text-xs text-white transition-colors hover:bg-white hover:text-[var(--color-ink)]"
            >
              Book a test drive
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-16">
        {/* Also Consider */}
        <div className="grid gap-10 bg-[var(--color-paper)] p-10 shadow-[0_8px_24px_rgba(20,20,20,0.08)] lg:grid-cols-[2fr_3fr] lg:items-center">
          <div>
            <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Also consider</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{runnerUp.name}</h2>
            <p className="mt-3 max-w-md text-[var(--color-ink-soft)]">{alsoConsiderBlurb}</p>
            <Link
              href={`/models/${runnerUp.slug}/compare`}
              className="cta-label mt-6 inline-flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-5 py-3 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            >
              Compare models
            </Link>
          </div>
          {/* Runner-up isn't photographed for this flow yet — placeholder
              until real imagery is available. */}
          <div className="aspect-[646/407] w-full bg-[var(--color-paper-muted)]" />
        </div>
      </div>
    </div>
  );
}
