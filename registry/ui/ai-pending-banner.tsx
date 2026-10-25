"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

function AIPendingBanner({
  count = 1,
  title = "Waiting for you",
  jumpLabel = "Show",
  onJump,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  count?: number
  title?: React.ReactNode
  jumpLabel?: React.ReactNode
  onJump: () => void
}) {
  const waiting = count > 0
  return (
    <>
      <span role="status" className="sr-only">
        {waiting && (
          <>
            {title}
            {children != null && <>: {children}</>}
            {count > 1 && <> ({count} waiting)</>}
          </>
        )}
      </span>
      {waiting && (
        <div
          data-slot="ai-pending-banner"
          className={cn(
            "sticky bottom-0 z-10 flex w-full items-center gap-2 rounded-lg bg-background-default py-1.5 pr-1.5 pl-3 shadow-sm inset-ring inset-ring-stroke-default",
            className
          )}
          {...props}
        >
          <span aria-hidden className="relative flex size-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-magic-primary opacity-60 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-magic-primary" />
          </span>
          <p className="flex min-w-0 flex-1 items-baseline gap-1.5 text-paragraph-xsmall text-texticons-secondary">
            <strong className="shrink-0 text-label-xsmall text-texticons-emphasis">{title}</strong>
            {children != null && <span className="min-w-0 truncate">{children}</span>}
          </p>
          {count > 1 && (
            <Badge shape="number">
              <span aria-hidden>{count}</span>
              <span className="sr-only">{count} waiting</span>
            </Badge>
          )}
          <Button type="button" variant="tertiary" size="micro" onClick={onJump}>
            {jumpLabel}
          </Button>
        </div>
      )}
    </>
  )
}

export { AIPendingBanner }
