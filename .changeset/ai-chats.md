---
"@urbanflow/registry": minor
---

AI chats: the panel header, the chats menu, rename and delete dialogs, and the new-chat empty state, from the Figma AI Refresh section. They are presentational. Your app keeps the chats and passes them in with callbacks. Install with `npx shadcn add @urbanflow/<name>`:

- `ai-chat-header`: `AIChatHeader` shows the chat `title` (New chat when it is empty), then New chat (`onNewChat`), Show as (`showAs: { value, options: { value, label, icon? }[], onValueChange }`) and Close (`onClose`). Each control appears only when you pass it. Pass `chats` (the `AIChatsMenu` options below) and the title opens the chats menu. The menu closes before your callback runs, so a dialog you open from `onRename` or `onDelete` returns focus to the title. Below 240px the AI mark hides and the title truncates.
- `ai-chats-menu`: `AIChatsMenu` takes `chats: { id, title?, updatedAt }[]` (a Date, an ISO string or milliseconds) and groups them into Today, Previous 7 days and Older by local calendar day, newest first. Rename the groups with `labels`. `currentId` gets a tick. Search filters titles. Rows call `onSelect(id)`. A row's More button offers Rename and Delete when you pass `onRename(chat)` or `onDelete(chat)`. With no results, or no chats at all, it offers New chat (`onNewChat`). Arrow keys, Home and End move between the search and the rows, ArrowRight reaches More, and Enter in the search opens the first result. `groupAIChats(chats, now)` exposes the grouping.
- `ai-rename-chat-dialog`: `AIRenameChatDialog` (`open`, `onOpenChange`, `chatTitle`, `onRename(title)`, `maxLength` default 80). It trims the name, refuses an empty name or one over the limit with a message, and calls `onRename` only when the name changed.
- `ai-delete-chat-dialog`: `AIDeleteChatDialog` (`open`, `onOpenChange`, `chatTitle`, `onDelete`). Focus starts on Cancel.
- `ai-empty-state`: `AIEmptyState` shows the AI mark, an optional `heading` and `description`, optional `actions` (for example Upload drawings and Start from an address) and a Suggested list of `{ id, label, icon? }` that calls `onSuggestion(suggestion)`.

`modal`: a Modal opened without a `ModalTrigger` now returns focus to the element that had it when it opened, instead of dropping focus to the page.
