"use client"

import * as React from "react"
import {
  CheckboxCheckedIcon,
  CheckboxUncheckedIcon,
  RadioCheckedIcon,
  RadioUncheckedIcon,
  TimeIcon,
} from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { TextField } from "@/registry/ui/text-field"

type AIQuestionOption = { value: string; label: string; description?: string }

type AIAnswer = string | number | string[]

type AIQuestion = { id: string; prompt: string; placeholder?: string } & (
  | { kind: "single"; options: AIQuestionOption[]; recommended?: string; allowOther?: boolean }
  | { kind: "multi"; options: AIQuestionOption[]; recommended?: string[]; allowOther?: boolean }
  | { kind: "text"; recommended?: string }
  | { kind: "number"; recommended?: number }
)

type AIQuestionKind = AIQuestion["kind"]

type AIAnswers = Record<string, AIAnswer>

type AIQuestionResult = { answers: AIAnswers; skipped: string[] }

type AIQuestionCardStatus = "asking" | "timed-out" | "answered"

type Draft = { picked: string[]; other: string }

const optionsOf = (q: AIQuestion) => (q.kind === "single" || q.kind === "multi" ? q.options : [])

const isOption = (q: AIQuestion, value: string) => optionsOf(q).some((o) => o.value === value)

function draftFrom(q: AIQuestion, answer: AIAnswer | undefined): Draft {
  if (answer == null) return { picked: [], other: "" }
  if (q.kind === "text" || q.kind === "number") return { picked: [], other: String(answer) }
  const values = Array.isArray(answer) ? answer : [String(answer)]
  return {
    picked: values.filter((v) => isOption(q, v)),
    other: q.allowOther ? values.filter((v) => !isOption(q, v)).join(", ") : "",
  }
}

function readAnswer(q: AIQuestion, draft: Draft): AIAnswer | undefined {
  const picked = draft.picked.filter((v) => isOption(q, v))
  const other = draft.other.trim()
  switch (q.kind) {
    case "multi": {
      const all = other ? [...picked, other] : picked
      return all.length > 0 ? all : undefined
    }
    case "single":
      return picked[0] ?? (other || undefined)
    case "number":
      return other !== "" && Number.isFinite(Number(other)) ? Number(other) : undefined
    case "text":
      return other || undefined
  }
}

function readAnswers(questions: AIQuestion[], draftOf: (q: AIQuestion) => Draft): AIQuestionResult {
  const answers: AIAnswers = {}
  const skipped: string[] = []
  for (const q of questions) {
    const answer = readAnswer(q, draftOf(q))
    if (answer === undefined) skipped.push(q.id)
    else answers[q.id] = answer
  }
  return { answers, skipped }
}

function answerLabel(q: AIQuestion, answer: AIAnswer | undefined) {
  if (answer === undefined) return "Skipped"
  const label = (v: string) => optionsOf(q).find((o) => o.value === v)?.label ?? v
  if (typeof answer === "number") return String(answer)
  return typeof answer === "string" ? label(answer) : answer.map(label).join(", ")
}

const isRecommended = (q: AIQuestion, value: string) =>
  q.kind === "multi" ? (q.recommended?.includes(value) ?? false) : q.recommended === value

function AIQuestionChoice({
  type,
  name,
  option,
  checked,
  recommended,
  onChange,
}: {
  type: "radio" | "checkbox"
  name: string
  option: AIQuestionOption
  checked: boolean
  recommended: boolean
  onChange: (checked: boolean) => void
}) {
  const Icon =
    type === "radio"
      ? checked
        ? RadioCheckedIcon
        : RadioUncheckedIcon
      : checked
        ? CheckboxCheckedIcon
        : CheckboxUncheckedIcon
  const id = React.useId()
  return (
    <label
      data-slot="ai-question-choice"
      className="flex cursor-pointer items-start gap-2 rounded-md bg-background-default px-3 py-2 inset-ring inset-ring-stroke-default transition-colors hover:bg-background-light has-checked:bg-background-light has-checked:inset-ring-stroke-selected has-focus-visible:shadow-focus"
    >
      <input
        type={type}
        name={name}
        value={option.value}
        checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={option.description != null ? `${id}-description` : undefined}
        onChange={(e) => onChange(e.currentTarget.checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.metaKey && !e.ctrlKey) e.preventDefault()
        }}
        className="sr-only"
      />
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-texticons-primary" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span id={`${id}-label`} className="text-paragraph-small text-texticons-primary">
          {option.label}
          {recommended && (
            <>
              {" "}
              <span className="ml-0.5 text-paragraph-xsmall text-texticons-secondary">Recommended</span>
            </>
          )}
        </span>
        {option.description != null && (
          <span id={`${id}-description`} className="text-paragraph-xsmall text-texticons-secondary">
            {option.description}
          </span>
        )}
      </span>
    </label>
  )
}

function AIQuestionField({
  question: q,
  name,
  draft,
  onChange,
}: {
  question: AIQuestion
  name: string
  draft: Draft
  onChange: (draft: Draft) => void
}) {
  const promptId = `${name}-prompt`
  const prompt = (
    <p id={promptId} className="text-label-small text-texticons-emphasis">
      {q.prompt}
    </p>
  )
  if (q.kind === "text" || q.kind === "number") {
    return (
      <div data-slot="ai-question" data-kind={q.kind} data-question-id={q.id} className="flex flex-col gap-2">
        {prompt}
        <TextField
          name={name}
          aria-labelledby={promptId}
          type={q.kind}
          placeholder={q.placeholder}
          value={draft.other}
          onChange={(e) => onChange({ picked: [], other: e.currentTarget.value })}
        />
      </div>
    )
  }
  const single = q.kind === "single"
  return (
    <div
      data-slot="ai-question"
      data-kind={q.kind}
      data-question-id={q.id}
      role={single ? "radiogroup" : "group"}
      aria-labelledby={promptId}
      className="flex flex-col gap-2"
    >
      {prompt}
      {q.options.map((option) => (
        <AIQuestionChoice
          key={option.value}
          type={single ? "radio" : "checkbox"}
          name={name}
          option={option}
          checked={draft.picked.includes(option.value)}
          recommended={isRecommended(q, option.value)}
          onChange={(checked) =>
            onChange(
              single
                ? { picked: [option.value], other: "" }
                : {
                    picked: checked
                      ? [...draft.picked, option.value]
                      : draft.picked.filter((v) => v !== option.value),
                    other: draft.other,
                  }
            )
          }
        />
      ))}
      {q.allowOther && (
        <TextField
          aria-label={`${q.prompt}: other`}
          placeholder={q.placeholder ?? "Other…"}
          value={draft.other}
          onChange={(e) => onChange({ picked: single ? [] : draft.picked, other: e.currentTarget.value })}
        />
      )}
    </div>
  )
}

function AIQuestionCard({
  title,
  questions,
  image,
  status = "asking",
  answers,
  note = "The agent went ahead with the recommended answers. Answer now and it changes course.",
  submitLabel = "Submit",
  skipLabel = "Skip",
  onSubmit,
  onSkip,
  focusOnDecide = true,
  ref,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title" | "onSubmit"> & {
  title?: React.ReactNode
  questions: AIQuestion[]
  image?: { src: string; alt: string }
  status?: AIQuestionCardStatus
  answers?: AIAnswers
  note?: React.ReactNode
  submitLabel?: React.ReactNode
  skipLabel?: React.ReactNode
  onSubmit: (result: AIQuestionResult) => void
  onSkip?: () => void
  focusOnDecide?: boolean
}) {
  const formId = React.useId()
  const root = React.useRef<HTMLDivElement>(null)
  const refocus = React.useRef(false)
  React.useLayoutEffect(() => {
    const active = document.activeElement
    if (!refocus.current || status !== "answered") return
    refocus.current = false
    if (!focusOnDecide) return
    if (active === document.body || root.current?.contains(active)) root.current?.focus({ preventScroll: true })
  }, [status, focusOnDecide])
  const setRef = (el: HTMLDivElement | null) => {
    root.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }
  const [drafts, setDrafts] = React.useState<Record<string, Draft>>({})
  const draftOf = (q: AIQuestion) => drafts[q.id] ?? draftFrom(q, answers?.[q.id] ?? q.recommended)
  const result = readAnswers(questions, draftOf)
  return (
    <div
      ref={setRef}
      tabIndex={-1}
      data-slot="ai-question-card"
      data-status={status}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border border-stroke-default bg-background-default shadow-xs outline-none",
        className
      )}
      {...props}
    >
      {title != null && <div className="px-3 pt-2.5 text-paragraph-small text-texticons-primary">{title}</div>}
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className="mt-2.5 max-h-72 w-full border-y border-stroke-subtle bg-background-light object-contain"
        />
      )}
      {status === "timed-out" && (
        <p
          data-slot="ai-question-note"
          className="mx-3 mt-2.5 flex items-start gap-1.5 rounded-md bg-background-light px-2 py-1.5 text-paragraph-xsmall text-texticons-secondary"
        >
          <TimeIcon aria-hidden className="mt-px size-3.5 shrink-0 text-texticons-placeholder" />
          {note}
        </p>
      )}
      {status === "answered" ? (
        <dl data-slot="ai-question-summary" className="flex flex-col gap-2 px-3 py-2.5">
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-0.5">
              <dt className="text-paragraph-xsmall text-texticons-secondary">{q.prompt}</dt>
              <dd
                className={cn(
                  "text-paragraph-small",
                  answers?.[q.id] === undefined ? "text-texticons-tertiary" : "text-texticons-primary"
                )}
              >
                {answerLabel(q, answers?.[q.id])}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            if (result.skipped.length === questions.length) return
            refocus.current = true
            onSubmit(result)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              e.currentTarget.requestSubmit()
            }
          }}
        >
          <div className="flex flex-col gap-4 px-3 py-2.5">
            {questions.map((q) => (
              <AIQuestionField
                key={q.id}
                question={q}
                name={`${formId}-${q.id}`}
                draft={draftOf(q)}
                onChange={(draft) => setDrafts((d) => ({ ...d, [q.id]: draft }))}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-stroke-subtle bg-background-light px-3 py-2">
            {onSkip && (
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  refocus.current = true
                  onSkip()
                }}
              >
                {skipLabel}
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={result.skipped.length === questions.length}>
              {submitLabel}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export {
  AIQuestionCard,
  type AIAnswer,
  type AIAnswers,
  type AIQuestion,
  type AIQuestionCardStatus,
  type AIQuestionKind,
  type AIQuestionOption,
  type AIQuestionResult,
}
