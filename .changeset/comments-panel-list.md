---
"@urbanflow/registry": minor
---

The comments panel now matches the Comments page in Figma.

- **`CommentThread`.** Read rows sit at 60% opacity and come back to full on hover; unread rows keep full opacity and show the blue dot, which gives way to the "…" and resolve buttons on hover. Resolved rows rest like read rows. The selected row is light blue (`bg-background-info`) with emphasis text and keeps its buttons showing. The resolve button shows a filled check on a resolved thread and an outlined check otherwise. Both buttons are 20px with a 4px rounded hover. New props: `authorSrc` for a photo avatar, and `more` for a menu trigger. Put `CommentThreadMore` (new export) inside your own `DropdownMenu` trigger and pass it as `more`; the row keeps its buttons visible while that menu is open. `onMore` still works for a plain button.
- **`CommentSection`.** The filter button uses the new `ellipsis-horizontal-circle` icon, and both header buttons are 16px with a 4px rounded hover and a `neutral-10` pressed state. The "Show resolved comments" item keeps space for its check when it is off, so the menu does not change width. The header is 54px tall.
- **`CommentSearch`.** The search field has 16px side padding and 8px top and bottom. In the no-match message, the icon is `neutral-20`.

Needs `@urbanflow/icons` with `EllipsisHorizontalCircleIcon` (#50). Re-run `npx shadcn add` for `comment-thread` and `comment-section`.
