---
"@urbanflow/registry": patch
---

Building Select: every row is now 12px. Rows with children (buildings, expandable floors and zones) use `label-xsmall` instead of the larger `label-small`; leaf rows stay `paragraph-xsmall`. Ancestor guide lines are now drawn by default, so a zone under a floor keeps the building's line running down its left edge. Pass `guides` with `false` for a column only when that ancestor was the last child and its line should stop.
