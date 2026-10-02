# @urbanflow/icons

## 0.4.0

No changes in this release.

## 0.3.0

### Minor Changes

- ed589a4: Added the Shell components every product's chrome is built from (Figma page "Shell"): `app-shell` (`AppShell`, `AppShellPin`), `top-navigation` (`TopNavigation`, `UrbanflowTopNav`), `proposal-badge` (`ProposalBadge`, `ProposalTitle`), `utilities-toolbar` and `left-context-panel`. Install with `npx shadcn add @urbanflow/app-shell` (and the others you need); pass your product's logo to `TopNavigation`, and put product modes or tools in `UtilitiesToolbar` on the canvas rather than in the top bar.
  
  Added `HvacIcon` and `RunIcon` (Flux's HVAC and Runs modes).
  
  Figma now draws icons in `texticons-placeholder` (40%) instead of `texticons-secondary`. Icons still paint `currentColor`, so nothing changes in your app until you set the colour; new components use `text-texticons-placeholder` for idle icons.
  
  The urbanflow mark is now on the site as SVG: `/brand/urbanflow-mark.svg` and `/brand/urbanflow-mark-white.svg` (white, for the top bar). The Shell demo uses the white one.
  
  `AppShell` takes `product` and owns both panel widths. They open at the product defaults every session (left urbanflow 252 / Flux 360, right 359 / 300; override with `leftPanelDefaultWidth` / `rightPanelDefaultWidth`), resize by dragging their inner edge with no maximum, always keep a 24px gap (growing one squeezes the other), and close when dragged to 0, leaving a `PanelReopenTab` on that edge. Turn it off with `resizable={false}`; listen with `onPanelWidthsChange`. Don't save the widths, and don't give the panels you pass in their own width. `LeftContextPanel` takes `product` (urbanflow 252 / Flux 360, where children fill the panel) and fills whatever width the shell gives it.

## 0.2.0

No changes in this release.

## 0.1.0

### Minor Changes

- 07a53a5: Full Flow icon set: 74 icons (was 6), exported from the Flow Design System Figma file.
  
  - New: `AddIcon`, `AddBuildingIcon`, `ArrowReloadIcon`, `ArrowUpIcon`, `ArrowUpDownIcon`, `ArrowsDirectionIcon`, `ArrowsMaximizeIcon`, `ArrowsMinimizeIcon`, `BlueprintIcon`, `BoxAddAboveIcon`, `BoxAddBelowIcon`, `BuildingIcon`, `BuildingFilledIcon`, `CarbonIcon`, `CheckIcon`, `Checkbox{Checked,Indeterminate,Unchecked}Icon`, `Chevron{Up,Down,Left,Right}Icon`, `CloseIcon`, `CloudIcon`, `CoinIcon`, `ComplianceIcon`, `ConstructionIcon`, `CopyIcon`, `DateIcon`, `DownloadIcon`, `DrawWallIcon`, `EducationIcon`, `EllipsisHorizontalIcon`, `Eye{Open,Closed,Dotted}Icon`, `FilesIcon`, `FloorIcon`, `GlobeIcon`, `HammerIcon`, `HelpIcon`, `InfoIcon`, `LayoutIcon`, `LightbulbIcon`, `ListIcon`, `MassingIcon`, `MessageIcon`, `MinusIcon`, `NoteIcon`, `ParameterIcon`, `PencilIcon`, `PhotoIcon`, `PlaceholderIcon`, `PoliciesIcon`, `Radio{Checked,Unchecked}Icon`, `SearchIcon`, `SelectObjectIcon`, `SendIcon`, `SlopedIcon`, `SteppedIcon`, `TimeIcon`, `TokenIcon`, `TrashIcon`, `UploadIcon`, `VersionIcon`, `ZoneIcon`, `ZoneFilledIcon`.
  - The existing six (`Ai`, `AlertTriangle`, `Analytics`, `ArrowDown/Left/Right`) are re-exported cleanly from Flow; names unchanged.
  - Figma's "select" (up/down chevrons) ships as `ArrowUpDownIcon`.
  - All icons use `currentColor`; set colour with a text class.
- f0b1449: First release: design tokens (colours, typography, shadows, radius) and icons from the Figma design system, plus the component registry and preview site.
