import * as React from "react"

import { cn } from "@/lib/utils"

function HybridButtonGroup({
  status = "Selecting",
  context,
  action,
  className,
  ...props
}: React.ComponentProps<"div"> & { status?: React.ReactNode; context?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div
      data-slot="hybrid-button-group"
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-background-default py-1 pr-1 pl-3 text-label-xsmall shadow-sm inset-ring inset-ring-stroke-default",
        className
      )}
      {...props}
    >
      <span className="text-texticons-primary">{status}</span>
      {context != null && <span className="text-texticons-emphasis">{context}</span>}
      {action}
    </div>
  )
}

export { HybridButtonGroup }
