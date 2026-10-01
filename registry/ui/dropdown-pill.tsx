"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { SelectContent, SelectItem, type SelectOption } from "@/registry/ui/select"

function DropdownPill({
  options,
  placeholder = "Unclassified",
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  options: (string | SelectOption)[]
  placeholder?: string
  className?: string
  "aria-label"?: string
}) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o))
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        data-slot="dropdown-pill"
        aria-label={ariaLabel}
        className={cn(
          "inline-flex cursor-pointer items-center gap-0.5 rounded-full bg-background-default py-1.5 pr-1.5 pl-3 text-label-xsmall text-texticons-emphasis outline-none inset-ring inset-ring-stroke-subtle hover:bg-background-light hover:inset-ring-stroke-default focus-visible:shadow-focus data-[state=open]:bg-background-light data-[state=open]:inset-ring-stroke-default data-placeholder:text-neutral-30 disabled:cursor-not-allowed",
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="inline-flex text-texticons-secondary [&_svg]:size-3.5">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectContent className="min-w-40">
        {items.map((o) => (
          <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive.Root>
  )
}

export { DropdownPill }
