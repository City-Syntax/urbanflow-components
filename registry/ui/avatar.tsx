import * as React from "react"

import { cn } from "@/lib/utils"

const palette = ["red", "orange", "yellow", "green", "cyan", "indigo", "pink", "brown"] as const

const bg: Record<(typeof palette)[number], string> = {
  red: "bg-misc-red text-texticons-inverse-primary",
  orange: "bg-misc-orange text-texticons-inverse-primary",
  yellow: "bg-misc-yellow text-texticons-emphasis",
  green: "bg-misc-green text-texticons-inverse-primary",
  cyan: "bg-misc-cyan text-texticons-inverse-primary",
  indigo: "bg-misc-indigo text-texticons-inverse-primary",
  pink: "bg-misc-pink text-texticons-inverse-primary",
  brown: "bg-misc-brown text-texticons-inverse-primary",
}

const sizes = {
  L: "size-7 text-label-xsmall",
  M: "size-6 text-label-xsmall",
  S: "size-5 text-[10px] leading-3",
  XS: "size-[18px] text-[9px] leading-3",
}

type AvatarProps = Omit<React.ComponentProps<"span">, "color"> & {
  name?: string
  initials?: string
  src?: string
  size?: keyof typeof sizes
  color?: (typeof palette)[number]
  index?: number
}

function Avatar({ name, initials, src, size = "M", color, index = 0, className, ...props }: AvatarProps) {
  const tone = color ?? palette[index % palette.length]
  const letters =
    initials ??
    (name ?? "?")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  return (
    <span
      data-slot="avatar"
      title={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizes[size],
        src ? "bg-background-light" : bg[tone],
        className
      )}
      {...props}
    >
      {src ? <img src={src} alt={name ?? ""} className="size-full object-cover" /> : letters}
    </span>
  )
}

function AvatarsStacked({
  users,
  max = 6,
  size = "S",
  className,
  ...props
}: React.ComponentProps<"span"> & {
  users: (string | Omit<AvatarProps, "size">)[]
  max?: number
  size?: keyof typeof sizes
}) {
  const shown = users.slice(0, max)
  return (
    <span
      data-slot="avatars-stacked"
      aria-label={`${users.length} people`}
      className={cn("inline-flex items-center [&>*]:ring-2 [&>*]:ring-neutral-0 [&>*+*]:-ml-px", className)}
      {...props}
    >
      {shown.map((u, i) =>
        typeof u === "string" ? (
          <Avatar key={i} index={i} size={size} name={u} />
        ) : (
          <Avatar key={i} index={i} size={size} {...u} />
        )
      )}
      {users.length > max && (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full bg-background-medium font-semibold text-texticons-primary",
            sizes[size]
          )}
        >
          +{users.length - max}
        </span>
      )}
    </span>
  )
}

export { Avatar, AvatarsStacked }
