"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type TabsVariant = "pill" | "underline"

const TabsVariantContext = React.createContext<TabsVariant>("pill")

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} />
}

function TabsList({
  variant = "pill",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn("flex items-center", variant === "pill" ? "gap-1" : "gap-6", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 whitespace-nowrap outline-none focus-visible:shadow-focus disabled:cursor-not-allowed [&_svg]:size-4 [&_svg]:shrink-0",
        variant === "pill" &&
          "h-7 rounded-md px-3 text-label-small text-texticons-emphasis not-disabled:hover:bg-background-light data-[state=active]:bg-background-medium data-[state=active]:hover:bg-background-medium disabled:text-neutral-30",
        variant === "underline" &&
          "py-2 text-label-xsmall text-neutral-20 not-disabled:hover:text-texticons-primary data-[state=active]:text-texticons-emphasis data-[state=active]:shadow-[inset_0_-2px_0_var(--color-texticons-emphasis)] disabled:text-texticons-disabled",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
