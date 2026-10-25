"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { AddIcon, AiIcon, ChevronDownIcon, CloseIcon, LayoutIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/ui/action-list"
import { AIChatsMenu, aiChatTitle, type AIChat, type AIChatsMenuOptions } from "@/registry/ui/ai-chats-menu"
import { IconButton } from "@/registry/ui/icon-button"

type AIChatShowAsOption = { value: string; label: string; icon?: React.ReactNode }

type AIChatShowAs = {
  value: string
  options: AIChatShowAsOption[]
  onValueChange: (value: string) => void
  label?: string | undefined
}

const titleClass = "min-w-0 truncate text-label-small text-texticons-emphasis"

function AIChatHeader({
  title,
  chats,
  onNewChat,
  showAs,
  onClose,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title?: string | null | undefined
  chats?: AIChatsMenuOptions | undefined
  onNewChat?: (() => void) | undefined
  showAs?: AIChatShowAs | undefined
  onClose?: (() => void) | undefined
}) {
  const [open, setOpen] = React.useState(false)
  const pending = React.useRef<(() => void) | null>(null)
  const name = aiChatTitle({ title })
  const after = (run: () => void) => {
    pending.current = run
    setOpen(false)
  }
  const mark = <AiIcon aria-hidden className="size-4 shrink-0 text-texticons-emphasis @max-[15rem]/ai-chat-header:hidden" />
  const newChat = chats?.onNewChat ?? onNewChat
  const showAsLabel = showAs?.label ?? "Show as"
  return (
    <div
      data-slot="ai-chat-header"
      className={cn("@container/ai-chat-header flex h-7 w-full min-w-0 items-center gap-1", className)}
      {...props}
    >
      {chats ? (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger
            data-slot="ai-chat-header-title"
            aria-label={`Chats: ${name}`}
            className="flex min-w-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 outline-none hover:bg-background-light focus-visible:shadow-focus data-[state=open]:bg-background-light"
          >
            {mark}
            <span className={titleClass}>{name}</span>
            <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-texticons-placeholder" />
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              aria-label="Chats"
              align="start"
              sideOffset={4}
              collisionPadding={8}
              className="z-50 outline-none"
              onCloseAutoFocus={(event) => {
                const run = pending.current
                pending.current = null
                if (!run) return
                const before = document.activeElement
                run()
                if (document.activeElement !== before) event.preventDefault()
              }}
            >
              <AIChatsMenu
                {...chats}
                onSelect={chats.onSelect && ((id: string) => after(() => chats.onSelect?.(id)))}
                onNewChat={newChat && (() => after(newChat))}
                onRename={chats.onRename && ((chat: AIChat) => after(() => chats.onRename?.(chat)))}
                onDelete={chats.onDelete && ((chat: AIChat) => after(() => chats.onDelete?.(chat)))}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      ) : (
        <div data-slot="ai-chat-header-title" className="flex min-w-0 items-center gap-1.5 px-2 py-1">
          {mark}
          <span className={titleClass}>{name}</span>
        </div>
      )}
      <div className="flex-1" />
      <div data-slot="ai-chat-header-actions" className="flex shrink-0 items-center gap-0.5">
        {onNewChat && (
          <IconButton type="button" variant="tertiary" label="New chat" onClick={onNewChat}>
            <AddIcon className="size-4" />
          </IconButton>
        )}
        {showAs && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton type="button" variant="tertiary" label={showAsLabel} className="data-[state=open]:bg-background-light">
                <LayoutIcon />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-50">
              <DropdownMenuLabel className="px-1.5 text-texticons-primary">{showAsLabel}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={showAs.value} onValueChange={showAs.onValueChange}>
                {showAs.options.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value} icon={option.icon}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {onClose && (
          <IconButton type="button" variant="tertiary" label="Close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export { AIChatHeader, type AIChatShowAs, type AIChatShowAsOption }
