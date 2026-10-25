# @urbanflow/registry

## 0.4.0

### Minor Changes

- 480f00e: AI cards for when the agent needs the user: approvals, questions, a waiting banner and a message queue. No Figma frames exist for these yet. They follow Flux's cards, restyled with Flow tokens, and design will review them. Every card is presentational: pass in data and callbacks, and your app keeps the gate, the timeout and the queue. Install with `npx shadcn add @urbanflow/<name>`:
  
  - `ai-approval-card`: `AIApprovalCard` asks before the agent changes something. It takes `title`, an optional `detail`, an optional body as children and `actions`. `actions` is an ordered list of `{ id, label, variant, tone?, title?, disabled?, onSelect }`, so each app picks its own buttons. Set `disabled` while a decision is on its way to the server. The core app passes Approve and Deny. Flux passes Allow once, Allow <tool> in this project, Full auto and Deny. The buttons sit in a grid that stacks them in a narrow panel, and long labels wrap. Set `status` to `decided`, `denied` or `stopped` once the request is answered, and the card shrinks to a one-line record. Pass `outcome` to change its wording, and set `auto` on a decided card to show the Auto badge. A keyboard user who answers lands on the record. `AIApprovalDiff` draws one file's unified diff to use as the body.
  - `ai-question-card`: `AIQuestionCard` shows the agent's questions inline. Each question is `{ id, prompt, kind, placeholder? }`. A `single` question adds `options`, `recommended?: string` and `allowOther?`; `multi` the same with `recommended?: string[]`; `text` takes `recommended?: string` and `number` `recommended?: number`. Options are `{ value, label, description? }`. The card starts from `answers[id]` when you pass it, otherwise from `recommended`, which is also marked "Recommended". Submit stays disabled until something is answered, then calls `onSubmit({ answers, skipped })`. Enter in a text field, or Ctrl/Cmd+Enter anywhere in the card, submits; plain Enter on a choice does nothing. `allowOther` adds one free-text field per question. Skip appears when you pass `onSkip`. `status="timed-out"` keeps the form open under a note, which you can change with `note`. `status="answered"` lists each answer from `answers`. Give the card `key={request.id}` so a new request starts fresh. The core app's ask_user maps to one question: `{ id, prompt: question, kind: "single", options: options.map((o) => ({ value: o, label: o })), allowOther: true }`.
  - `ai-pending-banner`: `AIPendingBanner` is the sticky "Waiting for you" bar above the composer. Pass what is waiting as children and a `count`. A count above 1 shows a badge, and at 0 the bar disappears. Keep the component mounted at 0, because a hidden status region stays in place so screen readers announce the next wait. `onJump` runs when the user presses Show; scroll to the card and focus it there.
  - `ai-message-queue`: `AIMessageQueue` lists messages typed while the agent works. `items` is `{ id, text, editable? }[]`. The header reads "N queued", with an optional `note` such as "sent when the agent is free", and it collapses the list. Each row can move up and down (`onReorder` gets the new id order) and be edited, sent now or removed (`onEdit`, `onSendNow`, `onRemove`). Editing keeps line breaks: Enter saves and Shift+Enter adds a line. A control appears only when you pass its callback.
  
  Each has `meta.version` `1.0.0`.
- 68ea871: More AI components from the Figma AI Refresh designs, for the chat thread. All presentational: pass data and callbacks, your app keeps `useChat`. Install with `npx shadcn add @urbanflow/<name>`:
  
  - `ai-message`: `AIMessage from="user" | "assistant"`. A user message is a right-aligned bubble; put an `AIContextChip` with `status="sent"` above `AIMessageContent`. An assistant message has no bubble; pass the rendered markdown (for example your `<Streamdown>` element) as the children of `AIMessageContent`. Also `AIMessageGenerating` (Thinking and skeleton lines), `AIMessageActions` with `AIMessageCopy` (copies `text`, shows Copied for 2 s) and `AIMessageRegenerate` (show it on the latest reply only), `AIMessageStopped`, and `AIMessageError` with `onRetry` for a reply that lost its connection.
  - `ai-trace`: all the tool calls of one assistant turn as one collapsible summary ("Researched in 3 steps") with one level of steps. Pass `steps: { id, name, label, status, detail?, input?, output?, attempt? }`; `toolPartStatus(part)` turns an AI SDK tool part into `status` (a preliminary result counts as running). It opens while running or failed, closes when done, and keeps the user's choice once they toggle it. A failed step marks the turn failed only while it blocks the rest. Set `stopped` after the user presses Stop, so the spinner stops and it reads "Stopped at step n". A failed step opens to its `detail` and Retry (`onRetry(step)`); set `attempt` above 1 to get the Retrying and Retry failed wording. `toolRenderers` maps a tool name to a component (it gets `{ step }`) drawn under that step at any status, for rich output such as a construction's layers or a live job; other steps show the one-line default. `label` replaces the summary text.
  - `ai-reasoning`: Thinking while `status="running"`, Thought · 5s when `status="complete"` (`duration` in seconds). Collapsed until the user opens it.
  - `ai-sources`: "Used N sources" that expands to a row per source. `parts.filter(isAISourcePart).map(toAISource)` turns AI SDK `source-url` and `source-document` parts into `{ id, title, detail?, href? }`. With `onSelect`, rows are buttons; otherwise a row with `href` opens it in a new tab.
  - `ai-citation-card`: `AICitation` is an inline citation badge that opens a hover card on hover or focus; put an `AICitationCard` (icon, title, description, optional action such as a plain "Open in Costflow" button) inside. The card can't be reached by keyboard or touch, so also give `AICitation` an `onClick` that opens the source. `AICitations` lays out a row of badges.
  - `ai-code-block`: the plain monospace block used for error details.
  - `ai-conversation`: the scrolling list. It follows new messages while you are at the bottom, stays put when you scroll up, and `AIConversationScrollButton` (Scroll to latest) appears until you return. Adds the `use-stick-to-bottom` dependency.
  - `collapsible`: the Radix collapsible these are built on.
  
  Each has `meta.version` `1.0.0`.
- 2d9caf4: AI components, ported from the Figma AI Refresh designs. Install with `npx shadcn add @urbanflow/<name>`:
  
  - `ai-prompt-input`: the chat composer. Context chips row, a textarea that grows to six lines (Enter sends, Shift+Enter adds a line), and a toolbar with attach, mode / model / effort pills, context usage and Send / Stop. Pass `status` from `useChat` (`ready` / `submitted` / `streaming` / `error`), `onSubmit` and `onStop`. A pill with two or more options opens a menu, one option shows as a plain label, none hides it. `AIPromptInputPicker` floats a list above the box for @ mentions and / commands; your textarea `onKeyDown` runs first, and calling `preventDefault()` stops Enter from sending. Enter does not send while a reply is generating; set `submitWhileGenerating` on `AIPromptInput` if your app queues mid-turn messages (Flux does).
  - `ai-context-chip`: an object or file attached to the prompt, with `status` `attached` / `uploading` / `sent` / `error`. `AIContextSelectionChip` takes `{ kind, label, count }`. Your app does the uploads and passes the status.
  - `ai-context-usage`: the context ring and its hover card, from `used` and `limit` (plus optional input, output and credits). `AIContextLimit` shows the nearly-full banner (75% by default, `nearlyFullAt` to change it) and the full banner, which has a New chat button only if you pass `onNewChat`.
  - Primitives they use: `spinner`, `progress`, `separator`, `hover-card` and `command` (adds the `cmdk` dependency).
  - `action-list`: new `DropdownMenuRadioGroup` and `DropdownMenuRadioItem` for single-choice menus. Re-add `action-list` to get them.
  
  Icons: added `StopIcon` and `ArrowUpStraightIcon` (Send in the composer). `ai-prompt-input` asks for `@urbanflow/icons@^0.4.0`, the first release with them.
  
  The AI items have `meta.version` in their registry JSON (`1.0.0`), so you can tell which version a copied file came from.
- b2c8262: Fixes and options found by adopting the AI set in Flux.
  
  - Registry components now compile under `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`. Optional props accept `undefined`, and radix props are only passed when set. `npm run check` now enforces this with `tsconfig.registry.json`. Nothing changes for apps that already compiled.
  - `ai-prompt-input` 1.1.0: `<AIPromptInputTools wrap>` puts the pills on extra lines at narrow widths. Without it they scroll under a fade, and the last pill can be hidden behind the usage ring.
  - `ai-message-queue` 1.1.0: `onEditingChange(id | null)` says when a row's editor opens and closes, so an app can hold that message while it is being edited.
  - `ai-pending-banner` 1.1.0: `actions` adds controls before Show.
  - `ai-approval-card` and `ai-question-card` 1.1.0: `focusOnDecide={false}` leaves focus where the app puts it after a decision, for example back in the composer. Each question also carries `data-question-id`, and text and number fields carry a `name`.
  - `ai-conversation` 1.0.1: keeps following the latest message when the panel itself is resized. Before, the browser's scroll clamp read as the person scrolling up.
  - `ai-context-usage` 1.0.1: the ring's trigger uses the pointer cursor.
  - `ai-trace`, `ai-sources` and `ai-citation-card` 1.0.1: type fixes only.
- f7fd3d9: Badge: added `type="success"` (green, for done or passed) and `type="caution"` (yellow, for warnings or needs attention), matching Figma Badge › Type. Text uses `success-primary` and `caution-heavy` so it stays readable on the light backgrounds; the `texticons-success-primary` / `texticons-caution-primary` tokens are too light for small text. Re-add `badge` from the registry; Flux can drop its local success/caution variants.
- 9a32735: Building Select: two optional props.
  
  - `depth` (number) places a row at any level of the tree: `0` is the building, `1` a child, `2` the old `2ndChild`, and each level past that indents one more 21px step. It overrides `hierarchy`, which keeps working unchanged, so nothing needs updating.
  - `trailing` renders before the count badge, for row details such as an area or a type label.
  - `guides` (one boolean per ancestor level) draws the vertical line through an indent column when the row above at that level has more siblings below, so open branches stay connected.
  - `icon` now shows on rows without children too when you pass one; leaf rows without an `icon` are unchanged.
  
  Re-run `npx shadcn add @urbanflow/building-select` to pick it up.

### Patch Changes

- 9489f5b: Building Select: every row is now 12px. Rows with children (buildings, expandable floors and zones) use `label-xsmall` instead of the larger `label-small`; leaf rows stay `paragraph-xsmall`. Ancestor guide lines are now drawn by default, so a zone under a floor keeps the building's line running down its left edge. Pass `guides` with `false` for a column only when that ancestor was the last child and its line should stop.
- 5cfbec8: Button: a disabled primary button's label now uses `texticons-disabled` instead of white, so it's readable on the grey disabled background (it was about 1.15:1 contrast). Re-add `button` from the registry to pick it up; if you patched this locally (Flux adds `disabled:text-texticons-disabled`), you can drop the patch.

## 0.3.0

### Minor Changes

- ed589a4: Added the Shell components every product's chrome is built from (Figma page "Shell"): `app-shell` (`AppShell`, `AppShellPin`), `top-navigation` (`TopNavigation`, `UrbanflowTopNav`), `proposal-badge` (`ProposalBadge`, `ProposalTitle`), `utilities-toolbar` and `left-context-panel`. Install with `npx shadcn add @urbanflow/app-shell` (and the others you need); pass your product's logo to `TopNavigation`, and put product modes or tools in `UtilitiesToolbar` on the canvas rather than in the top bar.
  
  Added `HvacIcon` and `RunIcon` (Flux's HVAC and Runs modes).
  
  Figma now draws icons in `texticons-placeholder` (40%) instead of `texticons-secondary`. Icons still paint `currentColor`, so nothing changes in your app until you set the colour; new components use `text-texticons-placeholder` for idle icons.
  
  The urbanflow mark is now on the site as SVG: `/brand/urbanflow-mark.svg` and `/brand/urbanflow-mark-white.svg` (white, for the top bar). The Shell demo uses the white one.
  
  `AppShell` takes `product` and owns both panel widths. They open at the product defaults every session (left urbanflow 252 / Flux 360, right 359 / 300; override with `leftPanelDefaultWidth` / `rightPanelDefaultWidth`), resize by dragging their inner edge with no maximum, always keep a 24px gap (growing one squeezes the other), and close when dragged to 0, leaving a `PanelReopenTab` on that edge. Turn it off with `resizable={false}`; listen with `onPanelWidthsChange`. Don't save the widths, and don't give the panels you pass in their own width. `LeftContextPanel` takes `product` (urbanflow 252 / Flux 360, where children fill the panel) and fills whatever width the shell gives it.

### Patch Changes

- 4ab6d5c: Building Select: rows without children (floors and zones at the end of the tree) now use `text-paragraph-xsmall` (12px) instead of `text-paragraph-medium` (16px), matching Figma. Rows with children and the building row stay `text-label-small`. Re-run `npx shadcn add @urbanflow/building-select` to pick it up.

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
