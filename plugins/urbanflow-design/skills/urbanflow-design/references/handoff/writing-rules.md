# Writing rules

## Bullet order inside UI CHANGE (same order on every screen so they can be compared)
1. Component + variant/props
2. Navigation / header change
3. Sub-components (tabs, steppers, badges)
4. Buttons
5. Text colour and style
6. Values/metrics (Metric ramp, units)
7. Imagery / canvas
8. What stays the same

## Component and token references
- Name the component and meaningful state/variant when this is not obvious from the layer itself. Unknown → `[confirm component]`.
- Do not transcribe routine padding, gap, radius, colour or typography that engineering can inspect in Figma. Include a token only for an intentional exception, a behaviour-dependent style or a constraint that is not visually deducible.
- Primary buttons are near-black; flag any frame that shows otherwise. Product text is Figtree; numbers DM Mono. Flag Inter/SF Pro leftovers from older frames.
- If the note differs from the component's default behaviour, the component wins unless Pei Ning explicitly overrides — say which.

## Voice and authorship
- Write as Pei Ning/the design owner, not as an agent writing for her.
- Never write “as per Pei Ning”, “per Pei Ning” or third-person attribution to Pei Ning.
- Prefer direct decisions: “The panel opens above the launcher.”
- Show component states visually to the right of the primary state in the component/specimen area. Use prose only for state behaviour that the image cannot communicate.
- Keep headings undated. Group requirements for the same interaction, component or decision into one annotation note.

## Same vs changed
Unmentioned = ambiguous, so be explicit: `Same as current design` · `No logic change` · `Changed from current design: [old] → [new]` · `Only in [product]`.

## Flows: one scenario per block
- Structure complex journeys as `Main flow → Subflow → Actions/states`.
- Use dark annotation titles for main flows and Light titles for subflows and leaf states. Align every level to the same starting x-position; hierarchy comes from numbering, title treatment and vertical grouping, not indentation.
- Stretch a parent title to end at the same x-position as its rightmost child title. Arrange a branch's screens horizontally in interaction order and stack sibling branches vertically.
- Use whole numbers for main flows, decimal numbers for subflows, and sequential numbers for leaf actions/states.
- Connect only interaction-driven transitions. Represent system-driven loading, completion and error
  changes with clearly titled state frames and no connector. Start a new vertical row when they form a distinct branch.
- Use the Flow Design System `Annotation note` component for notes and requirements.
- Place each note below the screen it explains. Keep notes independent and movable; do not frame several notes together.

```
Run analysis (first run)
Model → Run analysis → Analysis (running) → results
  → Navigate away → run continues → Toast "Energy results ready" on return
  → Simulation fails → Banner critical + Retry → inputs kept

Re-run after edit
Analysis (stale) → Run again → running → results replace previous (previous kept in run list? [TBD — PM])
```
Always end with where the user lands.

## Every rule needs its boundary
At max, at min, when the rule can't apply (no target set, zero floors, legacy project without the field, run in progress, viewer role).

## Transitions
Design intent only, DS motion (80–180ms, ease-standard, colour/shadow): "Panel: slides in from right", "Toast: fades in bottom-centre, auto-dismiss 4s". No damping values.

## Decisions made outside Figma
Write them into the relevant subject block with a neutral label such as `DECISION` or `REQUIREMENT` and, when useful, a source label (`Decision source: Slack with Ryan`). Do not add an `UPDATED [date]` prefix. Figma stays the source of truth.

## Agent-ready (for the GitHub coding agent)
The agent runs unattended with no chat — ambiguity must be resolved in the text.
- Self-contained: repo, branch, file paths, component names, tokens and exact copy in the issue itself.
- Skip anything tagged **ENG EFFORT REQUIRED** (logic/data/backend) — list it separately for a human.
- Work sections in order; **one commit per issue**.
- **Flag, don't fix** anything outside the notes.
- Where a decision is missing, write **"Needs decision: …"** in the output and continue with the rest — never stop mid-run.
- Plain language; attribute reasoning to the design, not invented technical justifications.
