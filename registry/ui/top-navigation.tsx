"use client"

import * as React from "react"
import { ChevronDownIcon, MessageIcon, TokenIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { AvatarsStacked } from "@/registry/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"
import { ProposalTitle, type ProposalStatus } from "@/registry/ui/proposal-badge"

type Collaborator = React.ComponentProps<typeof AvatarsStacked>["users"][number]

type UrbanflowTopNavProps = Omit<React.ComponentProps<"div">, "title"> & {
  project: React.ReactNode
  proposal?: { title: React.ReactNode; status?: ProposalStatus; behindMain?: boolean }
  menu?: React.ReactNode
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  notifications?: boolean
  onNotifications?: () => void
  collaborators?: Collaborator[]
  maxCollaborators?: number
  credits?: React.ReactNode
}

function UrbanflowTopNav({
  project,
  proposal,
  menu,
  menuOpen,
  onMenuOpenChange,
  notifications = true,
  onNotifications,
  collaborators,
  maxCollaborators = 6,
  credits,
  className,
  ...props
}: UrbanflowTopNavProps) {
  const trigger = (
    <button
      type="button"
      className="inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-label-xsmall text-texticons-inverse-primary outline-none hover:bg-background-inverse focus-visible:shadow-focus [&_svg]:size-4 [&_svg]:shrink-0"
    >
      <span className={cn("whitespace-nowrap", proposal && "text-paragraph-xsmall text-texticons-inverse-secondary")}>{project}</span>
      {proposal && <ProposalTitle {...proposal} />}
      <ChevronDownIcon />
    </button>
  )
  return (
    <div
      data-slot="urbanflow-top-nav"
      className={cn("flex h-11 min-w-0 flex-1 items-center justify-between gap-2 pr-4 pl-1.5", className)}
      {...props}
    >
      {menu ? (
        <DropdownMenu open={menuOpen} onOpenChange={onMenuOpenChange}>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">{menu}</DropdownMenuContent>
        </DropdownMenu>
      ) : (
        trigger
      )}
      <div className="flex shrink-0 items-center gap-3">
        {notifications && (
          <IconButton
            variant="tertiary"
            label="Notifications"
            onClick={onNotifications}
            className="text-texticons-inverse-primary hover:bg-background-inverse"
          >
            <MessageIcon />
          </IconButton>
        )}
        {collaborators && collaborators.length > 0 && <AvatarsStacked users={collaborators} max={maxCollaborators} />}
        {credits != null && (
          <span
            title="Credits"
            className="inline-flex items-center gap-1 rounded-md bg-background-card px-1.5 py-0.5 text-paragraph-xsmall font-mono text-texticons-primary [&_svg]:size-3.5"
          >
            <TokenIcon />
            {credits}
          </span>
        )}
      </div>
    </div>
  )
}

function TopNavigation({
  product = "urbanflow",
  logo,
  notifications,
  collaborators,
  showCollaborators,
  className,
  ...props
}: UrbanflowTopNavProps & {
  product?: "urbanflow" | "flux"
  logo: React.ReactNode
  showCollaborators?: boolean
}) {
  const flux = product === "flux"
  return (
    <header
      data-slot="top-navigation"
      data-product={product}
      className={cn("flex h-11 shrink-0 items-center bg-background-inverse-secondary pl-4", className)}
    >
      <span className="inline-flex size-6 shrink-0 items-center justify-center [&>img]:size-4 [&>svg]:size-4">{logo}</span>
      <UrbanflowTopNav
        notifications={notifications ?? !flux}
        collaborators={flux && !showCollaborators ? undefined : collaborators}
        {...props}
      />
    </header>
  )
}

export { TopNavigation, UrbanflowTopNav }
