"use client"

import * as React from "react"
import { AddIcon, CheckIcon, EllipsisHorizontalIcon, MessageIcon, PencilIcon, SearchIcon, TrashIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { fieldBox, fieldInput } from "@/registry/ui/field"

type AIChat = { id: string; title?: string | null | undefined; updatedAt: Date | string | number }

type AIChatBucket = "today" | "week" | "older"

type AIChatGroup = { bucket: AIChatBucket; chats: AIChat[] }

type AIChatsMenuOptions = {
  chats: AIChat[]
  currentId?: string | null | undefined
  onSelect?: ((id: string) => void) | undefined
  onNewChat?: (() => void) | undefined
  onRename?: ((chat: AIChat) => void) | undefined
  onDelete?: ((chat: AIChat) => void) | undefined
  now?: Date | undefined
  labels?: Partial<Record<AIChatBucket, string>> | undefined
  searchPlaceholder?: string | undefined
  noResultsHint?: React.ReactNode
  defaultQuery?: string | undefined
}

const bucketLabels: Record<AIChatBucket, string> = { today: "Today", week: "Previous 7 days", older: "Older" }

const buckets = Object.keys(bucketLabels) as AIChatBucket[]

const aiChatTitle = (chat: Pick<AIChat, "title">) => chat.title?.trim() || "New chat"

const time = (chat: AIChat) => {
  const t = new Date(chat.updatedAt).getTime()
  return Number.isNaN(t) ? -Infinity : t
}

const byActivity = (chats: AIChat[]) => [...chats].sort((a, b) => time(b) - time(a))

function aiChatBucket(chat: AIChat, now: Date = new Date()): AIChatBucket {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  const t = time(chat)
  if (t >= today.getTime()) return "today"
  if (t >= week.getTime()) return "week"
  return "older"
}

function groupAIChats(chats: AIChat[], now: Date = new Date()): AIChatGroup[] {
  const sorted = byActivity(chats)
  return buckets
    .map((bucket) => ({ bucket, chats: sorted.filter((chat) => aiChatBucket(chat, now) === bucket) }))
    .filter((group) => group.chats.length > 0)
}

const rowClass =
  "flex h-7 w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md p-1.5 text-left text-paragraph-xsmall text-texticons-primary outline-none select-none hover:bg-background-light focus-visible:shadow-focus active:bg-background-medium aria-[current=true]:bg-background-medium [&_svg]:size-4 [&_svg]:shrink-0"

const sectionClass = "px-1.5 pt-1.5 pb-1 text-label-xsmall text-texticons-primary"

function ChatRow({
  chat,
  current,
  tabbable,
  onFocus,
  onSelect,
  onRename,
  onDelete,
}: {
  chat: AIChat
  current: boolean
  tabbable: boolean
  onFocus: () => void
  onSelect?: ((id: string) => void) | undefined
  onRename?: ((chat: AIChat) => void) | undefined
  onDelete?: ((chat: AIChat) => void) | undefined
}) {
  const chose = React.useRef(false)
  const title = aiChatTitle(chat)
  const actions = onRename != null || onDelete != null
  return (
    <div data-slot="ai-chats-menu-item" data-id={chat.id} className="group/row relative" onFocus={onFocus}>
      <button
        type="button"
        data-slot="ai-chats-menu-row"
        tabIndex={tabbable ? 0 : -1}
        aria-current={current || undefined}
        title={title}
        className={cn(rowClass, "group-has-[[data-state=open]]/row:bg-background-light")}
        onClick={() => onSelect?.(chat.id)}
      >
        <MessageIcon className="text-texticons-secondary" />
        <span className="min-w-0 flex-1 truncate">{title}</span>
        {(current || actions) && (
          <CheckIcon
            aria-hidden
            className={cn(
              "text-texticons-placeholder",
              !current && "invisible",
              actions && "group-focus-within/row:invisible group-hover/row:invisible pointer-coarse:invisible"
            )}
          />
        )}
      </button>
      {actions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-slot="ai-chats-menu-more"
              tabIndex={tabbable ? 0 : -1}
              aria-label={`More actions for ${title}`}
              title="More actions"
              className="absolute top-1/2 right-1 inline-flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-texticons-secondary opacity-0 outline-none group-focus-within/row:opacity-100 group-hover/row:opacity-100 hover:bg-background-medium focus-visible:opacity-100 focus-visible:shadow-focus data-[state=open]:opacity-100 pointer-coarse:opacity-100 [&_svg]:size-4"
            >
              <EllipsisHorizontalIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            sideOffset={8}
            alignOffset={-6}
            className="min-w-0"
            onCloseAutoFocus={(event) => {
              if (chose.current) event.preventDefault()
              chose.current = false
            }}
          >
            {onRename && (
              <DropdownMenuItem
                icon={<PencilIcon />}
                onSelect={() => {
                  chose.current = true
                  onRename(chat)
                }}
              >
                Rename
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                destructive
                icon={<TrashIcon className="text-texticons-secondary" />}
                onSelect={() => {
                  chose.current = true
                  onDelete(chat)
                }}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

function NewChatRow({ tabbable, onNewChat }: { tabbable: boolean; onNewChat: () => void }) {
  return (
    <div data-slot="ai-chats-menu-item">
      <button
        type="button"
        data-slot="ai-chats-menu-row"
        tabIndex={tabbable ? 0 : -1}
        className={rowClass}
        onClick={onNewChat}
      >
        <AddIcon className="text-texticons-secondary" />
        <span className="min-w-0 flex-1 truncate">New chat</span>
      </button>
    </div>
  )
}

function Note({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div data-slot="ai-chats-menu-note" className="flex flex-col gap-0.5 px-1.5 py-2 text-paragraph-xsmall">
      <p className="text-label-xsmall text-texticons-primary">{title}</p>
      {children != null && <p className="text-texticons-secondary">{children}</p>}
    </div>
  )
}

function AIChatsMenu({
  chats,
  currentId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  now,
  labels,
  searchPlaceholder = "Search chats",
  noResultsHint = "Search looks at chat titles in this project.",
  defaultQuery = "",
  className,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & AIChatsMenuOptions) {
  const [query, setQuery] = React.useState(defaultQuery)
  const [focused, setFocused] = React.useState<string | null>(null)
  const root = React.useRef<HTMLDivElement>(null)
  const search = React.useRef<HTMLInputElement>(null)
  const headingId = React.useId()
  const needle = query.trim().toLocaleLowerCase()
  const results = needle ? byActivity(chats.filter((chat) => aiChatTitle(chat).toLocaleLowerCase().includes(needle))) : []
  const groups: { id: string; label: string; chats: AIChat[] }[] = needle
    ? results.length > 0
      ? [{ id: "results", label: `${results.length} ${results.length === 1 ? "result" : "results"}`, chats: results }]
      : []
    : groupAIChats(chats, now ?? new Date()).map((group) => ({
        id: group.bucket,
        label: labels?.[group.bucket] ?? bucketLabels[group.bucket],
        chats: group.chats,
      }))
  const shown = groups.flatMap((group) => group.chats)
  const anchor = shown.find((chat) => chat.id === focused) ?? shown.find((chat) => chat.id === currentId) ?? shown[0]
  const status = needle ? (results.length > 0 ? groups[0]?.label : `No chats match “${query.trim()}”`) : ""

  const move = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (event.defaultPrevented || !root.current?.contains(target)) return
    const rows = Array.from(root.current.querySelectorAll<HTMLElement>("[data-slot=ai-chats-menu-row]"))
    const item = target.closest<HTMLElement>("[data-slot=ai-chats-menu-item]")
    const row = item?.querySelector<HTMLElement>("[data-slot=ai-chats-menu-row]") ?? null
    const index = row ? rows.indexOf(row) : -1
    const onSearch = target === search.current
    const go = (el: HTMLElement | null | undefined) => {
      if (!el) return
      event.preventDefault()
      el.focus()
    }
    if (event.key === "ArrowDown") go(onSearch ? rows[0] : rows[index + 1])
    else if (event.key === "ArrowUp") go(index <= 0 ? search.current : rows[index - 1])
    else if (event.key === "Home" && !onSearch) go(rows[0])
    else if (event.key === "End" && !onSearch) go(rows[rows.length - 1])
    else if (event.key === "ArrowRight" && target === row) go(item?.querySelector<HTMLElement>("[data-slot=ai-chats-menu-more]"))
    else if (event.key === "ArrowLeft" && row && target !== row) go(row)
    else if (event.key === "Enter" && onSearch && rows[0]) {
      event.preventDefault()
      rows[0].click()
    } else if (!onSearch && search.current && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== " ")
      search.current.focus()
  }

  const rowProps = (chat: AIChat) => ({
    chat,
    current: chat.id === currentId,
    tabbable: chat.id === anchor?.id,
    onFocus: () => setFocused(chat.id),
    onSelect,
    onRename,
    onDelete,
  })

  return (
    <div
      ref={root}
      data-slot="ai-chats-menu"
      className={cn(
        "flex w-72 max-w-full flex-col gap-0.5 rounded-md bg-background-default p-1.5 text-texticons-primary shadow-md inset-ring inset-ring-stroke-subtle",
        className
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        move(event)
      }}
      {...props}
    >
      {chats.length > 0 && (
        <div className="pb-1">
          <div className={fieldBox}>
            <SearchIcon size={20} className="shrink-0 text-texticons-placeholder" />
            <input
              ref={search}
              type="search"
              data-slot="ai-chats-menu-search"
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              className={cn(fieldInput, "[&::-webkit-search-cancel-button]:hidden")}
            />
          </div>
        </div>
      )}
      <div role="status" className="sr-only">
        {status}
      </div>
      <div data-slot="ai-chats-menu-list" className="-m-1.5 flex max-h-80 flex-col gap-0.5 overflow-y-auto p-1.5">
        {groups.map((group) => (
          <div key={group.id} role="group" aria-labelledby={`${headingId}-${group.id}`} className="flex flex-col gap-0.5">
            <div id={`${headingId}-${group.id}`} className={sectionClass}>
              {group.label}
            </div>
            {group.chats.map((chat) => (
              <ChatRow key={chat.id} {...rowProps(chat)} />
            ))}
          </div>
        ))}
        {chats.length === 0 && <Note title="No chats yet">Chats you start in this project show here.</Note>}
        {needle && results.length === 0 && <Note title={`No chats match “${query.trim()}”`}>{noResultsHint}</Note>}
        {onNewChat && shown.length === 0 && <NewChatRow tabbable onNewChat={onNewChat} />}
      </div>
    </div>
  )
}

export {
  AIChatsMenu,
  aiChatBucket,
  aiChatTitle,
  groupAIChats,
  type AIChat,
  type AIChatBucket,
  type AIChatGroup,
  type AIChatsMenuOptions,
}
