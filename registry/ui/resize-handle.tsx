"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function ResizeHandle({
  edge = "right",
  label = "Resize panel",
  className,
  ...props
}: React.ComponentProps<"div"> & { edge?: "left" | "right"; label?: string }) {
  return (
    <div
      data-slot="resize-handle"
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      tabIndex={0}
      title="Drag to resize · double-click to reset"
      className={cn(
        "group absolute inset-y-3 z-10 flex w-3 cursor-col-resize touch-none justify-center outline-none",
        edge === "right" ? "-right-2" : "-left-2",
        className
      )}
      {...props}
    >
      <span className="h-full w-0.5 rounded-full bg-transparent transition-colors duration-120 group-hover:bg-stroke-strong group-focus-visible:bg-info-primary group-active:bg-info-primary" />
    </div>
  )
}

function PanelReopenTab({
  side,
  label,
  className,
  ...props
}: React.ComponentProps<"button"> & { side: "left" | "right"; label?: string }) {
  return (
    <button
      type="button"
      data-slot="panel-reopen-tab"
      aria-label={label ?? `Show ${side} panel`}
      title={label ?? `Show ${side} panel`}
      className={cn(
        "absolute top-1/2 z-20 flex h-14 w-5 -translate-y-1/2 cursor-pointer touch-none items-center justify-center bg-background-default text-texticons-placeholder shadow-sm outline-none hover:bg-background-light hover:text-texticons-emphasis focus-visible:shadow-focus [&_svg]:size-4",
        side === "left"
          ? "left-0 rounded-r-md inset-ring inset-ring-stroke-default [clip-path:inset(-8px_-8px_-8px_0)]"
          : "right-0 rounded-l-md inset-ring inset-ring-stroke-default [clip-path:inset(-8px_0_-8px_-8px)]",
        className
      )}
      {...props}
    >
      {side === "left" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </button>
  )
}

export { ResizeHandle, PanelReopenTab }
