"use client"

import * as React from "react"

import { CommentIconButton } from "@/registry/ui/comment-icon-button"
import { CommentPin, CommentPinPreview } from "@/registry/ui/comment-pin"
import { CommentSearch, CommentSection } from "@/registry/ui/comment-section"
import { CommentThread } from "@/registry/ui/comment-thread"
import { Photo } from "@/registry/ui/photo"
import { SendButton } from "@/registry/ui/send-button"
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
        <CommentPin state="typing" />
        <CommentPin users={["Pei Ning"]} />
        <CommentPin state="selected" users={["Ana Lim"]} index={3} />
        <CommentPin state="unread" users={["Ryan Tan"]} index={2} />
        <CommentPin state="resolved" users={["Wei Jie"]} index={4} />
        <CommentPin users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin state="selected" users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin state="unread" users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin state="resolved" users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin count={2} users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin count={2} state="unread" users={["Pei Ning", "Ryan Tan"]} />
        <CommentPin count={5} users={["Pei Ning", "Ryan Tan", "Ana Lim"]} />
        <CommentPin count={5} state="unread" users={["Pei Ning", "Ryan Tan", "Ana Lim"]} />
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <CommentPinPreview users={["Pei Ning"]} author="Pei Ning" age="3 mo. ago" replies="3 replies">
          What does the clock icon represent in this design?
        </CommentPinPreview>
        <CommentPinPreview unread users={["Pei Ning", "Ryan Tan"]} author="Pei Ning" age="2d ago" replies="3 replies">
          What does the clock icon represent in this design?
        </CommentPinPreview>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SendButton />
        <SendButton disabled />
        <CommentIconButton />
        <CommentIconButton unread />
        <CommentIconButton selected />
        <CommentIconButton selected unread />
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
