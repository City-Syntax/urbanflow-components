"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/registry/ui/button"
import { Modal, ModalClose, ModalContent } from "@/registry/ui/modal"

function AIDeleteChatDialog({
  open,
  onOpenChange,
  chatTitle,
  onDelete,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatTitle?: string | null | undefined
  onDelete: () => void
}) {
  const cancel = React.useRef<HTMLButtonElement>(null)
  const name = chatTitle?.trim()
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        title="Delete chat?"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          cancel.current?.focus()
        }}
        footer={
          <>
            <ModalClose asChild>
              <Button ref={cancel} type="button" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button
              type="button"
              variant="primary"
              tone="critical"
              onClick={() => {
                onDelete()
                onOpenChange(false)
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <DialogPrimitive.Description className="text-texticons-primary">
          {name ? `“${name}” will be removed from your chats.` : "This chat will be removed from your chats."} This can’t be undone.
        </DialogPrimitive.Description>
      </ModalContent>
    </Modal>
  )
}

export { AIDeleteChatDialog }
