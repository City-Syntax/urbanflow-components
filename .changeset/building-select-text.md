---
"@urbanflow/registry": patch
---

Building Select: rows without children (floors and zones at the end of the tree) now use `text-paragraph-xsmall` (12px) instead of `text-paragraph-medium` (16px), matching Figma. Rows with children and the building row stay `text-label-small`. Re-run `npx shadcn add @urbanflow/building-select` to pick it up.
