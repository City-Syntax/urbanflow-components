import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const proposalBadgeVariants = cva(
  "inline-flex h-5 shrink-0 items-center rounded-md px-2 py-0.5 text-label-xsmall whitespace-nowrap",
  {
    variants: {
      status: {
        draft: "bg-background-card text-texticons-primary inset-ring inset-ring-stroke-strong",
        "in-review": "bg-background-caution text-caution-heavy inset-ring inset-ring-caution-primary",
        "changes-suggested": "bg-background-critical text-critical-primary inset-ring inset-ring-critical-primary",
        "behind-main": "bg-background-info text-info-primary inset-ring inset-ring-info-primary",
        "ready-for-merge": "bg-background-success text-success-light inset-ring inset-ring-success-light",
        merged: "bg-success-light text-texticons-inverse-primary",
        closed: "bg-background-card text-texticons-primary inset-ring inset-ring-stroke-strong",
      },
    },
    defaultVariants: { status: "draft" },
  }
)

const proposalStatusLabel = {
  draft: "Draft",
  "in-review": "In review",
  "changes-suggested": "Changes suggested",
  "behind-main": "Behind main",
  "ready-for-merge": "Ready for merge",
  merged: "Merged",
  closed: "Archived",
} as const

type ProposalStatus = keyof typeof proposalStatusLabel

function ProposalBadge({
  status = "draft",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof proposalBadgeVariants>) {
  const s = (status ?? "draft") as ProposalStatus
  return (
    <span data-slot="proposal-badge" className={cn(proposalBadgeVariants({ status: s }), className)} {...props}>
      {children ?? proposalStatusLabel[s]}
    </span>
  )
}

function ProposalTitle({
  title,
  status = "draft",
  behindMain,
  icon,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "title"> & {
  title: React.ReactNode
  status?: ProposalStatus
  behindMain?: boolean
  icon?: React.ReactNode
}) {
  return (
    <span
      data-slot="proposal-title"
      className={cn("inline-flex min-w-0 items-center gap-1.5 text-texticons-inverse-primary [&_svg]:size-4 [&_svg]:shrink-0", className)}
      {...props}
    >
      {icon}
      <span className="truncate text-label-xsmall">{title}</span>
      <ProposalBadge status={status} />
      {behindMain && <ProposalBadge status="behind-main" />}
    </span>
  )
}

export { ProposalBadge, ProposalTitle, proposalBadgeVariants, proposalStatusLabel, type ProposalStatus }
