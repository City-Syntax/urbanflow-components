import * as React from "react"
import { AddIcon, ArrowReloadIcon, CloseIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Spinner } from "@/registry/ui/spinner"

type AIContextChipStatus = "attached" | "uploading" | "sent" | "error"

const statusStyle: Record<
  AIContextChipStatus,
  { chip: string; removable: boolean; busy?: boolean; retry?: boolean; detail?: string }
> = {
  attached: { chip: "bg-background-medium text-texticons-emphasis", removable: true },
  uploading: { chip: "bg-background-medium text-texticons-emphasis", removable: true, busy: true, detail: "Uploading…" },
  sent: { chip: "bg-background-medium text-texticons-emphasis", removable: false },
  error: { chip: "bg-background-critical text-texticons-critical-primary", removable: true, retry: true, detail: "Couldn’t upload" },
}

const chipClass = "inline-flex h-6 max-w-full shrink-0 items-center gap-1 rounded-md px-1.5 whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0"
const chipAction =
  "inline-flex cursor-pointer rounded-xs text-current outline-none hover:opacity-70 focus-visible:shadow-focus"

function AIContextChip({
  status = "attached",
  icon,
  label,
  detail,
  onRemove,
  onRetry,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  status?: AIContextChipStatus
  icon?: React.ReactNode
  label: string
  detail?: React.ReactNode
  onRemove?: () => void
  onRetry?: () => void
}) {
  const style = statusStyle[status]
  const shownDetail = detail ?? style.detail
  return (
    <span data-slot="ai-context-chip" data-status={status} className={cn(chipClass, style.chip, className)} {...props}>
      {style.busy ? <Spinner aria-label={`Uploading ${label}`} /> : icon}
      <span className="truncate text-label-xsmall">{label}</span>
      {shownDetail != null && <span className="text-paragraph-xsmall">{shownDetail}</span>}
      {style.retry && onRetry && (
        <button type="button" aria-label={`Retry ${label}`} onClick={onRetry} className={chipAction}>
          <ArrowReloadIcon />
        </button>
      )}
      {style.removable && onRemove && (
        <button type="button" aria-label={`Remove ${label}`} onClick={onRemove} className={chipAction}>
          <CloseIcon />
        </button>
      )}
    </span>
  )
}

type AIContextSelection = { kind: string; label: string; count?: number }

function AIContextSelectionChip({
  selection,
  ...props
}: Omit<React.ComponentProps<typeof AIContextChip>, "label" | "detail"> & { selection: AIContextSelection }) {
  const { kind, label, count } = selection
  return (
    <AIContextChip data-kind={kind} data-count={count} label={label} detail="Selection" {...props} />
  )
}

function AIContextChipAdd({ className, children = "Add context", ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="ai-context-chip-add"
      className={cn(
        chipClass,
        "cursor-pointer bg-background-light text-texticons-secondary outline-none hover:bg-background-medium focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-texticons-disabled",
        className
      )}
      {...props}
    >
      <AddIcon />
      <span className="text-label-xsmall">{children}</span>
    </button>
  )
}

export { AIContextChip, AIContextSelectionChip, AIContextChipAdd, type AIContextChipStatus, type AIContextSelection }
