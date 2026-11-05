# Flow tokens

Source: Flow Design System Figma file (Variables page, fileKey `NQpg4P9K158sjcEKmMLd8w`), synced 1 Oct 2026. Same content, with the icon SVGs, in the Flow artifact https://claude.ai/artifact/6tDZ6LvaJMBTknUeUNmgjg (`project/tokens.json`). **Components and variables will change — re-read the artifact or Figma when something looks off.**

Naming: in Figma the variable is `Group/name` (`TextIcons/Primary`, `spacing/16`, `radius/lg`); in the artifact and HTML the same token is `Group-name` / `var(--TextIcons-Primary)`. Text styles are Figma styles (`header/small`), classes `.header-small` in the artifact. Old Claude Design aliases (`--uf-text`, `--uf-primary`…) map in §7.

## 1. Colour (one mode: light)

| Token | Value | Use |
|---|---|---|
| `Neutrals/neutral-0` | #ffffff | Pure white; primitive behind Background-Default. |
| `Neutrals/neutral-1` | #fdfdfd | Near-white primitive. |
| `Neutrals/neutral-2` | #fafafa | App chrome / sidebar tint. |
| `Neutrals/neutral-3` | #f7f7f7 | Primitive behind Background-Light (canvas). |
| `Neutrals/neutral-10` | #e3e3e3 | Neutral hairline grey (neutral family, not the warm Stroke set). |
| `Neutrals/neutral-20` | #cccccc | Disabled fills. |
| `Neutrals/neutral-30` | #b5b5b5 | Neutral mid grey. |
| `Neutrals/neutral-80` | #616161 | Muted text that still passes AA on white (6.2:1) when a solid grey is needed. |
| `Neutrals/neutral-90` | #4a4a4a | Dark grey; hover step for near-black fills. |
| `Neutrals/neutral-100` | #303030 | Near-black ink step (the primary button uses `Background/Inverse` #1A1A1A). |
| `Neutrals/neutral-120` | #1a1a1a | Deepest neutral; primitive behind Background-Inverse. |
| `Semantic/info-xxxlight` | #fcfdff | Links, focus, selection and neutral information. |
| `Semantic/info-xxlight` | #e2e7ff | Info surfaces (Background-Info). |
| `Semantic/info-xlight` | #d5dcff | Links, focus, selection and neutral information. |
| `Semantic/info-light` | #c5d0ff | Links, focus, selection and neutral information. |
| `Semantic/info-primary` | #005bd3 | Link text and focus ring; 6.1:1 on white. |
| `Semantic/info-heavy` | #004299 | Links, focus, selection and neutral information. |
| `Semantic/info-xheavy` | #002e6a | Links, focus, selection and neutral information. |
| `Semantic/success-xxxlight` | #f8fffb | Passing / within target. |
| `Semantic/success-xxlight` | #cdfee1 | Passing / within target. |
| `Semantic/success-light` | #29845a | Success text/icons (TextIcons-SuccessPrimary); 4.6:1 on white — just passes. |
| `Semantic/success-primary` | #136f45 | Success text needing more contrast (6.2:1 on white). |
| `Semantic/success-heavy` | #0c5132 | Passing / within target. |
| `Semantic/success-xheavy` | #083d25 | Passing / within target. |
| `Semantic/success-xxheavy` | #092a1b | Passing / within target. |
| `Semantic/caution-xxlight` | #fff1e3 | Near a limit, estimates, warnings. |
| `Semantic/caution-light` | #ffbd14 | Caution fills and icons only — 1.7:1 on white, never text. |
| `Semantic/caution-primary` | #e6aa12 | Caution icons on light grounds — 2.1:1, fails as text and as a 3:1 graphic on white. |
| `Semantic/caution-heavy` | #332e00 | Caution text on Background-Caution (12.4:1). |
| `Semantic/caution-xheavy` | #1f1c00 | Near a limit, estimates, warnings. |
| `Semantic/critical-xxxlight` | #fffbfb | Failures, errors, destructive actions. |
| `Semantic/critical-light` | #fee9e8 | Failures, errors, destructive actions. |
| `Semantic/critical-primary` | #e51c00 | Destructive button fill and error icons; white on it 4.7:1. |
| `Semantic/critical-heavy` | #8e1f0b | Error text (TextIcons-CriticalPrimary); 8.9:1 on white. |
| `Semantic/critical-xxheavy` | #5f1507 | Failures, errors, destructive actions. |
| `Semantic/critical-xxxheavy` | #2f0a04 | Failures, errors, destructive actions. |
| `Semantic/magic-xxxlight` | #fdfdff | AI-generated or AI-assisted content only. |
| `Semantic/magic-primary` | #7126ff | AI accents and AI buttons; 6.1:1 on white. |
| `Semantic/magic-heavy` | #5700d1 | AI-generated or AI-assisted content only. |
| `Misc/misc-red` | #ff383c | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-orange` | #ff8d28 | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-yellow` | #ffcc00 | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-green` | #34c759 | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-cyan` | #00c0e8 | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-indigo` | #cb30e0 | Colour indicators, avatars, tags and chart series only — never status or text. Despite the name it is magenta. |
| `Misc/misc-pink` | #ff2d55 | Colour indicators, avatars, tags and chart series only — never status or text. |
| `Misc/misc-brown` | #ac7f5e | Colour indicators, avatars, tags and chart series only — never status or text. |
| `TextIcons/Emphasis` | #202020 | Page and panel titles, key values; 16.3:1 on Background-Default, 15.2 on Background-Light. |
| `TextIcons/Primary` | rgba(32, 32, 32, 0.8) | Default UI text on Background-Default, -Card, -Light and -Medium (7.8–8.5:1). |
| `TextIcons/Secondary` | rgba(32, 32, 32, 0.7) | Paragraphs and supporting text; 6.0:1 on Background-Default, 5.6 on -Medium. (Icons moved to Placeholder on 1 Oct 2026.) |
| `TextIcons/Tertiary` | rgba(32, 32, 32, 0.5) | Units beside values, section headings, meta. 3.2:1 on Background-Default — passes only for text 24px+ or bold 19px+; flag smaller use. (Name spelled as in Figma.) |
| `TextIcons/Placeholder` | rgba(32, 32, 32, 0.4) | Input placeholders and the **default icon colour** (2.4:1) — never real text; icon-only controls need a label. |
| `TextIcons/Disabled` | rgba(32, 32, 32, 0.3) | Disabled text and icons (exempt from contrast); pair with another disabled cue. |
| `TextIcons/InversePrimary` | #ffffff | Text on Background-Inverse and on the near-black primary button (13–17:1). |
| `TextIcons/InverseSecondary` | rgba(255, 255, 255, 0.7) | Secondary text on Background-Inverse. |
| `TextIcons/InverseDisabled` | rgba(255, 255, 255, 0.5) | Disabled text on dark fills. |
| `TextIcons/CriticalPrimary` | → Semantic-critical-heavy | Error messages on Background-Default (8.9:1) and Background-Critical (7.7:1). |
| `TextIcons/CriticalSecondary` | → Semantic-critical-xxheavy | Secondary error text. |
| `TextIcons/SuccessPrimary` | → Semantic-success-light | Success text on Background-Default (4.6:1); on Background-Success it is 4.2:1 — use Semantic-success-primary there. |
| `TextIcons/CautionPrimary` | → Semantic-caution-light | Caution icons/fills only — fails as text on white. |
| `TextIcons/CautionSecondary` | → Semantic-caution-primary | Caution icons only — fails as text; caution text uses Semantic-caution-heavy. |
| `TextIcons/LinkPrimary` | → Semantic-info-primary | Links (6.1:1 on white). |
| `TextIcons/LinkSecondary` | → Semantic-info-heavy | Link hover / pressed. |
| `Background/Default` | → Neutrals-neutral-0 | Panels and page background. |
| `Background/Light` | → Neutrals-neutral-3 | Canvas and recessed areas. |
| `Background/Medium` | #efefef | Pressed/hover fills, segmented-control track. |
| `Background/Card` | #fdfdfa | Warm cream for cards, secondary buttons and tooltips. |
| `Background/Overlay` | rgba(0, 0, 0, 0.4) | Scrim behind modals. |
| `Background/Inverse` | → Neutrals-neutral-120 | Dark surfaces: toasts, floating bars. |
| `Background/Inverse-Secondary` | #4b4b48 | Secondary dark surface. |
| `Background/Info` | → Semantic-info-xxlight | Info banners, pinned/selected states. |
| `Background/Critical` | → Semantic-critical-light | Error banners. |
| `Background/Caution` | → Semantic-caution-xxlight | Warning banners. |
| `Background/Success` | → Semantic-success-xxlight | Success banners. |
| `Stroke/subtle` | #ecece6 | Dividers inside a card. |
| `Stroke/default` | #e3e3dc | Card and input borders. 1.3:1 on white — below 3:1 for control boundaries; flag on inputs and checkboxes. |
| `Stroke/strong` | #d1d1ca | Hover borders, canvas connectors (1.5:1). |
| `Stroke/selected` | rgba(32, 32, 32, 0.8) | Selected card/field ring. |
| `Stroke/critical` | → Semantic-critical-heavy | Error field borders. |
| `Stroke/info` | → Semantic-info-primary | Focus and info borders (6.1:1). |

## 2. Type (Figtree unless noted; tracking 0)

| Style | Size / line | Weight | Use |
|---|---|---|---|
| `header/xxlarge` | 32/36 | SemiBold | Page titles. |
| `header/xlarge` | 28/32 | SemiBold |  |
| `header/large` | 24/28 | SemiBold | Page headings in dense views. |
| `header/medium` | 20/24 | SemiBold |  |
| `header/small` | 16/20 | SemiBold | Section headings. |
| `header/xsmall` | 14/20 | SemiBold | Panel headings. |
| `header/xxsmall` | 12/16 | SemiBold | Small group headings. |
| `paragraph/large` | 18/28 | Regular |  |
| `paragraph/medium` | 16/24 | Regular | Body copy. |
| `paragraph/small` | 14/20 | Regular | Default body in dense panels. |
| `paragraph/xsmall` | 12/16 | Regular | Help text, captions, qualifiers. |
| `label/large` | 18/24 | SemiBold |  |
| `label/medium` | 16/20 | SemiBold |  |
| `label/small` | 14/16 | SemiBold | Buttons, inputs, tabs, table headers. |
| `label/xsmall` | 12/16 | SemiBold | Compact controls and badges. |
| `metric/large` | 28/32 | Regular · DM Mono |  |
| `metric/medium` | 24/32 | Regular · DM Mono |  |
| `metric/small` | 18/24 | Regular · DM Mono |  |
| `metric/xsmall` | 16/20 | Regular · DM Mono | Smallest DM Mono style: compact numeric values in tables and cards (ComplianceIssue Required / Actual). |

## 3. Spacing (`spacing/*`)

`spacing/0` 0px, `spacing/2` 2px, `spacing/4` 4px, `spacing/6` 6px, `spacing/8` 8px, `spacing/12` 12px, `spacing/16` 16px, `spacing/24` 24px, `spacing/32` 32px. Panel/card padding 16; related items 8; inside controls 2–8.

## 4. Radius (`radius/*`)

- `radius/none` 0px — Square edges (canvas elements).
- `radius/xs` 2px — Small swatches and indicators.
- `radius/sm` 4px — Checkboxes, small chips.
- `radius/md` 8px — Small controls and badges.
- `radius/lg` 12px — Buttons, inputs, menus, cards.
- `radius/full` 9999px — Pills, chips, toggles, avatars.

## 5. Effects (styles)

- `Shadow/xs` — `0 1px 2px 0 rgba(28, 28, 28, 0.05)` — Chips, inputs.
- `Shadow/sm` — `0 2px 6px 1px rgba(28, 28, 28, 0.06), 0 1px 2px 0 rgba(28, 28, 28, 0.04)` — Cards, canvas nodes.
- `Shadow/md` — `0 4px 20px -4px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(28, 28, 28, 0.05)` — Popovers, menus, tooltips.
- `Shadow/lg` — `0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 4px 8px -2px rgba(28, 28, 28, 0.06)` — Panels and sheets.
- `Shadow/float` — `0 12px 32px -8px rgba(0, 0, 0, 0.35)` — Dark floating bars and toasts.
- `[hack] shadow-focus` — `0 0 0 2px #005bd3` — Focus ring (Figma '[hack] shadow-focus'): 2px Semantic-info-primary spread, 6.1:1 on white.

## 6. Icons

69 glyph sets in the Figma Icons frame (node `1726:14351`; `hvac` and `run` added 1 Oct 2026 for the Flux modes), each drawn separately at 14 / 16 / 20px — use the size that fits (14 tree rows, 16 menus/controls, 20 toolbars/panel headers), colour `TextIcons/Placeholder` unless stated (kept exceptions: `checkbox` white interior, `add-building` light accent). 20px SVGs are in the Flow artifact's Icons group (paint `currentColor`). Domain glyphs: building, add-building, floor, zone, massing, blueprint, draw-wall, box-add-above, box-add-below, stepped, sloped, compliance, policies, carbon, analytics, coin, construction, hammer, education, ai, token. Filled/alt styles: building, zone (filled), eye (open/closed/dotted), checkbox, radio.

## 7. Old names → Flow

Code (`@urbanflow/theme`) now uses Flow names mechanically: `Background/Default` → `bg-background-default`, `TextIcons/Primary` → `text-texticons-primary`, `Stroke/default` → `border-stroke-default`, `Semantic/info-primary` → `info-primary`, `Neutrals/neutral-10` → `neutral-10`, text style `header/large` → `text-header-large`. No shadcn colour aliases. The table below is for the legacy Claude Design `--uf-*` tokens.

| Claude Design `--uf-*` | Flow |
|---|---|
| `--uf-text-strong` | `TextIcons/Emphasis` |
| `--uf-text` | `TextIcons/Primary` |
| `--uf-text-secondary` | `TextIcons/Secondary` |
| `--uf-text-tertiary` | `TextIcons/Tertiary` |
| `--uf-primary` | `Neutrals/neutral-100` |
| `--uf-background-*` | `Background/*` |
| `--uf-stroke-new-*` | `Stroke/*` |
| `--uf-info-primary` etc. | `Semantic/info-primary` etc. |
| `--uf-radius-16`, `-24`, `-32` | not in Flow — use `radius/lg`, flag |
| `--uf-space-20` | not in Flow — use `spacing/16` or `/24`, flag |
| `.uf-display-*` | not in Flow — no Display styles |
| `.uf-paragraph-xsmall` 12/20 | `paragraph/xsmall` is 12/16 |
| `.uf-metric-medium` 24/28 | `metric/medium` is 24/32 |
