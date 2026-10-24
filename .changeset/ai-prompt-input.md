---
"@urbanflow/registry": minor
"@urbanflow/icons": minor
---

AI components, ported from the Figma AI Refresh designs. Install with `npx shadcn add @urbanflow/<name>`:

- `ai-prompt-input`: the chat composer. Context chips row, a textarea that grows to six lines (Enter sends, Shift+Enter adds a line), and a toolbar with attach, mode / model / effort pills, context usage and Send / Stop. Pass `status` from `useChat` (`ready` / `submitted` / `streaming` / `error`), `onSubmit` and `onStop`. A pill with two or more options opens a menu, one option shows as a plain label, none hides it. `AIPromptInputPicker` floats a list above the box for @ mentions and / commands; your textarea `onKeyDown` runs first, and calling `preventDefault()` stops Enter from sending. Enter does not send while a reply is generating; set `submitWhileGenerating` on `AIPromptInput` if your app queues mid-turn messages (Flux does).
- `ai-context-chip`: an object or file attached to the prompt, with `status` `attached` / `uploading` / `sent` / `error`. `AIContextSelectionChip` takes `{ kind, label, count }`. Your app does the uploads and passes the status.
- `ai-context-usage`: the context ring and its hover card, from `used` and `limit` (plus optional input, output and credits). `AIContextLimit` shows the nearly-full banner (75% by default, `nearlyFullAt` to change it) and the full banner, which has a New chat button only if you pass `onNewChat`.
- Primitives they use: `spinner`, `progress`, `separator`, `hover-card` and `command` (adds the `cmdk` dependency).
- `action-list`: new `DropdownMenuRadioGroup` and `DropdownMenuRadioItem` for single-choice menus. Re-add `action-list` to get them.

Icons: added `StopIcon` and `ArrowUpStraightIcon` (Send in the composer). `ai-prompt-input` asks for `@urbanflow/icons@^0.4.0`, the first release with them.

The AI items have `meta.version` in their registry JSON (`1.0.0`), so you can tell which version a copied file came from.
