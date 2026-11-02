"use client"

import * as React from "react"

import { DropdownMenuItem } from "@/registry/ui/action-list"
import { CommentPin } from "@/registry/ui/comment-pin"
import { CommentSearch, CommentSection } from "@/registry/ui/comment-section"
import { CommentThread } from "@/registry/ui/comment-thread"
import { EmojiPicker } from "@/registry/ui/emoji-picker"
import { ImageZoomSelector } from "@/registry/ui/image-zoom-selector"
import { Photo } from "@/registry/ui/photo"
import { ViewComment, ViewCommentMessage } from "@/registry/ui/view-comment"

export function CommentsDemo() {
  const [showResolved, setShowResolved] = React.useState(false)
  const [resolved, setResolved] = React.useState(false)
  const [selected, setSelected] = React.useState(1)
  const [zoom, setZoom] = React.useState(100)
  const [threadResolved, setThreadResolved] = React.useState(false)
  const [reactions, setReactions] = React.useState([
    { emoji: "👍", count: 1, reacted: true },
    { emoji: "🔥", count: 1, reacted: false },
  ])
  const react = (emoji: string, reacted: boolean) =>
    setReactions((all) => {
      const found = all.find((r) => r.emoji === emoji)
      if (!found) return [...all, { emoji, count: 1, reacted: true }]
      return all
        .map((r) => (r.emoji === emoji ? { ...r, reacted, count: r.count + (reacted ? 1 : -1) } : r))
        .filter((r) => r.count > 0)
    })
  const [messages, setMessages] = React.useState([
    { author: "Ryan Tan", time: "2h", body: "Can we check the setback on the east side?", index: 1 },
    { author: "Pei Ning", time: "1h", body: "Updated — see the new massing.", index: 5, photos: [] },
  ])
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <CommentPin users={["Pei Ning"]} />
        <CommentPin state="unread" users={["Ryan Tan"]} index={2} />
        <CommentPin state="selected" users={["Ana Lim"]} index={3} />
        <CommentPin state="resolved" users={["Wei Jie"]} index={4} />
        <CommentPin state="typing" />
        <CommentPin users={["Pei Ning", "Ryan Tan", "Ana Lim"]} />
        <CommentPin count={4} />
        <CommentPin count={4} state="selected" />
      </div>
      <div className="flex flex-wrap items-start gap-8">
        <div className="w-80 overflow-hidden rounded-lg bg-background-default ring-1 ring-stroke-default">
          <CommentSection showResolved={showResolved} onShowResolvedChange={setShowResolved} onClose={() => {}} />
          <CommentSearch empty={false} />
          {[0, 1, 2].map((i) => (
            <CommentThread
              key={i}
              author={["Ryan Tan", "Ana Lim", "Wei Jie"][i]}
              authorIndex={i + 1}
              location={`#${i + 3} · Building 1 · Floor ${7 + i} · Zone A`}
              time={`${i + 1}h`}
              unread={i === 0}
              selected={selected === i}
              resolved={i === 1 && resolved}
              onResolve={() => i === 1 && setResolved(!resolved)}
              onClick={() => setSelected(i)}
              replies={i === 2 ? "2 replies" : undefined}
            >
              Can we check the setback on the east side?
            </CommentThread>
          ))}
        </div>
        <div className="w-80 overflow-hidden rounded-lg bg-background-default ring-1 ring-stroke-default">
          <CommentSearch />
          <CommentSearch noMatch value="façade" />
        </div>
        <ViewComment
          me="Pei Ning"
          messages={messages}
          onReply={(text) => setMessages((m) => [...m, { author: "Pei Ning", time: "now", body: text, index: 5 }])}
        />
        <ViewComment
          me={{ name: "Wong Pei Ning", index: 5 }}
          resolved={threadResolved}
          onResolve={() => setThreadResolved(!threadResolved)}
          onClose={() => {}}
          moreMenu={
            <>
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Subscribe to thread</DropdownMenuItem>
              <DropdownMenuItem destructive>Delete comment</DropdownMenuItem>
            </>
          }
          reply={<div className="h-21 rounded-lg border border-stroke-default bg-background-light" />}
        >
          <ViewCommentMessage
            author="Ryan Tan"
            index={1}
            time="Just now"
            body="Are these also editable like in the floating panel?"
            onReact={(emoji) => react(emoji, true)}
          />
          <ViewCommentMessage
            author="Wong Pei Ning"
            index={5}
            time="Just now"
            body="Can we tweak the spacing here?"
            photos={["", "", "", ""]}
            onOpenPhoto={() => {}}
            reactions={reactions}
            onToggleReaction={react}
            onReact={(emoji) => react(emoji, true)}
            menu={
              <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem destructive>Delete</DropdownMenuItem>
              </>
            }
          />
        </ViewComment>
        <EmojiPicker onEmojiSelect={(emoji) => react(emoji, true)} />
        <ImageZoomSelector value={zoom} onValueChange={setZoom} />
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <Photo />
        <Photo selected />
        <Photo more={3} />
        <Photo onRemove={() => {}} />
        <Photo size="L" />
        <Photo size="L" more={1} />
      </div>
    </div>
  )
}
