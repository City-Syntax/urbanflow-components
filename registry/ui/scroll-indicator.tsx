"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type Tone = "light" | "dark"

const thumbTone: Record<Tone, string> = { light: "bg-background-light", dark: "bg-background-inverse" }

function ScrollIndicator({
  tone = "light",
  length = 135,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone; length?: number }) {
  return (
    <span
      data-slot="scroll-indicator"
      aria-hidden
      className={cn("inline-block w-[5px] rounded-full", thumbTone[tone], className)}
      style={{ height: length, ...style }}
      {...props}
    />
  )
}

function ScrollArea({
  tone = "light",
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & { tone?: Tone }) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit] outline-none focus-visible:shadow-focus">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex w-[5px] touch-none py-1 mr-2 select-none">
        <ScrollAreaPrimitive.Thumb className={cn("relative flex-1 rounded-full", thumbTone[tone])} />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
}

export { ScrollIndicator, ScrollArea }
