import * as React from "react"
import { AlertTriangleIcon, CheckIcon, CloseIcon, InfoIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/icon-button"

type BannerTone = "info" | "success" | "warning" | "critical"

const toneIcon: Record<BannerTone, React.ReactNode> = {
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <AlertTriangleIcon />,
  critical: <AlertTriangleIcon />,
}

const tileTone: Record<BannerTone, string> = {
  info: "bg-info-xxlight text-info-primary",
  success: "bg-success-light text-texticons-inverse-primary",
  warning: "bg-caution-light text-caution-heavy",
  critical: "bg-critical-primary text-texticons-inverse-primary",
}

const cardTone: Record<BannerTone, string> = {
  info: "bg-background-info text-texticons-link-secondary",
  success: "bg-background-success text-texticons-success-primary",
  warning: "bg-background-caution text-caution-heavy",
  critical: "bg-background-critical text-texticons-critical-primary",
}

function Banner({
  tone = "info",
  title,
  actions,
  inCard = false,
  onDismiss,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  tone?: BannerTone
  title?: React.ReactNode
  actions?: React.ReactNode
  inCard?: boolean
  onDismiss?: () => void
}) {
  const role = tone === "critical" || tone === "warning" ? "alert" : "status"
  const heading = title ?? children
  const body = title != null ? children : null
  const dismiss = onDismiss && (
    <IconButton variant="tertiary" size="micro" label="Dismiss" onClick={onDismiss} className="text-current">
      <CloseIcon />
    </IconButton>
  )
  if (inCard) {
    return (
      <div
        data-slot="banner"
        role={role}
        className={cn("flex flex-col gap-2 rounded-md p-2", cardTone[tone], className)}
        {...props}
      >
        <div className="flex items-center gap-2 [&>svg]:size-5 [&>svg]:shrink-0">
          {toneIcon[tone]}
          <strong className="flex-1 text-label-small">{heading}</strong>
          {dismiss}
        </div>
        {body != null && <div className="text-paragraph-small">{body}</div>}
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    )
  }
  return (
    <div
      data-slot="banner"
      role={role}
      className={cn(
        "flex items-center gap-2 rounded-lg bg-background-default py-3 pr-2 pl-3 shadow-xs inset-ring inset-ring-stroke-default",
        className
      )}
      {...props}
    >
      <span className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-md [&_svg]:size-5", tileTone[tone])}>
        {toneIcon[tone]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-0.5 text-paragraph-small text-texticons-secondary">
          <strong className="text-label-small text-texticons-emphasis">{heading}</strong>
          {body != null && <span>{body}</span>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {dismiss}
    </div>
  )
}

export { Banner, type BannerTone }
