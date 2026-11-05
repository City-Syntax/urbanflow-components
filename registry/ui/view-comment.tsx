"use client"

import * as React from "react"
import { CheckIcon, CloseIcon, EllipsisHorizontalIcon, PhotoIcon, SendIcon, SmileIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { Avatar } from "@/registry/ui/avatar"
import { CommentPin } from "@/registry/ui/comment-pin"
import { EmojiPickerPopover } from "@/registry/ui/emoji-picker"
import { IconButton } from "@/registry/ui/icon-button"
import { Photo } from "@/registry/ui/photo"

const keepDraftForCallerToReport = () => undefined

const rowAction = "size-5 aria-expanded:bg-background-medium!"

type ViewCommentPerson = { name: string; src?: string | undefined; index?: number | undefined }

type CommentReactionChip = { emoji: string; count: number; reacted?: boolean | undefined; label?: string | undefined }

type CommentPhoto = { src: string; alt?: string | undefined }

type CommentMessage = {
  author: string
  src?: string | undefined
  index?: number | undefined
  time?: React.ReactNode
  body: React.ReactNode
  photos?: (string | CommentPhoto)[] | undefined
}

function ViewCommentMessage({
  author,
  src,
  index = 0,
  time,
  body,
  photos,
  onOpenPhoto,
  reactions,
  onToggleReaction,
  onReact,
  menu,
  menuLabel = "Comment options",
  editor,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  CommentMessage & {
    onOpenPhoto?: ((index: number) => void) | undefined
    reactions?: CommentReactionChip[] | undefined
    onToggleReaction?: ((emoji: string, reacted: boolean) => void) | undefined
    onReact?: ((emoji: string) => void) | undefined
    menu?: React.ReactNode
    menuLabel?: string
    editor?: React.ReactNode
  }) {
  const [picking, setPicking] = React.useState(false)
  const shown = (photos ?? []).slice(0, 3).map((photo) => (typeof photo === "string" ? { src: photo } : photo))
  const hidden = (photos?.length ?? 0) - shown.length
  return (
    <div data-slot="view-comment-message" className={cn("group/message flex items-start gap-3 px-2 py-3", className)} {...props}>
      <Avatar size="M" name={author} src={src} index={index} />
      {editor ? (
        <div className="min-w-0 flex-1">{editor}</div>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center justify-between gap-2">
                <strong className="truncate text-label-small text-texticons-emphasis">{author}</strong>
                {time != null && <span className="shrink-0 text-label-xsmall text-neutral-30">{time}</span>}
              </span>
              <div className="text-label-xsmall break-words text-texticons-primary">{body}</div>
            </div>
            {shown.length > 0 && (
              <div className="mt-1.5 flex gap-1">
                {shown.map((photo, i) => {
                  const more = i === 2 && hidden > 0 ? hidden : undefined
                  const tile = <Photo size="L" src={photo.src} alt={photo.alt} more={more} />
                  return onOpenPhoto ? (
                    <button
                      key={i}
                      type="button"
                      aria-label={more ? `View ${more + 1} more images` : `View ${photo.alt || "image"}`}
                      onClick={() => onOpenPhoto(i)}
                      className="cursor-pointer rounded-md outline-none focus-visible:shadow-focus"
                    >
                      {tile}
                    </button>
                  ) : (
                    <React.Fragment key={i}>{tile}</React.Fragment>
                  )
                })}
              </div>
            )}
            {reactions && reactions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {reactions.map((reaction) => (
                  <button
                    key={reaction.emoji}
                    type="button"
                    aria-pressed={reaction.reacted ?? false}
                    aria-label={reaction.label ?? `${reaction.emoji} ${reaction.count}`}
                    disabled={!onToggleReaction}
                    onClick={() => onToggleReaction?.(reaction.emoji, !reaction.reacted)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-sm bg-background-light px-2 py-1 text-label-xsmall text-texticons-primary outline-none hover:bg-background-medium hover:inset-ring hover:inset-ring-neutral-30 focus-visible:shadow-focus disabled:cursor-default disabled:hover:bg-background-light disabled:hover:inset-ring-0"
                  >
                    <span aria-hidden>{reaction.emoji}</span>
                    <span aria-hidden>{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex w-5 shrink-0 flex-col gap-1">
            {menu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton variant="tertiary" size="micro" label={menuLabel} className={rowAction}>
                    <EllipsisHorizontalIcon />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
              </DropdownMenu>
            ) : (
              onReact && <span className="size-5" />
            )}
            {onReact && (
              <EmojiPickerPopover open={picking} onOpenChange={setPicking} onEmojiSelect={onReact}>
                <IconButton
                  variant="tertiary"
                  size="micro"
                  label="React"
                  className={cn(
                    rowAction,
                    "opacity-0 group-focus-within/message:opacity-100 group-hover/message:opacity-100 aria-expanded:opacity-100"
                  )}
                >
                  <SmileIcon />
                </IconButton>
              </EmojiPickerPopover>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ViewComment({
  me,
  messages = [],
  reply,
  resolved = false,
  onReply,
  onResolve,
  onClose,
  onMore,
  moreMenu,
  onAttach,
  showPin = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  me: string | ViewCommentPerson
  messages?: CommentMessage[]
  reply?: React.ReactNode
  resolved?: boolean
  onReply?: (text: string) => Promise<void> | void
  onResolve?: () => void
  onClose?: () => void
  onMore?: () => void
  moreMenu?: React.ReactNode
  onAttach?: () => void
  showPin?: boolean
}) {
  const person = typeof me === "string" ? { name: me, index: 5 } : me
  const [draft, setDraft] = React.useState("")
  const [sending, setSending] = React.useState(false)
  const send = async () => {
    if (!onReply) return
    setSending(true)
    await Promise.resolve(onReply(draft)).then(() => setDraft(""), keepDraftForCallerToReport)
    setSending(false)
  }
  const moreButton = (
    <IconButton variant="tertiary" size="micro" label="More" onClick={onMore} className={rowAction}>
      <EllipsisHorizontalIcon />
    </IconButton>
  )
  const composer =
    reply ??
    (onReply && (
      <div className="flex flex-1 flex-col gap-1 rounded-lg border border-stroke-default bg-background-light px-3 py-2 focus-within:border-stroke-info focus-within:shadow-focus">
        <textarea
          rows={2}
          aria-label="Reply"
          placeholder="Add a comment"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="resize-none bg-transparent text-paragraph-small text-texticons-primary outline-none placeholder:text-texticons-placeholder"
        />
        <div className="flex justify-end gap-1">
          {onAttach && (
            <IconButton variant="tertiary" size="micro" label="Attach image" onClick={onAttach}>
              <PhotoIcon />
            </IconButton>
          )}
          <IconButton variant="primary" size="micro" label="Send" disabled={sending || !draft.trim()} onClick={() => void send()}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    ))
  return (
    <div data-slot="view-comment" className={cn("flex items-start gap-2", className)} {...props}>
      {showPin && (
        <span className="py-3">
          <CommentPin state="selected" users={[person.name]} index={person.index ?? 0} />
        </span>
      )}
      <div
        role="dialog"
        aria-label="Comment thread"
        className="flex max-h-[90vh] w-80 flex-col overflow-hidden rounded-lg border border-stroke-default bg-background-default shadow-sm"
      >
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-stroke-default px-3">
          <span className="flex-1 text-label-xsmall text-texticons-emphasis">Comment</span>
          <span className="inline-flex items-center gap-1">
            {moreMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>{moreButton}</DropdownMenuTrigger>
                <DropdownMenuContent align="end">{moreMenu}</DropdownMenuContent>
              </DropdownMenu>
            ) : (
              onMore && moreButton
            )}
            {onResolve && (
              <IconButton
                variant="tertiary"
                size="micro"
                label={resolved ? "Reopen" : "Resolve"}
                selected={resolved}
                onClick={onResolve}
                className={rowAction}
              >
                <span
                  className={cn(
                    "inline-flex size-4 items-center justify-center rounded-full [&>svg]:size-3",
                    resolved ? "bg-background-inverse text-texticons-inverse-primary" : "inset-ring-[1.5px] inset-ring-current"
                  )}
                >
                  <CheckIcon />
                </span>
              </IconButton>
            )}
            <IconButton variant="tertiary" size="micro" label="Close" onClick={onClose} className={rowAction}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {messages.map((m, i) => (
            <ViewCommentMessage key={i} {...m} index={m.index ?? i} />
          ))}
          {children}
        </div>
        {composer && (
          <div className="flex shrink-0 items-start gap-3 px-2 pb-3">
            <Avatar size="M" name={person.name} src={person.src} index={person.index ?? 0} />
            <div className="min-w-0 flex-1">{composer}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export { ViewComment, ViewCommentMessage, type CommentMessage, type CommentReactionChip, type ViewCommentPerson }
