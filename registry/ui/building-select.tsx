"use client"

import * as React from "react"
import {
  AddIcon,
  BuildingIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  ZoneIcon,
} from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"

type Hierarchy = "parent" | "child" | "2ndChild"

function TreeElbow({ last }: { last?: boolean }) {
  return (
    <svg className="absolute top-0 left-0" width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden>
      <path
        d={(last ? "M6 0v9a4 4 0 004 4h6" : "M6 0v24M6 7v2a4 4 0 004 4h6") + "M13.5 10.5L16 13l-2.5 2.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const rowAction =
  "inline-flex cursor-pointer rounded-sm text-texticons-secondary outline-none hover:text-texticons-emphasis focus-visible:shadow-focus [&_svg]:size-3.5"

function BuildingSelect({
  hierarchy = "parent",
  depth,
  guides,
  label,
  icon,
  count,
  hasChildren = false,
  expanded = false,
  onToggle,
  selected = false,
  last = false,
  onAdd,
  onMore,
  trailing,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  hierarchy?: Hierarchy
  depth?: number
  guides?: boolean[]
  label: React.ReactNode
  icon?: React.ReactNode
  count?: number
  hasChildren?: boolean
  expanded?: boolean
  onToggle?: () => void
  selected?: boolean
  last?: boolean
  onAdd?: () => void
  onMore?: () => void
  trailing?: React.ReactNode
}) {
  const level = depth ?? (hierarchy === "parent" ? 0 : hierarchy === "child" ? 1 : 2)
  const parent = level === 0
  const leaf = !hasChildren && !parent
  const caret = hasChildren && (
    <button
      type="button"
      aria-label={expanded ? "Collapse" : "Expand"}
      onClick={(e) => {
        e.stopPropagation()
        onToggle?.()
      }}
      className={cn(rowAction, "relative [&_svg]:size-3", !parent && "left-3.5")}
    >
      {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
    </button>
  )
  return (
    <div
      data-slot="building-select"
      role="treeitem"
      tabIndex={0}
      aria-selected={selected}
      aria-expanded={hasChildren ? expanded : undefined}
      aria-level={level + 1}
      className={cn(
        "flex h-6 cursor-pointer items-center bg-background-default pr-1 pl-2 text-neutral-100 outline-none hover:bg-background-light focus-visible:shadow-[inset_0_0_0_2px_var(--color-info-primary)]",
        parent ? "gap-2" : "gap-1",
        leaf ? "text-paragraph-xsmall" : "text-label-xsmall",
        selected && "bg-background-light",
        className
      )}
      {...props}
    >
      {Array.from({ length: Math.max(0, level - 1) }, (_, i) => (
        <span key={i} className="relative inline-flex h-6 w-[21px] shrink-0 text-neutral-30">
          {(guides?.[i] ?? true) && (
            <svg className="absolute top-0 left-0" width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden>
              <path d="M6 0v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
      ))}
      <span
        className={cn(
          "relative inline-flex h-6 w-[21px] shrink-0 items-center justify-end text-neutral-30",
          !parent && !leaf && "mr-3"
        )}
      >
        {!parent && <TreeElbow last={last} />}
        {caret}
      </span>
      {(!leaf || icon != null) && (
        <span className="inline-flex shrink-0 text-neutral-100 [&_svg]:size-3.5">
          {icon ?? (parent ? <BuildingIcon /> : <ZoneIcon />)}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {trailing}
      {count != null && <Badge shape="small-number">{count}</Badge>}
      {(onAdd || onMore) && (
        <span className="inline-flex gap-1">
          {onAdd && (
            <button
              type="button"
              aria-label="Add"
              className={rowAction}
              onClick={(e) => {
                e.stopPropagation()
                onAdd()
              }}
            >
              <AddIcon />
            </button>
          )}
          {onMore && (
            <button
              type="button"
              aria-label="More"
              className={rowAction}
              onClick={(e) => {
                e.stopPropagation()
                onMore()
              }}
            >
              <EllipsisHorizontalIcon />
            </button>
          )}
        </span>
      )}
    </div>
  )
}

function BuildingHeader({
  title,
  count,
  collapsed = false,
  onToggle,
  action,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  count?: number
  collapsed?: boolean
  onToggle?: () => void
  action?: React.ReactNode
}) {
  return (
    <div
      data-slot="building-header"
      className={cn("flex min-h-7 items-center justify-between gap-2", className)}
      {...props}
    >
      <button
        type="button"
        aria-expanded={!collapsed}
        onClick={onToggle}
        className="inline-flex cursor-pointer items-center gap-1 rounded-sm text-texticons-secondary outline-none focus-visible:shadow-focus [&_svg]:size-3.5"
      >
        <span className="text-label-small text-texticons-emphasis">{title}</span>
        {count != null && <Badge shape="small-number">{count}</Badge>}
        {collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </button>
      {action}
    </div>
  )
}

export { BuildingSelect, BuildingHeader }
