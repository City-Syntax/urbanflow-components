import * as React from "react"
import { EllipsisHorizontalIcon, MassingIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Thumbnail } from "@/registry/ui/thumbnail"

type Metric = { label: React.ReactNode; value: React.ReactNode; unit?: React.ReactNode }

function OutputSelect({
  title,
  meta,
  thumbnail,
  badges,
  metrics,
  selected = false,
  bordered = false,
  onMore,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  meta?: React.ReactNode
  thumbnail?: string
  badges?: React.ReactNode
  metrics?: Metric[]
  selected?: boolean
  bordered?: boolean
  onMore?: () => void
}) {
  return (
    <div
      data-slot="output-select"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && props.onClick) {
          e.preventDefault()
          e.currentTarget.click()
        }
      }}
      className={cn(
        "group/output flex w-62 cursor-pointer flex-col gap-2 rounded-md bg-background-default p-4 text-left outline-none hover:bg-background-light hover:inset-ring hover:inset-ring-background-inverse focus-visible:shadow-focus",
        bordered && "inset-ring inset-ring-stroke-default",
        selected && "bg-info-xxxlight inset-ring inset-ring-background-inverse hover:bg-info-xxxlight",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        <Thumbnail size="small" src={thumbnail} icon={<MassingIcon />} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-label-small text-texticons-emphasis">{title}</span>
          {meta != null && <span className="text-paragraph-xsmall text-texticons-primary">{meta}</span>}
        </span>
        {onMore && (
          <button
            type="button"
            aria-label="More"
            onClick={(e) => {
              e.stopPropagation()
              onMore()
            }}
            className="hidden cursor-pointer text-texticons-secondary outline-none group-hover/output:inline-flex group-focus-within/output:inline-flex focus-visible:shadow-focus [&_svg]:size-5"
          >
            <EllipsisHorizontalIcon />
          </button>
        )}
      </span>
      {badges && <span className="flex flex-wrap gap-2">{badges}</span>}
      {metrics && (
        <span className="flex flex-col gap-1">
          {metrics.map((m, i) => (
            <span key={i} className="flex justify-between gap-1.5 text-paragraph-xsmall text-texticons-primary">
              <span>{m.label}</span>
              <span className="inline-flex gap-1">
                <b className="font-semibold">{m.value}</b>
                {m.unit != null && <span className="text-texticons-tertiary">{m.unit}</span>}
              </span>
            </span>
          ))}
        </span>
      )}
    </div>
  )
}

export { OutputSelect, type Metric }
