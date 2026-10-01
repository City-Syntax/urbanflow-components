# @urbanflow/registry

## 0.2.0

### Minor Changes

- e345a34: Components from the Flow ↪ Comments page:
  
  - **Comment Pin** (`comment-pin`): `state` read / unread / selected / resolved / typing; `users` (one avatar or stacked) or `count` for a group.
  - **Comment Thread** (`comment-thread`): `author`, `location`, `time`, `replies`, `unread`, `selected`, `resolved`, `onResolve`, `onMore`; message as children.
  - **Comment Section** (`comment-section`): panel header with the "Show resolved comments" filter (`showResolved` / `onShowResolvedChange`) and `onClose`. Also exports **Comment Search** (`value` / `onValueChange`, `empty`, `noMatch`).
  - **View Comment** (`view-comment`): `me`, `messages` (`{ author, time, body, photos }`), `onReply`, `onResolve`, `onClose`.
  - **Photo** (`photo`): `size` S / L, `src`, `selected`, `more`, `onRemove`.
- ecacc89: Components from the Flow ↪ Compliance page:
  
  - **Compliance Issue** (`compliance-issue`): `status` passed / failed (2px rail and status pill), `title`, `location`, `values` (`{ label, value }`, set in `metric-xsmall`), `policy`, `onDismiss`. Opens and closes like a collapsible (`open` / `defaultOpen` / `onOpenChange`).
  - **Policy** (`policy`): `reference`, `source` + `href`, clause as children; open by default.
- 146b4d5: Components from the Flow ↪ Files page:
  
  - **File Row** (`file-row`): `name`, `type`, `category`, `size`, `owner`, `date`, `actions` (shown on hover instead of the date), `selected`.
  - **File Category** (`file-category`): `value` / `onValueChange` (null = Uncategorized), `options`, `tones` per category (info / caution / magic / success). Also exports `CategoryTag`.
  - **File Actions** (`file-actions`): `items` (`{ label, icon, onSelect }`), `label`; caret flips while open.
  - **Select Floor Plan** (`select-floor-plan`): `kind` upload / existing, `title`, `meta`.
- e25d30b: Input components from the Flow Components page:
  
  - **Text Field** (`text-field`): label (default / inline / hidden, help icon, label action), `unit`, `prefix` / `suffix` icon, `stepper` with `onIncrement` / `onDecrement`, `helpText`, `state` error / alert, disabled, read only. Also exports `NumberStepper`.
  - **Multiline Field** (`multiline-field`): same label and states, `maxLength` shows a character count.
  - **Select** (`select`): 36px trigger with chevron; pass `options` (strings or `{ value, label }`) and use `value` / `onValueChange`. Menu matches the Flow Action List.
  - **Field** (`field`): the shared label + help text shell, plus `InlineError` (`tone` error / alert).
  - Components no longer carry code comments.
- ce18c03: Navigation and header components from the Flow Components page:
  
  - **Tabs** (`tabs`): `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent`. `TabsList variant="pill"` (default) is Flow's 28px Tab; `variant="underline"` is Flow's Underline Tab.
  - **Segmented Control** (`segmented-control`): `options` (strings or `{ value, label, icon, ariaLabel }`), `value` / `onValueChange`.
  - **Page Header** (`page-header`): `title`, `badge`, `leading`, `description`, `actions`, `onBack`.
  - **Full Screen Modal Header** (`full-screen-modal-header`): 56px bar with `title`, `leading`, `tabs`, `actions`, `onBack`, `onClose`.
- df52a07: Menus, dialogs and feedback from the Flow Components page:
  
  - **Action List** (`action-list`): static `ActionList` / `ActionSection` / `ActionItem` (`icon`, `help`, `trailing`, `destructive`, `selected`, `disabled`) and a ready-made `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuSeparator`) with the same look.
  - **Modal** (`modal`): `Modal` / `ModalTrigger` / `ModalContent` (`title`, `footer`, `size` default 620px or small 360px) / `ModalClose`; plus `Dimmer`.
  - **Toast** (`toast`): wrap the app in `ToastProvider` and add one `ToastViewport`; `Toast` takes `tone` default / critical, `action` + `onAction`, `dismissible`. Auto-dismisses after 4s.
  - **Banner** (`banner`): `tone` info / success / warning / critical, `title`, `actions`, `onDismiss`; `inCard` for the tinted version inside cards and panels.
- 38b1d6f: Smaller pieces from the Flow Components page:
  
  - **Color Indicator** (`color-indicator`): `color` (any `var(--color-misc-*)`), `size` medium 14px / small 8px.
  - **Avatar** (`avatar`): `Avatar` (`name` or `initials`, `src`, `size` L / M / S / XS, colour cycles through Misc by `index`) and `AvatarsStacked` (`users`, `max`, shows +N).
  - **Chip Filter** (`chip-filter`): `selected`, optional `icon`.
  - **Dropdown Pill** (`dropdown-pill`): `options`, `value` / `onValueChange`; empty shows "Unclassified".
  - **Scroll Indicator** (`scroll-indicator`): the 5px thumb (`tone` light / dark) and a `ScrollArea` that uses it.
- 12c74c6: Components from the Flow ↪ Urbanflow page (the modelling workspace):
  
  - **Building Select** (`building-select`): one 24px tree row; `hierarchy` parent / child / 2ndChild, `hasChildren` + `expanded` + `onToggle`, `count`, `selected`, `last` (draws the end connector), `onAdd`, `onMore`. Also exports **Building Header** (`title`, `count`, `collapsed`, `onToggle`, `action`).
  - **Hybrid Button Group** (`hybrid-button-group`): `status`, `context`, `action`.
  - **Thumbnail** (`thumbnail`): `size` xsmall / small / medium / large, `src`, `icon`, `transparent`.
  - **Output Select** (`output-select`): `title`, `meta`, `badges`, `metrics` (`{ label, value, unit }`), `selected`, `bordered`, `onMore`.
  - **Template Select** (`template-select`): `label`, `src` or `preview`, `selected`.

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
