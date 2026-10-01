import * as React from "react"

import { cn } from "@/lib/utils"

function ColorIndicator({
  color = "var(--color-misc-cyan)",
  size = "medium",
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & { color?: string; size?: "medium" | "small" }) {
  return (
    <span
      data-slot="color-indicator"
      aria-hidden
      className={cn("inline-block shrink-0", size === "small" ? "size-2 rounded-xs" : "size-3.5 rounded-sm", className)}
      style={{ background: color, ...style }}
      {...props}
    />
  )
}

export { ColorIndicator }
