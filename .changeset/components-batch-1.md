---
"@urbanflow/registry": minor
---

New components from the Flow Components page (`npx shadcn add https://components.urbanflow.co/r/<name>.json`):

- **Icon Button** (`icon-button`): `IconButton` (label required; `micro` / `medium` / `large`; `selected` for tool toggles) and `IconButtonGroup` (floating toolbar, horizontal or vertical).
- **Badge** (`badge`): `type` default / info / critical × `shape` label / number / small-number.
- **Checkbox** (`checkbox`): 16px box or `variant="icon"` eye for layer visibility; checked / indeterminate / disabled; optional `label`.
- **Toggle** (`toggle`): 36×21 switch (Radix Switch) with optional `label`. Note: this is Flow's Toggle, not shadcn's pressable Toggle.
- **Tooltip** (`tooltip`): `Tooltip` / `TooltipTrigger` / `TooltipContent`.
- **Button** icon sizes now match Flow's Icon Button: 16px icon at `icon-micro`, 20px at `icon` and `icon-large`.
