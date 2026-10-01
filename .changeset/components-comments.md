---
"@urbanflow/registry": minor
---

Components from the Flow ↪ Comments page:

- **Comment Pin** (`comment-pin`): `state` read / unread / selected / resolved / typing; `users` (one avatar or stacked) or `count` for a group.
- **Comment Thread** (`comment-thread`): `author`, `location`, `time`, `replies`, `unread`, `selected`, `resolved`, `onResolve`, `onMore`; message as children.
- **Comment Section** (`comment-section`): panel header with the "Show resolved comments" filter (`showResolved` / `onShowResolvedChange`) and `onClose`. Also exports **Comment Search** (`value` / `onValueChange`, `empty`, `noMatch`).
- **View Comment** (`view-comment`): `me`, `messages` (`{ author, time, body, photos }`), `onReply`, `onResolve`, `onClose`.
- **Photo** (`photo`): `size` S / L, `src`, `selected`, `more`, `onRemove`.
