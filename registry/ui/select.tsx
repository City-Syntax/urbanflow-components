"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Field, fieldBox, type FieldProps } from "@/registry/ui/field"

type SelectOption = { value: string; label: React.ReactNode; disabled?: boolean }

function SelectContent({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position="popper"
        sideOffset={4}
        className={cn(
          "z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-y-auto rounded-md bg-neutral-0 p-1.5 shadow-md inset-ring inset-ring-stroke-subtle",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="flex flex-col gap-0.5">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex min-h-7 cursor-pointer items-center gap-2 rounded-md p-1.5 text-paragraph-xsmall text-texticons-primary outline-none select-none data-highlighted:bg-background-light data-[state=checked]:bg-background-medium data-[state=checked]:text-texticons-emphasis data-disabled:cursor-not-allowed data-disabled:text-texticons-disabled",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function Select({
  id,
  label,
  labelPosition,
  labelHelp,
  labelAction,
  helpText,
  state = "default",
  options,
  placeholder = "Select",
  leading,
  unit,
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> &
  FieldProps & {
    id?: string
    options?: (string | SelectOption)[]
    placeholder?: string
    leading?: React.ReactNode
    unit?: React.ReactNode
    className?: string
  }) {
  const autoId = React.useId()
  const triggerId = id ?? autoId
  const items = (options ?? []).map((o) => (typeof o === "string" ? { value: o, label: o } : o))
  return (
    <Field
      id={triggerId}
      label={label}
      labelPosition={labelPosition}
      labelHelp={labelHelp}
      labelAction={labelAction}
      helpText={helpText}
      state={state}
      className={className}
    >
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={triggerId}
          data-slot="field-control"
          data-tone={state}
          aria-invalid={state === "error" || undefined}
          className={cn(
            fieldBox,
            "h-9 w-full cursor-pointer text-left outline-none focus-visible:bg-background-light focus-visible:inset-ring-stroke-info focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-background-light disabled:inset-ring-0"
          )}
        >
          {leading && <span className="inline-flex text-texticons-secondary [&_svg]:size-4">{leading}</span>}
          <span className="min-w-0 flex-1 truncate text-paragraph-xsmall text-texticons-primary in-data-disabled:text-texticons-disabled in-data-placeholder:text-texticons-placeholder">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          {unit && <span className="text-paragraph-small text-neutral-30">{unit}</span>}
          <SelectPrimitive.Icon className="inline-flex text-texticons-secondary [&_svg]:size-5">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectContent>
          {items.map((o) => (
            <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </SelectItem>
          ))}
          {children}
        </SelectContent>
      </SelectPrimitive.Root>
    </Field>
  )
}

export { Select, SelectContent, SelectItem, type SelectOption }
