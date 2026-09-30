# @urbanflow/theme

## 0.1.0

### Minor Changes

- 961272e: Theme now follows the Flow Design System Figma file (`NQpg4P9K158sjcEKmMLd8w`), and only Flow tokens exist.
  
  - **Names match Figma.** Figma variable → class, lowercase with dashes: `Background/Default` → `bg-background-default`, `TextIcons/Primary` → `text-texticons-primary`, `Stroke/default` → `border-stroke-default`, `Semantic/info-primary` → `info-primary`, `Neutrals/neutral-10` → `neutral-10`, `Misc/misc-red` → `misc-red`. Text styles: `header/large` → `text-header-large`. (Pre-release names `surface-*` / `content-*` are gone: use `background-*` / `texticons-*`.)
  - **Flow only.** Tailwind's default colours (`bg-white`, `text-gray-500`…), font sizes (`text-sm`…), shadows and radii are switched off, and shadcn's colour aliases (`bg-primary`, `text-muted-foreground`, `border-input`, `chart-*`, `sidebar-*`) are removed. Stock shadcn components must be re-skinned with Flow classes before use (see the mapping in AGENTS.md).
  - **Text colours** are one ink (#202020) at 100/80/70/50/40/30%: `texticons-emphasis`, `-primary`, `-secondary`, `-tertiary`, `-placeholder`, `-disabled`.
  - **Corners**: `rounded-none` 0, `rounded-xs` 2px, `rounded-sm` 4px, `rounded-md` 8px, `rounded-lg` 12px, `rounded-full`. There is no `rounded-xl`.
  - **Shadows**: `shadow-xs`, `-sm`, `-md`, `-lg`, `-float`, `-focus`.
  - Default border colour is `stroke-default`; focus outlines are `info-primary`; the page is `background-default` with `texticons-primary` text.
- f0b1449: First release: design tokens (colours, typography, shadows, radius) and icons from the Figma design system, plus the component registry and preview site.
