"use client"

import * as React from "react"
import {
  AnalyticsIcon,
  ArrowsMinimizeIcon,
  CoinIcon,
  FloorIcon,
  GlobeIcon,
  LayoutIcon,
  MassingIcon,
  UploadIcon,
} from "@urbanflow/icons"

import { AIChatHeader, type AIChatShowAs } from "@/registry/ui/ai-chat-header"
import { AIChatsMenu, type AIChat } from "@/registry/ui/ai-chats-menu"
import { AIDeleteChatDialog } from "@/registry/ui/ai-delete-chat-dialog"
import { AIEmptyState, type AISuggestion } from "@/registry/ui/ai-empty-state"
import { AIRenameChatDialog } from "@/registry/ui/ai-rename-chat-dialog"
import { Button } from "@/registry/ui/button"

const fixedNow = new Date(2026, 9, 26, 10, 0)
const at = (day: number, hour = 12, minute = 0) => new Date(2026, 9, day, hour, minute).toISOString()

const figmaChats: AIChat[] = [
  { id: "floor-3", title: "Floor 3 cost check", updatedAt: at(26, 9, 40) },
  { id: "massing", title: "Massing review", updatedAt: at(26, 8) },
  { id: "costflow", title: "Costflow assumptions", updatedAt: at(24) },
  { id: "proposal", title: "Proposal comments", updatedAt: at(22) },
  { id: "green-mark", title: "Green Mark target gaps", updatedAt: at(20) },
]

const manyChats: AIChat[] = [
  ...figmaChats,
  { id: "untitled", title: null, updatedAt: at(26, 9, 55) },
  { id: "plates", title: "Floor plate options", updatedAt: at(19, 0, 5) },
  { id: "zone-2", title: "Zone 2 occupancy against the office density in the brief", updatedAt: at(18, 23, 55) },
  { id: "facade", title: "Façade options for the east elevation", updatedAt: new Date(2026, 8, 30).getTime() },
  { id: "carbon", title: "Embodied carbon by floor", updatedAt: new Date(2026, 5, 2).getTime() },
]

const boundaryNow = new Date(2026, 9, 26, 0, 30)
const boundaryChats: AIChat[] = [
  { id: "just-after-midnight", title: "Just after midnight", updatedAt: new Date(2026, 9, 26, 0, 10) },
  { id: "just-before-midnight", title: "Just before midnight", updatedAt: new Date(2026, 9, 25, 23, 50) },
  { id: "seven-days", title: "Seven days ago, first minute", updatedAt: new Date(2026, 9, 19, 0, 1) },
  { id: "eight-days", title: "Eight days ago, last minute", updatedAt: new Date(2026, 9, 18, 23, 59) },
]

const coreSuggestions: AISuggestion[] = [
  { id: "cost", label: "Explain the cost breakdown", icon: <CoinIcon /> },
  { id: "floor", label: "Summarise this floor", icon: <FloorIcon /> },
  { id: "green-mark", label: "Check against Green Mark target", icon: <AnalyticsIcon /> },
  { id: "massing", label: "Compare massing options", icon: <MassingIcon /> },
]

const fluxSuggestions: AISuggestion[] = [
  { id: "office", label: "Model a 6-storey office" },
  { id: "eui", label: "What drives the EUI here?" },
  { id: "glazing", label: "Try 40% glazing on the south façade" },
]

const showAsOptions: AIChatShowAs["options"] = [
  { value: "floating", label: "Floating", icon: <ArrowsMinimizeIcon /> },
  { value: "sidebar", label: "Sidebar", icon: <LayoutIcon /> },
]

const log = (line: string) => () => console.info(line)

function Labelled({ label, children, width = "w-90" }: { label: string; children: React.ReactNode; width?: string }) {
  return (
    <div className="flex flex-col gap-2" data-demo={label}>
      <span className="text-label-xsmall text-texticons-secondary">{label}</span>
      <div className={`${width} max-w-full`}>{children}</div>
    </div>
  )
}

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()

function Panel() {
  const [chats, setChats] = React.useState<AIChat[]>(() => [
    { id: "floor-3", title: "Floor 3 cost check", updatedAt: ago(20) },
    { id: "massing", title: "Massing review", updatedAt: ago(140) },
    { id: "costflow", title: "Costflow assumptions", updatedAt: ago(60 * 24 * 2) },
    { id: "proposal", title: "Proposal comments", updatedAt: ago(60 * 24 * 4) },
    { id: "green-mark", title: "Green Mark target gaps", updatedAt: ago(60 * 24 * 6) },
    { id: "facade", title: "Façade options", updatedAt: ago(60 * 24 * 30) },
  ])
  const [currentId, setCurrentId] = React.useState<string | null>("floor-3")
  const [renaming, setRenaming] = React.useState<AIChat | null>(null)
  const [deleting, setDeleting] = React.useState<AIChat | null>(null)
  const [showAs, setShowAs] = React.useState("floating")
  const [last, setLast] = React.useState("")
  const current = chats.find((chat) => chat.id === currentId)
  const newChat = () => {
    setCurrentId(null)
    setLast("new chat")
  }
  return (
    <div data-show-as={showAs} data-last={last} className="flex h-120 flex-col gap-2 rounded-lg bg-background-default p-2 shadow-float inset-ring inset-ring-stroke-subtle">
      <AIChatHeader
        title={current?.title}
        onNewChat={newChat}
        onClose={() => setLast("close")}
        showAs={{ value: showAs, options: showAsOptions, onValueChange: setShowAs }}
        chats={{
          chats,
          currentId,
          onSelect: (id) => {
            setCurrentId(id)
            setLast(`select ${id}`)
          },
          onRename: setRenaming,
          onDelete: setDeleting,
        }}
      />
      <div className="flex-1 overflow-y-auto rounded-md p-3 inset-ring inset-ring-stroke-subtle">
        {current ? (
          <p className="text-paragraph-small text-texticons-primary">The conversation for “{current.title}” goes here.</p>
        ) : (
          <AIEmptyState
            description="Select a floor or zone on the canvas to add it as context."
            suggestions={coreSuggestions}
            onSuggestion={(s) => setLast(`suggestion ${s.id}`)}
          />
        )}
      </div>
      <AIRenameChatDialog
        open={renaming != null}
        onOpenChange={(open) => !open && setRenaming(null)}
        chatTitle={renaming?.title}
        onRename={(title) => {
          const id = renaming?.id
          setChats((all) => all.map((chat) => (chat.id === id ? { ...chat, title } : chat)))
          setLast(`rename ${id} ${title}`)
        }}
      />
      <AIDeleteChatDialog
        open={deleting != null}
        onOpenChange={(open) => !open && setDeleting(null)}
        chatTitle={deleting?.title}
        onDelete={() => {
          const id = deleting?.id
          setChats((all) => all.filter((chat) => chat.id !== id))
          if (id === currentId) setCurrentId(null)
          setLast(`delete ${id}`)
        }}
      />
    </div>
  )
}

function DialogDemo({ kind }: { kind: "rename" | "delete" }) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("Massing review")
  return (
    <div className="flex items-center gap-3" data-title={title}>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        {kind === "rename" ? "Rename chat…" : "Delete chat…"}
      </Button>
      <span className="text-paragraph-xsmall text-texticons-secondary">{title}</span>
      {kind === "rename" ? (
        <AIRenameChatDialog open={open} onOpenChange={setOpen} chatTitle={title} onRename={setTitle} />
      ) : (
        <AIDeleteChatDialog open={open} onOpenChange={setOpen} chatTitle={title} onDelete={() => setTitle("(deleted)")} />
      )}
    </div>
  )
}

export function AIChatsDemo() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Header · New chat" width="w-96">
          <AIChatHeader
            onNewChat={log("new chat")}
            onClose={log("close")}
            showAs={{ value: "floating", options: showAsOptions, onValueChange: log("show as") }}
            chats={{ chats: figmaChats, onSelect: log("select"), onRename: log("rename"), onDelete: log("delete") }}
          />
        </Labelled>
        <Labelled label="Header · Titled" width="w-96">
          <AIChatHeader
            title="Floor 3 cost check"
            onNewChat={log("new chat")}
            onClose={log("close")}
            showAs={{ value: "floating", options: showAsOptions, onValueChange: log("show as") }}
            chats={{ chats: figmaChats, currentId: "floor-3", onSelect: log("select"), onRename: log("rename"), onDelete: log("delete") }}
          />
        </Labelled>
        <Labelled label="Header · Narrow (compact)" width="w-56">
          <AIChatHeader
            title="Zone 2 occupancy against the office density in the brief"
            onNewChat={log("new chat")}
            onClose={log("close")}
            showAs={{ value: "sidebar", options: showAsOptions, onValueChange: log("show as") }}
            chats={{ chats: manyChats, currentId: "zone-2", onSelect: log("select") }}
          />
        </Labelled>
        <Labelled label="Header · No chat list (title only)" width="w-96">
          <AIChatHeader title="Floor 3 cost check" onNewChat={log("new chat")} onClose={log("close")} />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <Labelled label="Chats menu · Figma" width="w-72">
          <AIChatsMenu
            chats={figmaChats}
            currentId="floor-3"
            now={fixedNow}
            onSelect={log("select")}
            onRename={log("rename")}
            onDelete={log("delete")}
          />
        </Labelled>
        <Labelled label="Chats menu · Search" width="w-72">
          <AIChatsMenu
            chats={[...figmaChats, { id: "plates", title: "Floor plate options", updatedAt: at(19) }]}
            currentId="floor-3"
            now={fixedNow}
            defaultQuery="floor"
            onSelect={log("select")}
            onRename={log("rename")}
            onDelete={log("delete")}
          />
        </Labelled>
        <Labelled label="Chats menu · Search, no results" width="w-72">
          <AIChatsMenu chats={figmaChats} now={fixedNow} defaultQuery="lobby" onSelect={log("select")} onNewChat={log("new chat")} />
        </Labelled>
        <Labelled label="Chats menu · Many chats across buckets" width="w-72">
          <AIChatsMenu
            chats={manyChats}
            currentId="massing"
            now={fixedNow}
            onSelect={log("select")}
            onRename={log("rename")}
            onDelete={log("delete")}
          />
        </Labelled>
        <Labelled label="Chats menu · Bucket boundaries" width="w-72">
          <AIChatsMenu chats={boundaryChats} now={boundaryNow} labels={{ older: "Earlier" }} onSelect={log("select")} />
        </Labelled>
        <Labelled label="Chats menu · Empty list" width="w-72">
          <AIChatsMenu chats={[]} onNewChat={log("new chat")} />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <Labelled label="Empty state · Core app">
          <AIEmptyState
            heading="Ask about your design"
            description="Select a floor or zone on the canvas to add it as context."
            suggestions={coreSuggestions}
            onSuggestion={log("suggestion")}
          />
        </Labelled>
        <Labelled label="Empty state · Flux (actions and suggestions)">
          <AIEmptyState
            heading="What are we modelling?"
            description="Upload drawings or start from an address, and the agent builds an energy model from them."
            actions={
              <>
                <Button type="button" variant="secondary">
                  <UploadIcon />
                  Upload drawings
                </Button>
                <Button type="button" variant="secondary">
                  <GlobeIcon />
                  Start from an address
                </Button>
              </>
            }
            suggestions={fluxSuggestions}
            suggestionsLabel="Or try"
            onSuggestion={log("suggestion")}
          />
        </Labelled>
        <Labelled label="Empty state · After deleting the chat">
          <AIEmptyState description="Select a floor or zone on the canvas to add it as context." suggestions={coreSuggestions} onSuggestion={log("suggestion")} />
        </Labelled>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Labelled label="Panel · Interactive (chats, rename, delete, show as)" width="w-100">
          <Panel />
        </Labelled>
        <div className="flex flex-col gap-8">
          <Labelled label="Dialog · Rename">
            <DialogDemo kind="rename" />
          </Labelled>
          <Labelled label="Dialog · Delete">
            <DialogDemo kind="delete" />
          </Labelled>
        </div>
      </div>
    </div>
  )
}
