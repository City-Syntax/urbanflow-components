import * as React from "react"

import { cn } from "@/lib/utils"

function AICodeBlock({ className, children, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      data-slot="ai-code-block"
      className={cn(
        "w-full overflow-x-auto rounded-lg bg-background-light p-3 font-mono text-paragraph-xsmall whitespace-pre-wrap break-words text-texticons-primary",
        className
      )}
      {...props}
    >
      <code>{children}</code>
    </pre>
  )
}

export { AICodeBlock }
