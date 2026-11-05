# AI patterns

Use this when designing Urbanflow or Flux AI chat, floating assistants, right-panel assistants,
context selection, sources/citations, or AI generation states. It is based on the Platform reference
section `5158:47970` and the finalized AI handoff section on the right of the Platform AI page, plus
the `urbanflow-components` repo's Flow design language. Treat the finalized right-side section as the
canonical presentation and flow-handoff example; the older left-side exploration is legacy and should
not be learned from or copied.

## Sources

- Reference frame: Platform `CyjMpmGxUHezAqjmA5qXwI`, node `5158:47970`.
- Canonical handoff area: Platform AI page `4939:130753`, finalized AI work on the right. See
  `references/handoff/canonical-ai-example.md` for the verified layout grammar.
- Code/library reference: `City-Syntax/urbanflow-components`, especially `DESIGN.md`,
  `packages/theme/theme.css`, `registry/ui/*`, and `packages/icons/raw/*`.
- Visual behavior reference: AI SDK Elements for message anatomy, sources, citations, loader,
  context usage and composer patterns; re-skin every pattern with Flow tokens.

## Component candidates

Keep these as local components in product files until Pei Ning requests a Flow library update:

- `AI / Launcher`
- `AI / Panel header`
- `AI / Prompt input`
- `AI / Message`
- `AI / Menu`
- `AI / Context chip`
- `AI / Context usage`
- `AI / Sources`
- `AI / Citation card`
- `AI / Loader`
- `AI / Empty state`

When an approved local AI component board is supplied in the destination file, use it as the visual
and component authority for the exploration. Do not replace those components with Flow library
instances or reconstructed versions unless Pei Ning explicitly asks to promote or reconcile them.

Prefer real Flow instances inside them: `IconButton`, Action List items, Text field, Tooltip,
Hybrid Button Group and Flow icons within the detached AppShell structure. If a needed Flow component is unpublished or
unavailable, detach only that part, name it clearly with `detached`, and add a handoff annotation.

## Launcher

- Place the launcher directly in the detached shell's canvas-tools structure, not in an AppShell slot or `UtilitiesToolbar`.
- Use a 40px circular button in shell screens; local component notes may show a 48px concept, but the
  product canvas precedent uses 40px to align with the bottom toolbars.
- Pin it above the bottom-right view switcher with an 8px gap and align its right edge to the view
  switcher right edge.
- Use `radius/full`, `Background/Default`, `Stroke/default` as an inset ring, `Shadow/md`, and the
  Flow `ai` icon at 20px in `TextIcons/Primary`.
- Do not use `Semantic/magic-*` as launcher decoration unless the user explicitly asks for a more
  branded AI treatment.
- States: Rest, Hover (`Background/Light`, stronger ring), Open (`Background/Inverse` with inverse
  icon). Provide a tooltip such as "Ask AI" for the icon-only control.
- Keep the launcher visible at the bottom-right of the canvas while AI is open as a sidebar, using its selected/open state.

## Floating panel

- Size the floating panel at 400 x 560 on a 1440 x 1024 shell unless the destination screen requires
  a narrower variant.
- Open it directly above the launcher, right edges aligned, with an 8px gap.
- Use no scrim. The canvas, left panel and right panel remain usable.
- Use `Background/Light`, `Stroke/default`, `radius/lg` and elevated shadow (`Shadow/lg` or the
  closest available Flow floating shadow).
- Use 8px padding on all four sides and an 8px vertical gap.
- Stack: `AI / Panel header` (hug), conversation region (fill and internally scrolls), prompt input
  (hug), footnote (hug).
- Header, composer and footnote stay fixed; only the conversation region scrolls.
- Show states for closed launcher, new chat, chat menu, show-as menu, canvas selection, generating,
  context usage, long conversation, sources/citations, sidebar conversation, sidebar search and no
  matching chats when the flow includes them.

## Sidebar mode

- Sidebar mode replaces the right panel rather than overlaying it.
- Preserve the same chat, scroll position, draft text and attached context when switching between
  Floating and Sidebar.
- Remember the user's chosen mode across sessions. First open defaults to Floating.
- `Show as > Floating` restores the previous right panel and opens above the launcher.
- `Close` restores the previous right panel. The remembered mode remains Sidebar for the next open.

## Header and menus

- Header combines a chat switcher with Flow `IconButton` actions.
- Use tertiary/default IconButtons at 28px for New chat, Show as and Close. Use Flow icons at 20px.
- Chat switcher opens `AI / Menu · Chats`. Show-as opens `AI / Menu · Show as` right-aligned under
  the Show-as IconButton with a 4px gap.
- Menus use an Action List surface: `Background/Default`, `Stroke/subtle`, `radius/md`,
  `Shadow/md`, 6px top/bottom padding.
- Chat menu width: 288px. Show-as menu width: 200px.
- Chat search uses a Flow Text field with a search icon in the icon slot. If the Text field is
  unpublished in the destination file, use a clearly named detached stand-in.
- Search filters chat titles case-insensitively by contains. Results replace date groups. Show
  `{n} results`, arrow-key highlight and Enter-to-open behavior in handoff notes when relevant.
- No-results copy: `No chats match "{query}"`, `Search looks at chat titles in this project.`, and
  a `New chat` action.

## Composer and context

- Prompt input sits on the panel layer as a Flow card:
  `Background/Default`, `Stroke/default`, `radius/lg`, `Shadow/xs`, 8px padding.
- Composer states: Empty, Draft, Selecting, Generating.
- Support one object of context per message. A new object replaces the current one.
- While the AI panel is open, the user can select context by tapping any selectable object on the canvas.
- Selection immediately adds or replaces the Selection context chip in the composer.
- Do not show a separate `Select on canvas` control or a top-centre `Selecting · {object}` pill unless
  the task explicitly requests a dedicated selection mode.
- Sending the message moves the context chip onto the user message as Attached context, then clears
  the composer context.
- Context chips are 24px tall, `radius/md`, 4 x 6px padding, 4px gap, `label/xsmall`, with a 14px
  object-type icon. Use neutral ink; use info styling only for active selection/focus.
- Provide `Auto` and `Ask first` controls when execution permission is in scope.
- Allow model and effort selection using compact Flow-styled selectors.
- Keep 12px between the model/effort controls and the context-usage indicator.
- When model controls overflow the available width, clip the controls and add a right-edge fade to
  indicate horizontal overflow.
- Use a plus icon for attachments and an arrow-up icon for Send.
- On the primary Send IconButton, render the arrow using `TextIcons/InversePrimary`; the arrow glyph
  is white and must not use a white background plate.

## Messages

- Follow AI SDK Elements message anatomy, re-skinned with Flow.
- User-authored messages and their attached context are right-aligned. Assistant messages, source
  rows and assistant actions are left-aligned. Set this on each message component's auto-layout
  alignment so the rule survives resizing and reuse.
- User messages: right-aligned bubble, `Background/Medium`, `radius/lg`, 8 x 12px padding,
  `paragraph/small`, `TextIcons/Primary`; include attached context above the bubble when present.
- Assistant messages: no bubble. Use AI/source rows above body text, `paragraph/small`, and inline
  actions below or beside the response using Flow IconButtons.
- Keep message content factual. Numbers need units and provenance. Do not invent results, thresholds
  or model outputs to make the example feel complete.
- For long conversations, show `IconButton / Scroll to latest` only when the user has scrolled away
  from the bottom. New messages auto-scroll only if the user is already at the bottom.

## Generating, sources and citations

- Loader: 16px ring, `Background/Medium` track, `TextIcons/Primary` arc, 360deg rotation every
  800ms, linear, infinite. Remove loading state when streaming begins or generation stops.
- Generating state: loader plus concise status such as `Reading Floor 3, Costflow`, then skeleton
  lines in `Background/Medium`, `radius/sm`, 12px height.
- Send changes to Stop while generating. Use a primary IconButton with the stop icon on
  `Background/Inverse`.
- Stop behavior is a product decision: annotate whether partial answers are kept or removed.
- Sources row: `Used {n} sources` / `Used 1 source`. Hide the row when there are no sources.
- Citation cards show source name, a short description, and an action such as `Open in {source}`.
- Source and citation data must come from the AI service or app data. If unavailable, mark it as an
  engineering/data requirement rather than faking it.

## Confirmed behavior and scope decisions

- Uploads and reply generation continue in the background when the panel closes or the user switches chats. Returning to the originating chat shows current progress or results.
- Preserve unsent drafts after generation, Stop and retry success/failure. Sending requires an explicit Send click or Enter; never auto-send a waiting draft.
- Composer growth must preserve conversation scroll position when the user has scrolled up. Follow the latest message only if already at the bottom.
- Show a Selection chip alongside stacked file chips when canvas context and files coexist. Removing a file preserves the context, other files and draft.
- The header reflects the active chat name; reserve New chat for an empty new conversation. Chats are per user per project and named from the first sent message.
- Deleting the currently open chat opens an empty New chat. Deleting another chat preserves the active conversation.
- Stop preserves the partial response. Near-full context shows a warning; full context disables the composer and offers New chat. Unknown thresholds remain `[__] - ask eng`.
- Keep AIMenu for now. Existing instances referencing the deleted local AIComposerMenu may remain; Pei Ning explicitly accepted this local-only state. Do not repeatedly flag or detach them, and do not promote them globally without a new request.
- Citation expansion remains deferred. Do not add rename validation or file-picker cancellation/max-file flows unless newly requested. Unknown backend limits and supported types remain `[__] - ask eng`.

## Open questions to carry forward

Carry these as handoff notes unless the user or product source answers them:

- Suggestion click: send immediately or fill the composer?
- Allowed context object types beyond floors and zones?
- Floating panel height: fixed 560px or resizable?
- Keyboard shortcut for launcher.

## QA checklist

- Auto layout is used for every related stack, row and menu.
- No custom styling where a Flow component exists.
- Padding is even: panel and composer use 8px on all sides unless the DS component defines it.
- Launcher is outside UtilitiesToolbar and does not compete with massing/floor-plan controls.
- Floating panel aligns above the launcher; sidebar replaces the right panel.
- Chat, draft, scroll and context survive mode changes.
- Conversation scrolls independently; header and composer do not move.
- Icon-only actions have labels/tooltips and visible focus states.
- Missing DS components or icons are named, annotated and listed as library follow-ups.
