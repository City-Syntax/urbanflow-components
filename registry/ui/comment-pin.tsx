import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar } from "@/registry/ui/avatar"

type CommentPinUser = string | { name: string; src?: string; index?: number }

const person = (user: CommentPinUser, index: number) =>
  typeof user === "string" ? { name: user, index } : { index, ...user }

function TypingBubble() {
  const shadow = `pin-shadow-${React.useId().replace(/[^\w-]/g, "")}`
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <g filter={`url(#${shadow})`}>
        <path
          d="M36 19.995C36.0006 22.7576 35.286 25.4733 33.9258 27.8778C32.5656 30.2823 30.6061 32.2936 28.238 33.716C25.8699 35.1384 23.174 35.9235 20.4125 35.9947C17.6511 36.0659 14.9182 35.4209 12.48 34.1225L7.24154 35.8688C6.80782 36.0135 6.3424 36.0344 5.89743 35.9294C5.45245 35.8244 5.04552 35.5975 4.72223 35.2742C4.39895 34.9509 4.17208 34.5439 4.06707 34.0989C3.96206 33.6539 3.98305 33.1884 4.12769 32.7547L5.87385 27.5157C4.73254 25.3697 4.09507 22.9919 4.00984 20.5627C3.92461 18.1335 4.39385 15.7168 5.38195 13.4961C6.37005 11.2754 7.85103 9.30894 9.71249 7.74609C11.5739 6.18324 13.7669 5.06504 16.125 4.47637C18.4831 3.88769 20.9443 3.84402 23.3218 4.34865C25.6993 4.85329 27.9306 5.89298 29.8463 7.38879C31.762 8.88461 33.3118 10.7972 34.3781 12.9815C35.4443 15.1658 35.999 17.5643 36 19.995Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter id={shadow} x="2.75" y="2.75" width="37" height="37" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1.25" dy="1.25" />
          <feGaussianBlur stdDeviation="1.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0.239216 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

const groupSpots = [
  ["left-[7px] top-[7px]"],
  ["left-0 top-[7px]", "left-3.5 top-[7px]"],
  ["left-3.5 top-0", "left-[7px] top-3.5", "left-0 top-0"],
]

function CommentPin({
  state = "read",
  users = [],
  count,
  index = 1,
  label = "Comment",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  state?: "read" | "unread" | "selected" | "resolved" | "typing"
  users?: CommentPinUser[]
  count?: number
  index?: number
  label?: string
}) {
  const people = users.map((user, i) => person(user, index + i))
  const unread = state === "unread"

  if (state === "typing") {
    return (
      <button
        type="button"
        data-slot="comment-pin"
        data-state={state}
        aria-label={label}
        className={cn(
          "inline-flex size-10 cursor-pointer items-center justify-center p-0 text-texticons-link-primary outline-none focus-visible:shadow-focus",
          className
        )}
        {...props}
      >
        <TypingBubble />
      </button>
    )
  }

  if (count != null) {
    const shown = people.slice(0, 3)
    return (
      <button
        type="button"
        data-slot="comment-pin"
        data-state={state}
        aria-label={label}
        className={cn(
          "group/pin relative inline-flex size-12 cursor-pointer items-center justify-center rounded-full p-0 shadow-xs outline-none hover:shadow-sm focus-visible:shadow-focus",
          unread ? "bg-info-primary text-texticons-inverse-primary" : "bg-background-default text-texticons-secondary",
          className
        )}
        {...props}
      >
        <span className="relative size-9 group-hover/pin:hidden group-focus-visible/pin:hidden">
          {shown.map((user, i) => (
            <Avatar
              key={i}
              size="S"
              name={user.name}
              src={user.src}
              index={user.index}
              className={cn(
                "absolute size-5.5 border",
                unread ? "border-stroke-info" : "border-neutral-0",
                groupSpots[shown.length - 1]?.[i]
              )}
            />
          ))}
        </span>
        <span className="hidden text-paragraph-xsmall font-medium group-hover/pin:inline group-focus-visible/pin:inline">
          {count}
        </span>
      </button>
    )
  }

  const shown = people.slice(0, 2)
  return (
    <button
      type="button"
      data-slot="comment-pin"
      data-state={state}
      aria-label={label}
      className={cn(
        "relative inline-flex cursor-pointer items-center rounded-full rounded-bl-none shadow-xs outline-none focus-visible:shadow-focus",
        shown.length > 1 ? "px-0.5 py-px" : "size-8 p-0.5",
        unread ? "bg-info-primary" : "bg-background-default",
        state === "selected" && "inset-ring inset-ring-texticons-link-primary",
        state === "resolved" && "opacity-50",
        className
      )}
      {...props}
    >
      {shown.map((user, i) => (
        <Avatar
          key={i}
          size="L"
          name={user.name}
          src={user.src}
          index={user.index}
          className={cn(i > 0 && "-ml-2")}
        />
      ))}
    </button>
  )
}

function CommentPinPreview({
  unread = false,
  users = [],
  author,
  age,
  replies,
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  unread?: boolean
  users?: CommentPinUser[]
  author: React.ReactNode
  age?: React.ReactNode
  replies?: React.ReactNode
}) {
  return (
    <button
      type="button"
      data-slot="comment-pin-preview"
      data-state={unread ? "unread" : "read"}
      className={cn(
        "flex w-75 cursor-pointer flex-col items-start gap-2.5 overflow-hidden rounded-[16px_16px_16px_0] px-4 py-3 text-left shadow-md outline-none focus-visible:shadow-focus",
        unread ? "bg-info-primary text-texticons-inverse-primary" : "bg-background-default text-texticons-primary",
        className
      )}
      {...props}
    >
      <span className="flex w-full items-center gap-2">
        <span className="flex gap-0.5">
          {users.slice(0, 2).map((user, i) => {
            const p = person(user, i)
            return <Avatar key={i} size="XS" name={p.name} src={p.src} index={p.index} />
          })}
        </span>
        <span className="text-label-xsmall">{author}</span>
        {age && (
          <span
            className={cn(
              "text-paragraph-xsmall font-medium",
              unread ? "text-texticons-inverse-secondary" : "text-texticons-tertiary"
            )}
          >
            {age}
          </span>
        )}
      </span>
      <span className="w-full text-paragraph-xsmall font-medium wrap-break-word">{children}</span>
      {replies && (
        <span
          className={cn(
            "pt-1 text-label-xsmall",
            unread ? "text-texticons-inverse-primary" : "text-texticons-link-primary"
          )}
        >
          {replies}
        </span>
      )}
    </button>
  )
}

export { CommentPin, CommentPinPreview }
export type { CommentPinUser }
