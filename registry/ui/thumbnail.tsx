import * as React from "react"
import { PhotoIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

const sizes = { xsmall: 24, small: 40, medium: 60, large: 80 }

function Thumbnail({
  size = "medium",
  src,
  alt = "",
  icon,
  transparent = false,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  size?: keyof typeof sizes
  src?: string
  alt?: string
  icon?: React.ReactNode
  transparent?: boolean
}) {
  const px = sizes[size]
  return (
    <span
      data-slot="thumbnail"
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md text-texticons-tertiary inset-ring inset-ring-neutral-30",
        transparent ? "bg-background-default" : "bg-background-light",
        px >= 40 ? "[&_svg]:size-5" : "[&_svg]:size-3.5",
        className
      )}
      style={{ width: px, height: px, ...style }}
      {...props}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : (icon ?? <PhotoIcon />)}
    </span>
  )
}

export { Thumbnail }
