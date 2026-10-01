"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ResizeHandle, useResizableWidth } from "@/registry/ui/resize-handle"

const rightPanelWidths = { urbanflow: 359, flux: 300 } as const

function RightPanel({
  initial,
  min,
  max,
  resizable,
  onWidthChange,
  children,
}: {
  initial: number
  min: number
  max: number
  resizable: boolean
  onWidthChange?: (width: number) => void
  children: React.ReactNode
}) {
  const { width, handleProps } = useResizableWidth({ initial, min, max, edge: "left", onWidthChange })
  return (
    <div
      data-slot="app-shell-right-panel"
      style={{ width: resizable ? width : initial }}
      className="relative z-10 flex min-h-0 shrink-0 flex-col [&>*:not([data-slot=resize-handle])]:min-h-0 [&>*:not([data-slot=resize-handle])]:w-full [&>*:not([data-slot=resize-handle])]:flex-1"
    >
      {children}
      {resizable && <ResizeHandle edge="left" label="Resize right panel" {...handleProps} />}
    </div>
  )
}

function AppShell({
  product = "urbanflow",
  topNav,
  canvas,
  leftPanel,
  rightPanel,
  canvasTools,
  rightPanelDefaultWidth,
  rightPanelMinWidth = 280,
  rightPanelMaxWidth = 480,
  rightPanelResizable = true,
  onRightPanelWidthChange,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  product?: keyof typeof rightPanelWidths
  topNav: React.ReactNode
  canvas?: React.ReactNode
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  canvasTools?: React.ReactNode
  rightPanelDefaultWidth?: number
  rightPanelMinWidth?: number
  rightPanelMaxWidth?: number
  rightPanelResizable?: boolean
  onRightPanelWidthChange?: (width: number) => void
}) {
  return (
    <div
      data-slot="app-shell"
      data-product={product}
      className={cn("flex h-dvh w-full flex-col overflow-hidden bg-background-light", className)}
      {...props}
    >
      {topNav}
      <div className="relative flex min-h-0 flex-1 gap-2 p-2">
        <div data-slot="app-shell-canvas" className="absolute inset-0 overflow-hidden">
          {canvas}
        </div>
        {leftPanel && <div className="relative z-10 flex min-h-0 shrink-0 flex-col [&>*]:flex-1">{leftPanel}</div>}
        <div data-slot="app-shell-tools" className="pointer-events-none relative z-10 min-w-0 flex-1 [&>*]:pointer-events-auto">
          {canvasTools}
        </div>
        {rightPanel && (
          <RightPanel
            key={product}
            initial={rightPanelDefaultWidth ?? rightPanelWidths[product]}
            min={rightPanelMinWidth}
            max={rightPanelMaxWidth}
            resizable={rightPanelResizable}
            onWidthChange={onRightPanelWidthChange}
          >
            {rightPanel}
          </RightPanel>
        )}
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

export { AppShell, AppShellPin, rightPanelWidths as appShellRightPanelWidths }
