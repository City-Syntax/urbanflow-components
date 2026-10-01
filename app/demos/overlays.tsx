"use client"

import * as React from "react"
import { CopyIcon, DownloadIcon, PencilIcon, TrashIcon } from "@urbanflow/icons"

import {
  ActionItem,
  ActionList,
  ActionSection,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/action-list"
import { Banner } from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"
import { Modal, ModalClose, ModalContent, ModalTrigger } from "@/registry/ui/modal"
import { TextField } from "@/registry/ui/text-field"
import { Toast, ToastProvider, ToastViewport } from "@/registry/ui/toast"

export function OverlaysDemo() {
  const [toasts, setToasts] = React.useState<{ id: number; critical: boolean }[]>([])
  const push = (critical: boolean) => setToasts((t) => [...t, { id: Date.now(), critical }])
  return (
    <ToastProvider>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-start gap-6">
          <ActionList className="w-56">
            <ActionSection>Scheme</ActionSection>
            <ActionItem icon={<PencilIcon />}>Rename</ActionItem>
            <ActionItem icon={<CopyIcon />} help="Copies parameters and geometry">Duplicate</ActionItem>
            <ActionItem icon={<DownloadIcon />} selected>Export</ActionItem>
            <ActionItem icon={<DownloadIcon />} disabled>Export IFC</ActionItem>
            <ActionItem icon={<TrashIcon />} destructive>Delete</ActionItem>
          </ActionList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Scheme</DropdownMenuLabel>
              <DropdownMenuItem icon={<PencilIcon />}>Rename</DropdownMenuItem>
              <DropdownMenuItem icon={<CopyIcon />}>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={<TrashIcon />} destructive>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary">Open modal</Button>
            </ModalTrigger>
            <ModalContent
              title="Rename scheme"
              footer={
                <>
                  <ModalClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button variant="primary">Save</Button>
                  </ModalClose>
                </>
              }
            >
              <TextField label="Scheme name" defaultValue="Proposal 1" />
            </ModalContent>
          </Modal>
          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary" tone="critical">Small modal</Button>
            </ModalTrigger>
            <ModalContent
              size="small"
              title="Delete scheme?"
              footer={
                <>
                  <ModalClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button variant="primary" tone="critical">Delete</Button>
                  </ModalClose>
                </>
              }
            >
              Proposal 1 and its simulation results will be removed.
            </ModalContent>
          </Modal>
          <Button variant="secondary" onClick={() => push(false)}>Show toast</Button>
          <Button variant="secondary" tone="critical" onClick={() => push(true)}>Show critical toast</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Banner tone="info" title="Simulation queued">Results usually take 2–3 minutes.</Banner>
          <Banner tone="success" onDismiss={() => {}}>Simulation complete</Banner>
          <Banner tone="warning" title="Estimated values" actions={<Button variant="secondary" size="micro">Review</Button>}>
            3 floors use Archetype defaults.
          </Banner>
          <Banner tone="critical" title="Simulation failed">Zone 4 has no Space Use.</Banner>
          <Banner inCard tone="info" title="from Archetype default">Override any value to set it for this floor.</Banner>
          <Banner inCard tone="success">Within Green Mark target</Banner>
          <Banner inCard tone="warning" title="Near limit">Site EUI is 4% under the target.</Banner>
          <Banner inCard tone="critical" onDismiss={() => {}}>Exceeds GFA allowance</Banner>
        </div>
        <ToastProvider>
          <Toast open dismissible={false} duration={Infinity}>Scheme saved</Toast>
          <Toast open action="Undo" duration={Infinity}>Zone deleted</Toast>
          <Toast open tone="critical" action="Retry" duration={Infinity}>Couldn&apos;t run simulation</Toast>
          <ToastViewport className="static translate-x-0 flex-row flex-wrap items-start gap-3" />
        </ToastProvider>
      </div>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          tone={t.critical ? "critical" : "default"}
          action={t.critical ? "Retry" : "Undo"}
          onOpenChange={(open) => !open && setToasts((all) => all.filter((x) => x.id !== t.id))}
        >
          {t.critical ? "Couldn't run simulation" : "Scheme saved"}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
