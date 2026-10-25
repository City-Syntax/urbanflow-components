"use client"

import * as React from "react"
import { CoinIcon, FloorIcon } from "@urbanflow/icons"

import { AICitation, AICitationCard, AICitations } from "@/registry/ui/ai-citation-card"
import { AICodeBlock } from "@/registry/ui/ai-code-block"
import { AIContextSelectionChip } from "@/registry/ui/ai-context-chip"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/registry/ui/ai-conversation"
import {
  AIMessage,
  AIMessageActions,
  AIMessageContent,
  AIMessageCopy,
  AIMessageError,
  AIMessageGenerating,
  AIMessageRegenerate,
  AIMessageStopped,
} from "@/registry/ui/ai-message"
import { AIReasoning } from "@/registry/ui/ai-reasoning"
import { AISources, type AISource } from "@/registry/ui/ai-sources"
import { AITrace, type AITraceRenderers, type AITraceStep } from "@/registry/ui/ai-trace"
import { Button } from "@/registry/ui/button"

const question = "Why is cost per GFA higher on this floor?"
const answer =
  "Cost per GFA on Floor 3 is [__] $/m², against a building average of [__] $/m². Most of the difference comes from Architecture works ([__] $) and Service & equipment ([__] $)."
const partial = "Cost per GFA on Floor 3 is [__] $/m², against a building average of [__] $/m². Most of the difference comes from"
const thought =
  "Reviewed the selected floor, compared its cost breakdown with the building average, and identified the main contributors."
const thinking = "Reviewing the selected floor and comparing its cost breakdown with the building average…"
const timeout = "Expected Costflow comparison, received a timeout\n\nat Costflow.compare (src/costflow.ts:58:22)"
const timeoutAgain = "Attempt 2 timed out after 30 seconds\n\nat Costflow.compare (src/costflow.ts:58:22)"

const sources: AISource[] = [
  { id: "costflow", title: "Costflow", detail: "Elemental breakdown", icon: <CoinIcon /> },
  { id: "floor-3", title: "Floor 3", detail: "Properties", icon: <FloorIcon /> },
]

const step = (id: string, label: string, status: AITraceStep["status"], extra?: Partial<AITraceStep>): AITraceStep => ({
  id,
  name: id,
  label,
  status,
  ...extra,
})
const read = (status: AITraceStep["status"]) => step("read_floor", "Read Floor 3 properties", status)
const compare = (status: AITraceStep["status"], extra?: Partial<AITraceStep>) =>
  step("compare_costflow", status === "error" ? "Couldn’t compare the Costflow breakdown" : "Compared the Costflow breakdown", status, extra)
const average = (status: AITraceStep["status"]) => step("building_average", "Checked the building average", status)

const traces: [string, AITraceStep[], Partial<React.ComponentProps<typeof AITrace>>?][] = [
  ["Running step 1", [read("running"), compare("pending"), average("pending")]],
  ["Running step 2", [read("done"), compare("running"), average("pending")]],
  ["Running collapsed", [read("done"), compare("running"), average("pending")], { defaultOpen: false }],
  ["Expanded", [read("done"), compare("done"), average("done")], { defaultOpen: true }],
  ["Collapsed", [read("done"), compare("done"), average("done")]],
  ["Error", [read("done"), compare("error", { detail: timeout }), average("pending")], { onRetry: () => {} }],
  [
    "Retrying",
    [read("done"), step("compare_costflow", "Comparing the Costflow breakdown", "running", { attempt: 2 }), average("pending")],
  ],
  ["Stopped by the user", [read("done"), compare("running"), average("pending")], { stopped: true }],
  ["Failed step, then the model carried on", [read("done"), compare("error", { detail: timeout }), average("done")]],
  [
    "Retry failed",
    [read("done"), step("compare_costflow", "Costflow comparison timed out again", "error", { attempt: 2, detail: timeoutAgain }), average("pending")],
    { onRetry: () => {} },
  ],
]

const layers = [
  { name: "M01 100mm brick", mm: 102, r: 0.11 },
  { name: "I02 50mm insulation board", mm: 51, r: 1.69, insulation: true },
  { name: "F04 Wall air space resistance", mm: 0, r: 0.15 },
  { name: "G01a 19mm gypsum board", mm: 13, r: 0.12 },
]

const toolRenderers: AITraceRenderers = {
  list_constructions: ({ step: s }) =>
    (s.output as string[]).map((name) => (
      <p key={name} className="truncate">
        {name}
      </p>
    )),
  read_construction_layers: () => (
    <>
      <div className="flex h-6 overflow-hidden rounded-md">
        {layers.map((l) => (
          <div
            key={l.name}
            title={l.name}
            style={{ flexGrow: Math.max(l.mm, 8) }}
            className={l.insulation ? "border border-background-default bg-info-primary" : "border border-background-default bg-background-info"}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span>Outside</span>
        <span>Inside</span>
      </div>
      {layers.map((l) => (
        <div key={l.name} className="flex gap-2">
          <span className="w-45 min-w-0 truncate">{l.name}</span>
          <span className="w-13.5 shrink-0">{l.mm ? `${l.mm} mm` : "—"}</span>
          <span className="w-15.5 shrink-0 text-right">R {l.r.toFixed(2)}</span>
        </div>
      ))}
      <p>R 2.08 m²·K/W through the layers, before surface films</p>
      <p className="text-texticons-critical-primary">Missing Building, GlobalGeometryRules</p>
    </>
  ),
  locate_site: () => (
    <>
      <svg viewBox="0 0 320 190" className="h-48 w-full rounded-md border border-stroke-subtle bg-background-light">
        {Array.from({ length: 48 }, (_, i) => (
          <rect key={i} x={12 + (i % 8) * 38} y={12 + Math.floor(i / 8) * 29} width={28} height={20} rx={2} className="fill-neutral-10" />
        ))}
        <rect x={164} y={99} width={28} height={20} rx={2} className="fill-info-primary" />
      </svg>
      <div className="flex justify-between">
        <span>1000 m square, 215 buildings</span>
        <span>N ↑</span>
      </div>
      <p>Approximate location highlighted in blue</p>
    </>
  ),
  read_building: () => (
    <>
      <div className="flex flex-wrap gap-x-2">
        {[["Storeys", "55"], ["Floor", "168,514 m²"], ["Height", "193.0 m"], ["WWR", "35%"]].map(([k, v]) => (
          <span key={k}>
            {k} {v}
          </span>
        ))}
      </div>
      <p className="text-texticons-critical-primary">Missing Building, GlobalGeometryRules</p>
    </>
  ),
}

const constructionSteps: AITraceStep[] = [
  step("list_constructions", "Listed 4 constructions", "done", {
    output: ["Medium Exterior Wall", "Medium Floor", "Medium Roof/Ceiling", "Dbl Clr 6mm/13mm Air"],
  }),
  step("read_construction_layers", "Read exterior wall layers", "done"),
]
const siteSteps: AITraceStep[] = [
  step("locate_site", "Located the site", "done"),
  step("read_building", "Read building properties", "done"),
]

function Labelled({ label, children, width = "w-90" }: { label: string; children: React.ReactNode; width?: string }) {
  return (
    <div className="flex flex-col gap-2" data-demo={label}>
      <span className="text-label-xsmall text-texticons-secondary">{label}</span>
      <div className={`${width} max-w-full`}>{children}</div>
    </div>
  )
}

const userMessage = (
  <AIMessage from="user">
    <AIContextSelectionChip status="sent" icon={<FloorIcon />} selection={{ kind: "floor", label: "Floor 3" }} />
    <AIMessageContent>{question}</AIMessageContent>
  </AIMessage>
)

function Citations() {
  return (
    <AICitations>
      <AICitation label="Costflow" onClick={() => {}}>
        <AICitationCard
          icon={<CoinIcon />}
          title="Costflow · Elemental breakdown"
          description="Architecture works and Service & equipment rows for Floor 3."
          action={
            <Button variant="plain" size="medium">
              Open in Costflow
            </Button>
          }
        />
      </AICitation>
      <AICitation label="Floor 3" onClick={() => {}}>
        <AICitationCard icon={<FloorIcon />} title="Floor 3 · Properties" description="Gross floor area and zone areas." />
      </AICitation>
    </AICitations>
  )
}

function Actions({ latest = true }: { latest?: boolean }) {
  return (
    <AIMessageActions>
      <AIMessageCopy text={answer} />
      {latest && <AIMessageRegenerate onClick={() => {}} />}
    </AIMessageActions>
  )
}

function AssistantReply({ trace }: { trace?: boolean }) {
  return (
    <AIMessage from="assistant">
      {trace && (
        <>
          <AITrace steps={[read("done"), compare("done"), average("done")]} />
          <AIReasoning status="complete" duration={5} defaultOpen>
            {thought}
          </AIReasoning>
        </>
      )}
      <AISources sources={sources} />
      <AIMessageContent>{answer}</AIMessageContent>
      <Citations />
      <Actions />
    </AIMessage>
  )
}

function RetryableReply() {
  const [phase, setPhase] = React.useState<"lost" | "retrying" | "done">("lost")
  const [retries, setRetries] = React.useState(0)
  React.useEffect(() => {
    if (phase !== "retrying") return
    const timer = setTimeout(() => setPhase("done"), 1200)
    return () => clearTimeout(timer)
  }, [phase])
  return (
    <AIMessage from="assistant" data-retries={retries}>
      {phase === "lost" && (
        <>
          <AIMessageContent>{partial}</AIMessageContent>
          <AIMessageError
            onRetry={() => {
              setRetries((n) => n + 1)
              setPhase("retrying")
            }}
          />
        </>
      )}
      {phase === "retrying" && <AIMessageGenerating />}
      {phase === "done" && (
        <>
          <AIMessageContent>{answer}</AIMessageContent>
          <Actions />
        </>
      )}
    </AIMessage>
  )
}

function RetryableTrace() {
  const [attempt, setAttempt] = React.useState(1)
  const [status, setStatus] = React.useState<AITraceStep["status"]>("error")
  React.useEffect(() => {
    if (status !== "running") return
    const timer = setTimeout(() => setStatus("done"), 1200)
    return () => clearTimeout(timer)
  }, [status])
  const steps = [
    read("done"),
    status === "error" ? compare("error", { detail: timeout, attempt }) : step("compare_costflow", status === "running" ? "Comparing the Costflow breakdown" : "Compared the Costflow breakdown", status, { attempt }),
    average(status === "done" ? "done" : "pending"),
  ]
  return (
    <AITrace
      data-attempt={attempt}
      steps={steps}
      onRetry={() => {
        setAttempt((n) => n + 1)
        setStatus("running")
      }}
    />
  )
}

function Conversation() {
  const [extra, setExtra] = React.useState(0)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-106 flex-col overflow-hidden rounded-lg border border-stroke-subtle bg-background-default">
        <AIConversation>
          <AIConversationContent>
            {[0, 1, ...Array.from({ length: extra }, (_, i) => i + 2)].map((i) => (
              <React.Fragment key={i}>
                {userMessage}
                <AssistantReply />
              </React.Fragment>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      </div>
      <Button variant="secondary" size="micro" className="self-start" onClick={() => setExtra((n) => n + 1)}>
        Add a reply
      </Button>
    </div>
  )
}

export function AIMessagesDemo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Message · User">{userMessage}</Labelled>
        <Labelled label="Message · Assistant">
          <AssistantReply />
        </Labelled>
        <Labelled label="Message · Generating">
          <AIMessage from="assistant">
            <AIMessageGenerating />
          </AIMessage>
        </Labelled>
        <Labelled label="Message · With trace">
          <AssistantReply trace />
        </Labelled>
        <Labelled label="Message · Stopped">
          <AIMessage from="assistant">
            <AIMessageContent>{partial}</AIMessageContent>
            <AIMessageStopped />
            <Actions />
          </AIMessage>
        </Labelled>
        <Labelled label="Message · Connection lost (Retry, then it succeeds)">
          <RetryableReply />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Reasoning · Running">
          <AIReasoning status="running">{thinking}</AIReasoning>
        </Labelled>
        <Labelled label="Reasoning · Running expanded">
          <AIReasoning status="running" defaultOpen>
            {thinking}
          </AIReasoning>
        </Labelled>
        <Labelled label="Reasoning · Complete">
          <AIReasoning status="complete" duration={5} defaultOpen>
            {thought}
          </AIReasoning>
        </Labelled>
        <Labelled label="Reasoning · Complete collapsed">
          <AIReasoning status="complete" duration={5}>
            {thought}
          </AIReasoning>
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {traces.map(([label, steps, props]) => (
          <Labelled key={label} label={`Trace · ${label}`}>
            <AITrace steps={steps} {...props} />
          </Labelled>
        ))}
        <Labelled label="Trace · Construction expanded">
          <AITrace steps={constructionSteps} label="Checked constructions in 2 steps" toolRenderers={toolRenderers} defaultOpen />
        </Labelled>
        <Labelled label="Trace · Site map expanded">
          <AITrace steps={siteSteps} label="Located site in 2 steps" toolRenderers={toolRenderers} defaultOpen />
        </Labelled>
        <Labelled label="Trace · Construction collapsed">
          <AITrace steps={constructionSteps} label="Checked constructions in 2 steps" toolRenderers={toolRenderers} />
        </Labelled>
        <Labelled label="Trace · Retry (open the error, then Retry)">
          <RetryableTrace />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Code block" width="w-84">
          <AICodeBlock>{timeout}</AICodeBlock>
        </Labelled>
        <Labelled label="Sources · Collapsed">
          <AISources sources={sources} />
        </Labelled>
        <Labelled label="Sources · Expanded">
          <AISources sources={sources} defaultOpen onSelect={() => {}} />
        </Labelled>
        <Labelled label="Citations (hover or focus a badge)">
          <Citations />
        </Labelled>
      </div>

      <Labelled label="Conversation · Scroll to latest (scroll up)" width="w-96">
        <Conversation />
      </Labelled>
    </div>
  )
}
