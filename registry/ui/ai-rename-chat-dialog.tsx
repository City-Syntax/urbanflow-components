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

function RenameContent({
  chatTitle,
  maxLength,
  onRename,
  onDone,
}: {
  chatTitle: string
  maxLength: number
  onRename: (title: string) => void | Promise<void>
  onDone: () => void
}) {
  const formId = React.useId()
  const input = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState(chatTitle)
  const [tried, setTried] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const name = value.trim()
  const error = problem(name, maxLength)
  const invalid = error != null && (tried || name.length > maxLength) ? error : null
  const shown = invalid ?? (failed ? "Couldn’t rename the chat. Try again." : null)
  return (
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
          <Button type="submit" form={formId} variant="primary" loading={saving}>
            Save
          </Button>
        </>
      }
    >
      <form
        id={formId}
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          setTried(true)
          setFailed(false)
          if (error != null) {
            input.current?.focus()
            return
          }
          if (name === chatTitle.trim()) return onDone()
          const result = onRename(name)
          if (!(result instanceof Promise)) return onDone()
          setSaving(true)
          result.then(onDone, () => {
            setSaving(false)
            setFailed(true)
            input.current?.focus()
          })
        }}
      >
        <TextField
          ref={input}
          label="Chat name"
          name="title"
          placeholder="New chat"
          autoComplete="off"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value)
            setFailed(false)
          }}
          state={shown ? "error" : "default"}
          helpText={shown ?? undefined}
          className="gap-2 [&>label]:text-texticons-emphasis"
        />
      </form>
    </ModalContent>
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
  onRename: (title: string) => void | Promise<void>
  maxLength?: number | undefined
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {open && (
        <RenameContent
          chatTitle={chatTitle ?? ""}
          maxLength={maxLength}
          onRename={onRename}
          onDone={() => onOpenChange(false)}
        />
      )}
    </Modal>
  )
}

export { AIRenameChatDialog }
