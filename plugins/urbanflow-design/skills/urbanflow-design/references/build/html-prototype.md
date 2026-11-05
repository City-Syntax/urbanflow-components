# HTML interactive prototype

Only when Pei Ning says yes in Step 1. Load the `artifact-design` skill before writing, then publish with the Artifact tool.

## Setup

- One self-contained `.html` file. Paste `../assets/flow-tokens.css` into a `<style>` block (it loads Figtree + DM Mono and defines every Flow token as `--<Group>-<name>` — `var(--TextIcons-Primary)`, `var(--spacing-16)`, `var(--radius-lg)`, `var(--Shadow-sm)` — plus a class per text style: `.header-small`, `.label-small`, `.metric-medium`). Style everything with those only.
- Components: hand-build the DS components you need as small React (UMD from cdnjs/unpkg) or vanilla JS functions, matching the props and variants in `urbanflow-design-principles/references/principles/components.md` (e.g. `Button({variant, tone, size, state})`). Keep names identical to the DS so eng can map them. The DS bundle can't be loaded into an artifact (it lives behind claude.ai sign-in).
- Icons: inline the SVGs you need from `../assets/flow-icons/<name>.svg` (20px Flow drawings, paths paint `currentColor`; set CSS `color`, default `var(--TextIcons-Placeholder)`; selected tools `var(--TextIcons-Emphasis)`). Scale to 16/14 with width/height when needed. If no Flow icon fits, inline a Tabler outline SVG (fetch `https://raw.githubusercontent.com/tabler/tabler-icons/main/icons/outline/<name>.svg` with the shell) and list it in the reply as a new icon not yet in the Flow library. Never Lucide/emoji.
- Stage: fixed 1440×900 app frame, scaled to fit the viewport (CSS `transform: scale()`), centered on `var(--Background-Light)`. Canvas/3D area = flat placeholder with a `var(--Stroke-default)` 1px dot grid at 16px pitch.
- Artifacts have no persistent browser storage guarantees — keep state in variables.

## Behaviour

- Happy path + one error/edge path by default (e.g. simulation fails, input out of range).
- Real interactions where cheap: TextFields accept typing with units, Selects and DropdownPills open ActionLists, BuildingSelect rows and Policy/ComplianceIssue cards expand and collapse, SegmentedControl switches views, Toasts appear and auto-dismiss after 4s, Modals trap focus and close on Esc.
- Transitions: 80–180ms, `cubic-bezier(0.2,0,0,1)`, colour/shadow only; panels/sheets may slide. Respect `prefers-reduced-motion`.
- Visible focus rings (`var(--shadow-focus)`) and keyboard access for every control.
- A small floating control (bottom-left, outside the app frame): screen list to jump between states + "Restart".
- For user testing: final-ish copy, no internal notes on screen; list new copy in the reply instead.

## Publish

Title: 2–4 words (`Retrofit onboarding prototype`). One-sentence description. Icon word: `prototype` or `layout`. After publishing, say in one line what it covers; don't paste the link (the card shows it).
