# urbanflow design language (Flow)

Flow is urbanflow's design system: a quiet, dense, monochrome interface for working on buildings,
floors and zones, where colour is kept for meaning. This file is the human-written part of
https://components.urbanflow.co/llms.txt; the token, component and icon lists below it are generated
from the code.

## Principles

1. **Colour means something.** The UI is greyscale. Hue only appears for status (info, success,
   caution, critical), for AI (magic purple), and for keying data (Misc colours on series, zones,
   categories and avatars). Never use colour for decoration.
2. **One ink.** All text and icons are one ink, `#202020`, at different strengths. Choose the strength
   by importance, not by picking greys:
   `texticons-emphasis` (100%) › `primary` (80%, default body) › `secondary` (70%, supporting text)
   › `tertiary` (50%) › `placeholder` (40%, placeholders and the default icon colour) › `disabled` (30%).
   Icons at 40% are below 3:1, so an icon-only control always needs a label (tooltip / `aria-label`), and a
   selected or primary control uses its own ink. On dark surfaces use
   `texticons-inverse-*`.
3. **Black is the primary action.** The main call to action is `background-inverse` (near-black) with
   inverse text. Use one primary action per view.
4. **Dense, tool-like UI.** Controls are small. Buttons and icon buttons are 24 / 28 / 32px (micro /
   medium / large, default medium), text fields are 32px and selects are 36px. Labels on controls
   are `label-xsmall` (12px semibold), and supporting copy is `paragraph-small` / `paragraph-xsmall`.
5. **Soft shapes.**
   - `rounded-md` (8px) for controls.
   - `rounded-lg` (12px) for cards and modals.
   - `rounded-full` for pills, chips, avatars and pins.
   - `rounded-sm` / `rounded-xs` for small inner parts.
6. **Elevation is information.**
   - `shadow-xs` / `shadow-sm` for resting cards.
   - `shadow-md` for menus and popovers.
   - `shadow-lg` for modals.
   - `shadow-float` for bars floating over the canvas.

   Every interactive element shows `shadow-focus` (a 2px info-blue ring) on keyboard focus.
7. **Warm, quiet structure.** Surfaces are white (`background-default`) with light greys
   (`background-light` for fills, `background-medium` for hover and pressed). Borders are warm greys:
   `stroke-subtle` › `stroke-default` › `stroke-strong`, and `stroke-selected` for the selected item.

## App shell

Every product (urbanflow, Flux, and the next one) uses the same `AppShell`, the way Figma Design, Slides
and FigJam share one chrome: a 44px dark `TopNavigation`, then the canvas full-bleed with a left panel,
floating canvas tools and a right panel on top of it, 8px inset so the model stays visible. Products only
change what fills each region. Product modes and tools live in the `UtilitiesToolbar` pinned top-right of
the canvas, never as tabs in the top bar.

Both side panels open at a fixed default width every session and the user can drag their inner edge to resize
them: left panel urbanflow 252px / Flux 360px (240–480px), right panel urbanflow 359px / Flux 300px
(280–480px). Don't save the widths; the next session starts at the defaults again.

The urbanflow mark is at `/brand/urbanflow-mark.svg` (ink) and `/brand/urbanflow-mark-white.svg` (for the
dark top bar). Pass it to `TopNavigation` as `logo`; never redraw, recolour beyond these two, or put it in a box.

## Type

Figtree for everything; DM Mono only for numbers that are read as data.

| Style | Use |
|---|---|
| `text-header-*` (xxlarge 32 → xxsmall 12, semibold) | Page, section and card titles |
| `text-paragraph-*` (large 18 → xsmall 12) | Body and supporting copy |
| `text-label-*` (large 18 → xsmall 12, semibold) | Labels on controls, tabs and table headers |
| `text-metric-*` + `font-mono` | Key figures, measurements, counts in analysis results |

## Button hierarchy

Pick the button by emphasis; the tone says what kind of action it is.

| Button | When |
|---|---|
| `primary` | The most important action to move forward, or to finish or dismiss a task. Highest emphasis; full width when it stands alone. |
| `primary` + `tone="success"` | Confirm or submit. |
| `primary` + `tone="critical"` | Irreversible actions such as Delete. |
| `secondary` | Supporting actions next to a primary, or an alternative (Cancel, optional steps). |
| `secondary` + `tone="critical"` | Less destructive but still cautionary actions. |
| `tertiary` (ghost) | Low emphasis, optional or navigational (Skip, Learn more). No fill. |
| `plain` (text link) | Inline in copy (View more). Can be a low-emphasis critical action. |
| `IconButtonGroup` | Frequent actions on the canvas, horizontal or vertical. |
| `HybridButtonGroup` | The current canvas mode, its object and one action, in one floating bar. |

## Rules for building urbanflow UI

- **Use the components first.** Install from the registry (`npx shadcn add @urbanflow/<name>`) before
  building anything by hand, and compose them as the preview at components.urbanflow.co shows.
- **Only Flow classes work.** Tailwind's default colours, font sizes, shadows and radii are switched
  off, so `bg-white`, `text-sm`, `shadow-2xl` or `bg-blue-500` do nothing. Use the token classes below.
- **No hex, no arbitrary values** for colour, type, radius or shadow. If something is missing, it's
  a design question, not a code one.
- **Express state with tones and props**, not colours: `tone="critical"`, `variant="secondary"`,
  `aria-pressed`, `disabled`, `loading`.
- **Icons come from `@urbanflow/icons`** (not Lucide). They're drawn for 14 / 16 / 20px, inherit text
  colour, and default to `texticons-secondary` next to text.
- **Components marked ↪** belong to one product area (Urbanflow canvas, Compliance, Comments, Files).
  Use them for that area, not as general-purpose building blocks.
