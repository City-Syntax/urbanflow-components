"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/registry/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"

function AICitations({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="ai-citations" className={cn("flex flex-wrap gap-1", className)} {...props} />
}

function AICitation({
  label,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> &
  Pick<React.ComponentProps<typeof HoverCard>, "open" | "defaultOpen" | "onOpenChange"> & {
    label: string
    children: React.ReactNode
  }) {
  return (
    <HoverCard {...(open === undefined ? {} : { open })} {...(defaultOpen === undefined ? {} : { defaultOpen })} {...(onOpenChange === undefined ? {} : { onOpenChange })}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          data-slot="ai-citation"
          className={cn(
            badgeVariants(),
            "cursor-pointer outline-none hover:bg-neutral-10 focus-visible:shadow-focus data-[state=open]:bg-neutral-10",
            className
          )}
          {...props}
        >
          {label}
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-60 px-3 pt-3 pb-2">
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}

function AICitationCard({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div data-slot="ai-citation-card" className={cn("flex flex-col items-start gap-1", className)} {...props}>
      <div className="flex max-w-full items-center gap-1.5 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-texticons-placeholder">
        {icon}
        <span className="truncate text-label-xsmall text-texticons-emphasis">{title}</span>
      </div>
      {description != null && <p className="text-paragraph-xsmall text-texticons-secondary">{description}</p>}
      {action}
    </div>
  )
}

export { AICitation, AICitationCard, AICitations }
