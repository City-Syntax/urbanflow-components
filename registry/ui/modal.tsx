"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { CloseIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

const dimmerClass = "fixed inset-0 z-50 bg-background-overlay"

function Dimmer({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dimmer" className={cn(dimmerClass, className)} {...props} />
}

function Modal(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />
}

function ModalTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />
}

function ModalClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="modal-close" {...props} />
}

function ModalContent({
  title,
  description,
  footer,
  size = "default",
  showClose = true,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  size?: "default" | "small"
  showClose?: boolean
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay data-slot="modal-overlay" className={dimmerClass} />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-background-default shadow-md outline-none",
          size === "small" ? "w-90" : "w-155",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2 bg-background-light px-4 py-3">
          <DialogPrimitive.Title className="text-header-small text-texticons-emphasis">{title}</DialogPrimitive.Title>
          {showClose && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="inline-flex cursor-pointer rounded-md p-0.5 text-texticons-secondary outline-none hover:bg-background-medium focus-visible:shadow-focus [&_svg]:size-5"
            >
              <CloseIcon />
            </DialogPrimitive.Close>
          )}
        </div>
        <div className="p-4 text-paragraph-small text-texticons-secondary">
          {description != null && <DialogPrimitive.Description className="mb-3">{description}</DialogPrimitive.Description>}
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-2 px-4 py-3 shadow-[inset_0_1px_0_var(--color-stroke-subtle)]">{footer}</div>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Modal, ModalTrigger, ModalContent, ModalClose, Dimmer }
