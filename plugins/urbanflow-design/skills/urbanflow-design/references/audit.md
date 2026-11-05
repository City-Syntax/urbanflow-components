
# Urbanflow UX audit

Fast, honest design-peer critique — the way one designer leaves notes for another. Evaluates against Urbanflow's DS and principles, UX heuristics, web accessibility and desktop-web conventions, then replies with concise bullets.

## Step 0 — Scope (ask only if genuinely unclear)

Proceed with defaults and state them in the first line: whole flow shown, desktop 1440, pre-handoff. Ask only if several flows are in one file and it's unclear which, or if it's unclear whether this is early exploration (then skip handoff-readiness).

## Step 1 — Collect the screens first (one pass, no analysis yet)

- **Figma link:** the Figma API is rate-limited for this user, so batch: one `get_metadata` on the section/page, then `get_screenshot` only for the frames under review. If the built-in browser is already signed in to Figma, screenshots there are fine too. Pull exact values (`get_design_context`) only for elements you're about to flag.
- **Live app / HTML prototype:** built-in browser at 1440×900; `read_page` for structure, screenshots for layout/states. Don't trigger destructive or long-running actions.
- **Uploaded screenshots:** use directly. **Description only:** note findings are conceptual.

## Step 2 — Evaluate

Load `references/principles.md` (SKILL.md + `tokens.md`, `components.md`, `patterns.md`, `contrast.md`) and this skill's `references/audit/heuristics.md` and `references/audit/web-standards.md`. Check every screen through these lenses; skip lenses with nothing real to say:

- **Flow completeness** — dead ends, missing transitions, entry points, every exit (Cancel/Close/Esc/Back/navigating away mid-run), where the user lands.
- **Edge cases** — long names/labels, many floors/zones, zero results, huge/small numbers, missing inputs, partially defined models, simulation failure/timeout, stale results after edits, permissions (owner/editor/viewer), concurrent editors, slow network.
- **Missing states** — empty, loading, running, stale, error, success, disabled, selected/hover/focus for each interactive element.
- **Trust in numbers** — units, basis and confidence shown; caveat pattern used; targets visibly affect results; comparisons use deltas with sign + arrow, not colour alone; no invented precision.
- **DS compliance** — off-token colours/radii/spacing/shadows; detached shapes where a DS component exists; wrong Button variant (primary must be near-black, one per view); DM Mono used for prose or Figtree for metrics; tinted cards or coloured left borders; status by colour only; Lucide/emoji icons; imagery that isn't data.
- **Accessibility** — contrast from `contrast.md` (compute anything not listed), keyboard reachability and visible focus, accessible names on IconButtons, labels (placeholder isn't a label), error text tied to fields, 10px text carrying essential info, colour-only meaning in charts/canvas, reduced motion.
- **Voice/copy** — flat, instrumental; nouns for labels, bare verbs for actions; sentence case with proper domain nouns; units consistent; no marketing warmth, emoji or exclamation marks; no lorem or `{placeholder}` left in "final" frames.
- **Handoff readiness** — anything eng or the coding agent would have to guess: undefined states, sizing/overflow for dynamic content, off-token values, unlabelled interactions, which data drives a value, code-vs-DS drift (component not in code yet).
- **Heuristics & dark patterns** — name them when found (e.g. "H1 visibility of system status", confirmshaming, hidden costs).

For each issue note: screen · location · lens · why it matters · fix direction (name the DS component or token, e.g. "swap to `Banner tone=caution`", "use `TextIcons/Secondary`") · severity (Blocker / High / Medium / Low) — severity is only shown in table mode.

Only flag real issues with evidence. Signal over exhaustiveness.

## Step 3 — Reply (default: bullets in chat, no file)

```
[One line: what was reviewed + assumptions]

**[Screen / step]**
- [Issue] — [why it matters] → [fix]

**Missing states**
- …
**A11y**
- …
**Handoff flags**
- …
**DS drift**
- …
**Working well** (optional, max 2 bullets)
```

One line per bullet where possible, two max. Lead with the concrete issue. Skip empty sections. If a finding comes from a DS gap (tertiary ink contrast, stroke contrast, 10px components), say the fix belongs in the DS. End with a one-line verdict: **ship / fix-first**.

## Step 3b — Table mode (on request: "table", "log it", "Jira-style", or when another skill asks)

Same findings, reshaped — don't re-scan:

| Screen | Issue | Current behaviour | Why it matters | Severity | Fix direction |
|---|---|---|---|---|---|

Blocker = breaks the flow or blocks handoff · High = real user-facing gap, fix before ship · Medium = worth fixing · Low = polish. Missing states, a11y, handoff flags and DS drift are rows too. Same one-line framing above the table. Save as `.md` only if asked or if the output is going to GitHub/the coding agent.

## Tone

Direct, collegial, specific ("the Run analysis button in the properties footer", "third metric card"). Balanced: every problem gets a direction. No padding, no "no issues found" per lens. Always note that a design-level a11y review doesn't replace a keyboard + screen-reader pass on the build.

Offer next steps in one line: fixes in Figma via `references/build.md`, notes via `references/handoff.md`, or QA issues via `references/qa.md`.
