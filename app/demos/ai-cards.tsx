"use client"

import * as React from "react"

import { AIApprovalCard, AIApprovalDiff, type AIApprovalAction, type AIApprovalStatus } from "@/registry/ui/ai-approval-card"
import { AIMessageQueue, type AIQueuedMessage } from "@/registry/ui/ai-message-queue"
import { AIPendingBanner } from "@/registry/ui/ai-pending-banner"
import { AIQuestionCard, type AIAnswers, type AIQuestion, type AIQuestionResult } from "@/registry/ui/ai-question-card"

const patch = `@@ -12,7 +12,7 @@
   "Zone 2": {
     "floor_area": 84.0,
-    "people_per_area": 0.05,
+    "people_per_area": 0.11,
     "lighting_w_per_area": 9.0,
   },`

const fluxActions = (tool: string, decide: (line: string) => void = () => {}): AIApprovalAction[] => [
  { id: "once", label: "Allow once", variant: "primary", onSelect: () => decide("You allowed this.") },
  {
    id: "tool",
    label: `Allow ${tool} in this project`,
    onSelect: () => decide("You allowed this, and every later call to this tool in this project."),
  },
  {
    id: "auto",
    label: "Full auto",
    title: "Allow this, and stop asking about anything but deleting runs and shell commands.",
    onSelect: () => decide("You allowed this, and turned on full auto."),
  },
  { id: "deny", label: "Deny", variant: "tertiary", onSelect: () => decide("You declined this.") },
]

const alwaysAskActions: AIApprovalAction[] = [
  { id: "once", label: "Allow once", variant: "primary", onSelect: () => {} },
  {
    id: "yolo",
    label: "YOLO for this chat…",
    title: "Stop asking about anything in this chat, this included. Asks you to confirm first.",
    onSelect: () => {},
  },
  { id: "deny", label: "Deny", variant: "tertiary", onSelect: () => {} },
]

const coreActions = (decide: (status: AIApprovalStatus) => void = () => {}): AIApprovalAction[] => [
  { id: "approve", label: "Approve", variant: "primary", onSelect: () => decide("decided") },
  { id: "deny", label: "Deny", variant: "secondary", onSelect: () => decide("denied") },
]

const fileDiff = <AIApprovalDiff path="model.epJSON" patch={patch} added={1} removed={1} />

function InteractiveApproval() {
  const [line, setLine] = React.useState<string | null>(null)
  return (
    <AIApprovalCard
      data-outcome={line ?? ""}
      title="Edit model.epJSON"
      detail="Raise the occupancy of Zone 2 to the office density you gave."
      status={line == null ? "requesting" : line === "You declined this." ? "denied" : "decided"}
      outcome={line}
      actions={fluxActions("edit_model", setLine)}
    >
      {fileDiff}
    </AIApprovalCard>
  )
}

function InteractiveCoreApproval() {
  const [status, setStatus] = React.useState<AIApprovalStatus>("requesting")
  return (
    <AIApprovalCard
      title="update_building"
      detail="Set Floor 3’s floor-to-floor height to 3.6 m."
      status={status}
      actions={coreActions(setStatus)}
    />
  )
}

const purpose: AIQuestion = {
  id: "use",
  prompt: "What is Zone 2 used for?",
  kind: "single",
  options: [
    { value: "office", label: "Office", description: "0.11 people/m², 9 W/m² lighting" },
    { value: "meeting", label: "Meeting rooms", description: "0.5 people/m², intermittent" },
    { value: "storage", label: "Storage", description: "Unoccupied, lights on demand" },
  ],
  recommended: "office",
  allowOther: true,
}

const systems: AIQuestion = {
  id: "systems",
  prompt: "Which systems should the model include?",
  kind: "multi",
  options: [
    { value: "vav", label: "VAV air handling" },
    { value: "chiller", label: "Water-cooled chiller" },
    { value: "dhw", label: "Domestic hot water" },
    { value: "pv", label: "Rooftop PV" },
  ],
  recommended: ["vav", "chiller"],
  allowOther: true,
}

const name: AIQuestion = { id: "name", prompt: "What should the project be called?", kind: "text", placeholder: "Project name" }
const height: AIQuestion = { id: "height", prompt: "Floor-to-floor height (m)", kind: "number", recommended: 3.6 }

const core = {
  question: "Which floors should I compare?",
  options: ["Floors 1–3", "Floors 4–6", "Every floor"],
}
const coreQuestion: AIQuestion = {
  id: "ask",
  prompt: core.question,
  kind: "single",
  options: core.options.map((o) => ({ value: o, label: o })),
  allowOther: true,
  placeholder: "Or type your own answer",
}

const why = "Zone 2 has no name in the IFC, so I can’t tell its loads from the drawings."

function InteractiveQuestions() {
  const [result, setResult] = React.useState<AIQuestionResult | null>(null)
  const [skipped, setSkipped] = React.useState(false)
  return (
    <div className="flex flex-col gap-2">
      <AIQuestionCard
        title={why}
        questions={[purpose, systems, height]}
        status={result || skipped ? "answered" : "asking"}
        answers={result?.answers}
        onSubmit={setResult}
        onSkip={() => setSkipped(true)}
      />
      <output data-slot="demo-result" className="font-mono text-paragraph-xsmall text-texticons-secondary">
        {skipped ? "skipped" : result ? JSON.stringify(result) : "—"}
      </output>
    </div>
  )
}

const timedOutAnswers: AIAnswers = { use: "office" }
const answered: AIAnswers = { use: "meeting", systems: ["vav", "dhw", "Heat recovery wheel"], height: 4.2 }

function Banner({ count }: { count: number }) {
  const [jumps, setJumps] = React.useState(0)
  return (
    <AIPendingBanner data-jumps={jumps} count={count} onJump={() => setJumps((n) => n + 1)}>
      {count > 1 ? "2 approvals and a question" : "Approve Edit model.epJSON"}
    </AIPendingBanner>
  )
}

const queued: AIQueuedMessage[] = [
  { id: "a", text: "Also check the roof insulation against Part L." },
  { id: "b", text: "Use the 2024 weather file for Singapore.\nKeep the design days from the old one." },
  { id: "c", text: "Then compare cooling loads with the baseline run, floor by floor, and flag any zone that is more than 10% above it." },
]

function Queue({ note, defaultOpen }: { note?: string; defaultOpen?: boolean }) {
  const [items, setItems] = React.useState(queued)
  const [sent, setSent] = React.useState<string[]>([])
  return (
    <AIMessageQueue
      data-order={items.map((i) => i.id).join(",")}
      data-sent={sent.join(",")}
      items={items}
      note={note}
      defaultOpen={defaultOpen}
      onEdit={(id, text) => setItems((all) => all.map((i) => (i.id === id ? { ...i, text } : i)))}
      onReorder={(ids) => setItems((all) => ids.map((id) => all.find((i) => i.id === id)!))}
      onRemove={(id) => setItems((all) => all.filter((i) => i.id !== id))}
      onSendNow={(id) => {
        setSent((s) => [...s, id])
        setItems((all) => all.filter((i) => i.id !== id))
      }}
    />
  )
}

function InPanel() {
  const card = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState<AIApprovalStatus>("requesting")
  return (
    <div className="flex h-80 flex-col overflow-y-auto rounded-lg border border-stroke-subtle bg-background-default p-3">
      <div className="flex flex-col gap-3">
        <AIApprovalCard
          ref={card}
          title="update_building"
          detail="Set Floor 3’s floor-to-floor height to 3.6 m."
          status={status}
          actions={coreActions(setStatus)}
        />
        {Array.from({ length: 6 }, (_, i) => (
          <p key={i} className="text-paragraph-small text-texticons-primary">
            While you decide, the agent keeps the rest of its plan visible here. Floor 3 is the only floor whose height
            differs from the drawings, so it asked before changing it.
          </p>
        ))}
        <AIPendingBanner
          count={status === "requesting" ? 1 : 0}
          onJump={() => {
            card.current?.scrollIntoView({ block: "nearest" })
            card.current?.querySelector("button")?.focus({ preventScroll: true })
          }}
        >
          Approve update_building
        </AIPendingBanner>
      </div>
    </div>
  )
}

function Labelled({ label, children, width = "w-90" }: { label: string; children: React.ReactNode; width?: string }) {
  return (
    <div className="flex flex-col gap-2" data-demo={label}>
      <span className="text-label-xsmall text-texticons-secondary">{label}</span>
      <div className={`${width} max-w-full`}>{children}</div>
    </div>
  )
}

export function AICardsDemo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Approval · Flux, file edit (four actions)">
          <AIApprovalCard
            title="Edit model.epJSON"
            detail="Raise the occupancy of Zone 2 to the office density you gave."
            actions={fluxActions("edit_model")}
          >
            {fileDiff}
          </AIApprovalCard>
        </Labelled>
        <Labelled label="Approval · Core app (Approve / Deny)">
          <AIApprovalCard
            title="update_building"
            detail="Set Floor 3’s floor-to-floor height to 3.6 m."
            actions={coreActions()}
          />
        </Labelled>
        <Labelled label="Approval · Always-ask tool">
          <AIApprovalCard
            title="Delete run 2026-10-24 baseline"
            detail="The run is replaced by today’s. Its results can’t be got back."
            actions={alwaysAskActions}
          >
            <ul className="flex flex-col gap-1 font-mono text-paragraph-xsmall text-texticons-primary">
              <li>runs/2026-10-24-baseline/eplusout.sql</li>
              <li>runs/2026-10-24-baseline/eplusout.err</li>
            </ul>
          </AIApprovalCard>
        </Labelled>
        <Labelled label="Approval · Narrow panel (actions stack)" width="w-64">
          <AIApprovalCard title="Edit model.epJSON" detail="Raise Zone 2’s occupancy." actions={fluxActions("edit_model")} />
        </Labelled>
        <Labelled label="Approval · Decided">
          <AIApprovalCard title="Edit model.epJSON" status="decided" />
        </Labelled>
        <Labelled label="Approval · Decided, always">
          <AIApprovalCard
            title="Edit model.epJSON"
            status="decided"
            outcome="You allowed this, and every later call to this tool in this project."
          />
        </Labelled>
        <Labelled label="Approval · Decided (auto)">
          <AIApprovalCard title="Edit model.epJSON" status="decided" auto />
        </Labelled>
        <Labelled label="Approval · Denied">
          <AIApprovalCard title="update_building" status="denied" />
        </Labelled>
        <Labelled label="Approval · Stopped">
          <AIApprovalCard title="Edit model.epJSON" status="stopped" />
        </Labelled>
        <Labelled label="Approval · Interactive (Flux)">
          <InteractiveApproval />
        </Labelled>
        <Labelled label="Approval · Interactive (core app)">
          <InteractiveCoreApproval />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Question · Single, recommended">
          <AIQuestionCard title={why} questions={[purpose]} onSubmit={() => {}} onSkip={() => {}} />
        </Labelled>
        <Labelled label="Question · Multi, recommended">
          <AIQuestionCard questions={[systems]} onSubmit={() => {}} />
        </Labelled>
        <Labelled label="Question · Text and number">
          <AIQuestionCard questions={[name, height]} onSubmit={() => {}} onSkip={() => {}} />
        </Labelled>
        <Labelled label="Question · Core app (options and free text)">
          <AIQuestionCard questions={[coreQuestion]} onSubmit={() => {}} onSkip={() => {}} />
        </Labelled>
        <Labelled label="Question · With image">
          <AIQuestionCard
            title="This is the zone I mean, highlighted on the ground floor."
            image={{ src: "/demo/floor-plan.svg", alt: "Ground floor plan with Zone 2 highlighted" }}
            questions={[purpose]}
            onSubmit={() => {}}
          />
        </Labelled>
        <Labelled label="Question · Timed out">
          <AIQuestionCard
            title={why}
            questions={[purpose]}
            status="timed-out"
            answers={timedOutAnswers}
            onSubmit={() => {}}
          />
        </Labelled>
        <Labelled label="Question · Answered">
          <AIQuestionCard title={why} questions={[purpose, systems, height, name]} status="answered" answers={answered} onSubmit={() => {}} />
        </Labelled>
        <Labelled label="Question · Interactive (submit, then the summary)">
          <InteractiveQuestions />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Pending banner · One waiting">
          <Banner count={1} />
        </Labelled>
        <Labelled label="Pending banner · Three waiting">
          <Banner count={3} />
        </Labelled>
        <Labelled label="Pending banner · In a chat panel (scroll, then Show)">
          <InPanel />
        </Labelled>
        <Labelled label="Queue · With note">
          <Queue note="sent when the agent is free" />
        </Labelled>
        <Labelled label="Queue · No note">
          <Queue />
        </Labelled>
        <Labelled label="Queue · Collapsed">
          <Queue note="sent when the agent is free" defaultOpen={false} />
        </Labelled>
      </div>
    </div>
  )
}
