import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { ArrowRightIcon } from "@/components/icons";
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

  return (
    <div className="bg-[var(--color-paper-muted)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero: match summary + image, side by side on larger screens */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="lg:max-w-lg">
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
          </div>

          <div className="relative aspect-[16/10] w-full bg-[var(--color-paper)] shadow-[0_16px_40px_rgba(20,20,20,0.12)]">
            <Image src={withBasePath(image)} alt={model.name} fill className="object-cover" />
          </div>
        </div>

        {/* Your answers, editable */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
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

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="cta-label text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              Save suggestion
            </button>
            <button
              type="button"
              className="cta-label text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              Email my suggestion
            </button>
          </div>
        </div>

        {/* Why this model / why this engine */}
        <div className={`mt-16 grid gap-10 ${trim ? "sm:grid-cols-2" : ""}`}>
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

        {/* Highlights */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl">Highlights</h2>
          {trim ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {trim.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex flex-col bg-[var(--color-paper)] shadow-[0_8px_24px_rgba(20,20,20,0.08)]"
                >
                  <div className="aspect-[16/10] w-full bg-[var(--color-paper-muted)]" />
                  <div className="p-5">
                    <p className="text-lg">{highlight.title}</p>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{highlight.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-lg text-sm text-[var(--color-ink-soft)]">
              Full feature highlights for this model are coming in a later content pass.
            </p>
          )}
        </div>

        <div className="mt-10">
          <Link
            href={`/models/${model.slug}`}
            className="cta-label inline-flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
          >
            <ArrowRightIcon />
            Explore {model.name}
          </Link>
        </div>

        {/* Make it yours — promo band, matching ModelVariantsSection's banner treatment */}
        <div className="mt-16 bg-[var(--color-paper)] px-6 py-16 text-center shadow-[0_8px_24px_rgba(20,20,20,0.08)]">
          <h2 className="text-4xl sm:text-6xl">
            Make it <span className="font-[family-name:var(--font-display)] italic">yours</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
            >
              Configure this {model.name}
            </button>
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-3.5 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            >
              View available vehicles
            </button>
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-3.5 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            >
              Book a test drive
            </button>
          </div>
        </div>

        {/* Also Consider */}
        <div className="mt-10 bg-[var(--color-paper)] p-10 shadow-[0_8px_24px_rgba(20,20,20,0.08)]">
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
      </div>
    </div>
  );
}
