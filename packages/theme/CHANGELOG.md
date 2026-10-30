# @urbanflow/theme

## 0.5.0

### Minor Changes

- 0e8c76f: Add Chart, ChartCard and WeatherCharts: nine chart forms, 18 weather analyses, Details with a data table, and loading/error/empty/truncation states ported from Flux. Install the registry items and upgrade @urbanflow/theme together to obtain Chart/Axis, Chart/Title, Chart/Query and both 21-stop chart ramps from Flow. Chart rendering has no Flux runtime dependency; consumers supply results or normalized weather columns. See docs/charts.md for input shapes and migration guidance.

## 0.4.0

No changes in this release.

## 0.3.0

No changes in this release.

## 0.2.0

No changes in this release.

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
