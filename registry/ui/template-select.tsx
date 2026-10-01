import * as React from "react"
import { BlueprintIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Thumbnail } from "@/registry/ui/thumbnail"

function TemplateSelect({
  label,
  src,
  preview,
  selected = false,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  label: React.ReactNode
  src?: string
  preview?: React.ReactNode
  selected?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="template-select"
      aria-pressed={selected}
      className={cn(
        "inline-flex w-29 cursor-pointer flex-col items-center gap-2 rounded-md bg-background-default p-2 outline-none hover:bg-background-light hover:inset-ring hover:inset-ring-background-inverse active:bg-info-xxxlight active:inset-ring active:inset-ring-background-inverse focus-visible:shadow-focus",
        selected && "bg-info-xxxlight inset-ring inset-ring-background-inverse hover:bg-info-xxxlight",
        className
      )}
      {...props}
    >
      {preview ?? <Thumbnail size="large" src={src} icon={<BlueprintIcon />} />}
      <span className="text-center text-label-xsmall text-texticons-emphasis">{label}</span>
    </button>
  )
}

export { TemplateSelect }
