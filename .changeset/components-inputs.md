---
"@urbanflow/registry": minor
---

Input components from the Flow Components page:

- **Text Field** (`text-field`): label (default / inline / hidden, help icon, label action), `unit`, `prefix` / `suffix` icon, `stepper` with `onIncrement` / `onDecrement`, `helpText`, `state` error / alert, disabled, read only. Also exports `NumberStepper`.
- **Multiline Field** (`multiline-field`): same label and states, `maxLength` shows a character count.
- **Select** (`select`): 36px trigger with chevron; pass `options` (strings or `{ value, label }`) and use `value` / `onValueChange`. Menu matches the Flow Action List.
- **Field** (`field`): the shared label + help text shell, plus `InlineError` (`tone` error / alert).
- Components no longer carry code comments.
