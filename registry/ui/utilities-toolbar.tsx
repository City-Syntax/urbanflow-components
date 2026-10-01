import * as React from "react"

import { cn } from "@/lib/utils"
import { IconButton, IconButtonGroup } from "@/registry/ui/icon-button"

type UtilityItem = {
  value: string
  label: string
  icon: React.ReactNode
  disabled?: boolean
}

function UtilitiesToolbar({
  groups,
  value,
  onValueChange,
  label = "Utilities",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  groups: UtilityItem[][]
  value?: string
  onValueChange?: (value: string) => void
  label?: string
}) {
  return (
    <div data-slot="utilities-toolbar" className={cn("inline-flex flex-col gap-2", className)} {...props}>
      {groups.map((group, i) => (
        <IconButtonGroup key={i} label={label} orientation="vertical">
          {group.map((item) => (
            <IconButton
              key={item.value}
              size="large"
              label={item.label}
              selected={value === undefined ? undefined : value === item.value}
              disabled={item.disabled}
              onClick={() => onValueChange?.(item.value)}
              className="text-texticons-placeholder aria-pressed:bg-background-medium aria-pressed:text-texticons-emphasis"
            >
              {item.icon}
            </IconButton>
          ))}
        </IconButtonGroup>
      ))}
    </div>
  )
}

export { UtilitiesToolbar, type UtilityItem }
