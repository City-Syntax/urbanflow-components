"use client"

import * as React from "react"
import { AlertTriangleIcon, ArrowReloadIcon, CheckIcon, CopyIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { IconButton } from "@/registry/ui/icon-button"
import { Spinner } from "@/registry/ui/spinner"

type AIMessageRole = "user" | "assistant"

function AIMessage({ from, className, ...props }: React.ComponentProps<"div"> & { from: AIMessageRole }) {
  return (
    <div
      data-slot="ai-message"
      data-from={from}
      className={cn(
        "group/message flex w-full flex-col",
        from === "user" ? "items-end gap-1" : "items-start gap-2",
        className
      )}
      {...props}
    />
  )
}

function AIMessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-message-content"
      className={cn(
        "min-w-0 text-paragraph-small break-words text-texticons-primary",
        "group-data-[from=assistant]/message:w-full",
        "group-data-[from=user]/message:max-w-75 group-data-[from=user]/message:rounded-lg group-data-[from=user]/message:bg-background-medium group-data-[from=user]/message:px-3 group-data-[from=user]/message:py-2",
        className
      )}
      {...props}
    />
  )
}

const skeletonWidths = ["w-full", "w-4/5", "w-14/25"]

function AIMessageGenerating({
  label = "Thinking",
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div
      data-slot="ai-message-generating"
      role="status"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {label != null && (
        <div className="flex items-center gap-1.5 text-paragraph-xsmall text-texticons-secondary">
          <Spinner aria-hidden role={undefined} />
          {label}
        </div>
      )}
      {skeletonWidths.map((width) => (
        <div key={width} aria-hidden className={cn("h-3 rounded-sm bg-background-medium", width)} />
      ))}
    </div>
  )
}

function AIMessageActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="ai-message-actions" className={cn("flex gap-0.5", className)} {...props} />
}

const actionClass = "text-texticons-placeholder hover:text-texticons-secondary"

function AIMessageCopy({
  text,
  onCopy,
  className,
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "label" | "onCopy" | "onClick"> & { text?: string; onCopy?: () => void }) {
  const [copiedAt, setCopiedAt] = React.useState(0)
  React.useEffect(() => {
    if (!copiedAt) return
    const timer = setTimeout(() => setCopiedAt(0), 2000)
    return () => clearTimeout(timer)
  }, [copiedAt])
  const copied = copiedAt > 0
  return (
    <IconButton
      data-slot="ai-message-copy"
      variant="tertiary"
      size="micro"
      label={copied ? "Copied" : "Copy"}
      className={cn(actionClass, className)}
      onClick={async () => {
        try {
          if (text != null) await navigator.clipboard.writeText(text)
        } catch {
          return
        }
        onCopy?.()
        setCopiedAt(Date.now())
      }}
      {...props}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  )
}

function AIMessageRegenerate({ className, ...props }: Omit<React.ComponentProps<typeof IconButton>, "label">) {
  return (
    <IconButton
      data-slot="ai-message-regenerate"
      variant="tertiary"
      size="micro"
      label="Regenerate"
      className={cn(actionClass, className)}
      {...props}
    >
      <ArrowReloadIcon />
    </IconButton>
  )
}

function AIMessageStopped({ className, children = "Stopped", ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="ai-message-stopped" className={cn("text-label-xsmall text-texticons-emphasis", className)} {...props}>
      {children}
    </p>
  )
}

function AIMessageError({
  onRetry,
  className,
  children = "Couldn’t finish this reply. Check your connection and try again.",
  ...props
}: React.ComponentProps<"div"> & { onRetry?: () => void }) {
  return (
    <div data-slot="ai-message-error" className={cn("flex w-full flex-col items-start gap-2", className)} {...props}>
      <p role="alert" className="flex w-full items-start gap-1.5 text-paragraph-xsmall text-texticons-critical-primary">
        <AlertTriangleIcon aria-hidden className="mt-px size-3.5 shrink-0 text-texticons-placeholder" />
        {children}
      </p>
      {onRetry && (
        <Button variant="tertiary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

export {
  AIMessage,
  AIMessageActions,
  AIMessageContent,
  AIMessageCopy,
  AIMessageError,
  AIMessageGenerating,
  AIMessageRegenerate,
  AIMessageStopped,
  type AIMessageRole,
}
