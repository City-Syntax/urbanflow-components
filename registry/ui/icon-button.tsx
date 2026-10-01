import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type ButtonProps = React.ComponentProps<typeof Button>

const iconSize = { micro: "icon-micro", medium: "icon", large: "icon-large" } as const

function IconButton({
  label,
  size = "medium",
  selected,
  variant = "secondary",
  className,
  ...props
}: Omit<ButtonProps, "size" | "aria-label"> & {
  label: string
  size?: keyof typeof iconSize
  selected?: boolean
}) {
  return (
    <Button
      data-slot="icon-button"
      variant={variant}
      size={iconSize[size]}
      aria-label={label}
      title={label}
      aria-pressed={selected}
      className={cn(variant === "tertiary" && "text-texticons-secondary aria-pressed:text-texticons-emphasis", className)}
      {...props}
    />
  )
}

function IconButtonGroup({
  label,
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<"div"> & { label: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      data-slot="icon-button-group"
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      className={cn(
        "inline-flex gap-1 rounded-md bg-background-default p-1 shadow-sm inset-ring inset-ring-stroke-default",
        orientation === "vertical" && "flex-col",
        "[&_[data-slot=icon-button]]:inset-ring-0",
        className
      )}
      {...props}
    />
  )
}

export { IconButton, IconButtonGroup }
