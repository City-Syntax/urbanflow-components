import * as React from "react"
import { ArrowLeftIcon, CloseIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function FullScreenModalHeader({
  title,
  leading,
  tabs,
  actions,
  onBack,
  onClose,
  className,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title?: React.ReactNode
  leading?: React.ReactNode
  tabs?: React.ReactNode
  actions?: React.ReactNode
  onBack?: () => void
  onClose?: () => void
}) {
  return (
    <header
      data-slot="full-screen-modal-header"
      className={cn(
        "flex h-14 items-center gap-3 bg-background-default px-4 shadow-[inset_0_-1px_0_var(--color-stroke-subtle)]",
        className
      )}
      {...props}
    >
      {onBack && (
        <IconButton variant="tertiary" size="micro" label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </IconButton>
      )}
      {leading}
      {title != null ? (
        <h2 className="min-w-0 flex-1 truncate text-header-medium text-texticons-emphasis">{title}</h2>
      ) : (
        <span className="flex-1" />
      )}
      {tabs}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      {onClose && (
        <IconButton variant="tertiary" size="micro" label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </header>
  )
}

export { FullScreenModalHeader }
