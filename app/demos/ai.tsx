"use client"

import * as React from "react"
import { FilesIcon, FloorIcon, ZoneIcon } from "@urbanflow/icons"

import { AIContextChip, AIContextChipAdd, AIContextSelectionChip } from "@/registry/ui/ai-context-chip"
import { AIContextLimit, AIContextUsage, AIContextUsageCard } from "@/registry/ui/ai-context-usage"
import {
  AIPromptInput,
  AIPromptInputAttach,
  AIPromptInputContext,
  AIPromptInputPicker,
  AIPromptInputSelect,
  AIPromptInputSubmit,
  AIPromptInputTextarea,
  AIPromptInputToolbar,
  AIPromptInputTools,
  type AIPromptInputStatus,
} from "@/registry/ui/ai-prompt-input"
import { CommandGroup, CommandItem } from "@/registry/ui/command"

const modes = [
  { value: "ask", label: "Ask", description: "Asks before every change" },
  { value: "auto", label: "Auto", description: "Edits, asks before running" },
  { value: "yolo", label: "YOLO", description: "Runs everything without asking" },
]
const models = ["GPT-5", "GPT-5 mini", "Claude Sonnet 4.5", "Claude Haiku 4.5"].map((m) => ({ value: m, label: m }))
const efforts = ["Low", "Medium", "High"].map((e) => ({ value: e.toLowerCase(), label: e }))
const usage = { used: 84_000, limit: 200_000, inputTokens: 61_240, outputTokens: 22_760, credits: "1.8" }
const mentions = [
  { id: "floor-3", name: "Floor 3", kind: "Floor", icon: <FloorIcon /> },
  { id: "zone-3a", name: "Zone 3A · Office", kind: "Zone", icon: <ZoneIcon /> },
  { id: "cost-plan", name: "Floor 3 cost plan.pdf", kind: "File", icon: <FilesIcon /> },
]
const commands = [
  { name: "/clear", detail: "Start a new chat" },
  { name: "/compact", detail: "Summarise the chat to free context" },
]

const selection = (
  <AIContextSelectionChip icon={<FloorIcon />} selection={{ kind: "floor", label: "Floor 3" }} onRemove={() => {}} />
)
const file = (name: string) => (
  <AIContextChip key={name} icon={<FilesIcon />} label={name} detail="PDF · 2.4 MB" onRemove={() => {}} />
)
const longDraft =
  "Why is cost per GFA higher on this floor? Compare it with Floor 2 and the building average, break the difference down by element (substructure, superstructure, services and finishes), and tell me which elements to review first to bring it closer to the Green Mark target. Also list any assumptions about floor area or unit rates, and what data is missing."

function Composer({
  initial = "",
  placeholder = "Ask about this model, or select an object on the canvas",
  status = "ready",
  context,
  disabled,
  picker,
  wrap,
}: {
  initial?: string
  placeholder?: string
  status?: AIPromptInputStatus
  context?: React.ReactNode
  disabled?: boolean
  picker?: React.ReactNode
  wrap?: boolean
}) {
  const [text, setText] = React.useState(initial)
  const [mode, setMode] = React.useState("auto")
  const [model, setModel] = React.useState("GPT-5")
  const [effort, setEffort] = React.useState("medium")
  return (
    <AIPromptInput onSubmit={() => setText("")}>
      {picker}
      <AIPromptInputContext>{context}</AIPromptInputContext>
      <AIPromptInputTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <AIPromptInputToolbar>
        <AIPromptInputTools wrap={wrap}>
          <AIPromptInputAttach />
          <AIPromptInputSelect title="Mode" options={modes} value={mode} onValueChange={setMode} />
          <AIPromptInputSelect title="Model" options={models} value={model} onValueChange={setModel} />
          <AIPromptInputSelect title="Effort" options={efforts} value={effort} onValueChange={setEffort} />
        </AIPromptInputTools>
        <AIContextUsage {...usage} />
        <AIPromptInputSubmit status={status} disabled={disabled || !text.trim()} onStop={() => {}} />
      </AIPromptInputToolbar>
    </AIPromptInput>
  )
}

function SingleModelComposer() {
  const [text, setText] = React.useState("")
  return (
    <AIPromptInput onSubmit={() => setText("")}>
      <AIPromptInputTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about this model" />
      <AIPromptInputToolbar>
        <AIPromptInputTools>
          <AIPromptInputAttach />
          <AIPromptInputSelect title="Mode" options={[{ value: "auto", label: "Auto" }]} value="auto" />
          <AIPromptInputSelect title="Model" options={[{ value: "default", label: "Default model" }]} value="default" />
          <AIPromptInputSelect title="Effort" options={[]} />
        </AIPromptInputTools>
        <AIContextUsage used={18_000} limit={200_000} />
        <AIPromptInputSubmit disabled={!text.trim()} />
      </AIPromptInputToolbar>
    </AIPromptInput>
  )
}

function PickerComposer() {
  const [text, setText] = React.useState("Compare @fl")
  const [active, setActive] = React.useState(0)
  const token = /(^|\s)([@/])(\S*)$/.exec(text)
  const rows =
    token?.[2] === "@"
      ? mentions
          .filter((m) => m.name.toLowerCase().includes(token[3].toLowerCase()))
          .map((m) => ({ key: m.id, insert: `@${m.name} `, icon: m.icon, label: m.name, detail: m.kind }))
      : token?.[2] === "/" && token.index === 0
        ? commands
            .filter((c) => c.name.startsWith(`/${token[3]}`))
            .map((c) => ({ key: c.name, insert: `${c.name} `, icon: null, label: c.name, detail: c.detail }))
        : []
  const pick = (insert: string) => {
    setText(text.slice(0, text.length - token![0].trimStart().length) + insert)
    setActive(0)
  }
  return (
    <AIPromptInput onSubmit={() => setText("")}>
      {rows.length > 0 && (
        <AIPromptInputPicker value={rows[active]?.key ?? ""} onValueChange={(key) => setActive(rows.findIndex((r) => r.key === key))}>
          <CommandGroup heading={token?.[2] === "@" ? "Mention" : "Commands"}>
            {rows.map((r) => (
              <CommandItem key={r.key} value={r.key} onSelect={() => pick(r.insert)}>
                {r.icon}
                <span>{r.label}</span>
                <span className="ml-auto text-texticons-tertiary">{r.detail}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </AIPromptInputPicker>
      )}
      <AIPromptInputTextarea
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setActive(0)
        }}
        placeholder="Type @ to mention an object, / for commands"
        onKeyDown={(e) => {
          if (rows.length === 0) return
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault()
            setActive((i) => (i + (e.key === "ArrowDown" ? 1 : rows.length - 1)) % rows.length)
          } else if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault()
            pick(rows[active].insert)
          }
        }}
      />
      <AIPromptInputToolbar>
        <AIPromptInputTools>
          <AIPromptInputAttach />
          <AIPromptInputSelect title="Mode" options={modes} value="auto" />
          <AIPromptInputSelect title="Model" options={models} value="GPT-5" />
          <AIPromptInputSelect title="Effort" options={efforts} value="medium" />
        </AIPromptInputTools>
        <AIContextUsage {...usage} />
        <AIPromptInputSubmit disabled={!text.trim()} />
      </AIPromptInputToolbar>
    </AIPromptInput>
  )
}

const states: [string, React.ReactNode][] = [
  ["Empty", <Composer key="empty" />],
  ["Draft", <Composer key="draft" initial="Why is cost per GFA higher on this floor?" />],
  ["Selection", <Composer key="selection" initial="Compare this floor with" context={selection} />],
  ["Generating", <Composer key="generating" status="streaming" placeholder="Ask a follow-up" />],
  ["Draft max height", <Composer key="max" initial={longDraft} />],
  ["Selection and file", <Composer key="file" initial="Compare this floor with" context={<>{selection}{file("Floor 3 cost plan.pdf")}</>} />],
  [
    "Selection and multiple files",
    <Composer
      key="files"
      initial="Compare this floor with"
      context={<>{selection}{file("Floor 3 cost plan.pdf")}{file("Cost assumptions.pdf")}</>}
    />,
  ],
  [
    "Narrow, tools wrap",
    <div key="wrap" className="w-80">
      <Composer wrap />
    </div>,
  ],
]

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2" data-demo={label}>
      <span className="text-label-xsmall text-texticons-secondary">{label}</span>
      {children}
    </div>
  )
}

export function AIDemo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {states.map(([label, node]) => (
          <Labelled key={label} label={label}>
            <div className="w-96 max-w-full">{node}</div>
          </Labelled>
        ))}
        <Labelled label="One mode, one model, no effort choice">
          <div className="w-96 max-w-full">
            <SingleModelComposer />
          </div>
        </Labelled>
        <Labelled label="@ mention and / command picker">
          <div className="w-96 max-w-full pt-28">
            <PickerComposer />
          </div>
        </Labelled>
      </div>

      <Labelled label="Context chips">
        <div className="flex flex-wrap items-center gap-3">
          {selection}
          <AIContextChipAdd />
          <AIContextSelectionChip status="sent" icon={<FloorIcon />} selection={{ kind: "floor", label: "Floor 3" }} />
          <AIContextSelectionChip icon={<ZoneIcon />} selection={{ kind: "zone", label: "2 zones", count: 2 }} onRemove={() => {}} />
          <AIContextChip icon={<FilesIcon />} label="Floor 3 cost plan.pdf" detail="PDF · 2.4 MB" onRemove={() => {}} />
          <AIContextChip status="uploading" label="Floor 3 cost plan.pdf" onRemove={() => {}} />
          <AIContextChip status="sent" icon={<FilesIcon />} label="Floor 3 cost plan.pdf" detail="PDF · 2.4 MB" />
          <AIContextChip status="error" icon={<FilesIcon />} label="Floor 3 cost plan.pdf" onRetry={() => {}} onRemove={() => {}} />
        </div>
      </Labelled>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <Labelled label="Context usage (hover the ring)">
          <div className="flex items-start gap-6">
            <AIContextUsage {...usage} />
            <AIContextUsageCard {...usage} />
          </div>
        </Labelled>
        <Labelled label="Context usage without token details">
          <AIContextUsageCard used={12_400} limit={128_000} />
        </Labelled>
        <Labelled label="Context nearly full">
          <div className="flex w-96 max-w-full flex-col gap-2">
            <AIContextLimit used={156_000} limit={200_000} onDismiss={() => {}} />
            <Composer />
          </div>
        </Labelled>
        <Labelled label="Context full">
          <div className="flex w-96 max-w-full flex-col gap-2">
            <AIContextLimit used={200_000} limit={200_000} onNewChat={() => {}} />
            <Composer placeholder="Start a new chat to keep going" disabled />
          </div>
        </Labelled>
      </div>
    </div>
  )
}
