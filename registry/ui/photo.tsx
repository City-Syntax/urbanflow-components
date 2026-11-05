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
  src?: string | undefined
  alt?: string | undefined
  size?: "S" | "L"
  selected?: boolean
  more?: number | undefined
  onRemove?: (() => void) | undefined
}) {
  return (
    <span
      data-slot="photo"
      data-selected={selected || undefined}
      className={cn("group/photo relative inline-flex shrink-0", size === "L" ? "size-19" : "size-15", className)}
      {...props}
    >
      <span className="relative inline-flex size-full items-center justify-center overflow-hidden rounded-md bg-background-light text-texticons-tertiary [&>svg]:size-5">
        {src ? <img src={src} alt={alt} className="size-full object-cover" /> : <PhotoIcon />}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 bg-texticons-disabled opacity-0 transition-opacity group-hover/photo:opacity-100",
            more != null && "opacity-100"
          )}
        />
        {more != null && (
          <span className="absolute inset-0 flex items-center justify-center text-header-medium text-texticons-inverse-primary">
            +{more}
          </span>
        )}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-md inset-ring",
            selected ? "inset-ring-stroke-info" : "inset-ring-stroke-default"
          )}
        />
      </span>
      {onRemove && (
        <button
          type="button"
          aria-label="Remove image"
          onClick={onRemove}
          className="absolute -top-[5px] -right-[3px] inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-background-inverse text-texticons-inverse-primary opacity-0 outline-none group-hover/photo:opacity-100 group-focus-within/photo:opacity-100 focus-visible:opacity-100 focus-visible:shadow-focus pointer-coarse:opacity-100 [&_svg]:size-3"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  )
}

export { Photo }
