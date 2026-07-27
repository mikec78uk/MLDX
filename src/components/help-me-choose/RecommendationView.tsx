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
  const { model, runnerUp, whyItMatches, alsoConsiderBlurb, trim } = recommendation;
  const image = MODEL_IMAGE[model.slug] ?? PLACEHOLDER_MODEL_IMAGE;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Your best match</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{model.name}</h1>
          {trim && <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{trim.engine}</p>}
          <p className="mt-3 text-lg">{trim?.onTheRoadPrice ?? `From ${model.priceFrom}`}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="cta-label whitespace-nowrap text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
        >
          ↺ Start again
        </button>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full bg-[var(--color-paper-muted)]">
        <Image src={withBasePath(image)} alt={model.name} fill className="object-cover" />
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold">Why it matches:</p>
        <p className="mt-2 text-[var(--color-ink-soft)]">{whyItMatches}</p>
      </div>

      <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {summaryChips(answers).map((category) => (
          <div key={category.label} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="eyebrow text-xs text-[var(--color-ink-soft)]">{category.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {category.values.length > 0 ? (
                  category.values.map((value) => (
                    <span
                      key={value}
                      className="rounded-full bg-[var(--color-paper-muted)] px-3 py-1 text-xs"
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
              className="cta-label shrink-0 text-xs text-[var(--color-ink-soft)] underline underline-offset-4 transition-colors hover:text-[var(--color-ink)]"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {trim ? (
        <div className="mt-12">
          <p className="text-2xl">Highlights</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {trim.keyFeatures.slice(0, 3).map((feature) => (
              <div key={feature} className="border border-[var(--color-border)] p-4">
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-12 text-sm text-[var(--color-ink-soft)]">
          Full feature highlights for this model are coming in a later content pass.
        </p>
      )}

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <Link
          href={`/models/${model.slug}`}
          className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
        >
          <ArrowRightIcon />
          Explore {model.name}
        </Link>
        <button
          type="button"
          className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-3.5 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          Configure
        </button>
        <button
          type="button"
          className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-3.5 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          Book Test Drive
        </button>
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

      <div className="mt-16 border-t border-[var(--color-border)] pt-10">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Also consider</p>
        <h2 className="mt-3 text-2xl">{runnerUp.name}</h2>
        <p className="mt-2 max-w-md text-sm text-[var(--color-ink-soft)]">{alsoConsiderBlurb}</p>
        <Link
          href={`/models/${runnerUp.slug}/compare`}
          className="cta-label mt-4 inline-flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-5 py-3 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
        >
          Compare models
        </Link>
      </div>
    </div>
  );
}
