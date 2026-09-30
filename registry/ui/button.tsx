import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
// Flow Button (Figma 1712:13271). Hover/active/pressed move one step; focus is the Flow focus ring.
const primary = "bg-background-inverse text-texticons-inverse-primary disabled:bg-background-medium"
const secondary =
  "bg-background-default inset-ring inset-ring-stroke-default not-disabled:hover:bg-background-light not-disabled:active:bg-background-medium not-disabled:active:inset-ring-0 aria-pressed:bg-background-medium aria-pressed:inset-ring-0 disabled:bg-background-light disabled:inset-ring-0"
const tertiary =
  "not-disabled:hover:bg-background-light not-disabled:active:bg-background-medium aria-pressed:bg-background-medium"
const plain = "underline-offset-2 not-disabled:hover:underline"

const micro = "h-6 gap-0.5 px-2 [&_svg:not([class*='size-'])]:size-3.5"
const medium = "h-7 gap-0.5 px-3"
const large = "h-8 gap-1 px-4"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-label-xsmall transition-colors outline-none focus-visible:shadow-focus disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary,
        secondary,
        tertiary,
        plain,
        default: primary,
        destructive: primary,
        outline: secondary,
        ghost: tertiary,
        link: plain,
      },
      tone: {
        default: null,
        critical: null,
        success: null,
      },
      size: {
        micro,
        medium,
        large,
        "icon-micro": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-7",
        "icon-large": "size-8",
        default: medium,
        xs: micro,
        sm: micro,
        lg: large,
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-8",
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "default"],
        tone: "default",
        class: "not-disabled:hover:bg-neutral-100 not-disabled:active:bg-neutral-90 aria-pressed:bg-neutral-90",
      },
      {
        variant: ["primary", "default", "destructive"],
        tone: "critical",
        class: "not-disabled:bg-critical-primary not-disabled:hover:bg-critical-heavy not-disabled:active:bg-critical-xxheavy aria-pressed:bg-critical-heavy",
      },
      {
        variant: "destructive",
        tone: "default",
        class: "not-disabled:bg-critical-primary not-disabled:hover:bg-critical-heavy not-disabled:active:bg-critical-xxheavy aria-pressed:bg-critical-heavy",
      },
      {
        variant: ["primary", "default"],
        tone: "success",
        class: "not-disabled:bg-success-light not-disabled:hover:bg-success-primary not-disabled:active:bg-success-heavy aria-pressed:bg-success-heavy",
      },
      { variant: ["secondary", "tertiary", "outline", "ghost"], tone: "default", class: "text-texticons-emphasis" },
      { variant: ["secondary", "tertiary", "outline", "ghost"], tone: "critical", class: "text-texticons-critical-primary" },
      { variant: ["secondary", "tertiary", "outline", "ghost"], tone: "success", class: "text-texticons-success-primary" },
      { variant: ["plain", "link"], tone: "default", class: "text-texticons-link-primary not-disabled:hover:text-texticons-link-secondary" },
      { variant: ["plain", "link"], tone: "critical", class: "text-texticons-critical-primary not-disabled:hover:text-texticons-critical-secondary" },
      { variant: ["plain", "link"], tone: "success", class: "text-texticons-success-primary" },
      { variant: ["secondary", "tertiary", "plain", "outline", "ghost", "link"], class: "disabled:text-neutral-20" },
      { variant: ["plain", "link"], class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "secondary",
      tone: "default",
      size: "medium",
    },
  }
)

function Button({
  className,
  variant = "secondary",
  tone = "default",
  size = "medium",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, tone, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && !asChild ? (
        <>
          <span className="invisible contents">{children}</span>
          <span
            aria-hidden
            className="absolute size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
