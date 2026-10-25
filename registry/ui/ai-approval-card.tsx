"use client"

import * as React from "react"
import { CheckIcon, CloseIcon, StopIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

type AIApprovalStatus = "requesting" | "decided" | "denied" | "stopped"

type AIApprovalAction = {
  id: string
  label: React.ReactNode
  variant?: "primary" | "secondary" | "tertiary"
  tone?: "default" | "critical" | "success"
  title?: string
  disabled?: boolean
  onSelect: () => void
}

const record: Record<Exclude<AIApprovalStatus, "requesting">, { icon: React.ReactNode; outcome: string }> = {
  decided: { icon: <CheckIcon className="text-texticons-success-primary" />, outcome: "You allowed this." },
  denied: { icon: <CloseIcon className="text-texticons-placeholder" />, outcome: "You declined this." },
  stopped: { icon: <StopIcon className="text-texticons-placeholder" />, outcome: "Stopped before this was answered. Nothing was changed." },
}

function AIApprovalCard({
  title,
  detail,
  actions = [],
  status = "requesting",
  outcome,
  auto = false,
  ref,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  detail?: React.ReactNode
  actions?: AIApprovalAction[]
  status?: AIApprovalStatus
  outcome?: React.ReactNode
  auto?: boolean
}) {
  const titleId = React.useId()
  const root = React.useRef<HTMLDivElement>(null)
  const refocus = React.useRef(false)
  React.useLayoutEffect(() => {
    const active = document.activeElement
    if (!refocus.current || status === "requesting") return
    refocus.current = false
    if (active === document.body || root.current?.contains(active)) root.current?.focus({ preventScroll: true })
  }, [status])
  const setRef = (el: HTMLDivElement | null) => {
    root.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }
  if (status !== "requesting") {
    const { icon, outcome: fallback } = record[status]
    return (
      <div
        ref={setRef}
        tabIndex={-1}
        data-slot="ai-approval-card"
        data-status={status}
        className={cn(
          "flex w-full items-start gap-1.5 rounded-lg bg-background-default px-3 py-2 text-paragraph-xsmall text-texticons-secondary inset-ring inset-ring-stroke-subtle outline-none",
          "[&_svg]:mt-px [&_svg]:size-3.5 [&_svg]:shrink-0",
          className
        )}
        {...props}
      >
        <span aria-hidden className="contents">
          {icon}
        </span>
        <p className="min-w-0 flex-1">
          <span className="text-label-xsmall text-texticons-emphasis">{title}</span>
          <span> · </span>
          {outcome ?? fallback}
        </p>
        {auto && status === "decided" && (
          <Badge title="Allowed by the approval mode, without asking">Auto</Badge>
        )}
      </div>
    )
  }
  return (
    <div
      ref={setRef}
      tabIndex={-1}
      data-slot="ai-approval-card"
      data-status={status}
      role="group"
      aria-labelledby={titleId}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border border-stroke-default bg-background-default shadow-xs outline-none",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5 px-3 pt-2.5 pb-2">
        <p id={titleId} className="text-label-small text-texticons-emphasis">
          {title}
        </p>
        {detail != null && <div className="text-paragraph-xsmall whitespace-pre-line text-texticons-secondary">{detail}</div>}
      </div>
      {children != null && (
        <div data-slot="ai-approval-body" className="max-h-80 overflow-auto px-3 pb-2.5">
          {children}
        </div>
      )}
      <div
        data-slot="ai-approval-actions"
        className="grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2 border-t border-stroke-subtle bg-background-light px-3 py-2"
      >
        {actions.map((action) => (
          <Button
            key={action.id}
            type="button"
            variant={action.variant ?? "secondary"}
            tone={action.tone ?? "default"}
            title={action.title}
            disabled={action.disabled}
            onClick={() => {
              refocus.current = true
              action.onSelect()
            }}
            className="h-auto min-h-7 w-full min-w-0 py-1 leading-tight whitespace-normal"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

const diffLine = (line: string, inHunk: boolean) => {
  if (line.startsWith("@@") || !inHunk) return "text-texticons-tertiary"
  if (line.startsWith("+")) return "bg-background-success text-texticons-success-primary"
  if (line.startsWith("-")) return "bg-background-critical text-texticons-critical-primary"
  return "text-texticons-secondary"
}

function AIApprovalDiff({
  path,
  patch,
  created = false,
  added,
  removed,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  path: string
  patch: string
  created?: boolean
  added?: number
  removed?: number
}) {
  const lines = patch.replace(/\n$/, "").split("\n")
  const firstHunk = lines.findIndex((line) => line.startsWith("@@"))
  return (
    <div data-slot="ai-approval-diff" className={cn("flex flex-col gap-1 not-last:mb-3", className)} {...props}>
      <div className="flex min-w-0 items-baseline gap-2 text-paragraph-xsmall">
        <span className="min-w-0 truncate font-mono text-texticons-primary">{path}</span>
        {created && <span className="shrink-0 text-texticons-tertiary">new file</span>}
        {added != null && <span className="shrink-0 font-mono text-texticons-success-primary">+{added}</span>}
        {removed != null && <span className="shrink-0 font-mono text-texticons-critical-primary">−{removed}</span>}
      </div>
      <pre className="overflow-x-auto rounded-sm bg-background-light py-1 font-mono text-paragraph-xsmall">
        <code className="flex min-w-max flex-col">
          {lines.map((line, i) => (
            <span key={i} className={cn("px-2", diffLine(line, firstHunk < 0 || i > firstHunk))}>
              {line === "" ? " " : line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export { AIApprovalCard, AIApprovalDiff, type AIApprovalAction, type AIApprovalStatus }
