import * as React from "react"
import { FilesIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"

function FileRow({
  name,
  type,
  category,
  size,
  owner,
  ownerIndex = 5,
  date,
  actions,
  selected = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: React.ReactNode
  type?: React.ReactNode
  category?: React.ReactNode
  size?: React.ReactNode
  owner?: string
  ownerIndex?: number
  date?: React.ReactNode
  actions?: React.ReactNode
  selected?: boolean
}) {
  return (
    <div
      data-slot="file-row"
      role="row"
      tabIndex={0}
      aria-selected={selected}
      className={cn(
        "group/file grid min-h-[62px] cursor-pointer grid-cols-[minmax(180px,330px)_130px_72px_minmax(120px,190px)_minmax(238px,1fr)] items-center gap-4 rounded-md bg-background-default px-4 py-3 text-paragraph-xsmall text-texticons-primary outline-none hover:bg-background-light focus-visible:shadow-focus",
        selected && "inset-ring inset-ring-stroke-info",
        className
      )}
      {...props}
    >
      <span role="cell" className="flex min-w-0 items-center gap-3">
        <span className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-md bg-background-info text-info-primary [&_svg]:size-5">
          <FilesIcon />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-label-small text-texticons-emphasis">{name}</span>
          {type != null && <span className="text-paragraph-xsmall text-neutral-30">{type}</span>}
        </span>
      </span>
      <span role="cell">{category}</span>
      <span role="cell">{size}</span>
      <span role="cell" className="flex items-center gap-2 font-semibold">
        {owner && (
          <>
            <Avatar size="M" name={owner} index={ownerIndex} />
            <span>{owner}</span>
          </>
        )}
      </span>
      <span role="cell" className="flex items-center">
        <span className="text-paragraph-small group-hover/file:hidden group-focus-within/file:hidden">{date}</span>
        {actions && (
          <span className="hidden items-center gap-2 group-hover/file:inline-flex group-focus-within/file:inline-flex">
            {actions}
          </span>
        )}
      </span>
    </div>
  )
}

export { FileRow }
