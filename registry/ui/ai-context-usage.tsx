"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"
import { Progress } from "@/registry/ui/progress"
import { Separator } from "@/registry/ui/separator"

type AIContextUsageState = "ok" | "nearly-full" | "full"

type AIContextUsageValue = {
  used: number
  limit: number
  nearlyFullAt?: number
}

type AIContextUsageDetails = {
  inputTokens?: number
  outputTokens?: number
  credits?: React.ReactNode
}

const RING_RADIUS = 6.8
const RING_LENGTH = 2 * Math.PI * RING_RADIUS

function contextUsage({ used, limit, nearlyFullAt = 75 }: AIContextUsageValue) {
  const isFull = limit > 0 && used >= limit
  const percent = isFull ? 100 : limit > 0 ? Math.min(99, Math.round((used / limit) * 100)) : 0
  const state: AIContextUsageState = isFull ? "full" : percent >= nearlyFullAt ? "nearly-full" : "ok"
  return { percent, state }
}

const compact = (n: number) => (n < 1000 ? String(n) : `${Number((n / 1000).toFixed(n < 10000 ? 1 : 0))}k`)
const full = (n: number) => n.toLocaleString("en-US")

function AIContextUsageRing({ percent, className }: { percent: number; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-4 shrink-0 -rotate-90", className)}>
      <circle cx="8" cy="8" r={RING_RADIUS} strokeWidth="2.4" className="stroke-background-medium" />
      <circle
        cx="8"
        cy="8"
        r={RING_RADIUS}
        strokeWidth="2.4"
        strokeDasharray={`${(percent / 100) * RING_LENGTH} ${RING_LENGTH}`}
        className="stroke-texticons-primary"
      />
    </svg>
  )
}

function AIContextUsageTrigger({
  used,
  limit,
  nearlyFullAt,
  className,
  ...props
}: React.ComponentProps<"button"> & AIContextUsageValue) {
  const { percent, state } = contextUsage({ used, limit, nearlyFullAt })
  return (
    <button
      type="button"
      aria-label={`Context used: ${percent}%`}
      className={cn(
        "inline-flex h-7 shrink-0 cursor-default items-center gap-1 rounded-md px-1.5 text-label-xsmall text-texticons-secondary outline-none hover:bg-background-light focus-visible:shadow-focus data-[state=open]:bg-background-light",
        className
      )}
      {...props}
      data-slot="ai-context-usage-trigger"
      data-usage={state}
    >
      <AIContextUsageRing percent={percent} />
      {percent}%
    </button>
  )
}

function UsageRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start justify-between gap-3">
      <dt className="text-paragraph-xsmall text-texticons-secondary">{label}</dt>
      <dd className="text-label-xsmall text-texticons-primary">{children}</dd>
    </div>
  )
}

function AIContextUsageCard({
  used,
  limit,
  nearlyFullAt,
  inputTokens,
  outputTokens,
  credits,
  className,
  ...props
}: React.ComponentProps<"div"> & AIContextUsageValue & AIContextUsageDetails) {
  const { percent, state } = contextUsage({ used, limit, nearlyFullAt })
  const details = inputTokens != null || outputTokens != null || credits != null
  return (
    <div
      data-slot="ai-context-usage-card"
      data-usage={state}
      className={cn(
        "flex w-60 flex-col gap-2 rounded-md bg-background-default p-3 shadow-md inset-ring inset-ring-stroke-subtle",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between text-label-xsmall">
        <span className="text-texticons-primary">Context window</span>
        <span className="text-texticons-emphasis">{percent}%</span>
      </div>
      <Progress value={percent} aria-label="Context window used" />
      <p className="text-paragraph-xsmall text-texticons-secondary">
        {compact(used)} of {compact(limit)} tokens
      </p>
      {details && (
        <>
          <Separator />
          <dl className="flex flex-col gap-2">
            {inputTokens != null && <UsageRow label="Input">{full(inputTokens)} tokens</UsageRow>}
            {outputTokens != null && <UsageRow label="Output">{full(outputTokens)} tokens</UsageRow>}
            {credits != null && <UsageRow label="Credits used">{credits}</UsageRow>}
          </dl>
        </>
      )}
    </div>
  )
}

function AIContextUsage({
  className,
  ...usage
}: AIContextUsageValue & AIContextUsageDetails & { className?: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <AIContextUsageTrigger used={usage.used} limit={usage.limit} nearlyFullAt={usage.nearlyFullAt} className={className} />
      </HoverCardTrigger>
      <HoverCardContent side="top" align="end" className="w-auto p-0 shadow-none inset-ring-0">
        <AIContextUsageCard {...usage} />
      </HoverCardContent>
    </HoverCard>
  )
}

function AIContextLimit({
  used,
  limit,
  nearlyFullAt,
  onDismiss,
  onNewChat,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Banner>, "tone" | "inCard" | "actions" | "title"> &
  AIContextUsageValue & { onNewChat?: () => void }) {
  const { percent, state } = contextUsage({ used, limit, nearlyFullAt })
  if (state === "ok") return null
  if (state === "nearly-full") {
    return (
      <Banner data-slot="ai-context-limit" data-usage={state} tone="warning" onDismiss={onDismiss} {...props}>
        {children ?? `Usage limit at ${percent}%.`}
      </Banner>
    )
  }
  return (
    <Banner
      data-slot="ai-context-limit"
      data-usage={state}
      tone="critical"
      actions={onNewChat && <Button variant="secondary" onClick={onNewChat}>New chat</Button>}
      {...props}
    >
      {children ?? "This chat is full. Start a new chat to keep going."}
    </Banner>
  )
}

export {
  AIContextUsage,
  AIContextUsageTrigger,
  AIContextUsageCard,
  AIContextLimit,
  contextUsage,
  type AIContextUsageState,
  type AIContextUsageValue,
  type AIContextUsageDetails,
}
