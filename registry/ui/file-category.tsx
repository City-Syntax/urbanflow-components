"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon, ChevronUpIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

const NONE = "__none__"

const defaultTones: Record<string, CategoryTone> = {
  "Floor plan": "info",
  Reference: "caution",
  Sketch: "magic",
  Geometry: "success",
}

type CategoryTone = "none" | "info" | "caution" | "magic" | "success"

const toneClass: Record<CategoryTone, string> = {
  none: "bg-background-light text-texticons-primary",
  info: "bg-background-info text-texticons-link-primary",
  caution: "bg-background-caution text-texticons-caution-secondary",
  magic: "bg-background-info text-magic-primary",
  success: "bg-background-medium text-texticons-success-primary",
}

function CategoryTag({ tone = "none", className, ...props }: React.ComponentProps<"span"> & { tone?: CategoryTone }) {
  return (
    <span
      data-slot="category-tag"
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 whitespace-nowrap text-label-xsmall", toneClass[tone], className)}
      {...props}
    />
  )
}

function FileCategory({
  value,
  onValueChange,
  options = ["Floor plan", "Reference", "Sketch", "Geometry"],
  tones = defaultTones,
  placeholder = "Uncategorized",
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "value" | "onValueChange"> & {
  value?: string | null
  onValueChange?: (value: string | null) => void
  options?: string[]
  tones?: Record<string, CategoryTone>
  placeholder?: string
  className?: string
}) {
  const all = [NONE, ...options]
  return (
    <SelectPrimitive.Root
      value={value ?? NONE}
      onValueChange={(v) => onValueChange?.(v === NONE ? null : v)}
      {...props}
    >
      <SelectPrimitive.Trigger
        data-slot="file-category"
        aria-label="Category"
        className={cn(
          "group/fcat inline-flex cursor-pointer items-center gap-2 rounded-full text-texticons-secondary outline-none focus-visible:shadow-focus [&_svg]:size-3.5",
          className
        )}
      >
        <SelectPrimitive.Value>
          <CategoryTag tone={value ? (tones[value] ?? "none") : "none"}>{value ?? placeholder}</CategoryTag>
        </SelectPrimitive.Value>
        <ChevronDownIcon className="invisible group-hover/fcat:visible group-data-[state=open]/fcat:hidden" />
        <ChevronUpIcon className="hidden group-data-[state=open]/fcat:block" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-50 min-w-[109px] overflow-hidden rounded-lg bg-background-default py-1.5 shadow-sm inset-ring inset-ring-stroke-strong"
        >
          <SelectPrimitive.Viewport className="flex flex-col gap-1">
            {all.map((o) => (
              <SelectPrimitive.Item
                key={o}
                value={o}
                className="flex w-full cursor-pointer px-1.5 py-1 outline-none data-highlighted:bg-background-light data-[state=checked]:bg-background-light"
              >
                <SelectPrimitive.ItemText>
                  <CategoryTag tone={o === NONE ? "none" : (tones[o] ?? "none")}>{o === NONE ? placeholder : o}</CategoryTag>
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { FileCategory, CategoryTag, type CategoryTone }
