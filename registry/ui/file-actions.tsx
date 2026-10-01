"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@urbanflow/icons"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/ui/action-list"
import { Button } from "@/registry/ui/button"

type FileAction = { label: string; icon?: React.ReactNode; onSelect?: () => void }

function FileActions({
  label = "Actions",
  items,
  variant = "primary",
}: {
  label?: React.ReactNode
  items: FileAction[]
  variant?: "primary" | "secondary"
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button data-slot="file-actions" variant={variant} onClick={(e) => e.stopPropagation()}>
          {label}
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-46">
        {items.map((it) => (
          <DropdownMenuItem key={it.label} icon={it.icon} onSelect={it.onSelect}>
            {it.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { FileActions, type FileAction }
