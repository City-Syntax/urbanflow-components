"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function useResizableWidth({
  initial,
  min,
  max,
  edge = "right",
  onWidthChange,
}: {
  initial: number
  min: number
  max: number
  edge?: "left" | "right"
  onWidthChange?: (width: number) => void
}) {
  const [width, setWidth] = React.useState(initial)
  const update = React.useCallback(
    (w: number) => {
      const next = Math.min(max, Math.max(min, Math.round(w)))
      setWidth(next)
      onWidthChange?.(next)
    },
    [min, max, onWidthChange]
  )
  const start = React.useRef<{ x: number; width: number } | null>(null)
  const dir = edge === "right" ? 1 : -1
  const handleProps = {
    role: "separator",
    "aria-orientation": "vertical" as const,
    "aria-valuenow": width,
    "aria-valuemin": min,
    "aria-valuemax": max,
    tabIndex: 0,
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      start.current = { x: e.clientX, width }
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (start.current) update(start.current.width + dir * (e.clientX - start.current.x))
    },
    onPointerUp: () => {
      start.current = null
    },
    onDoubleClick: () => update(initial),
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 64 : 16
      const grow = edge === "right" ? "ArrowRight" : "ArrowLeft"
      const shrink = edge === "right" ? "ArrowLeft" : "ArrowRight"
      if (e.key === grow) update(width + step)
      else if (e.key === shrink) update(width - step)
      else if (e.key === "Home") update(min)
      else if (e.key === "End") update(max)
      else if (e.key === "Enter") update(initial)
      else return
      e.preventDefault()
    },
  }
  return { width, handleProps }
}

function ResizeHandle({
  edge = "right",
  label = "Resize panel",
  className,
  ...props
}: React.ComponentProps<"div"> & { edge?: "left" | "right"; label?: string }) {
  return (
    <div
      data-slot="resize-handle"
      aria-label={label}
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

export { ResizeHandle, useResizableWidth }
