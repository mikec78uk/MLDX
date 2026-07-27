"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { ArrowRightIcon } from "@/components/icons";
import {
  EMPTY_ANSWERS,
  INTERSTITIAL_MESSAGES,
  STEPS,
  recommendModel,
  type Answers,
  type QuestionStep,
} from "@/data/helpMeChoose";
import { OptionCard } from "./OptionCard";
import { RecommendationView } from "./RecommendationView";

type Phase = "question" | "interstitial" | "recommendation";

function toggleInArray(values: string[], key: string, max?: number): string[] {
  if (values.includes(key)) return values.filter((value) => value !== key);
  if (max && values.length >= max) return values;
  return [...values, key];
}

/** Which of `answers`' single-select/multi-select fields a given step drives. */
function selectedKeysFor(step: QuestionStep, answers: Answers): string[] {
  switch (step.id) {
    case "usage":
      return answers.usage;
    case "passengers":
      return answers.passengers ? [answers.passengers] : [];
    case "priorities":
      return answers.priorities;
    case "journeys":
      return answers.journeys ? [answers.journeys] : [];
    default:
      return [];
  }
}

function applyToggle(step: QuestionStep, answers: Answers, key: string): Answers {
  switch (step.id) {
    case "usage":
      return { ...answers, usage: toggleInArray(answers.usage, key, step.maxSelect) };
    case "passengers":
      return { ...answers, passengers: answers.passengers === key ? undefined : key };
    case "priorities":
      return { ...answers, priorities: toggleInArray(answers.priorities, key, step.maxSelect) };
    case "journeys":
      return { ...answers, journeys: answers.journeys === key ? undefined : key };
    default:
      return answers;
  }
}

function statusMessage(stepIndex: number, leadingModelName: string): string {
  if (stepIndex <= 1) return "All Defender models are still in consideration";
  if (stepIndex === 2) return `You're leaning towards a ${leadingModelName}`;
  if (stepIndex === 3) return `Looks like the ${leadingModelName} might be right for you`;
  return `Your answers point strongly towards ${leadingModelName}`;
}

/**
 * Sequentially crossfades INTERSTITIAL_MESSAGES then calls onDone — per the
 * Figma frame's own annotation ("keep it short, ideally 1-2 seconds, don't
 * artificially hold the user"). Reduced-motion skips straight through.
 */
function Interstitial({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        onDone();
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>(".interstitial-line");
        gsap
          .timeline({ onComplete: finish })
          .to(lines, { opacity: 1, duration: 0.15, stagger: { each: 0.4, from: "start" } })
          .to(lines, { opacity: 0, duration: 0.15, stagger: { each: 0.4, from: "start" } }, 0.25);
      });
      mm.add("(prefers-reduced-motion: reduce)", finish);

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative h-8 w-full max-w-md">
        {INTERSTITIAL_MESSAGES.map((message) => (
          <p key={message} className="interstitial-line absolute inset-x-0 text-lg opacity-0">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HelpMeChooseFlow() {
  const [phase, setPhase] = useState<Phase>("question");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  // Set when a step was reached via an "Edit" link from the recommendation,
  // so Continue returns straight there instead of replaying every step
  // after it — a single-field correction, not a re-run of the whole flow.
  const [returningToResults, setReturningToResults] = useState(false);

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const leadingModelName = recommendModel(answers).model.name;

  function goNext() {
    if (returningToResults) {
      setReturningToResults(false);
      setPhase("recommendation");
    } else if (isLastStep) {
      setPhase("interstitial");
    } else {
      setStepIndex((index) => index + 1);
    }
  }

  function goBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function reset() {
    setAnswers(EMPTY_ANSWERS);
    setStepIndex(0);
    setReturningToResults(false);
    setPhase("question");
  }

  function editStep(index: number) {
    setStepIndex(index);
    setReturningToResults(true);
    setPhase("question");
  }

  if (phase === "interstitial") {
    return <Interstitial onDone={() => setPhase("recommendation")} />;
  }

  if (phase === "recommendation") {
    return (
      <RecommendationView
        answers={answers}
        recommendation={recommendModel(answers)}
        onEditStep={editStep}
        onReset={reset}
      />
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col bg-[var(--color-paper-muted)]">
      <div className="w-full bg-[var(--color-paper)] px-6 pt-8 pb-6 shadow-[0_2px_12px_rgba(20,20,20,0.05)]">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Find your Defender</p>
          <p className="text-xs text-[var(--color-ink-soft)]">
            {String(stepIndex + 1).padStart(2, "0")}/{String(STEPS.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {STEPS.map((s, index) => (
            <div key={s.id}>
              <div
                className={`h-1 ${index <= stepIndex ? "bg-[var(--color-ink)]" : "bg-[var(--color-border)]"}`}
              />
              <p className="mt-2 hidden text-[11px] uppercase tracking-wide text-[var(--color-ink-soft)] sm:block">
                {s.eyebrow}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-10">
        <div className="text-center">
          <p className="eyebrow text-xs text-[var(--color-ink-soft)]">{step.eyebrow}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{step.heading}</h1>
          <p className="mt-3 text-[var(--color-ink-soft)]">{step.helper}</p>
        </div>

        <div className="mt-10">
          {step.subQuestions ? (
            <div className="flex flex-col gap-10">
              {step.subQuestions.map((sub) => {
                const selectedKeys =
                  sub.key === "carry" ? answers.carry : sub.key === "drive" ? answers.drive : answers.tow ? [answers.tow] : [];
                return (
                  <div key={sub.key}>
                    <p className="text-lg">{sub.heading}</p>
                    <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{sub.helper}</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {sub.options.map((option) => (
                        <OptionCard
                          key={option.key}
                          option={option}
                          selected={selectedKeys.includes(option.key)}
                          onToggle={() =>
                            setAnswers((prev) => {
                              if (sub.key === "tow") {
                                return {
                                  ...prev,
                                  tow: prev.tow === option.key ? undefined : option.key,
                                };
                              }
                              const field = sub.key;
                              return { ...prev, [field]: toggleInArray(prev[field], option.key) };
                            })
                          }
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {step.options?.map((option) => (
                <OptionCard
                  key={option.key}
                  option={option}
                  showImage
                  selected={selectedKeysFor(step, answers).includes(option.key)}
                  onToggle={() => setAnswers((prev) => applyToggle(step, prev, option.key))}
                />
              ))}
            </div>
          )}

          {step.skipLabel && (
            <button
              type="button"
              onClick={() => {
                setAnswers((prev) => ({ ...prev, priorities: [] }));
                goNext();
              }}
              className="mx-auto mt-8 block text-center text-sm underline underline-offset-4"
            >
              {step.skipLabel}
            </button>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 bg-[var(--color-ink)] py-4 pl-6 pr-20 text-[var(--color-paper)] shadow-[0_-8px_24px_rgba(20,20,20,0.15)] sm:pr-24">
        {stepIndex === 0 ? (
          <Link href="/models" className="cta-label flex items-center gap-2 whitespace-nowrap text-xs">
            ← Exit
          </Link>
        ) : (
          <button
            type="button"
            onClick={goBack}
            className="cta-label flex items-center gap-2 whitespace-nowrap text-xs"
          >
            ← Back
          </button>
        )}
        <p className="hidden text-xs text-white/70 sm:block">
          {statusMessage(stepIndex, leadingModelName)}
        </p>
        <button
          type="button"
          onClick={goNext}
          className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-paper)] px-6 py-3 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
        >
          {returningToResults ? "Back to results" : isLastStep ? "View Your Defender" : "Continue"}
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
