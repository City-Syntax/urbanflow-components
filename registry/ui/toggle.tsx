"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Toggle({
  className,
  label,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { label?: React.ReactNode }) {
  const toggle = (
    <SwitchPrimitive.Root
      data-slot="toggle"
      className={cn(
        "peer inline-flex h-[21px] w-9 shrink-0 cursor-pointer items-center rounded-full bg-neutral-10 p-[1.5px] outline-none transition-colors duration-120 focus-visible:shadow-focus data-[state=checked]:bg-neutral-120 disabled:cursor-not-allowed disabled:bg-background-medium data-[state=checked]:disabled:bg-background-medium motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="toggle-thumb"
        className="block size-[18px] rounded-full bg-neutral-0 shadow-xs transition-transform duration-120 ease-[cubic-bezier(0.2,0,0,1)] data-[state=checked]:translate-x-[15px] motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  )
  if (label == null) return toggle
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-paragraph-small text-texticons-primary has-disabled:cursor-not-allowed has-disabled:text-texticons-disabled">
      {toggle}
      {label}
    </label>
  )
}

export { Toggle }
