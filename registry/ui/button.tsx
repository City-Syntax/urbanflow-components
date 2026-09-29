import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// urbanflow Button — Figma "Platform" › Design System › Button (1712:13271).
// Figma names are the real API; shadcn's names (default, destructive, outline,
// ghost, link, sm, lg, icon…) are kept as aliases so stock shadcn components
// that call buttonVariants() keep working.
const primary = "bg-primary text-primary-foreground"
const secondary =
  "bg-surface-default shadow-button not-disabled:hover:bg-surface-light not-disabled:active:bg-surface-medium aria-pressed:bg-surface-medium disabled:shadow-none"
const tertiary =
  "not-disabled:hover:bg-surface-light not-disabled:active:bg-surface-medium aria-pressed:bg-surface-medium"
const plain = "underline-offset-2 not-disabled:hover:underline"

const micro = "h-6 gap-0.5 px-2 [&_svg:not([class*='size-'])]:size-3.5"
const medium = "h-7 gap-0.5 px-3"
const large = "h-8 gap-1 px-4"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg text-label-xsmall transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-content-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
        // Colour depends on variant + tone together, so it lives in compoundVariants.
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
      // ponytail: hover/pressed shades for filled buttons are best guesses (Figma MCP was rate-limited); verify against 1712:13271
      {
        variant: ["primary", "default"],
        tone: "default",
        class: "not-disabled:hover:bg-neutral-100 not-disabled:active:bg-neutral-90 aria-pressed:bg-neutral-90",
      },
      {
        variant: ["primary", "default", "destructive"],
        tone: "critical",
        class: "bg-critical-primary not-disabled:hover:bg-critical-heavy not-disabled:active:bg-critical-xxheavy aria-pressed:bg-critical-xxheavy",
      },
      {
        variant: "destructive",
        tone: "default",
        class: "bg-critical-primary not-disabled:hover:bg-critical-heavy not-disabled:active:bg-critical-xxheavy aria-pressed:bg-critical-xxheavy",
      },
      {
        variant: ["primary", "default"],
        tone: "success",
        class: "bg-success-primary not-disabled:hover:bg-success-heavy not-disabled:active:bg-success-xxheavy aria-pressed:bg-success-xxheavy",
      },
      {
        variant: ["primary", "default", "destructive"],
        class: "disabled:bg-surface-light",
      },
      { variant: ["secondary", "tertiary", "plain", "outline", "ghost", "link"], tone: "default", class: "text-content-primary" },
      { variant: ["secondary", "tertiary", "plain", "outline", "ghost", "link"], tone: "critical", class: "text-content-critical-primary" },
      { variant: ["secondary", "tertiary", "plain", "outline", "ghost", "link"], tone: "success", class: "text-content-success-primary" },
      // Plain is text-only: no box, whatever size is passed.
      { variant: ["plain", "link"], class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "default",
      size: "medium",
    },
  }
)

function Button({
  className,
  variant = "primary",
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
    /** Shows a spinner in place of the label and disables the button. */
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
