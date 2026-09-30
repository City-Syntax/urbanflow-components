# @urbanflow/registry

## 0.1.0

### Minor Changes

- 34f2bdc: **Button** (`npx shadcn add @urbanflow/button`): variants `primary`, `secondary`, `tertiary`, `plain`; tones `default`, `critical`, `success`; sizes `micro` (24px), `medium` (28px, default), `large` (32px) and `icon-micro`, `icon`, `icon-large`; `loading` prop; pressed state via `aria-pressed`. shadcn's names (`destructive`, `outline`, `ghost`, `link`, `sm`, `lg`…) still work, so stock shadcn components that use Button keep working.
  
  Matches the Flow Button in Figma: `secondary` is the default variant (white with a 1px `stroke-default` edge), corners `rounded-md` (8px), focus uses `shadow-focus`, `plain` is link-blue text.
- 3d372e0: New components from the Flow Components page (`npx shadcn add https://components.urbanflow.co/r/<name>.json`):
  
  - **Icon Button** (`icon-button`): `IconButton` (label required; `micro` / `medium` / `large`; `selected` for tool toggles) and `IconButtonGroup` (floating toolbar, horizontal or vertical).
  - **Badge** (`badge`): `type` default / info / critical × `shape` label / number / small-number.
  - **Checkbox** (`checkbox`): 16px box or `variant="icon"` eye for layer visibility; checked / indeterminate / disabled; optional `label`.
  - **Toggle** (`toggle`): 36×21 switch (Radix Switch) with optional `label`. Note: this is Flow's Toggle, not shadcn's pressable Toggle.
  - **Tooltip** (`tooltip`): `Tooltip` / `TooltipTrigger` / `TooltipContent`.
  - **Button** icon sizes now match Flow's Icon Button: 16px icon at `icon-micro`, 20px at `icon` and `icon-large`.
- f0b1449: First release: design tokens (colours, typography, shadows, radius) and icons from the Figma design system, plus the component registry and preview site.
