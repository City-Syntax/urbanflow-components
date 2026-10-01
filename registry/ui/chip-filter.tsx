import * as React from "react"

import { cn } from "@/lib/utils"

function ChipFilter({
  selected = false,
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      data-slot="chip-filter"
      aria-pressed={selected}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 whitespace-nowrap text-label-xsmall outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-texticons-disabled [&_svg]:size-3.5 [&_svg]:shrink-0",
        selected
          ? "bg-background-inverse text-texticons-inverse-primary not-disabled:active:bg-neutral-80"
          : "bg-background-default text-texticons-emphasis inset-ring inset-ring-stroke-default not-disabled:hover:bg-background-light not-disabled:active:bg-neutral-10",
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

export { ChipFilter }
