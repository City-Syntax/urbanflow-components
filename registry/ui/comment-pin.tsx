import * as React from "react"
import { MessageIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Avatar, AvatarsStacked } from "@/registry/ui/avatar"

function CommentPin({
  state = "read",
  users = [],
  count,
  index = 1,
  label = "Comment",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  state?: "read" | "unread" | "selected" | "resolved" | "typing"
  users?: string[]
  count?: number
  index?: number
  label?: string
}) {
  const multi = users.length > 1
  const group = count != null
  return (
    <button
      type="button"
      data-slot="comment-pin"
      data-state={state}
      aria-label={label}
      className={cn(
        "relative inline-flex h-8 min-w-8 cursor-pointer items-center justify-center p-0.5 text-texticons-link-primary shadow-sm outline-none focus-visible:shadow-focus",
        group ? "rounded-full text-label-xsmall text-texticons-emphasis" : "rounded-[16px_16px_16px_2px]",
        multi && "w-auto",
        state === "selected" ? "bg-info-primary" : "bg-background-default",
        state === "selected" && group && "text-texticons-inverse-primary",
        state === "unread" && "inset-ring-[1.5px] inset-ring-stroke-info",
        state === "resolved" && "opacity-50",
        state === "typing" && "bg-transparent shadow-none [&>svg]:size-7",
        className
      )}
      {...props}
    >
      {state === "typing" ? (
        <MessageIcon />
      ) : group ? (
        <span className="px-2">{count}</span>
      ) : multi ? (
        <AvatarsStacked users={users} max={3} />
      ) : (
        <Avatar size="L" name={users[0]} index={index} />
      )}
    </button>
  )
}

export { CommentPin }
