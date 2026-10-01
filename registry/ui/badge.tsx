import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap text-label-xsmall [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      type: {
        default: "bg-background-medium text-texticons-primary",
        info: "bg-background-info text-texticons-link-secondary",
        critical: "bg-critical-primary text-texticons-inverse-primary",
      },
      shape: {
        label: "rounded-md px-2 py-0.5",
        number: "min-w-5 rounded-full px-1 py-0.5",
        "small-number": "h-4 min-w-4 rounded-full px-1 text-[10px] leading-3",
      },
    },
    defaultVariants: { type: "default", shape: "label" },
  }
)

function Badge({
  className,
  type,
  shape,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ type, shape }), className)} {...props} />
}

export { Badge, badgeVariants }
