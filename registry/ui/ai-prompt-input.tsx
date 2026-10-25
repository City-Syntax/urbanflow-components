"use client"

import * as React from "react"
import { AddIcon, ArrowUpStraightIcon, ChevronDownIcon, StopIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/ui/action-list"
import { Button } from "@/registry/ui/button"
import { Command, CommandList } from "@/registry/ui/command"
import { IconButton } from "@/registry/ui/icon-button"

type AIPromptInputStatus = "ready" | "submitted" | "streaming" | "error"

type AIPromptInputOption = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

function AIPromptInput({
  className,
  onSubmit,
  submitWhileGenerating = false,
  ...props
}: React.ComponentProps<"form"> & { submitWhileGenerating?: boolean }) {
  return (
    <form
      data-slot="ai-prompt-input"
      data-submit-while-generating={submitWhileGenerating || undefined}
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-lg border border-stroke-default bg-background-default p-2 shadow-xs has-[[data-slot=ai-prompt-input-context]>*]:border-stroke-selected",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(event)
      }}
      {...props}
    />
  )
}

function AIPromptInputContext({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-prompt-input-context"
      className={cn("flex flex-wrap gap-x-1 gap-y-2 empty:hidden", className)}
      {...props}
    />
  )
}

function AIPromptInputTextarea({
  className,
  onKeyDown,
  rows = 1,
  "aria-label": ariaLabel = "Message",
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="ai-prompt-input-textarea"
      rows={rows}
      aria-label={ariaLabel}
      className={cn(
        "field-sizing-content max-h-30 min-h-5 w-full resize-none bg-transparent text-paragraph-small text-texticons-primary outline-none placeholder:text-texticons-placeholder disabled:cursor-not-allowed [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-xs [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:border-l-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-background-default [&::-webkit-scrollbar-thumb]:bg-texticons-disabled",
        className
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        const composing = event.nativeEvent.isComposing || event.keyCode === 229
        if (event.defaultPrevented || event.key !== "Enter" || event.shiftKey || composing) return
        event.preventDefault()
        const form = event.currentTarget.form
        const submit = form?.querySelector<HTMLButtonElement>("[data-slot=ai-prompt-input-submit]")
        const generating = submit?.dataset.status === "submitted" || submit?.dataset.status === "streaming"
        if (!form || submit?.disabled || (generating && !form.dataset.submitWhileGenerating)) return
        form.requestSubmit()
      }}
      {...props}
    />
  )
}

function AIPromptInputToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="ai-prompt-input-toolbar" className={cn("flex items-center gap-1", className)} {...props} />
}

function AIPromptInputTools({ className, wrap = false, ...props }: React.ComponentProps<"div"> & { wrap?: boolean }) {
  return (
    <div
      data-slot="ai-prompt-input-tools"
      data-wrap={wrap || undefined}
      className={cn(
        "-my-0.5 mr-2 -ml-0.5 flex min-w-0 flex-1 items-center gap-1 py-0.5 pl-0.5",
        wrap
          ? "flex-wrap gap-y-1"
          : "overflow-x-auto [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] [scrollbar-width:none]",
        className
      )}
      {...props}
    />
  )
}

function AIPromptInputAttach({
  label = "Add attachment",
  className,
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "label" | "children"> & { label?: string }) {
  return (
    <IconButton
      type="button"
      variant="tertiary"
      label={label}
      data-slot="ai-prompt-input-attach"
      className={cn("text-texticons-placeholder", className)}
      {...props}
    >
      <AddIcon className="size-4" />
    </IconButton>
  )
}

function AIPromptInputSelect({
  title,
  options,
  value,
  onValueChange,
  placeholder = "Select",
  disabled,
  className,
  "aria-label": ariaLabel,
}: {
  title?: string
  options: AIPromptInputOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: React.ReactNode
  disabled?: boolean
  className?: string
  "aria-label"?: string
}) {
  const selected = options.find((o) => o.value === value) ?? (options.length === 1 ? options[0] : undefined)
  if (options.length === 0) return null
  if (options.length === 1) {
    return (
      <span
        data-slot="ai-prompt-input-select"
        className={cn("inline-flex h-6 shrink-0 items-center px-2 text-label-xsmall whitespace-nowrap text-texticons-secondary", className)}
      >
        {(ariaLabel ?? title) && <span className="sr-only">{ariaLabel ?? title}: </span>}
        {selected?.label}
      </span>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          type="button"
          variant="secondary"
          size="micro"
          data-slot="ai-prompt-input-select"
          className={cn("data-[state=open]:bg-background-light", className)}
        >
          {(ariaLabel ?? title) && <span className="sr-only">{ariaLabel ?? title}: </span>}
          {selected?.label ?? placeholder}
          <ChevronDownIcon className="-mx-0.75 size-5 text-texticons-placeholder" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-60">
        {title && <DropdownMenuLabel className="px-1.5 text-texticons-primary">{title}</DropdownMenuLabel>}
        <DropdownMenuRadioGroup {...(value === undefined ? {} : { value })} {...(onValueChange === undefined ? {} : { onValueChange })}>
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.value} value={o.value} help={o.description} {...(o.disabled === undefined ? {} : { disabled: o.disabled })}>
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const submitFor = {
  send: { label: "Send", icon: <ArrowUpStraightIcon /> },
  stop: { label: "Stop", icon: <StopIcon /> },
}

function AIPromptInputSubmit({
  status = "ready",
  onStop,
  disabled,
  className,
  onClick,
  ...props
}: Omit<React.ComponentProps<"button">, "children" | "type"> & { status?: AIPromptInputStatus; onStop?: () => void }) {
  const generating = status === "submitted" || status === "streaming"
  const { label, icon } = submitFor[generating ? "stop" : "send"]
  return (
    <Button
      type="submit"
      variant="primary"
      size="icon"
      data-slot="ai-prompt-input-submit"
      data-status={status}
      aria-label={label}
      title={label}
      disabled={!generating && disabled}
      className={className}
      onClick={(event) => {
        onClick?.(event)
        if (!generating || event.defaultPrevented) return
        event.preventDefault()
        onStop?.()
      }}
      {...props}
    >
      {icon}
    </Button>
  )
}

function AIPromptInputPicker({
  className,
  children,
  shouldFilter = false,
  ...props
}: React.ComponentProps<typeof Command>) {
  return (
    <Command
      data-slot="ai-prompt-input-picker"
      shouldFilter={shouldFilter}
      className={cn("absolute inset-x-0 bottom-full z-20 mb-2 shadow-md inset-ring inset-ring-stroke-subtle", className)}
      {...props}
    >
      <CommandList className="max-h-64">{children}</CommandList>
    </Command>
  )
}

export {
  AIPromptInput,
  AIPromptInputContext,
  AIPromptInputTextarea,
  AIPromptInputToolbar,
  AIPromptInputTools,
  AIPromptInputAttach,
  AIPromptInputSelect,
  AIPromptInputSubmit,
  AIPromptInputPicker,
  type AIPromptInputStatus,
  type AIPromptInputOption,
}
