# Urbanflow UI patterns (proposed by Claude 1 Oct 2026 — pending Pei Ning's sign-off)

Built from Flow components (see components.md). Where a live screen already solves this, the live screen wins. Items marked **Open** are product decisions — design both options or ask; never pick silently. `P#` = product principle in SKILL.md §4.

## Metric card / analysis result (P1)
Used across analytics (Solarflow, Wind comfort, Per-zone EUI, Cost Summary, end-use breakdown, Flux Results).
- Anatomy, top to bottom: label (`label/xsmall` / `label/small`, or `header/xsmall` for a panel heading) → value in **Metric** (DM Mono) + unit in tertiary ink → caveat qualifier → one supporting element (breakdown bar, delta vs baseline, or gap to target — not all three).
- Surface: Card (status on the ring only; no tinted fills or coloured left borders). Selectable runs: OutputSelect.
- Status vs target: Badge (success / caution / critical) with text — never colour alone. Thresholds are product rules → `[__]` unless given.
- Deltas: arrow icon + sign + value + "vs baseline" in `label/xsmall`; green/red only when "better" is unambiguous for that metric (lower EUI is better; higher solar exposure may not be) — otherwise neutral ink. Compose from Badge + icon and flag it as not in Flow.
- States: not run yet / needs input · running · result · **stale** · error · no target selected · loading (skeleton for >300ms). See *Runs*.
- Same anatomy across all cards — differences must be deliberate.

## Caveat pattern (P1)
Short persistent qualifier next to the value (`· upper bound`, `· estimate`, `· 3 of 12 floors`) in `paragraph/xsmall`, secondary/tertiary ink + methodology in a Tooltip behind a 14/16px info icon. Don't inline the whole method; don't hide a qualifier that changes a decision. Partial coverage always shows as a qualifier ("· 3 of 12 floors"), never silently.

## Provenance on inputs (P2)
- Help text under or beside the field states the source as a fragment: "from Archetype default", "from utility bills, Jan–Dec 2025", "from OSM", "from floor plan", "Edited".
- Overridden defaults show "Edited" + a per-field "Reset to default"; a section with any edits shows a count ("3 edited") and a section-level reset.
- Measured beats default: when measured data exists, it's used and labelled; a default never silently replaces a measured value.

## Targets (e.g. Green Mark) (P3)
Selecting a target visibly changes the analytics: Badge on each affected card, gap to target ("12 kWh/m²/yr above"), pass/fail.
- States: none selected (cards show values only + a quiet "Set a target" entry) · selected · changed (cards re-evaluate, no re-run needed) · cleared (Badges and gaps disappear; values stay).
- **Open:** a suppressed (retained) target when Compare is pressed — proposed default: Compare uses the target active on each proposal; if they differ, show both and say so in a caution Banner. Confirm with Pei Ning.

## Runs and simulations (P8)
- Before: show what will run, estimated time and credit cost; primary "Run analysis". Disabled with a reason when inputs are missing ("Add a floor plan to run").
- Running: ProgressIndicator + what's simulating ("Energy · 2 of 4 proposals"); the user can leave the screen; a Toast on completion (4s) with "View".
- Done: OutputSelect card with meta "Ran 14 Apr 25, 03:52".
- **Stale:** any input change after a run → caution Banner on affected results "Inputs changed since this run" + "Run again"; old numbers stay visible, dimmed qualifier `· outdated`.
- Failed: critical Banner — what failed in plain words + "Retry"; inputs kept; never a raw error code alone.
- Cancel is always available while running.
- Flux: runs live in the **Runs** mode (UtilitiesToolbar), results in **Results**.

## Calibration (Flux) (P1, P2)
- Show measured vs simulated side by side per period (monthly by default): a paired bar or line chart + a table, same units, measured labelled with its source.
- Fit quality as two numbers with the standard they're judged against: NMBE and CV(RMSE) vs ASHRAE Guideline 14 thresholds (monthly ±5% / 15%; hourly ±10% / 30%) → Badge "Calibrated" / "Not yet calibrated". Confirm thresholds against the calibration engine before shipping copy.
- Each tuned parameter lists before → after and why ("Infiltration 0.5 → 0.8 ACH · matches Jun–Aug peak"); every change reversible.
- Missing data months show as gaps with a qualifier, never interpolated silently.

## Recommendations (Flux) (P1, P7)
- One card per measure (ECM): name, what changes ("Replace chiller · COP 5.2 → 6.4"), annual energy saving (kWh and %), cost saving (S$/yr), capex (S$, range if estimated), simple payback (yrs), confidence qualifier.
- Default sort by payback; filter by system (HVAC, lighting, envelope…). Include/exclude toggle per measure builds a package; the package total recalculates and notes interactions ("· measures interact; total ≠ sum").
- "Add to proposal" turns a package into a proposal so it can be compared against baseline.

## Compare proposals (P7)
A full-screen view with FullScreenModalHeader "Comparison" or side-by-side columns; baseline first and labelled; same metric order in every column; deltas as in *Metric card*. Show inputs that differ at the top ("What changed") before results. Entry: "Add to Comparison". Max columns before horizontal scroll: 4.

## Proposals lifecycle (P7)
Proposals behave like PRs. Use the ProposalBadge statuses exactly: Draft · Behind main · In review · Changes suggested · Ready for merge · Merged · Closed.
- "Behind main" always offers "Update from main" and says what changed upstream.
- Merging shows a summary of changes (inputs + headline metric deltas) and needs a confirm; conflicts list the field, both values and lets the user pick.
- Version history is a list of named changes, each restorable.

## Building / floor / zone tree (P6)
BuildingHeader + BuildingSelect rows (parent → child → 2ndChild) with Indicator rails, ColorIndicator tying rows to canvas colours, AddButton between rows on hover, overflow `onMore` → ActionList. Selection syncs with the canvas both ways; multi-select with shift/cmd edits shared fields (mixed values show "Mixed").

## Properties panel (320px)
`header/xsmall` panel heading → collapsible sections (no Flow disclosure component yet — use a BuildingHeader-style caret row and flag it) → TextField/Select rows with units and provenance help text → "Reset to default". ActionSection-style `label/xsmall` subheads for groups. Validation on blur with InlineError giving the allowed range ("Enter 2.4–6.0 m").

## Data import (files, bills, BMS) (P2, P4)
- Upload → detect → map → confirm. FileRow + FileCategory for what's attached; FileActions for "Turn into geometry", "Run compliance check".
- Mapping step: detected columns/periods mapped to Urbanflow fields with a preview; unmapped fields named, not hidden.
- Validation summary before confirm: periods covered, gaps, outliers, unit assumptions ("Assumed kWh"). Never import silently.

## Category assignment inline (e.g. parcel edge labels) (P4)
DropdownPill (`empty` until chosen) → ActionList. Taxonomy: front / side / rear, corner, adjacency types, special conditions, unclassified. Unclassified is visible, not blank.
- Proposed: **single-select per edge** (one category drives one setback rule); adjacency as a separate optional attribute rather than a second category.
- **Open:** whether categories drive setback logic, and whether sub-classification is needed.

## Onboarding / project setup (P4)
Stepper (named steps) + ItemCard / Card for choices (status ring, Badge `status`). One decision per step; defaults pre-filled with provenance; "Back" never loses input.
- Every "aligns to" / reference field names the thing in human terms — compass direction ("North-east edge"), street name, or bearing ("Edge at 42°"). Proposed fallback order: street name → compass direction → bearing. **Open:** which identifiers the data actually has ("Will align to" naming gap).

## Compliance
ComplianceIssue cards grouped by regulation, failures first; each expands to the Policy clause + source link and links to the element on the canvas. Summary count at the top ("4 failed · 18 passed").

## Comments
CommentPin on the canvas + CommentSection/CommentThread panel; selecting a thread pans the canvas to its pin. Resolved threads hidden by default ("Show resolved comments").

## Feedback
Toast for confirmations/progress (4s); Banner for persistent issues; InlineError for field validation; Modal for decisions (secondary then primary, destructive uses `tone="critical"` and names the object: "Delete Proposal A?").

## Empty states
Name what goes here + the single action that fills it; named placeholders ("Untitled floor group"). No illustrations.

## AI-assisted content (P2)
`Semantic/magic-*` colour and the `ai` icon; always editable/dismissable and says what it's based on ("Suggested from 12 months of bills"). AI output is a draft the user accepts, never applied silently.
