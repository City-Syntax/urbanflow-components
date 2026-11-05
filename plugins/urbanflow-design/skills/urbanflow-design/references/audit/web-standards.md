# Desktop web standards (Urbanflow is a browser app)

## Layout & viewport
- Design size 1440×900; check it still works at **1280×800** (common laptop) — panels fixed (52 / 268–300 / 320), canvas shrinks. Below ~1024 is out of scope unless asked; say so if a layout would break.
- Panels scroll independently; headers and primary actions in panels stay visible (sticky footer for Run/Apply).
- Canvas overlays float in corners/bottom-centre and must not cover the selected object or each other.
- Browser zoom 200% / large text: panels reflow or scroll; nothing clipped without a way to reach it.

## Keyboard & focus (WCAG 2.2 AA)
- Every action reachable by keyboard; logical tab order (rail → tree → canvas toolbar → properties); visible focus (Flow `shadow-focus`), not obscured by sticky bars (2.4.11).
- Esc closes Modals/popovers and returns focus to the trigger; focus trapped inside Modals/FullScreenModals.
- Tree (BuildingSelect): arrow keys to move/expand/collapse; Enter selects.
- Menus (ActionList): arrow keys, type-ahead, Esc.
- Canvas: keyboard alternative for selection (tree) and core tools; drag operations have a non-drag alternative (2.5.7).
- Target size ≥24×24px (2.5.8); micro buttons (24px) and 10px underline tabs are at the limit — flag when packed tightly.

## Screen readers
- IconButtons have `label` (accessible name); decorative icons hidden.
- Inputs have visible labels; units and help text associated (`aria-describedby`); InlineError announced.
- Live regions for run progress/completion and Toasts (polite), errors (assertive).
- Tables use header cells; sortable headers announce sort state.
- Charts have a text/table alternative with the key numbers.

## Forms & data entry
- Units in the field (TextField `unit`), accepted ranges stated, validation on blur not on every keystroke, keep invalid input for correction.
- Defaults show provenance; "Reset to default" per field or section.
- Autosave vs explicit save is obvious; unsaved changes warned before navigating away.

## Motion
80–180ms, ease-standard; respect `prefers-reduced-motion`; nothing flashes >3×/s; auto-dismissing Toasts (4s) never carry the only copy of an error or an action the user must take (2.2.1).

## Browser behaviour
- Back/forward and deep links work for main views (project, model, analysis, comparison).
- Right-click/context menus don't replace discoverable UI.
- Long jobs survive a tab refresh or show how to get back to the result.
- Copy/paste of values works; numbers selectable.
