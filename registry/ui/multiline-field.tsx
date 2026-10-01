"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Field, fieldBox, fieldInput, type FieldProps } from "@/registry/ui/field"

function MultilineField({
  id,
  label,
  labelPosition,
  labelHelp,
  labelAction,
  helpText,
  state = "default",
  rows = 5,
  maxLength,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: React.ComponentProps<"textarea"> & FieldProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const [length, setLength] = React.useState(String(value ?? defaultValue ?? "").length)
  const count = value != null ? String(value).length : length
  return (
    <Field
      id={inputId}
      label={label}
      labelPosition={labelPosition}
      labelHelp={labelHelp}
      labelAction={labelAction}
      helpText={helpText}
      state={state}
      className={className}
    >
      <div data-slot="field-control" data-tone={state} className={cn(fieldBox, "h-auto flex-col items-stretch px-3")}>
        <textarea
          id={inputId}
          data-slot="multiline-field"
          rows={rows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            setLength(e.target.value.length)
            onChange?.(e)
          }}
          aria-invalid={state === "error" || undefined}
          aria-describedby={helpText != null ? `${inputId}-help` : undefined}
          className={cn(fieldInput, "min-h-12 resize-y text-paragraph-xsmall")}
          {...props}
        />
        {maxLength != null && (
          <span className="self-end text-paragraph-xsmall text-texticons-tertiary">
            {count}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  )
}

export { MultilineField }
