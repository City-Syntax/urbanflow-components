---
"@urbanflow/registry": minor
---

Fixes and options found by adopting the AI set in Flux.

- Registry components now compile under `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`. Optional props accept `undefined`, and radix props are only passed when set. `npm run check` now enforces this with `tsconfig.registry.json`. Nothing changes for apps that already compiled.
- `ai-prompt-input` 1.1.0: `<AIPromptInputTools wrap>` puts the pills on extra lines at narrow widths. Without it they scroll under a fade, and the last pill can be hidden behind the usage ring.
- `ai-message-queue` 1.1.0: `onEditingChange(id | null)` says when a row's editor opens and closes, so an app can hold that message while it is being edited.
- `ai-pending-banner` 1.1.0: `actions` adds controls before Show.
- `ai-approval-card` and `ai-question-card` 1.1.0: `focusOnDecide={false}` leaves focus where the app puts it after a decision, for example back in the composer. Each question also carries `data-question-id`, and text and number fields carry a `name`.
- `ai-conversation` 1.0.1: keeps following the latest message when the panel itself is resized. Before, the browser's scroll clamp read as the person scrolling up.
- `ai-context-usage` 1.0.1: the ring's trigger uses the pointer cursor.
- `ai-trace`, `ai-sources` and `ai-citation-card` 1.0.1: type fixes only.
