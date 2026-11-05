# Visual style and layout rules

Apply on every Urbanflow build in Figma or HTML. Break a rule only when Pei Ning asks. Values are Flow variables and styles; bind them instead of typing raw numbers.

## 1. Auto layout for UI, with one canvas exception

- Make every container an auto-layout frame: screens, panels, cards, rows, toolbars, menus, buttons and chips.
- Use absolute positioning only for floating overlays and canvas pins. Keep their parent in auto layout.
- Never use a rectangle, empty frame or spacer layer to create space. Use container padding, item gap, spacing mode Auto (space-between), or nested groups.
- Use Fill or Hug for children. Use Fixed only for defined component sizes. Set wrapping text to Fill width and auto height.
- Centre items vertically in rows, left-align text and keep a shared left edge inside cards.
- In the Figma API, use auto-layout containers, bound padding/itemSpacing variables and `SPACE_BETWEEN`; never create a spacer node.
- Annotation-note rows on the canvas are the exception: keep the row as `layoutMode="NONE"` and place note cards manually. The note-card components themselves may use auto layout.

## 2. Spacing (`spacing/*`)

- Scale: 0 · 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32. Do not use 10, 14, 18 or 20.
- Keep padding equal on all four sides unless a component specification says otherwise. Check that left padding is never accidentally zero.
- Floating panel: 8 padding all around; 8 gap between header, content card and composer.
- Inner cards: 12 padding; 12–16 gap between blocks. Side panels: 16 padding.
- Menus: 6 top/bottom; search-field wrapper 6 on the sides; use `.Action-Item` rows.
- Use 2–8 inside controls, 16 or 24 between panel sections, and at least 80 between canvas frames.

## 3. Surfaces and hierarchy

- Layer canvas `Background/Light` → panel `Background/Light` → cards `Background/Default`.
- Floating panel: `Background/Light`, `Stroke/default`, `radius/lg`, `Shadow/lg`.
- Docked panel: the same with `Shadow/sm`.
- Inner cards: `Background/Default`, `Stroke/subtle`, `radius/lg`, no shadow or `Shadow/xs`.
- Menus and popovers: `Background/Default`, `Stroke/subtle`, `radius/md`, `Shadow/md`.
- Use dividers sparingly. Prefer space. Rows hover with `Background/Light`; selected rows use `Background/Medium` and `radius/md`.
- Do not use gradients, coloured card fills, coloured left borders or tinted panels.

## 4. Radius (`radius/*`)

- `md` 8: buttons, inputs, chips, menu rows, tooltips and menus.
- `lg` 12: cards, panels, inner boxes and modals.
- `full`: circular buttons, avatars, pills and progress rings.
- Never give an inner surface a larger radius than its outer surface.

## 5. Colour

- Use warm neutrals. Titles: `TextIcons/Emphasis`; body/values: `TextIcons/Primary`; help/meta: `TextIcons/Secondary`; placeholders/default icons: `TextIcons/Placeholder`.
- Use `Background/Inverse` with inverse text/icon for the single primary action.
- Reserve colour for meaning: links, focus, errors, warnings and success. Keep AI controls neutral unless magic purple is explicitly requested.
- Use `Background/Info` and `TextIcons/LinkSecondary` for selection-context chips.

## 6. Type

- Use Figtree for UI and DM Mono only for numeric metrics.
- Panel title: `label/small` or `header/xsmall`; messages: `paragraph/small`; help/meta: `paragraph/xsmall`; controls: `label/xsmall`.
- Use sentence case, no exclamation marks, nouns for labels and bare verbs for actions.
- In conversations, align assistant content to the left and user-authored content to the right. Apply alignment to the message container, not by manually offsetting its children.

## 7. Components and sizes

- Icon-only actions: Flow `IconButton`; 28px with 20px icon for headers/toolbars, or 24px with 16px icon for message actions. Provide a label/tooltip.
- Text fields: Flow `Text field`, 32px, `radius/md`, `Stroke/default`; put search in the icon slot.
- Menus: Flow `Action List` with `.Action-Section` and `.Action-Item`; show the current item as pressed plus `check`.
- Chips: 24px tall, `radius/md`, 4×6 padding, gap 4, `label/xsmall`, 14px icon.
- Floating launcher: 40px circle, `Background/Default`, `Stroke/default`, `Shadow/md`, neutral 20px icon.
- Map AI SDK Elements patterns—Message, PromptInput, Sources, Inline citation, Context usage, Loader and Scroll to latest—to Flow tokens.

## 8. Icons

- Use Flow icons first at 14, 16 or 20 and `TextIcons/Placeholder` by default.
- For a missing icon, use Tabler outline or Phosphor regular/semibold. Use stroke 1.5px at 20, 1.2 at 16 and 1.05 at 14, with round caps/joins. Add `Size=20/16/14` variants to the Flow Icons page, bind them to `TextIcons/Placeholder`, record the source, then use the Flow instance.
- Match optical size and weight across adjacent icons. Fix the source icon in Flow instead of nudging it locally.

## 9. File hygiene

- Do not edit production frames. Work in a section named `<Area> · <feature> (exploration – not final design)`.
- Use 1440×1024 frames named `NN · Mode · State`, one state per frame and 80px between frames.
- Put Flow annotation notes directly under the relevant frame. Keep the annotation-note row out of auto layout and position note cards manually; move the next frame row down to prevent overlap.
- Keep annotations semantic. Do not repeat padding, gap, radius, colour or typography already visible or inspectable in Figma; record only exceptions and non-obvious constraints.
- Keep annotation headings undated. Combine requirements about the same interaction or component into one note rather than scattering them across several cards.
- In component/specimen areas, place state variants horizontally to the right of the primary state so readers can compare them visually.
- Use genuine connector nodes cloned from the established Platform style for flows: 3px Flow yellow, open arrowhead and orthogonal routing. Attach each connector to the exact entry control or action target, branch non-linear choices, and keep connectors behind screens and clear of note text.
- Use real copy; use `[__]` for unknown numbers.

## 10. Self-check

- Every container uses auto layout; no spacer rectangles or empty frames.
- Annotation-note rows use free placement; their note cards remain internally structured.
- Every padding and gap uses a spacing variable and is even where required.
- Every fill, stroke, radius, text and shadow uses a Flow variable or style.
- Panel, card and content layers are visibly distinct.
- Adjacent icons match in size and weight.
- No clipping, overlaps or content touching an edge without padding.
- Screenshot each frame and compare it against these rules.
