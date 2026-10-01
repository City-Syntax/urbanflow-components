"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import { ChevronDownIcon, ChevronRightIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function Policy({
  reference,
  source,
  href,
  defaultOpen = true,
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & {
  reference: React.ReactNode
  source?: React.ReactNode
  href?: string
}) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="policy"
      defaultOpen={defaultOpen}
      className={cn("group/policy flex flex-col gap-1 rounded-md bg-background-light p-2", className)}
      {...props}
    >
      <CollapsiblePrimitive.Trigger className="flex cursor-pointer items-center gap-1 rounded-sm text-left text-label-xsmall text-texticons-primary outline-none focus-visible:shadow-focus [&_svg]:size-3">
        <ChevronRightIcon className="group-data-[state=open]/policy:hidden" />
        <ChevronDownIcon className="hidden group-data-[state=open]/policy:block" />
        <span>{reference}</span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="flex flex-col gap-1 pl-4">
        {source != null && (
          <a
            href={href}
            className="text-label-xsmall text-texticons-link-primary no-underline hover:text-texticons-link-secondary hover:underline"
          >
            {source}
          </a>
        )}
        {children != null && <p className="text-paragraph-xsmall text-texticons-secondary">{children}</p>}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

export { Policy }
