# Heuristics for Urbanflow

## Nielsen's 10 (cite as "H# name")
| # | Heuristic | Urbanflow questions |
|---|---|---|
| 1 | Visibility of system status | Is it clear a simulation is running, how far along, and whether results are stale after an edit? Saving/syncing status? Who else is editing? |
| 2 | Match with the real world | Domain terms and units as architects/consultants use them (GFA, Plot Ratio, Site EUI, Green Mark)? Compass directions/street names instead of internal IDs? |
| 3 | User control & freedom | Undo, Reset to default, cancel a run, revert a proposal, close without losing inputs? |
| 4 | Consistency & standards | Same metric anatomy across cards, same panel structure, DS components used the same way everywhere? |
| 5 | Error prevention | Out-of-range inputs caught before a run? Destructive actions confirmed (Modal, critical tone)? |
| 6 | Recognition over recall | Units and provenance ("from Archetype default") visible; IconButtons have tooltips; selected object obvious on canvas and in tree? |
| 7 | Flexibility & efficiency | Keyboard shortcuts (KeyboardIndicator), bulk edit (floor groups), duplicate/compare quickly? |
| 8 | Aesthetic & minimalist | Dense but hierarchical? Anything competing with the model or the key number? |
| 9 | Recover from errors | Errors say what failed and what to do; inputs kept; retry available? |
| 10 | Help & documentation | Methodology reachable via info tooltip; empty states say how to start? |

## Jobs to be done (Urbanflow)
- "Tell me quickly whether this scheme meets the target, and by how much."
- "Let me trust the number enough to put it in front of a client."
- "Let me try an option without losing what I had" (fork/compare/revert).
- "Get from an existing building's data to credible retrofit recommendations" (calibration → recommendation).
- "Don't make me re-enter what the tool can infer" (defaults from Archetype, OSM, drawings).
Flag flows that optimise for looking impressive over these jobs.

## Analytics & trust checks
- Every number: unit, basis, confidence/caveat; consistent decimals; large values with k.
- Targets change what's shown; clearing a target is handled.
- Comparisons: same order, deltas with sign + arrow + value; baseline labelled.
- Stale-state handling after any input change.
- Charts: labelled axes, direct labels over legends where possible, no colour-only encoding, no 3D charts.
- No false precision (e.g. 4 dp on an estimate) and no invented benchmarks.

## Gestalt quick check
Proximity (related inputs grouped in collapsible panel sections), similarity (same look = same function), figure/ground (panels vs canvas), common region (cards, Banner in-card), continuity (reading order in panels top→bottom).

## Dark patterns (name them if present)
Confirmshaming · roach motel (hard to cancel/downgrade/export) · hidden costs (credits/limits revealed late) · false urgency · misdirection · trick questions in consent · forced continuity · disguised AI output (AI content not marked as such).

## Performance perception
Skeletons for content loads, progress for long jobs, optimistic UI for quick toggles, the user can keep working while a simulation runs.
