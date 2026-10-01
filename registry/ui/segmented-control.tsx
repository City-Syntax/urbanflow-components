"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type SegmentedOption = { value: string; label?: React.ReactNode; icon?: React.ReactNode; ariaLabel?: string; disabled?: boolean }

function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue" | "dir"> & {
  options: (string | SegmentedOption)[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o))
  return (
    <ToggleGroupPrimitive.Root
      data-slot="segmented-control"
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => v && onValueChange?.(v)}
      className={cn(
        "inline-flex gap-1 rounded-md bg-background-light p-1 shadow-sm inset-ring inset-ring-stroke-default",
        className
      )}
      {...props}
    >
      {items.map((o) => (
        <ToggleGroupPrimitive.Item
          key={o.value}
          value={o.value}
          aria-label={o.ariaLabel}
          disabled={o.disabled}
          className="inline-flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-md px-3 text-label-xsmall text-texticons-emphasis outline-none not-disabled:hover:bg-background-medium focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-texticons-disabled data-[state=on]:bg-background-default data-[state=on]:inset-ring data-[state=on]:inset-ring-stroke-default data-[state=on]:hover:bg-background-default [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {o.icon}
          {o.label != null && <span>{o.label}</span>}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}

export { SegmentedControl, type SegmentedOption }
