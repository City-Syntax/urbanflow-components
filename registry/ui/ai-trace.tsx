"use client"

import * as React from "react"
import { AlertTriangleIcon, CheckIcon, ChevronDownIcon, ListIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { AICodeBlock } from "@/registry/ui/ai-code-block"
import { Button } from "@/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import { Spinner } from "@/registry/ui/spinner"

type AITraceStepStatus = "pending" | "running" | "done" | "error"

type AITraceStep = {
  id: string
  name: string
  label: string
  status: AITraceStepStatus
  detail?: string
  input?: unknown
  output?: unknown
  attempt?: number
}

type AITraceRenderers = Record<string, (step: AITraceStep) => React.ReactNode>

type AITracePhase =
  | { phase: "running" | "error"; step: number; total: number; retry: boolean }
  | { phase: "done"; total: number }

const toolStatus: Record<string, AITraceStepStatus> = {
  "output-available": "done",
  "output-error": "error",
  "output-denied": "error",
}

function toolPartStatus(state: string): AITraceStepStatus {
  return toolStatus[state] ?? "running"
}

function tracePhase(steps: AITraceStep[]): AITracePhase {
  const total = steps.length
  const failed = steps.findIndex((s) => s.status === "error")
  const current = failed >= 0 ? failed : steps.findIndex((s) => s.status !== "done")
  if (current < 0) return { phase: "done", total }
  return {
    phase: failed >= 0 ? "error" : "running",
    step: current + 1,
    total,
    retry: (steps[current].attempt ?? 1) > 1,
  }
}

function traceLabel(p: AITracePhase) {
  if (p.phase === "done") return `Researched in ${p.total} ${p.total === 1 ? "step" : "steps"}`
  if (p.phase === "error") return p.retry ? `Retry failed at step ${p.step}` : `Research stopped at step ${p.step}`
  return `${p.retry ? "Retrying" : "Researching"} · Step ${p.step} of ${p.total}`
}

const placeholderIcon =
  "[&_svg:not([data-slot=spinner])]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-texticons-placeholder"

function AITraceTrigger({
  icon,
  critical,
  chevron = true,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & { icon: React.ReactNode; critical?: boolean; chevron?: boolean }) {
  return (
    <CollapsibleTrigger
      data-slot="ai-trace-trigger"
      className={cn(
        "group/trigger flex w-full items-center gap-1.5 text-left text-paragraph-xsmall text-texticons-secondary",
        critical && "text-texticons-critical-primary",
        placeholderIcon,
        className
      )}
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1">{children}</span>
      {chevron && <ChevronDownIcon className="transition-transform group-data-[state=open]/trigger:rotate-180" />}
    </CollapsibleTrigger>
  )
}

const stepIcon: Record<Exclude<AITraceStepStatus, "error">, React.ReactNode> = {
  pending: (
    <span aria-hidden className="flex size-3.5 shrink-0 items-center justify-center">
      <span className="size-1.5 rounded-full bg-neutral-20" />
    </span>
  ),
  running: <Spinner aria-label="Running" />,
  done: <CheckIcon aria-hidden />,
}

function AITraceStepRow({
  step,
  renderer,
  onRetry,
}: {
  step: AITraceStep
  renderer?: (step: AITraceStep) => React.ReactNode
  onRetry?: (step: AITraceStep) => void
}) {
  const [details, setDetails] = React.useState(false)
  const output = renderer?.(step)
  const label = <span className="line-clamp-2 min-w-0 flex-1">{step.label}</span>
  const expandable = step.status === "error" && (step.detail != null || onRetry != null)
  return (
    <li data-slot="ai-trace-step" data-status={step.status} className="flex flex-col gap-1.5">
      {step.status === "error" ? (
        <Collapsible open={details} onOpenChange={setDetails} disabled={!expandable} className="flex flex-col gap-1.5">
          <CollapsibleTrigger
            className={cn(
              "flex w-full items-center gap-1.5 rounded-sm bg-background-critical px-1 py-0.5 text-left text-paragraph-xsmall text-texticons-critical-primary disabled:cursor-default",
              placeholderIcon
            )}
          >
            <AlertTriangleIcon aria-hidden />
            {label}
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-1.5">
            {step.detail != null && (
              <div className="pl-5">
                <AICodeBlock>{step.detail}</AICodeBlock>
              </div>
            )}
            {onRetry && (
              <div className="pl-4">
                <Button variant="tertiary" onClick={() => onRetry(step)}>
                  Retry
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className={cn("flex items-center gap-1.5 text-paragraph-xsmall text-texticons-secondary", placeholderIcon)}>
          {stepIcon[step.status]}
          {label}
        </div>
      )}
      {output != null && output !== false && <div className="flex flex-col gap-1.5 pl-5 text-paragraph-xsmall text-texticons-secondary">{output}</div>}
    </li>
  )
}

function AITrace({
  steps,
  label,
  toolRenderers,
  onRetry,
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "children"> & {
  steps: AITraceStep[]
  label?: React.ReactNode
  toolRenderers?: AITraceRenderers
  onRetry?: (step: AITraceStep) => void
}) {
  const [userOpen, setUserOpen] = React.useState(defaultOpen)
  if (steps.length === 0) return null
  const phase = tracePhase(steps)
  const open = openProp ?? userOpen ?? phase.phase !== "done"
  return (
    <Collapsible
      data-slot="ai-trace"
      data-phase={phase.phase}
      open={open}
      onOpenChange={(next) => {
        setUserOpen(next)
        onOpenChange?.(next)
      }}
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      <AITraceTrigger
        icon={phase.phase === "running" && !open ? <Spinner aria-label="Researching" /> : <ListIcon aria-hidden />}
        critical={phase.phase === "error"}
      >
        {label ?? traceLabel(phase)}
      </AITraceTrigger>
      <CollapsibleContent>
        <ol className="flex flex-col gap-1.5 pt-2 pl-5">
          {steps.map((step) => (
            <AITraceStepRow key={step.id} step={step} renderer={toolRenderers?.[step.name]} onRetry={onRetry} />
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  )
}

export {
  AITrace,
  AITraceTrigger,
  toolPartStatus,
  tracePhase,
  type AITracePhase,
  type AITraceRenderers,
  type AITraceStep,
  type AITraceStepStatus,
}
