"use client"

import * as React from "react"

import { Field, fieldBox, fieldInput, type FieldProps } from "@/registry/ui/field"

function NumberStepper({
  onIncrement,
  onDecrement,
  disabled,
}: {
  onIncrement?: () => void
  onDecrement?: () => void
  disabled?: boolean
}) {
  const half =
    "flex h-2.5 w-4 items-center justify-center rounded-xs text-texticons-secondary not-disabled:hover:bg-background-medium disabled:text-texticons-disabled"
  return (
    <span data-slot="number-stepper" className="inline-flex flex-col gap-px">
      <button type="button" aria-label="Increase" className={half} disabled={disabled} onClick={onIncrement}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" aria-label="Decrease" className={half} disabled={disabled} onClick={onDecrement}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </span>
  )
}

function TextField({
  id,
  label,
  labelPosition,
  labelHelp,
  labelAction,
  helpText,
  state = "default",
  prefix,
  suffix,
  unit,
  stepper,
  onIncrement,
  onDecrement,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "prefix"> &
  FieldProps & {
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    unit?: React.ReactNode
    stepper?: boolean
    onIncrement?: () => void
    onDecrement?: () => void
  }) {
  const autoId = React.useId()
  const inputId = id ?? autoId
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
      <div data-slot="field-control" data-tone={state} className={fieldBox}>
        {prefix && <span className="inline-flex text-texticons-secondary [&_svg]:size-4">{prefix}</span>}
        <input
          id={inputId}
          data-slot="text-field"
          aria-invalid={state === "error" || undefined}
          aria-describedby={helpText != null ? `${inputId}-help` : undefined}
          className={fieldInput}
          {...props}
        />
        {unit && <span className="text-paragraph-small text-neutral-30">{unit}</span>}
        {suffix && <span className="inline-flex text-texticons-secondary [&_svg]:size-4">{suffix}</span>}
        {stepper && <NumberStepper onIncrement={onIncrement} onDecrement={onDecrement} disabled={props.disabled} />}
      </div>
    </Field>
  )
}

export { TextField, NumberStepper }
