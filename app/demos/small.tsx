"use client"

import * as React from "react"
import { BuildingIcon } from "@urbanflow/icons"

import { Avatar, AvatarsStacked } from "@/registry/ui/avatar"
import { ChipFilter } from "@/registry/ui/chip-filter"
import { ColorIndicator } from "@/registry/ui/color-indicator"
import { DropdownPill } from "@/registry/ui/dropdown-pill"
import { ScrollArea, ScrollIndicator } from "@/registry/ui/scroll-indicator"

const categories = ["Floor plan", "Elevation", "Section", "Site plan", "Specification"]
const filters = ["All", "Office", "Residential", "Retail"]

export function SmallDemo() {
  const [filter, setFilter] = React.useState("All")
  const [cat, setCat] = React.useState<string>()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        {(["red", "orange", "yellow", "green", "cyan", "indigo", "pink", "brown"] as const).map((c) => (
          <ColorIndicator key={c} color={`var(--color-misc-${c})`} />
        ))}
        <ColorIndicator size="small" color="var(--color-misc-indigo)" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar size="L" name="Pei Ning" />
        <Avatar size="M" name="Ryan Tan" index={1} />
        <Avatar size="S" name="Ana Lim" index={2} />
        <Avatar size="XS" name="Wei Jie" index={4} />
        <AvatarsStacked users={["Pei Ning", "Ryan Tan", "Ana Lim", "Wei Jie", "Sara Koh", "Tom Ng", "Li Wen", "Mia Ho"]} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <ChipFilter key={f} selected={filter === f} onClick={() => setFilter(f)}>
            {f}
          </ChipFilter>
        ))}
        <ChipFilter icon={<BuildingIcon />}>With icon</ChipFilter>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <DropdownPill aria-label="Category" options={categories} value={cat} onValueChange={setCat} />
        <DropdownPill aria-label="Category" options={categories} defaultValue="Floor plan" />
      </div>
      <div className="flex items-start gap-6">
        <ScrollIndicator />
        <ScrollIndicator tone="dark" />
        <ScrollArea type="always" className="h-40 w-64 rounded-lg bg-background-default inset-ring inset-ring-stroke-default">
          <ul className="flex flex-col p-3 text-paragraph-small text-texticons-primary">
            {Array.from({ length: 20 }, (_, i) => (
              <li key={i} className="py-1">Floor {i + 1}</li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
