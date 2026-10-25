"use client"

import * as React from "react"
import { ChevronDownIcon, CopyIcon, FloorIcon, PencilIcon, ZoneIcon } from "@urbanflow/icons"

import { Button } from "@/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/ui/command"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"
import { Progress } from "@/registry/ui/progress"
import { Separator } from "@/registry/ui/separator"
import { Spinner } from "@/registry/ui/spinner"

export function PrimitivesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-label-xsmall text-texticons-secondary">Spinner</span>
        <div className="flex items-center gap-3">
          <Spinner />
          <Spinner className="size-3.5" />
          <Spinner className="size-5" aria-label="Generating" />
        </div>
      </div>
      <div className="flex w-60 flex-col gap-3">
        <span className="text-label-xsmall text-texticons-secondary">Progress</span>
        <Progress value={0} aria-label="Empty" />
        <Progress value={42} aria-label="Partly done" />
        <Progress value={100} aria-label="Done" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-label-xsmall text-texticons-secondary">Separator</span>
        <div className="flex w-60 flex-col gap-2 text-paragraph-xsmall">
          <span>Input</span>
          <Separator />
          <span>Output</span>
        </div>
        <div className="flex h-5 items-center gap-2 text-paragraph-xsmall">
          <span>Floor 3</span>
          <Separator orientation="vertical" />
          <span>Zone 3A</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-label-xsmall text-texticons-secondary">Hover card</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="secondary">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-60">Floor 3 has 12 zones and a GFA of 1,240 m².</HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-label-xsmall text-texticons-secondary">Command</span>
        <Command className="w-72 shadow-md inset-ring inset-ring-stroke-subtle">
          <CommandInput placeholder="Search objects and actions" />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup heading="Objects">
              <CommandItem>
                <FloorIcon />
                Floor 3
              </CommandItem>
              <CommandItem>
                <ZoneIcon />
                Zone 3A · Office
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <PencilIcon />
                Rename
                <CommandShortcut>F2</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CopyIcon />
                Duplicate
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div className="flex w-64 flex-col gap-3" data-demo="Collapsible">
        <span className="text-label-xsmall text-texticons-secondary">Collapsible</span>
        <Collapsible defaultOpen className="flex flex-col gap-2">
          <CollapsibleTrigger className="group flex items-center gap-1 self-start text-label-xsmall">
            Floor 3 details
            <ChevronDownIcon size={14} className="transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="text-paragraph-xsmall text-texticons-secondary">
            6 zones, 1,240 m² GFA, last simulated today.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
