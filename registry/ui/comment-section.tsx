"use client"

import * as React from "react"
import { CheckIcon, CloseIcon, EllipsisHorizontalCircleIcon, MessageIcon, SearchIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"
import { TextField } from "@/registry/ui/text-field"

const headerAction =
  "size-4 rounded-sm text-texticons-primary aria-pressed:bg-neutral-10 aria-pressed:text-texticons-primary not-disabled:active:bg-neutral-10 [&_svg:not([class*='size-'])]:size-4"

function CommentSection({
  title = "Comments",
  showResolved = false,
  onShowResolvedChange,
  onClose,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode
  showResolved?: boolean
  onShowResolvedChange?: (show: boolean) => void
  onClose?: () => void
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      data-slot="comment-section"
      className={cn("flex h-13.5 items-center justify-between gap-4 bg-background-default px-6", className)}
      {...props}
    >
      <span className="text-label-xsmall text-texticons-emphasis">{title}</span>
      <span className="inline-flex items-center gap-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton
              variant="tertiary"
              size="micro"
              label="Filter comments"
              selected={open || showResolved}
              className={headerAction}
            >
              <EllipsisHorizontalCircleIcon />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              trailing={showResolved ? <CheckIcon /> : <span className="size-4" />}
              onSelect={() => onShowResolvedChange?.(!showResolved)}
            >
              Show resolved comments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {onClose && (
          <IconButton variant="tertiary" size="micro" label="Close comments" onClick={onClose} className={headerAction}>
            <CloseIcon />
          </IconButton>
        )}
      </span>
    </div>
  )
}

function CommentSearch({
  value,
  onValueChange,
  noMatch = false,
  empty = true,
  className,
  children,
}: {
  value?: string
  onValueChange?: (value: string) => void
  noMatch?: boolean
  empty?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div data-slot="comment-search" className={cn("flex flex-col", className)}>
      <div className="px-4 py-2 shadow-[inset_0_-1px_0_var(--color-stroke-subtle)]">
        <TextField
          label="Search comments"
          labelPosition="hidden"
          placeholder="Search"
          prefix={<SearchIcon />}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
        />
      </div>
      {(noMatch || empty) && !children && (
        <div
          className={cn(
            "flex gap-2 px-6 py-4 text-label-xsmall [&_svg]:size-5 [&_svg]:shrink-0",
            noMatch ? "items-center text-neutral-30" : "items-start text-texticons-primary"
          )}
        >
          <MessageIcon className={cn(noMatch && "text-neutral-20")} />
          <span>
            {noMatch
              ? "No comments matched your search"
              : "Give feedback, ask a question, or just leave a note for yourself. Click anywhere in the canvas to leave a comment."}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

export { CommentSection, CommentSearch }
