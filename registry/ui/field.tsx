"use client"

import * as React from "react"
import { AlertTriangleIcon, HelpIcon, InfoIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

type FieldState = "default" | "error" | "alert"

type FieldProps = {
  label?: React.ReactNode
  labelPosition?: "default" | "inline" | "hidden"
  labelHelp?: string
  labelAction?: React.ReactNode
  helpText?: React.ReactNode
  state?: FieldState
}

function InlineError({
  tone = "error",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { tone?: "error" | "alert" }) {
  return (
    <div
      data-slot="inline-error"
      role="alert"
      className={cn(
        "flex items-start gap-1 text-paragraph-xsmall [&_svg]:size-4 [&_svg]:shrink-0",
        tone === "error" ? "text-texticons-critical-primary" : "text-caution-heavy",
        className
      )}
      {...props}
    >
      {tone === "error" ? <InfoIcon /> : <AlertTriangleIcon />}
      <span>{children}</span>
    </div>
  )
}

const fieldBox =
  "flex h-8 items-center gap-1 rounded-md bg-background-default py-1.5 pr-2 pl-3 inset-ring inset-ring-stroke-default transition-colors duration-120 hover:bg-background-light focus-within:bg-background-light focus-within:inset-ring-stroke-info focus-within:shadow-focus has-disabled:bg-background-light has-disabled:inset-ring-0 has-[input:read-only,textarea:read-only]:bg-background-light has-[input:read-only,textarea:read-only]:inset-ring-0 data-[tone=error]:bg-background-critical data-[tone=error]:inset-ring-stroke-critical data-[tone=alert]:bg-background-caution data-[tone=alert]:inset-ring-caution-primary"

const fieldInput =
  "w-full min-w-0 flex-1 bg-transparent text-paragraph-small text-texticons-primary outline-none placeholder:text-texticons-placeholder disabled:text-texticons-disabled in-data-[tone=error]:text-texticons-critical-primary in-data-[tone=alert]:text-texticons-caution-secondary"

function Field({
  id,
  label,
  labelPosition = "default",
  labelHelp,
  labelAction,
  helpText,
  state = "default",
  className,
  children,
}: FieldProps & { id: string; className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="field"
      data-tone={state}
      className={cn(
        "group/field flex flex-col gap-1",
        labelPosition === "inline" && "flex-row items-center justify-between gap-2 [&>[data-slot=field-control]]:w-32 [&>[data-slot=field-control]]:flex-none",
        className
      )}
    >
      {label != null && (
        <label
          htmlFor={id}
          className={cn(
            "flex items-center gap-2 text-label-xsmall text-texticons-secondary group-has-disabled/field:text-neutral-20",
            labelPosition === "hidden" && "sr-only"
          )}
        >
          <span>{label}</span>
          {labelHelp && (
            <span title={labelHelp} className="inline-flex text-texticons-tertiary [&_svg]:size-3.5">
              <HelpIcon aria-label={labelHelp} />
            </span>
          )}
          {labelAction && <span className="ml-auto">{labelAction}</span>}
        </label>
      )}
      {children}
      {helpText != null &&
        (state === "default" ? (
          <div id={`${id}-help`} className="text-paragraph-xsmall text-texticons-secondary">
            {helpText}
          </div>
        ) : (
          <InlineError id={`${id}-help`} tone={state}>
            {helpText}
          </InlineError>
        ))}
    </div>
  )
}

export { Field, InlineError, fieldBox, fieldInput, type FieldProps, type FieldState }
