import * as React from "react"
import { ArrowLeftIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

function PageHeader({
  title,
  description,
  leading,
  badge,
  actions,
  onBack,
  className,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  leading?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  onBack?: () => void
}) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex items-start gap-3 bg-background-default px-6 py-4", className)}
      {...props}
    >
      {onBack && (
        <IconButton variant="tertiary" size="micro" label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </IconButton>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          {leading}
          <h1 className="text-header-medium text-texticons-emphasis">{title}</h1>
          {badge}
        </div>
        {description != null && <p className="text-paragraph-small text-neutral-90">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}

export { PageHeader }
