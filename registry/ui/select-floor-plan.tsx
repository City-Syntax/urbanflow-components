import * as React from "react"
import { AddIcon, ChevronRightIcon, FilesIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function SelectFloorPlan({
  kind = "upload",
  title,
  meta,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "title"> & {
  kind?: "upload" | "existing"
  title?: React.ReactNode
  meta?: React.ReactNode
}) {
  const upload = kind === "upload"
  return (
    <button
      type="button"
      data-slot="select-floor-plan"
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-md bg-background-default px-4 py-3 text-left text-texticons-secondary outline-none hover:bg-background-light focus-visible:shadow-focus [&_svg]:size-5",
        upload && "inset-ring inset-ring-stroke-default",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex size-[38px] shrink-0 items-center justify-center",
          upload ? "rounded-lg bg-background-medium text-texticons-secondary" : "rounded-md bg-background-info text-info-primary"
        )}
      >
        {upload ? <AddIcon /> : <FilesIcon />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-label-small text-texticons-emphasis">{title ?? (upload ? "Upload a floor plan" : "")}</span>
        {!upload && meta != null && <span className="text-paragraph-xsmall text-neutral-30">{meta}</span>}
      </span>
      {!upload && <ChevronRightIcon />}
    </button>
  )
}

export { SelectFloorPlan }
