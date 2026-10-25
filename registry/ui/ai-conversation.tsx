"use client"

import * as React from "react"
import { ChevronDownIcon } from "@urbanflow/icons"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"

import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function AIConversation({ className, ...props }: React.ComponentProps<typeof StickToBottom>) {
  return (
    <StickToBottom
      data-slot="ai-conversation"
      initial="smooth"
      resize="smooth"
      className={cn("relative flex-1 overflow-y-hidden", className)}
      {...props}
    />
  )
}

function useFollowOnResize() {
  const { scrollRef, state, scrollToBottom } = useStickToBottomContext()
  React.useEffect(() => {
    const box = scrollRef.current
    if (!box || typeof ResizeObserver === "undefined") return
    let previous: number | undefined
    const observer = new ResizeObserver(([entry]) => {
      const height = entry?.contentRect.height ?? 0
      const difference = height - (previous ?? height)
      previous = height
      if (difference === 0 || state.escapedFromLock) return
      state.resizeDifference = difference
      void scrollToBottom("instant")
      requestAnimationFrame(() =>
        setTimeout(() => {
          if (state.resizeDifference === difference) state.resizeDifference = 0
        }, 1)
      )
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [scrollRef, state, scrollToBottom])
}

function AIConversationContent({
  className,
  scrollClassName,
  ...props
}: React.ComponentProps<typeof StickToBottom.Content>) {
  useFollowOnResize()
  return (
    <StickToBottom.Content
      data-slot="ai-conversation-content"
      role="log"
      className={cn("flex flex-col gap-4 p-3", className)}
      scrollClassName={cn("[scrollbar-gutter:stable]!", scrollClassName)}
      {...props}
    />
  )
}

function AIConversationScrollButton({
  className,
  label = "Scroll to latest",
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "label" | "onClick"> & { label?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()
  if (isAtBottom) return null
  return (
    <IconButton
      data-slot="ai-conversation-scroll-button"
      label={label}
      className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 text-texticons-placeholder shadow-sm inset-ring-0", className)}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ChevronDownIcon />
    </IconButton>
  )
}

export { AIConversation, AIConversationContent, AIConversationScrollButton }
