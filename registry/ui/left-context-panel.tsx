"use client"

import * as React from "react"
import { ChevronDownIcon, LayoutIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { IconButton } from "@/registry/ui/icon-button"

const defaultWidths = { urbanflow: 252, flux: 360 } as const

type Product = keyof typeof defaultWidths

function LeftContextPanel({
  product = "urbanflow",
  page,
  menu,
  menuOpen,
  onMenuOpenChange,
  onCollapse,
  tabs,
  defaultWidth,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  product?: Product
  page?: React.ReactNode
  menu?: React.ReactNode
  menuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  onCollapse?: () => void
  tabs?: React.ReactNode
  defaultWidth?: number
}) {
  const initial = defaultWidth ?? defaultWidths[product]
  const flux = product === "flux"
  const trigger = (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1 rounded-md text-header-small text-texticons-emphasis outline-none focus-visible:shadow-focus [&_svg]:size-4 [&_svg]:text-texticons-placeholder"
    >
      {page}
      <ChevronDownIcon />
    </button>
  )
  const header = page != null && (
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
  )
  return (
    <aside
      data-slot="left-context-panel"
      data-product={product}
      style={{ width: initial, ...style }}
      className={cn(
        "relative flex min-h-0 shrink-0 flex-col gap-2 rounded-lg bg-background-default p-2 shadow-sm inset-ring inset-ring-stroke-subtle",
        className
      )}
      {...props}
    >
      {header}
      {tabs}
      {flux ? (
        <div data-slot="left-context-panel-content" className="flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto rounded-md bg-background-light p-2">{children}</div>
      )}
    </aside>
  )
}

export { LeftContextPanel, defaultWidths as leftContextPanelWidths }
