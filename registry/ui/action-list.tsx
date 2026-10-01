"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const listClass =
  "flex min-w-40 flex-col gap-0.5 rounded-md bg-neutral-0 p-1.5 shadow-md inset-ring inset-ring-stroke-subtle"
const sectionClass = "px-3 pt-1.5 pb-1 text-label-xsmall text-texticons-tertiary"
const itemClass =
  "flex min-h-7 w-full cursor-pointer items-center gap-2 rounded-md p-1.5 text-left text-paragraph-xsmall text-texticons-primary outline-none select-none hover:bg-background-light focus-visible:shadow-focus data-highlighted:bg-background-light active:bg-background-medium data-[selected=true]:bg-background-medium data-[selected=true]:text-texticons-emphasis data-[destructive=true]:text-texticons-critical-primary data-[destructive=true]:hover:bg-background-critical data-[destructive=true]:data-highlighted:bg-background-critical disabled:cursor-not-allowed disabled:bg-transparent disabled:text-texticons-disabled data-disabled:cursor-not-allowed data-disabled:text-texticons-disabled [&_svg]:size-4 [&_svg]:shrink-0"

type ItemExtras = { icon?: React.ReactNode; help?: React.ReactNode; trailing?: React.ReactNode; destructive?: boolean }

function ItemBody({ icon, help, trailing, destructive, children }: ItemExtras & { children?: React.ReactNode }) {
  const iconTone = destructive ? "text-texticons-critical-primary" : "text-texticons-secondary"
  return (
    <>
      {icon && <span className={cn("inline-flex", iconTone)}>{icon}</span>}
      <span className="flex flex-1 flex-col">
        <span>{children}</span>
        {help && <span className="text-texticons-tertiary">{help}</span>}
      </span>
      {trailing && <span className={cn("inline-flex", iconTone)}>{trailing}</span>}
    </>
  )
}

function ActionList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="action-list" role="menu" className={cn(listClass, className)} {...props} />
}

function ActionSection({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="action-section" role="presentation" className={cn(sectionClass, className)} {...props} />
}

function ActionItem({
  icon,
  help,
  trailing,
  destructive,
  selected,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & ItemExtras & { selected?: boolean }) {
  return (
    <button
      type="button"
      data-slot="action-item"
      role="menuitem"
      aria-current={selected || undefined}
      data-selected={selected || undefined}
      data-destructive={destructive || undefined}
      className={cn(itemClass, className)}
      {...props}
    >
      <ItemBody icon={icon} help={help} trailing={trailing} destructive={destructive}>
        {children}
      </ItemBody>
    </button>
  )
}

function DropdownMenu(props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger(props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = "start",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(listClass, "z-50", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label data-slot="dropdown-menu-label" className={cn(sectionClass, className)} {...props} />
}

function DropdownMenuItem({
  icon,
  help,
  trailing,
  destructive,
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & ItemExtras) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-destructive={destructive || undefined}
      className={cn(itemClass, className)}
      {...props}
    >
      <ItemBody icon={icon} help={help} trailing={trailing} destructive={destructive}>
        {children}
      </ItemBody>
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1.5 my-1 h-px bg-stroke-subtle", className)}
      {...props}
    />
  )
}

export {
  ActionList,
  ActionSection,
  ActionItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
