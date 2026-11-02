import * as React from "react"
import { MessageIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function CommentIconButton({
  selected = false,
  unread = false,
  label = "Comments",
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  selected?: boolean
  unread?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      data-slot="comment-icon-button"
      aria-label={unread ? `${label}, unread` : label}
      aria-pressed={selected}
      className={cn(
        "relative inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 outline-none focus-visible:shadow-focus [&_svg]:size-5",
        selected
          ? "bg-background-inverse text-texticons-inverse-primary"
          : "bg-background-default text-neutral-90 hover:bg-background-light",
        className
      )}
      {...props}
    >
      <MessageIcon />
      {unread && (
        <span
          data-slot="comment-icon-button-dot"
          className="absolute top-1.5 left-4.5 size-2 rounded-full border border-neutral-0 bg-critical-heavy"
        />
      )}
    </button>
  )
}

export { CommentIconButton }
