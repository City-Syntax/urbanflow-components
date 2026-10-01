---
"@urbanflow/registry": minor
---

Components from the Flow ↪ Compliance page:

- **Compliance Issue** (`compliance-issue`): `status` passed / failed (2px rail and status pill), `title`, `location`, `values` (`{ label, value }`, set in `metric-xsmall`), `policy`, `onDismiss`. Opens and closes like a collapsible (`open` / `defaultOpen` / `onOpenChange`).
- **Policy** (`policy`): `reference`, `source` + `href`, clause as children; open by default.
