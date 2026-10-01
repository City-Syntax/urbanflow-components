"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { EyeClosedIcon, EyeDottedIcon, EyeOpenIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  variant = "default",
  label,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  variant?: "default" | "icon"
  label?: React.ReactNode
}) {
  const box = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:shadow-focus disabled:cursor-not-allowed",
        variant === "default" &&
          "bg-background-default text-background-default inset-ring-[1.5px] inset-ring-texticons-primary data-[state=checked]:bg-texticons-primary data-[state=checked]:inset-ring-0 data-[state=indeterminate]:bg-texticons-primary data-[state=indeterminate]:inset-ring-0 disabled:inset-ring-texticons-disabled data-[state=checked]:disabled:bg-texticons-disabled",
        variant === "icon" && "text-texticons-secondary disabled:text-texticons-disabled",
        className
      )}
      {...props}
    >
      {variant === "icon" ? (
        <span className="[&_svg]:size-4" aria-hidden>
          <EyeOpenIcon className="hidden group-data-[state=unchecked]:block" />
          <EyeDottedIcon className="hidden group-data-[state=indeterminate]:block" />
          <EyeClosedIcon className="hidden group-data-[state=checked]:block" />
        </span>
      ) : (
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path className="hidden group-data-[state=indeterminate]:block" d="M5 8h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path className="hidden group-data-[state=checked]:block" d="M4.5 8.2l2.3 2.3 4.7-4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  )
  if (label == null) return box
  return (
    <label className="inline-flex min-h-6 cursor-pointer items-center gap-2 text-label-xsmall text-texticons-primary has-disabled:cursor-not-allowed has-disabled:text-texticons-disabled">
      {box}
      {label}
    </label>
  )
}

export { Checkbox }
