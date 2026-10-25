"use client"

import * as React from "react"
import { ListIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { AITraceTrigger } from "@/registry/ui/ai-trace"
import { Collapsible, CollapsibleContent } from "@/registry/ui/collapsible"
import { Spinner } from "@/registry/ui/spinner"

type AIReasoningStatus = "running" | "complete"

function formatSeconds(seconds: number) {
  const s = Math.max(1, Math.round(seconds))
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`
}

function AIReasoning({
  status,
  duration,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible> & { status: AIReasoningStatus; duration?: number }) {
  const [userOpen, setUserOpen] = React.useState(defaultOpen)
  const open = openProp ?? userOpen
  const running = status === "running"
  return (
    <Collapsible
      data-slot="ai-reasoning"
      data-status={status}
      open={open}
      onOpenChange={(next) => {
        setUserOpen(next)
        onOpenChange?.(next)
      }}
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      <AITraceTrigger
        icon={running ? <Spinner aria-label="Thinking" /> : <ListIcon aria-hidden />}
        chevron={!running || open}
      >
        {running ? "Thinking" : duration != null ? `Thought · ${formatSeconds(duration)}` : "Thought"}
      </AITraceTrigger>
      <CollapsibleContent>
        <div className="pt-2 text-paragraph-small text-texticons-primary">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { AIReasoning, type AIReasoningStatus }
