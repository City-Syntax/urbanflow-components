"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, InfoIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"

type IssueValue = { label: React.ReactNode; value: React.ReactNode }

function ComplianceIssue({
  status = "passed",
  title,
  location,
  values,
  policy,
  onDismiss,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CollapsiblePrimitive.Root>, "title"> & {
  status?: "passed" | "failed"
  title: React.ReactNode
  location?: React.ReactNode
  values?: IssueValue[]
  policy?: React.ReactNode
  onDismiss?: () => void
}) {
  const pass = status === "passed"
  return (
    <CollapsiblePrimitive.Root
      data-slot="compliance-issue"
      data-status={status}
      className={cn(
        "group/issue relative flex flex-col overflow-hidden bg-background-default shadow-[inset_0_-1px_0_var(--color-stroke-default)] before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-0.5",
        pass ? "before:bg-success-light" : "before:bg-critical-primary",
        className
      )}
      {...props}
    >
      <CollapsiblePrimitive.Trigger className="flex cursor-pointer items-center gap-2 px-4 py-3 text-left text-texticons-secondary outline-none hover:bg-background-light focus-visible:shadow-[inset_0_0_0_2px_var(--color-info-primary)] group-data-[state=open]/issue:bg-background-light group-data-[state=open]/issue:shadow-[inset_0_-1px_0_var(--color-stroke-default)] [&_svg]:size-3.5">
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 py-0.5">
          <span className="text-label-xsmall text-texticons-emphasis">{title}</span>
          {location != null && <span className="text-paragraph-small text-texticons-primary">{location}</span>}
        </span>
        <ChevronDownIcon className="group-data-[state=open]/issue:hidden" />
        <ChevronUpIcon className="hidden group-data-[state=open]/issue:block" />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content>
        <div className="flex flex-col gap-3 px-4 py-2">
          {values && values.length > 0 && (
            <div role="table" className="flex overflow-hidden rounded-md inset-ring inset-ring-stroke-default">
              {values.map((v, i) => (
                <div key={i} role="row" className="flex flex-1 flex-col">
                  <span
                    role="columnheader"
                    className="py-2 pr-1.5 pl-3 text-label-xsmall text-texticons-primary shadow-[inset_0_-1px_0_var(--color-stroke-default)]"
                  >
                    {v.label}
                  </span>
                  <span role="cell" className="px-3 py-2 font-mono text-metric-xsmall text-texticons-primary">
                    {v.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          {policy}
        </div>
        <div className="flex items-center justify-between gap-2 bg-background-light px-4 py-2 shadow-[inset_0_1px_0_var(--color-stroke-subtle)]">
          <Button variant="plain" onClick={onDismiss}>
            Dismiss
          </Button>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-label-xsmall [&_svg]:size-3.5",
              pass ? "bg-background-card text-texticons-success-primary" : "bg-background-critical text-texticons-critical-primary"
            )}
          >
            {pass ? <CheckIcon /> : <InfoIcon />}
            {pass ? "Passed" : "Fail"}
          </span>
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

export { ComplianceIssue, type IssueValue }
