---
"@urbanflow/registry": minor
---

More AI components from the Figma AI Refresh designs, for the chat thread. All presentational: pass data and callbacks, your app keeps `useChat`. Install with `npx shadcn add @urbanflow/<name>`:

- `ai-message`: `AIMessage from="user" | "assistant"`. A user message is a right-aligned bubble; put an `AIContextChip` with `status="sent"` above `AIMessageContent`. An assistant message has no bubble; pass the rendered markdown (for example your `<Streamdown>` element) as the children of `AIMessageContent`. Also `AIMessageGenerating` (Thinking and skeleton lines), `AIMessageActions` with `AIMessageCopy` (copies `text`, shows Copied for 2 s) and `AIMessageRegenerate` (show it on the latest reply only), `AIMessageStopped`, and `AIMessageError` with `onRetry` for a reply that lost its connection.
- `ai-trace`: all the tool calls of one assistant turn as one collapsible summary ("Researched in 3 steps") with one level of steps. Pass `steps: { id, name, label, status, detail?, input?, output?, attempt? }`; `toolPartStatus(part.state)` turns an AI SDK tool part state into `status`. It opens while running or failed, closes when done, and keeps the user's choice once they toggle it. A failed step opens to its `detail` and Retry (`onRetry(step)`); set `attempt` above 1 to get the Retrying and Retry failed wording. `toolRenderers` maps a tool name to a renderer drawn under that step, for rich output such as a construction's layers or a live job; other steps show the one-line default. `label` replaces the summary text.
- `ai-reasoning`: Thinking while `status="running"`, Thought · 5s when `status="complete"` (`duration` in seconds). Collapsed until the user opens it.
- `ai-sources`: "Used N sources" that expands to a row per source. `toAISource(part)` turns AI SDK `source-url` and `source-document` parts into `{ id, title, detail?, href? }`. With `onSelect`, rows are buttons; otherwise a row with `href` opens it in a new tab.
- `ai-citation-card`: `AICitation` is an inline citation badge that opens a hover card on hover or focus; put an `AICitationCard` (icon, title, description, optional action such as a plain "Open in Costflow" button) inside. `AICitations` lays out a row of badges.
- `ai-code-block`: the plain monospace block used for error details.
- `ai-conversation`: the scrolling list. It follows new messages while you are at the bottom, stays put when you scroll up, and `AIConversationScrollButton` (Scroll to latest) appears until you return. Adds the `use-stick-to-bottom` dependency.
- `collapsible`: the Radix collapsible these are built on.

Each has `meta.version` `1.0.0`.
