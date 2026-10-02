"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { PanelReopenTab, ResizeHandle } from "@/registry/ui/resize-handle"

const panelWidths = {
  urbanflow: { left: 252, right: 359 },
  flux: { left: 360, right: 300 },
} as const

const inset = 8
const minCanvas = 8
const crampedTools = 120

type Side = "left" | "right"
type Widths = { left: number; right: number }

function fitPanels(body: number, widths: Widths, keep: Side): Widths {
  const other: Side = keep === "left" ? "right" : "left"
  const next = { left: Math.max(0, Math.round(widths.left)), right: Math.max(0, Math.round(widths.right)) }
  const room = (open: number) => body - 2 * inset - minCanvas - inset * open
  const open = (next.left > 0 ? 1 : 0) + (next.right > 0 ? 1 : 0)
  if (next.left + next.right <= room(open)) return next
  next[other] = Math.max(0, room(open) - next[keep])
  if (next[other] === 0) next[keep] = Math.min(next[keep], room(next[keep] > 0 ? 1 : 0))
  return next
}

function AppShell({
  product = "urbanflow",
  topNav,
  canvas,
  leftPanel,
  rightPanel,
  canvasTools,
  leftPanelDefaultWidth,
  rightPanelDefaultWidth,
  resizable = true,
  onPanelWidthsChange,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  product?: keyof typeof panelWidths
  topNav: React.ReactNode
  canvas?: React.ReactNode
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  canvasTools?: React.ReactNode
  leftPanelDefaultWidth?: number
  rightPanelDefaultWidth?: number
  resizable?: boolean
  onPanelWidthsChange?: (widths: Widths) => void
}) {
  const defaults: Widths = React.useMemo(
    () => ({
      left: leftPanelDefaultWidth ?? panelWidths[product].left,
      right: rightPanelDefaultWidth ?? panelWidths[product].right,
    }),
    [product, leftPanelDefaultWidth, rightPanelDefaultWidth]
  )
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const [body, setBody] = React.useState(0)
  const [requested, setRequested] = React.useState<Widths>(defaults)
  const [shownDefaults, setShownDefaults] = React.useState(defaults)
  const [drag, setDrag] = React.useState<{ side: Side; x: number; start: Widths } | null>(null)
  const [reopen, setReopen] = React.useState<{ side: Side; x: number; moved: boolean } | null>(null)

  if (shownDefaults !== defaults) {
    setShownDefaults(defaults)
    setRequested(defaults)
  }

  const widths = body > 0 ? fitPanels(body, requested, "left") : requested

  const apply = (next: Widths, keep: Side) => {
    const fitted = body > 0 ? fitPanels(body, next, keep) : next
    setRequested(fitted)
    onPanelWidthsChange?.(fitted)
  }

  React.useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setBody(entry.contentRect.width + 2 * inset))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hasLeft = Boolean(leftPanel)
  const hasRight = Boolean(rightPanel)
  const left = hasLeft ? widths.left : 0
  const right = hasRight ? widths.right : 0
  const openCount = (left > 0 ? 1 : 0) + (right > 0 ? 1 : 0)
  const toolsWidth = body - 2 * inset - left - right - inset * openCount
  const cramped = body > 0 && toolsWidth < crampedTools

  const handleProps = (side: Side) => ({
    edge: side === "left" ? ("right" as const) : ("left" as const),
    label: `Resize ${side} panel`,
    "aria-valuenow": widths[side],
    "aria-valuemin": 0,
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      setDrag({ side, x: e.clientX, start: widths })
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (!drag || drag.side !== side || e.buttons === 0) return
      const dx = (e.clientX - drag.x) * (side === "left" ? 1 : -1)
      apply({ ...drag.start, [side]: drag.start[side] + dx }, side)
    },
    onPointerUp: () => setDrag(null),
    onDoubleClick: () => apply({ ...widths, [side]: defaults[side] }, side),
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 64 : 16
      const grow = side === "left" ? "ArrowRight" : "ArrowLeft"
      const shrink = side === "left" ? "ArrowLeft" : "ArrowRight"
      let next: number | null = null
      if (e.key === grow) next = widths[side] + step
      else if (e.key === shrink) next = widths[side] - step
      else if (e.key === "Home") next = 0
      else if (e.key === "Enter") next = defaults[side]
      if (next === null) return
      e.preventDefault()
      apply({ ...widths, [side]: next }, side)
    },
  })

  const reopenProps = (side: Side) => ({
    side,
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      setReopen({ side, x: e.clientX, moved: false })
    },
    onPointerMove: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!reopen || reopen.side !== side || e.buttons === 0) return
      const dx = (e.clientX - reopen.x) * (side === "left" ? 1 : -1)
      if (dx <= 4 && !reopen.moved) return
      if (!reopen.moved) setReopen({ ...reopen, moved: true })
      apply({ ...widths, [side]: dx }, side)
    },
    onPointerUp: () => {
      if (reopen && !reopen.moved) apply({ ...widths, [side]: defaults[side] }, side)
      setReopen(null)
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return
      e.preventDefault()
      apply({ ...widths, [side]: defaults[side] }, side)
    },
  })

  const panelClass =
    "relative z-10 flex min-h-0 shrink-0 flex-col [&>*:not([data-slot=resize-handle])]:min-h-0 [&>*:not([data-slot=resize-handle])]:!w-full [&>*:not([data-slot=resize-handle])]:flex-1"

  return (
    <div
      data-slot="app-shell"
      data-product={product}
      className={cn("flex h-dvh w-full flex-col overflow-hidden bg-background-light", className)}
      {...props}
    >
      {topNav}
      <div ref={bodyRef} className="relative flex min-h-0 flex-1 gap-2 p-2">
        <div data-slot="app-shell-canvas" className="absolute inset-0 overflow-hidden">
          {canvas}
        </div>
        {left > 0 && (
          <div data-slot="app-shell-left-panel" style={{ width: left }} className={panelClass}>
            {leftPanel}
            {resizable && <ResizeHandle {...handleProps("left")} />}
          </div>
        )}
        <div
          data-slot="app-shell-tools"
          data-cramped={cramped || undefined}
          className="pointer-events-none relative z-10 min-w-2 flex-1 [&>*]:pointer-events-auto data-cramped:[&_[data-slot=app-shell-pin]]:hidden"
        >
          {canvasTools}
        </div>
        {right > 0 && (
          <div data-slot="app-shell-right-panel" style={{ width: right }} className={panelClass}>
            {rightPanel}
            {resizable && <ResizeHandle {...handleProps("right")} />}
          </div>
        )}
        {hasLeft && left === 0 && <PanelReopenTab {...reopenProps("left")} />}
        {hasRight && right === 0 && <PanelReopenTab {...reopenProps("right")} />}
      </div>
    </div>
  )
}

function AppShellPin({
  position,
  className,
  ...props
}: React.ComponentProps<"div"> & { position: "top-right" | "bottom-center" | "bottom-right" | "top-left" | "bottom-left" }) {
  return (
    <div
      data-slot="app-shell-pin"
      className={cn(
        "absolute",
        position === "top-right" && "top-0 right-0",
        position === "top-left" && "top-0 left-0",
        position === "bottom-center" && "bottom-0 left-1/2 -translate-x-1/2",
        position === "bottom-right" && "right-0 bottom-0",
        position === "bottom-left" && "bottom-0 left-0",
        className
      )}
      {...props}
    />
  )
}

export { AppShell, AppShellPin, fitPanels, panelWidths as appShellPanelWidths }
