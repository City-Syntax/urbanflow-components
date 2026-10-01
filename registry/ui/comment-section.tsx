"use client"

import * as React from "react"
import { CheckIcon, CloseIcon, EllipsisHorizontalIcon, MessageIcon, SearchIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"
import { TextField } from "@/registry/ui/text-field"

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
      className={cn("flex items-center justify-between gap-4 bg-background-default px-6 py-4", className)}
      {...props}
    >
      <span className="text-label-xsmall text-texticons-emphasis">{title}</span>
      <span className="inline-flex gap-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton variant="tertiary" size="micro" label="Filter comments" selected={open || showResolved}>
              <EllipsisHorizontalIcon />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-50">
            <DropdownMenuItem
              trailing={showResolved ? <CheckIcon /> : undefined}
              onSelect={() => onShowResolvedChange?.(!showResolved)}
            >
              Show resolved comments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {onClose && (
          <IconButton variant="tertiary" size="micro" label="Close comments" onClick={onClose}>
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
      <div className="px-6 py-3 shadow-[inset_0_-1px_0_var(--color-stroke-subtle)]">
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
            "flex items-start gap-2 px-6 py-4 text-label-xsmall [&_svg]:size-5 [&_svg]:shrink-0",
            noMatch ? "text-neutral-30" : "text-texticons-primary"
          )}
        >
          <MessageIcon />
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
