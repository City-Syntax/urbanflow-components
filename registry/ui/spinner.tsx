import * as React from "react"

import { cn } from "@/lib/utils"

function Spinner({ className, "aria-label": ariaLabel = "Loading", ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label={ariaLabel}
      viewBox="0 0 16 16"
      fill="none"
      className={cn("size-4 shrink-0 animate-[spin_800ms_linear_infinite] motion-reduce:animate-none", className)}
      {...props}
    >
      <circle cx="8" cy="8" r="7" strokeWidth="2" className="stroke-background-medium" />
      <path d="M8 1a7 7 0 0 1 7 7" strokeWidth="2" className="stroke-texticons-primary" />
    </svg>
  )
}

export { Spinner }
