"use client"

import * as React from "react"

import { Button } from "@/registry/ui/button"
import { Modal, ModalClose, ModalContent } from "@/registry/ui/modal"
import { TextField } from "@/registry/ui/text-field"

const problem = (name: string, maxLength: number) => {
  if (name.length === 0) return "Enter a name for the chat."
  if (name.length > maxLength) return `Use ${maxLength} characters or fewer.`
  return null
}

function RenameForm({
  id,
  input,
  chatTitle,
  maxLength,
  onRename,
  onDone,
}: {
  id: string
  input: React.RefObject<HTMLInputElement | null>
  chatTitle: string
  maxLength: number
  onRename: (title: string) => void
  onDone: () => void
}) {
  const [value, setValue] = React.useState(chatTitle)
  const [tried, setTried] = React.useState(false)
  const name = value.trim()
  const error = problem(name, maxLength)
  const shown = error != null && (tried || name.length > maxLength) ? error : null
  return (
    <form
      id={id}
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setTried(true)
        if (error != null) {
          input.current?.focus()
          return
        }
        if (name !== chatTitle.trim()) onRename(name)
        onDone()
      }}
    >
      <TextField
        ref={input}
        label="Chat name"
        name="title"
        placeholder="New chat"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        state={shown ? "error" : "default"}
        helpText={shown ?? undefined}
        className="gap-2 [&>label]:text-texticons-emphasis"
      />
    </form>
  )
}

function AIRenameChatDialog({
  open,
  onOpenChange,
  chatTitle,
  onRename,
  maxLength = 80,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatTitle?: string | null | undefined
  onRename: (title: string) => void
  maxLength?: number
}) {
  const formId = React.useId()
  const input = React.useRef<HTMLInputElement>(null)
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        title="Rename chat"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          input.current?.select()
        }}
        footer={
          <>
            <ModalClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </ModalClose>
            <Button type="submit" form={formId} variant="primary">
              Save
            </Button>
          </>
        }
      >
        <RenameForm
          id={formId}
          input={input}
          chatTitle={chatTitle ?? ""}
          maxLength={maxLength}
          onRename={onRename}
          onDone={() => onOpenChange(false)}
        />
      </ModalContent>
    </Modal>
  )
}

export { AIRenameChatDialog }
