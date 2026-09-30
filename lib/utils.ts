import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the Flow tokens, so a text style (text-label-xsmall) and a text colour
// (text-texticons-primary) on the same element don't cancel each other out.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [(v: string) => /^(header|paragraph|label|metric)-/.test(v)] }],
      shadow: [{ shadow: ["xs", "sm", "md", "lg", "float", "focus"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
