"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/registry/ui/button"
import { InlineError } from "@/registry/ui/field"
import { Modal, ModalClose, ModalContent } from "@/registry/ui/modal"

function DeleteContent({
  chatTitle,
  onDelete,
  onDone,
}: {
  chatTitle?: string | null | undefined
  onDelete: () => void | Promise<void>
  onDone: () => void
}) {
  const cancel = React.useRef<HTMLButtonElement>(null)
  const [deleting, setDeleting] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const name = chatTitle?.trim()
  return (
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
            loading={deleting}
            onClick={() => {
              setFailed(false)
              const result = onDelete()
              if (!(result instanceof Promise)) return onDone()
              setDeleting(true)
              result.then(onDone, () => {
                setDeleting(false)
                setFailed(true)
              })
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
      {failed && <InlineError className="mt-3">Couldn’t delete the chat. Try again.</InlineError>}
    </ModalContent>
  )
}

function AIDeleteChatDialog({
  open,
  onOpenChange,
  chatTitle,
  onDelete,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatTitle?: string | null | undefined
  onDelete: () => void | Promise<void>
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {open && <DeleteContent chatTitle={chatTitle} onDelete={onDelete} onDone={() => onOpenChange(false)} />}
    </Modal>
  )
}

export { AIDeleteChatDialog }
