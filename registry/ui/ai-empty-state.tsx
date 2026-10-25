"use client"

import * as React from "react"
import { AiIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

type AISuggestion = { id: string; label: string; icon?: React.ReactNode }

function AIEmptyState({
  heading,
  description,
  actions,
  suggestions = [],
  suggestionsLabel = "Suggested",
  onSuggestion,
  mark = <AiIcon />,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  heading?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  suggestions?: AISuggestion[]
  suggestionsLabel?: React.ReactNode
  onSuggestion?: ((suggestion: AISuggestion) => void) | undefined
  mark?: React.ReactNode
}) {
  const labelId = React.useId()
  return (
    <div data-slot="ai-empty-state" className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-start gap-2">
        <span
          aria-hidden
          data-slot="ai-empty-state-mark"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-background-light text-texticons-emphasis [&_svg]:size-5"
        >
          {mark}
        </span>
        {heading != null && <p className="text-header-small text-texticons-emphasis">{heading}</p>}
        {description != null && <div className="text-paragraph-xsmall text-texticons-secondary">{description}</div>}
      </div>
      {actions != null && (
        <div data-slot="ai-empty-state-actions" className="flex flex-wrap gap-2">
          {actions}
        </div>
      )}
      {children}
      {suggestions.length > 0 && (
        <div data-slot="ai-empty-state-suggestions" className="flex flex-col gap-0.5">
          <p id={labelId} className="pt-1.5 pb-1 text-label-xsmall text-texticons-primary">
            {suggestionsLabel}
          </p>
          <ul aria-labelledby={labelId} className="flex flex-col gap-0.5">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  data-slot="ai-empty-state-suggestion"
                  className="flex min-h-7 w-full cursor-pointer items-center gap-1.5 rounded-md p-1.5 text-left text-paragraph-xsmall text-texticons-primary outline-none hover:bg-background-light focus-visible:shadow-focus active:bg-background-medium [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-texticons-secondary"
                  onClick={() => onSuggestion?.(suggestion)}
                >
                  {suggestion.icon}
                  <span className="min-w-0 flex-1">{suggestion.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { AIEmptyState, type AISuggestion }
