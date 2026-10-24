"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const clamped = Math.min(100, Math.max(0, value ?? 0))
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value == null ? value : clamped}
      className={cn("relative h-1 w-full overflow-hidden rounded-full bg-background-medium", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-texticons-primary transition-[width]"
        style={{ width: `${clamped}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
