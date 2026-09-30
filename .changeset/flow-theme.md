---
"@urbanflow/theme": minor
---

Theme now follows the Flow Design System Figma file (`NQpg4P9K158sjcEKmMLd8w`).

- **Text colours** are one ink (#202020) at 100/80/70/50/40/30% instead of solid greys. New `text-content-emphasis` (100%) for titles and key values; `content-primary` is now 80% ink. Check text on tinted or dark grounds still reads.
- **Corners** match Flow: `rounded-xs` 2px (new), `rounded-sm` 4px, `rounded-md` 8px (was 6), `rounded-lg` 12px (was 8), `rounded-xl` 12px (was 16). Stock shadcn buttons, inputs and cards get rounder.
- **Borders**: shadcn's `border` / `input` colours now use `stroke-default` (#e3e3dc). `stroke-xlight`, `stroke-light` and `stroke-medium` are deprecated — switch to `stroke-subtle` / `stroke-default` / `stroke-strong`; they'll be removed in the next major.
- **New tokens**: `text-label-small`, `bg-surface-card`, `bg-surface-inverse-secondary`, `shadow-lg`, `shadow-float`, `shadow-focus`.
