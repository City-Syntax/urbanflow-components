import * as React from "react"

import { cn } from "@/lib/utils"

function AppShell({
  topNav,
  canvas,
  leftPanel,
  rightPanel,
  canvasTools,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  topNav: React.ReactNode
  canvas?: React.ReactNode
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  canvasTools?: React.ReactNode
}) {
  return (
    <div
      data-slot="app-shell"
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
        {rightPanel && <div className="relative z-10 flex min-h-0 shrink-0 flex-col [&>*]:flex-1">{rightPanel}</div>}
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

export { AppShell, AppShellPin }
