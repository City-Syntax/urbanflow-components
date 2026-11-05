
# Urbanflow design handoff

Notes that an engineer — or an unattended coding agent — can build from **without coming back to ask**. Completeness beats polish: every question asked in Slack is lost dev time, and the answer usually ends up somewhere QA never reads. Load `references/principles.md` first; use its component names, props and Flow variable/style names in every note.

## What engineers and agents actually need answered

1. **States** — empty, partial, full, at limit, loading, running, stale, error, success, disabled; permission variants (owner/editor/viewer); feature flag on/off.
2. **Note matches frame** — labels, copy and values in the note are exactly what's drawn; every mentioned element is drawn.
3. **Sizing for dynamic content** — fixed vs hug, min/max, truncation vs wrap, long labels, many floors/zones, huge/small numbers, 1280 vs 1440 width.
4. **Every exit** — primary action, Cancel, Close/X, Esc, click-outside, Back/browser back, navigating away mid-run; where the user lands; what's kept.
5. **Logic & persistence** — limits and what happens at them, validation ranges, when data saves (autosave vs explicit), what triggers a re-run or makes results stale, ordering rules; *same as current* vs *changed*.
6. **Data source** — for every value: API field, calculation, default ("from Archetype default"), or user input; units and rounding.
7. **Entry points** — every place that opens the screen.
8. **Component mapping** — DS component + props (`Button variant="primary" tone="critical" size="medium"`), and whether it exists in code yet (verify registry status before reporting "not in code yet — build, or map to shadcn <X>").
9. **Assets** — icon names from the DS set (size 14/16/20), renders, Lottie if any.
10. **Where decisions live** — decisions from Slack/meetings written back into Figma.

## How to approach it

1. Identify the note types needed (badge table below). Most handoffs need UI CHANGE + STATES + USER ACTION.
2. Gather context: Figma frames (screenshot + `get_design_context` on the frames and existing notes; batch — the Figma API is rate-limited for this user), the repo for current behaviour (read-only), and what Pei Ning says. Without a link, ask for: screens, what changes, what stays, platforms/products affected.
3. Run the **readiness check** (`references/handoff/readiness-check.md`). Don't invent product rules to fill gaps — flag them. A confident guess is worse than an open question because it gets built.
4. Write the notes — only sections that apply.
5. End with OPEN QUESTIONS (each with an owner: Pei Ning / PM / eng) if any remain.

For a **review** of existing notes, skip to the readiness check and use `references/handoff/review-mode.md`.

## Badges (use the file's own annotation label components where they exist)

The Figma file already has `Label*` / `Annotation*` components — use them instead of drawing new badges. ALL CAPS labels.

| Badge | Figma component | Use for |
|---|---|---|
| UI CHANGE | LabelUIChange | Visual/component changes |
| NEW COMPONENT | LabelNewComponent | Net-new DS component (or not in code yet); also **NEW ICON** — a Tabler icon not yet in the Flow library (`tabler/<name>`) |
| EXISTING COMPONENT | LabelExistingComponent | Reuses a DS component as-is |
| NO LOGIC CHANGE | LabelNoLogicChange | Visual only — tell eng/agent not to touch logic |
| ENG EFFORT REQUIRED | LabelEngEffortRequired | Needs logic/data/backend work — the coding agent must skip these; a human handles them |
| ANIMATION | LabelAnimation | Motion |
| REQUIREMENT | LabelRequirement | Product rule that must hold |
| TBD / WIP / REVIEW | LabelTBD / LabelWIP / LabelReview | Undecided / in progress / needs review |
| BRIEF | LabelBrief | Context for the section |
| STATES · LAYOUT RULES · LOGIC · DATA · COPY · USER ACTION · OPEN QUESTIONS · UPDATED [date] | Annotation note | Written sections (no dedicated label component) |

## Note template

```
[Screen / component]  ·  Product: [core / Flux / …]

UI CHANGE
• Component: Card status="active" (ring amber) — was: custom div with left border
• Header level="panel" → "Energy results"
• Value: Metric medium (DM Mono), unit paragraph/xsmall TextIcons/Tertiary
• Same as current: layout, order of cards

STATES
• Not run: … → frame [name]
• Running: ProgressIndicator value=[%] + "Simulating energy…" ; user can leave
• Stale (inputs changed): Banner tone="caution" "Inputs changed since last run" + Button "Run again"
• Error: Banner tone="critical" [cause] + retry; inputs kept
• Viewer role: read-only, no Run button

LAYOUT RULES
• Card: hug height, min [__]px; padding 16 (spacing/16); gap 8
• Label: 1 line, truncate with tooltip; value never truncates
• Panel width 320 fixed; content scrolls, footer sticky

LOGIC
• Results become stale when any Energy Flow Parameter changes (changed from current: previously no stale state)
• Run disabled while a run is in progress (same as current)

DATA
• Site EUI ← [API field / calc] · kWh/m²/yr · 1 dp
• Target ← project.greenMarkTarget (null → "No target" state)

COPY
• "Inputs changed since last run" — new
• Button "Run again" — new
• Strings location: [file path in repo] — TO BE UPDATED if copy moves to a strings file

USER ACTION
Entry: Analysis tab · "Run analysis" in Model toolbar
• Click Run again → running state → results (same card)
• Esc / Close on Banner → dismisses Banner only; stale state stays on the card

OPEN QUESTIONS
• Threshold for "near target" caution? — PM
```

Rules for writing: `references/handoff/writing-rules.md` (bullet order, token format, same-vs-changed, one scenario per flow block, boundary cases, transitions, agent-ready wording).

## Output

Notes ready to paste into Figma annotation cards: bullets, one idea per bullet, ALL CAPS badges, grouped by screen, no intro prose. If Pei Ning wants it placed in Figma, add Annotation instances next to the frames via `use_figma` (load `figma:figma-use` first) — proceed when the user has requested annotations in that file; otherwise keep the result read-only.

If the handoff is going to the **GitHub coding agent**, also produce the agent version per `references/handoff/writing-rules.md` §Agent-ready: self-contained, no questions mid-run, ENG EFFORT REQUIRED items excluded, "Needs decision" instead of stopping.
