import * as React from "react"
import { CheckIcon, EllipsisHorizontalIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"

const act =
  "inline-flex size-5 cursor-pointer items-center justify-center rounded-full text-texticons-primary outline-none focus-visible:shadow-focus [&_svg]:size-4"

function CommentThread({
  author,
  authorIndex = 0,
  location,
  time,
  replies,
  unread = false,
  selected = false,
  resolved = false,
  onResolve,
  onMore,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  author: string
  authorIndex?: number
  location?: React.ReactNode
  time?: React.ReactNode
  replies?: React.ReactNode
  unread?: boolean
  selected?: boolean
  resolved?: boolean
  onResolve?: () => void
  onMore?: () => void
}) {
  const fade = !unread && !selected && "opacity-60 group-hover/thread:opacity-100"
  return (
    <div
      data-slot="comment-thread"
      role="button"
      tabIndex={0}
      aria-current={selected || undefined}
      className={cn(
        "group/thread relative flex w-full cursor-pointer flex-col gap-1 bg-background-default px-6 py-4 text-left text-label-xsmall text-texticons-primary outline-none hover:bg-background-light focus-visible:shadow-[inset_0_0_0_2px_var(--color-info-primary)]",
        selected && "bg-background-light",
        className
      )}
      {...props}
    >
      <span className={cn("flex min-h-5 items-center gap-1 text-neutral-30", fade)}>
        <Avatar size="XS" name={author} index={authorIndex} />
        <span className="min-w-0 flex-1 truncate">{location}</span>
        <span className={cn("hidden gap-1 group-hover/thread:inline-flex", (selected || resolved) && "inline-flex")}>
          <button
            type="button"
            aria-label="More"
            className={act}
            onClick={(e) => {
              e.stopPropagation()
              onMore?.()
            }}
          >
            <EllipsisHorizontalIcon />
          </button>
          <button
            type="button"
            aria-label={resolved ? "Reopen" : "Resolve"}
            aria-pressed={resolved}
            className={cn(act, resolved && "bg-background-inverse text-texticons-inverse-primary")}
            onClick={(e) => {
              e.stopPropagation()
              onResolve?.()
            }}
          >
            <CheckIcon />
          </button>
        </span>
        {unread && (
          <span aria-label="Unread" className="size-1.5 shrink-0 rounded-full bg-info-primary group-hover/thread:hidden" />
        )}
      </span>
      <span className={cn("flex items-baseline gap-1", fade)}>
        <span className={cn("text-texticons-primary group-hover/thread:text-texticons-emphasis", selected && "text-texticons-emphasis")}>
          {author}
        </span>
        {time != null && <span className="text-neutral-30">{time}</span>}
      </span>
      <span
        className={cn(
          "group-hover/thread:text-texticons-emphasis",
          unread ? "text-texticons-primary" : "text-texticons-secondary",
          selected && "text-texticons-emphasis",
          fade
        )}
      >
        {children}
      </span>
      {replies != null && <span className={cn("text-neutral-30", fade)}>{replies}</span>}
    </div>
  )
}

export { CommentThread }
