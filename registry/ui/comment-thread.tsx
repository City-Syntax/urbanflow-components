import * as React from "react"
import { CheckIcon, EllipsisHorizontalIcon, RadioCheckedIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"

const act =
  "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-texticons-primary outline-none hover:bg-background-medium focus-visible:shadow-focus data-[state=open]:bg-background-medium group-aria-current/thread:hover:bg-info-xlight group-aria-current/thread:data-[state=open]:bg-info-xlight [&>svg]:size-5"

function CommentThreadMore({ className, onClick, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="More"
      className={cn(act, className)}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      {...props}
    >
      <EllipsisHorizontalIcon />
    </button>
  )
}

function ResolveIcon({ resolved }: { resolved: boolean }) {
  if (resolved) return <RadioCheckedIcon className="text-texticons-emphasis" />
  return (
    <span className="relative inline-flex size-5 items-center justify-center">
      <span className="size-4 rounded-full border border-current" />
      <CheckIcon className="absolute size-3" />
    </span>
  )
}

function CommentThread({
  author,
  authorIndex = 0,
  authorSrc,
  location,
  time,
  replies,
  unread = false,
  selected = false,
  resolved = false,
  onResolve,
  onMore,
  more,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  author: string
  authorIndex?: number
  authorSrc?: string
  location?: React.ReactNode
  time?: React.ReactNode
  replies?: React.ReactNode
  unread?: boolean
  selected?: boolean
  resolved?: boolean
  onResolve?: () => void
  onMore?: () => void
  more?: React.ReactNode
}) {
  const moreAction = more ?? (onMore && <CommentThreadMore onClick={onMore} />)
  return (
    <div
      data-slot="comment-thread"
      role="button"
      tabIndex={0}
      aria-current={selected || undefined}
      className={cn(
        "group/thread relative flex w-full cursor-pointer flex-col gap-1 bg-background-default px-6 py-4 text-left text-label-xsmall text-texticons-primary outline-none hover:bg-background-light focus-visible:shadow-[inset_0_0_0_2px_var(--color-info-primary)]",
        !unread && !selected && "opacity-60 hover:opacity-100 focus-visible:opacity-100 has-[[data-state=open]]:opacity-100",
        selected && "bg-background-info hover:bg-background-info",
        className
      )}
      {...props}
    >
      <span className="flex h-5 items-center gap-1">
        <Avatar size="XS" name={author} index={authorIndex} src={authorSrc} />
        <span className="min-w-0 flex-1 truncate text-neutral-30">{location}</span>
        {(moreAction || onResolve) && (
          <span
            className={cn(
              "hidden items-center gap-1 group-hover/thread:inline-flex group-has-[[data-state=open]]/thread:inline-flex",
              selected && "inline-flex"
            )}
          >
            {moreAction}
            {onResolve && (
              <button
                type="button"
                aria-label={resolved ? "Reopen" : "Resolve"}
                aria-pressed={resolved}
                className={act}
                onClick={(e) => {
                  e.stopPropagation()
                  onResolve()
                }}
              >
                <ResolveIcon resolved={resolved} />
              </button>
            )}
          </span>
        )}
        {unread && !selected && (
          <span
            role="status"
            aria-label="Unread"
            className="size-1.5 shrink-0 rounded-full bg-info-primary group-hover/thread:hidden group-has-[[data-state=open]]/thread:hidden"
          />
        )}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="flex items-baseline gap-1">
          <span className={cn("truncate", selected && "text-texticons-emphasis")}>{author}</span>
          {time != null && <span className="shrink-0 text-neutral-30">{time}</span>}
        </span>
        <span className={cn("break-words", selected && "text-texticons-emphasis")}>{children}</span>
      </span>
      {replies != null && <span className="text-neutral-30">{replies}</span>}
    </div>
  )
}

export { CommentThread, CommentThreadMore }
