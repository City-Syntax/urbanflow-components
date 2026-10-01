---
"@urbanflow/registry": minor
---

Building Select: two optional props.

- `depth` (number) places a row at any level of the tree: `0` is the building, `1` a child, `2` the old `2ndChild`, and each level past that indents one more 21px step. It overrides `hierarchy`, which keeps working unchanged, so nothing needs updating.
- `trailing` renders before the count badge, for row details such as an area or a type label.
- `guides` (one boolean per ancestor level) draws the vertical line through an indent column when the row above at that level has more siblings below, so open branches stay connected.
- `icon` now shows on rows without children too when you pass one; leaf rows without an `icon` are unchanged.

Re-run `npx shadcn add @urbanflow/building-select` to pick it up.
