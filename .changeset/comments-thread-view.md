---
"@urbanflow/registry": minor
---

Comments thread view, matched to the Figma `↪ Comments` page.

- New `emoji-picker`: `EmojiPicker` (category tabs, search, a Frequently used row, every emoji by category) and `EmojiPickerPopover`, which opens it from any trigger and closes on pick. Emoji data comes from `frimousse` 0.4.0. It reads the Emojibase JSON from your own site, not from jsDelivr: serve `en/data.json` and `en/messages.json` from `emojibase-data` (MIT) under `/emojibase-data`, or pass `emojibaseUrl` to point somewhere else. This site serves them from `public/emojibase-data`.
- New `image-zoom-selector`: the "− 100% +" control for an image viewer. It steps by 10%, and you can tap the value to type a percent from 1 to 100.
- `view-comment`: messages are now `ViewCommentMessage` rows, which you can pass as children. Each row takes a `menu` (the "…" options, for example Edit and Delete), `onReact` (a React button on hover that opens the emoji picker), `reactions` with `onToggleReaction` (tap a chip again to unreact), `photos` (up to three, "+N" on the third) with `onOpenPhoto`, and an `editor` that replaces the row while editing. The header takes `moreMenu` for the thread options and `resolved` to fill the resolve check. Pass your composer as `reply`; the old `onReply` text box still works. `me` can be `{ name, src, index }` so your own avatar keeps its colour. The card follows the Figma spacing and type, and it is at most 90% of the viewport tall with the messages scrolling. Reinstall `view-comment` (it now needs `action-list` and `emoji-picker`).
- `view-comment` also takes the app's reply behaviour: the box keeps its text until `onReply`'s promise resolves, and More, Resolve and Attach show only when their handler is given.
- `photo`: L is 76px (was 120×90). Hover darkens the image, the remove button shows on hover only and sits on the corner, and `selected` draws a blue border.
- `avatar`: size S is 22px (was 20px).
