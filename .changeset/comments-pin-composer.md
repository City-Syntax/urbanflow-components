---
"@urbanflow/registry": major
---

Comment Pin now follows the ↪ Comments Figma page.

- `selected` and `unread` swapped looks: `selected` is now white with a blue ring, `unread` is filled blue. If you passed `state="selected"` to mean "this pin's thread is unread", pass `state="unread"`.
- Multi-user pins show at most 2 avatars (was 3). `users` also takes `{ name, src, index }` so a pin can show photos.
- `typing` is the filled blue speech bubble.
- `count` draws the 48px group circle with up to 3 avatars, and shows the count on hover.
- New `CommentPinPreview`: the hover card (avatars, author, age, first comment, replies; blue when unread).

New components:

- `send-button`: 28px round arrow-up submit button, blue when active, grey when disabled.
- `comment-icon-button`: the comment tool button, inverse when `selected`, with a red dot when `unread`.
