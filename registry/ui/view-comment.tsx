"use client"

import * as React from "react"
import { CheckIcon, CloseIcon, EllipsisHorizontalIcon, PhotoIcon, SendIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"
import { CommentPin } from "@/registry/ui/comment-pin"
import { IconButton } from "@/registry/ui/icon-button"
import { Photo } from "@/registry/ui/photo"

type CommentMessage = { author: string; time?: React.ReactNode; body: React.ReactNode; photos?: string[]; index?: number }

function ViewComment({
  me,
  messages,
  onReply,
  onResolve,
  onClose,
  onMore,
  onAttach,
  showPin = true,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  me: string
  messages: CommentMessage[]
  onReply?: (text: string) => void
  onResolve?: () => void
  onClose?: () => void
  onMore?: () => void
  onAttach?: () => void
  showPin?: boolean
}) {
  const [draft, setDraft] = React.useState("")
  return (
    <div data-slot="view-comment" className={cn("flex items-start gap-2", className)} {...props}>
      {showPin && <CommentPin state="selected" users={[me]} index={5} />}
      <div role="dialog" aria-label="Comment thread" className="w-80 overflow-hidden rounded-lg bg-background-default shadow-lg">
        <div className="flex items-center justify-between py-2 pr-2 pl-4 text-label-small text-texticons-emphasis shadow-[inset_0_-1px_0_var(--color-stroke-subtle)]">
          <span>Comment</span>
          <span className="inline-flex gap-0.5">
            <IconButton variant="tertiary" size="micro" label="More" onClick={onMore}>
              <EllipsisHorizontalIcon />
            </IconButton>
            <IconButton variant="tertiary" size="micro" label="Resolve" onClick={onResolve}>
              <CheckIcon />
            </IconButton>
            <IconButton variant="tertiary" size="micro" label="Close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        {messages.map((m, i) => (
          <div key={i} className="flex gap-2 px-4 py-3">
            <Avatar size="M" name={m.author} index={m.index ?? i} />
            <div className="flex min-w-0 flex-col gap-0.5 text-paragraph-small text-texticons-primary">
              <span className="flex items-baseline gap-2">
                <strong className="font-semibold text-texticons-emphasis">{m.author}</strong>
                {m.time != null && <span className="text-paragraph-xsmall text-texticons-tertiary">{m.time}</span>}
              </span>
              <span>{m.body}</span>
              {m.photos && (
                <span className="mt-1 flex gap-1">
                  {m.photos.map((src, j) => (
                    <Photo key={j} src={src} />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="flex gap-2 px-4 py-3 shadow-[inset_0_1px_0_var(--color-stroke-subtle)]">
          <Avatar size="M" name={me} index={5} />
          <div className="flex flex-1 flex-col gap-1 rounded-md px-2 py-1.5 inset-ring inset-ring-stroke-default focus-within:inset-ring-stroke-info focus-within:shadow-focus">
            <textarea
              rows={2}
              aria-label="Reply"
              placeholder="Add a comment"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="resize-none bg-transparent text-paragraph-small text-texticons-primary outline-none placeholder:text-texticons-placeholder"
            />
            <div className="flex justify-end gap-1">
              <IconButton variant="tertiary" size="micro" label="Attach image" onClick={onAttach}>
                <PhotoIcon />
              </IconButton>
              <IconButton
                variant="primary"
                size="micro"
                label="Send"
                disabled={!draft.trim()}
                onClick={() => {
                  onReply?.(draft)
                  setDraft("")
                }}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ViewComment, type CommentMessage }
