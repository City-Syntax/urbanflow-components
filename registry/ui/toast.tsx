"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import { CloseIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

function ToastProvider({ duration = 4000, ...props }: React.ComponentProps<typeof ToastPrimitive.Provider>) {
  return <ToastPrimitive.Provider data-slot="toast-provider" duration={duration} {...props} />
}

function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn("fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 outline-none", className)}
      {...props}
    />
  )
}

function Toast({
  tone = "default",
  action,
  onAction,
  dismissible = true,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToastPrimitive.Root>, "type"> & {
  tone?: "default" | "critical"
  action?: React.ReactNode
  onAction?: () => void
  dismissible?: boolean
}) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      type={tone === "critical" ? "foreground" : "background"}
      className={cn(
        "inline-flex min-h-11 w-fit items-center gap-2 rounded-md px-3 py-1.5 text-label-xsmall text-texticons-inverse-primary shadow-md",
        tone === "critical" ? "bg-critical-primary" : "bg-background-inverse",
        className
      )}
      {...props}
    >
      <ToastPrimitive.Description>{children}</ToastPrimitive.Description>
      {(action || dismissible) && (
        <span className="inline-flex items-center gap-2">
          {action && (
            <ToastPrimitive.Action
              altText={typeof action === "string" ? action : "Action"}
              onClick={onAction}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-label-xsmall text-texticons-inverse-primary outline-none focus-visible:shadow-focus",
                tone === "critical" ? "hover:bg-critical-heavy" : "hover:bg-background-inverse-secondary"
              )}
            >
              {action}
            </ToastPrimitive.Action>
          )}
          {dismissible && (
            <ToastPrimitive.Close
              aria-label="Dismiss"
              className="inline-flex cursor-pointer rounded-sm p-[3px] text-texticons-inverse-secondary outline-none hover:text-texticons-inverse-primary focus-visible:shadow-focus [&_svg]:size-3.5"
            >
              <CloseIcon />
            </ToastPrimitive.Close>
          )}
        </span>
      )}
    </ToastPrimitive.Root>
  )
}

export { Toast, ToastProvider, ToastViewport }
