"use client"

import * as React from "react"
import { ChevronDownIcon, LayoutIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"

const defaultWidths = { urbanflow: 252, flux: 360 } as const

type Product = keyof typeof defaultWidths

function useResizableWidth({
  initial,
  min,
  max,
  onWidthChange,
}: {
  initial: number
  min: number
  max: number
  onWidthChange?: (width: number) => void
}) {
  const [width, setWidth] = React.useState(initial)
  const clamp = React.useCallback((w: number) => Math.min(max, Math.max(min, Math.round(w))), [min, max])
  const update = React.useCallback(
    (w: number) => {
      const next = clamp(w)
      setWidth(next)
      onWidthChange?.(next)
    },
    [clamp, onWidthChange]
  )
  const start = React.useRef<{ x: number; width: number } | null>(null)
  const handleProps = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      start.current = { x: e.clientX, width }
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (start.current) update(start.current.width + e.clientX - start.current.x)
    },
    onPointerUp: () => {
      start.current = null
    },
    onDoubleClick: () => update(initial),
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 64 : 16
      if (e.key === "ArrowLeft") update(width - step)
      else if (e.key === "ArrowRight") update(width + step)
      else if (e.key === "Home") update(min)
      else if (e.key === "End") update(max)
      else if (e.key === "Enter") update(initial)
      else return
      e.preventDefault()
    },
  }
  return { width, handleProps }
}

function LeftContextPanel({
  product = "urbanflow",
  page,
  menu,
  menuOpen,
  onMenuOpenChange,
  onCollapse,
  tabs,
  defaultWidth,
  minWidth = 240,
  maxWidth = 480,
  resizable = true,
  onWidthChange,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  product?: Product
  page?: React.ReactNode
  menu?: React.ReactNode
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  onCollapse?: () => void
  tabs?: React.ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  resizable?: boolean
  onWidthChange?: (width: number) => void
}) {
  const initial = defaultWidth ?? defaultWidths[product]
  const { width, handleProps } = useResizableWidth({ initial, min: minWidth, max: maxWidth, onWidthChange })
  const flux = product === "flux"
  const trigger = (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1 rounded-md text-header-small text-texticons-emphasis outline-none focus-visible:shadow-focus [&_svg]:size-4 [&_svg]:text-texticons-placeholder"
    >
      {page}
      <ChevronDownIcon />
    </button>
  )
  const header = page != null && (
    <div className="flex items-center justify-between pt-1 pr-1 pl-2">
      {menu ? (
        <DropdownMenu open={menuOpen} onOpenChange={onMenuOpenChange}>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">{menu}</DropdownMenuContent>
        </DropdownMenu>
      ) : (
        trigger
      )}
      {onCollapse && (
        <IconButton variant="tertiary" size="micro" label="Collapse panel" onClick={onCollapse}>
          <LayoutIcon />
        </IconButton>
      )}
    </div>
  )
  return (
    <aside
      data-slot="left-context-panel"
      data-product={product}
      style={{ width: resizable ? width : initial, ...style }}
      className={cn(
        "relative flex min-h-0 shrink-0 flex-col gap-2 rounded-lg bg-background-default p-2 shadow-sm inset-ring inset-ring-stroke-subtle",
        className
      )}
      {...props}
    >
      {header}
      {tabs}
      {flux ? (
        <div data-slot="left-context-panel-content" className="flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto rounded-md bg-background-light p-2">{children}</div>
      )}
      {resizable && (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
          aria-valuenow={width}
          aria-valuemin={minWidth}
          aria-valuemax={maxWidth}
          tabIndex={0}
          title="Drag to resize · double-click to reset"
          className="group absolute inset-y-3 -right-2 z-10 flex w-3 cursor-col-resize touch-none justify-center outline-none"
          {...handleProps}
        >
          <span className="h-full w-0.5 rounded-full bg-transparent transition-colors duration-120 group-hover:bg-stroke-strong group-focus-visible:bg-info-primary group-active:bg-info-primary" />
        </div>
      )}
    </aside>
  )
}

export { LeftContextPanel, defaultWidths as leftContextPanelWidths }
