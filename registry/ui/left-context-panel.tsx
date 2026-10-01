"use client"

import * as React from "react"
import { ChevronDownIcon, LayoutIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"

function LeftContextPanel({
  page,
  menu,
  menuOpen,
  onMenuOpenChange,
  onCollapse,
  tabs,
  className,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  page: React.ReactNode
  menu?: React.ReactNode
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  onCollapse?: () => void
  tabs?: React.ReactNode
}) {
  const trigger = (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1 rounded-md text-header-small text-texticons-emphasis outline-none focus-visible:shadow-focus [&_svg]:size-4 [&_svg]:text-texticons-placeholder"
    >
      {page}
      <ChevronDownIcon />
    </button>
  )
  return (
    <aside
      data-slot="left-context-panel"
      className={cn(
        "flex w-63 min-h-0 flex-col gap-2 rounded-lg bg-background-default p-2 shadow-sm inset-ring inset-ring-stroke-subtle",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pt-1 pr-1 pl-2">
        {menu ? (
          <DropdownMenu open={menuOpen} onOpenChange={onMenuOpenChange}>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-50">{menu}</DropdownMenuContent>
          </DropdownMenu>
        ) : (
          trigger
        )}
        {onCollapse && (
          <IconButton variant="tertiary" size="micro" label="Collapse panel" onClick={onCollapse}>
            <LayoutIcon />
          </IconButton>
        )}
      </div>
      {tabs}
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto rounded-md bg-background-light p-2">{children}</div>
    </aside>
  )
}

export { LeftContextPanel }
