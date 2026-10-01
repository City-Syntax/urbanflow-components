---
"@urbanflow/registry": minor
"@urbanflow/icons": minor
---

Added the Shell components every product's chrome is built from (Figma page "Shell"): `app-shell` (`AppShell`, `AppShellPin`), `top-navigation` (`TopNavigation`, `UrbanflowTopNav`), `proposal-badge` (`ProposalBadge`, `ProposalTitle`), `utilities-toolbar` and `left-context-panel`. Install with `npx shadcn add @urbanflow/app-shell` (and the others you need); pass your product's logo to `TopNavigation`, and put product modes or tools in `UtilitiesToolbar` on the canvas rather than in the top bar.

Added `HvacIcon` and `RunIcon` (Flux's HVAC and Runs modes).

Figma now draws icons in `texticons-placeholder` (40%) instead of `texticons-secondary`. Icons still paint `currentColor`, so nothing changes in your app until you set the colour; new components use `text-texticons-placeholder` for idle icons.

The urbanflow mark is now on the site as SVG: `/brand/urbanflow-mark.svg` and `/brand/urbanflow-mark-white.svg` (white, for the top bar). The Shell demo uses the white one.

`AppShell` takes `product` and owns both panel widths. They open at the product defaults every session (left urbanflow 252 / Flux 360, right 359 / 300; override with `leftPanelDefaultWidth` / `rightPanelDefaultWidth`), resize by dragging their inner edge with no maximum, always keep a 24px gap (growing one squeezes the other), and close when dragged to 0, leaving a `PanelReopenTab` on that edge. Turn it off with `resizable={false}`; listen with `onPanelWidthsChange`. Don't save the widths, and don't give the panels you pass in their own width. `LeftContextPanel` takes `product` (urbanflow 252 / Flux 360, where children fill the panel) and fills whatever width the shell gives it.
