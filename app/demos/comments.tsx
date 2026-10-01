"use client"

import * as React from "react"

import { CommentPin } from "@/registry/ui/comment-pin"
import { CommentSearch, CommentSection } from "@/registry/ui/comment-section"
import { CommentThread } from "@/registry/ui/comment-thread"
import { Photo } from "@/registry/ui/photo"
import { ViewComment } from "@/registry/ui/view-comment"

export function CommentsDemo() {
  const [showResolved, setShowResolved] = React.useState(false)
  const [resolved, setResolved] = React.useState(false)
  const [selected, setSelected] = React.useState(1)
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
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <Photo />
        <Photo selected />
        <Photo more={3} />
        <Photo onRemove={() => {}} />
        <Photo size="L" />
      </div>
    </div>
  )
}
