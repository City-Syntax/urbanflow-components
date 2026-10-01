# @urbanflow/icons

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
