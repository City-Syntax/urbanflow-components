"use client"

import * as React from "react"
import { AddIcon, MinusIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"

const stepButton =
  "inline-flex cursor-pointer items-center justify-center p-1 text-texticons-primary outline-none hover:bg-background-light focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-texticons-disabled disabled:hover:bg-transparent [&_svg]:size-4"

function ImageZoomSelector({
  value,
  onValueChange,
  min = 1,
  max = 100,
  step = 10,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}) {
  const [typed, setTyped] = React.useState<string | null>(null)
  const cancelled = React.useRef(false)
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next)))
  const commit = () => {
    const next = Number(typed)
    if (!cancelled.current && typed !== null && typed.trim() !== "" && Number.isFinite(next)) onValueChange(clamp(next))
    cancelled.current = false
    setTyped(null)
  }
  return (
    <div
      data-slot="image-zoom-selector"
      role="group"
      aria-label="Zoom"
      className={cn(
        "inline-flex w-24 items-stretch overflow-hidden rounded-sm border border-stroke-default bg-background-default shadow-xs",
        className
      )}
      {...props}
    >
      <button
        type="button"
        aria-label="Zoom out"
        disabled={value <= min}
        onClick={() => onValueChange(clamp(value - step))}
        className={cn(stepButton, "border-r border-stroke-default")}
      >
        <MinusIcon />
      </button>
      <input
        aria-label="Zoom percent"
        inputMode="numeric"
        value={typed ?? `${value}%`}
        onFocus={(event) => {
          setTyped(String(value))
          requestAnimationFrame(() => event.target.select())
        }}
        onChange={(event) => setTyped(event.target.value.replace(/[^\d]/g, ""))}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur()
          if (event.key === "Escape") {
            cancelled.current = true
            event.currentTarget.blur()
          }
        }}
        className="min-w-0 flex-1 cursor-text bg-transparent px-1.5 text-center text-paragraph-xsmall text-texticons-primary outline-none focus:bg-background-light"
      />
      <button
        type="button"
        aria-label="Zoom in"
        disabled={value >= max}
        onClick={() => onValueChange(clamp(value + step))}
        className={cn(stepButton, "border-l border-stroke-default")}
      >
        <AddIcon />
      </button>
    </div>
  )
}

export { ImageZoomSelector }
