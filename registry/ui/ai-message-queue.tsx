"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, PencilIcon, SendIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import { fieldBox, fieldInput } from "@/registry/ui/field"
import { IconButton } from "@/registry/ui/icon-button"

type AIQueuedMessage = { id: string; text: string; editable?: boolean }

const move = (ids: string[], from: number, to: number) => {
  const next = [...ids]
  next.splice(to, 0, ...next.splice(from, 1))
  return next
}

const actionClass =
  "text-texticons-placeholder hover:text-texticons-secondary opacity-0 group-hover/item:opacity-100 group-focus-within/item:opacity-100 pointer-coarse:opacity-100"

function AIMessageQueueEditor({
  text,
  onDone,
}: {
  text: string
  onDone: (text: string | null) => void
}) {
  const [value, setValue] = React.useState(text)
  const settled = React.useRef(false)
  const finish = (next: string | null) => {
    if (settled.current) return
    settled.current = true
    onDone(next)
  }
  return (
    <div className={cn(fieldBox, "h-auto min-h-7 min-w-0 flex-1 items-start py-1 pl-2")}>
      <textarea
        aria-label="Edit queued message"
        autoFocus
        rows={1}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onBlur={() => finish(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            finish(value)
          }
          if (e.key === "Escape") {
            e.preventDefault()
            finish(null)
          }
        }}
        className={cn(fieldInput, "field-sizing-content max-h-32 resize-none text-paragraph-xsmall")}
      />
    </div>
  )
}

function AIMessageQueue({
  items,
  note,
  onEdit,
  onReorder,
  onRemove,
  onSendNow,
  onEditingChange,
  defaultOpen = true,
  ref,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  items: AIQueuedMessage[]
  note?: React.ReactNode
  onEdit?: (id: string, text: string) => void
  onReorder?: (ids: string[]) => void
  onRemove?: (id: string) => void
  onSendNow?: (id: string) => void
  onEditingChange?: ((id: string | null) => void) | undefined
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [editing, setEditingState] = React.useState<string | null>(null)
  const setEditing = (id: string | null) => {
    setEditingState(id)
    onEditingChange?.(id)
  }
  const root = React.useRef<HTMLDivElement>(null)
  const refocus = React.useRef<{ id?: string; label: string } | null>(null)
  React.useLayoutEffect(() => {
    const pending = refocus.current
    refocus.current = null
    if (!pending || document.activeElement !== document.body) return
    const { id, label } = pending
    const target = id
      ? root.current?.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"] [aria-label="${label}"]`)
      : root.current?.querySelector<HTMLElement>("[data-slot=collapsible-trigger]")
    target?.focus()
  })
  if (items.length === 0) return null
  const setRef = (el: HTMLDivElement | null) => {
    root.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }
  const leave = (index: number, label: string) => {
    const id = items[index + 1]?.id ?? items[index - 1]?.id
    refocus.current = id ? { id, label } : { label }
  }
  const ids = items.map((item) => item.id)
  return (
    <Collapsible
      ref={setRef}
      data-slot="ai-message-queue"
      defaultOpen={defaultOpen}
      className={cn("w-full rounded-lg bg-background-default px-2 py-1.5 inset-ring inset-ring-stroke-subtle", className)}
      {...props}
    >
      <CollapsibleTrigger className="group/trigger flex w-full items-center gap-1.5 px-1 py-0.5 text-left text-paragraph-xsmall text-texticons-secondary">
        <span className="min-w-0 flex-1">
          <span className="text-label-xsmall text-texticons-emphasis">{items.length} queued</span>
          {note != null && <span> · {note}</span>}
        </span>
        <ChevronDownIcon
          aria-hidden
          className="size-3.5 shrink-0 text-texticons-placeholder transition-transform group-data-[state=open]/trigger:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ol aria-label="Queued messages" className="flex flex-col pt-1">
          {items.map((item, index) => {
            const editable = onEdit != null && item.editable !== false
            return (
              <li
                key={item.id}
                data-id={item.id}
                data-slot="ai-message-queue-item"
                className="group/item flex min-h-8 items-center gap-2 rounded-md px-1 py-0.5 hover:bg-background-light"
              >
                <span aria-hidden className="size-2 shrink-0 rounded-full inset-ring-[1.5px] inset-ring-stroke-strong" />
                {editing === item.id ? (
                  <AIMessageQueueEditor
                    text={item.text}
                    onDone={(text) => {
                      setEditing(null)
                      refocus.current = { id: item.id, label: "Edit" }
                      const trimmed = text === item.text ? null : text?.trim()
                      if (trimmed) onEdit?.(item.id, trimmed)
                    }}
                  />
                ) : (
                  <span className="line-clamp-2 min-w-0 flex-1 text-paragraph-xsmall break-words whitespace-pre-line text-texticons-primary">
                    {item.text}
                  </span>
                )}
                <span className="flex shrink-0 gap-0.5">
                  {onReorder && (
                    <>
                      <IconButton
                        variant="tertiary"
                        size="micro"
                        label="Move up"
                        aria-disabled={index === 0 || undefined}
                        className={cn(actionClass, "aria-disabled:cursor-not-allowed aria-disabled:text-neutral-20")}
                        onClick={() => {
                          if (!(index === 0)) onReorder(move(ids, index, index - 1))
                        }}
                      >
                        <ChevronUpIcon />
                      </IconButton>
                      <IconButton
                        variant="tertiary"
                        size="micro"
                        label="Move down"
                        aria-disabled={index === items.length - 1 || undefined}
                        className={cn(actionClass, "aria-disabled:cursor-not-allowed aria-disabled:text-neutral-20")}
                        onClick={() => {
                          if (!(index === items.length - 1)) onReorder(move(ids, index, index + 1))
                        }}
                      >
                        <ChevronDownIcon />
                      </IconButton>
                    </>
                  )}
                  {editable && editing !== item.id && (
                    <IconButton
                      variant="tertiary"
                      size="micro"
                      label="Edit"
                      className={actionClass}
                      onClick={() => setEditing(item.id)}
                    >
                      <PencilIcon />
                    </IconButton>
                  )}
                  {onSendNow && (
                    <IconButton
                      variant="tertiary"
                      size="micro"
                      label="Send now"
                      className={actionClass}
                      onClick={() => {
                        leave(index, "Send now")
                        onSendNow(item.id)
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  )}
                  {onRemove && (
                    <IconButton
                      variant="tertiary"
                      size="micro"
                      label="Remove"
                      className={actionClass}
                      onClick={() => {
                        leave(index, "Remove")
                        onRemove(item.id)
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </span>
              </li>
            )
          })}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { AIMessageQueue, type AIQueuedMessage }
