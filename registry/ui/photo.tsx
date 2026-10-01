import * as React from "react"
import { CloseIcon, PhotoIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function Photo({
  src,
  alt = "",
  size = "S",
  selected = false,
  more,
  onRemove,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  src?: string
  alt?: string
  size?: "S" | "L"
  selected?: boolean
  more?: number
  onRemove?: () => void
}) {
  return (
    <span
      data-slot="photo"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-background-light text-texticons-tertiary inset-ring inset-ring-stroke-subtle [&>svg]:size-5",
        size === "L" ? "h-[90px] w-[120px]" : "size-[60px]",
        selected && "ring-2 ring-stroke-selected",
        className
      )}
      {...props}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : <PhotoIcon />}
      {more != null && (
        <span className="absolute inset-0 flex items-center justify-center bg-background-overlay text-label-small text-texticons-inverse-primary">
          +{more}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove image"
          onClick={onRemove}
          className="absolute top-0.5 right-0.5 inline-flex cursor-pointer rounded-full bg-background-inverse p-0.5 text-texticons-inverse-primary outline-none focus-visible:shadow-focus [&_svg]:size-3.5"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  )
}

export { Photo }
