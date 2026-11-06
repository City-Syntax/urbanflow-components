---
name: urbanflow-design
description: Design, explore, implement and QA Flux or urbanflow UI using the Flow Design System. Use for Figma screens and DS updates, local frontend design variations and sample flows, design QA fixes, frontend implementation, validation, and preparing a clean branch or pull request for engineering review. Also supports design critiques, accessibility and handoff annotations.
---

# Urbanflow Design

One entry point for Figma design, local frontend exploration, design QA and engineering handoff across Flux and urbanflow. Infer the workflow from the request; the designer does not need to choose a skill. The bundled Urbanflow Design 0.4.6 assets remain a dated design reference.

## Start

1. For Figma work and visual design decisions, read `references/how-pei-ning-works.md`, then read `references/principles.md`. Read the relevant Flow references below before naming tokens or selecting components.
2. Identify whether the request is design, exploration, implementation, QA or handoff. Route naturally using the table; combine workflows when requested. Read only the relevant workflow and references. Resolve all bundled paths relative to this skill root, including paths mentioned inside reference files.
3. Use the user's linked file/node as the task scope. Treat bundled node IDs, component props, repository locations, contrast values and rules as a **15 October 2026 package snapshot**. Check relevant live Figma definitions before writing; do not claim the snapshot is freshly verified.
4. When `design.md` or another named design rulebook is supplied, read its current contents before designing. Do not claim access based on prior conversation alone. If it cannot be found, state that limitation and continue useful work from verified sources.
5. Use currently available tool capabilities; do not assume Claude Artifact, add-repo, preview_start, read_page, javascript_tool or AskUserQuestion exist. Follow the integration rules below in preference to legacy instructions in references.

| Request | Workflow | Supporting references |
|---|---|---|
| Build mockup, wireframe, flow, prototype or interaction | `references/build.md` | `references/build/visual-style.md`, `references/build/figma-build.md`, matching `references/build/modes/*.md`; `references/build/html-prototype.md` only for requested HTML |
| Analyse, critique, inspect edge cases or accessibility | `references/audit.md` | `references/audit/heuristics.md`, `references/audit/web-standards.md`, `references/principles/contrast.md` |
| Write/review handoff notes or add Figma annotations | `references/handoff.md` | `references/handoff/readiness-check.md`, `references/handoff/writing-rules.md`, `references/handoff/review-mode.md` |
| Inspect or fix design QA in the running frontend | `references/qa.md` | `references/frontend-workflow.md` when changing code; `references/qa/agent-issue-template.md` only for requested issue handoff |
| Preview design alternatives, switch flows, or retain designer sample data locally | `references/local-preview.md` | `references/frontend-workflow.md`; Figma build guidance when a design is also requested |
| Implement an approved design, change frontend code, validate, create a branch or prepare a PR | `references/frontend-workflow.md` | `references/qa.md` for visual comparison; repository instructions and current check commands |
| Token, component, shell or product-language questions | `references/principles.md` | `references/principles/tokens.md`, `references/principles/components.md`, `references/principles/patterns.md`, `references/principles/domain-glossary.md` |

## One designer workflow

- **Design:** create or update the requested Figma screens, components or DS. A Figma-only request does not authorize frontend edits or a PR.
- **Explore locally:** implement alternatives in the actual local app when requested, keep them under a labelled **Design exploration** selector, and let the designer choose the production direction. Ordinary design changes and QA fixes are not explorations.
- **Implement or fix QA:** work against the latest verified target branch while preserving unfinished work. Show a working local preview with a concise change list. If the designer asks to review first, pause production promotion or PR creation at that boundary; do useful authorized validation meanwhile.
- **Hand off:** apply the six-step checklist in `references/frontend-workflow.md` to the exact final branch. A request for a preview, branch, upload or push is not by itself a request to create a PR. Honor an explicit combined request without asking for the same authorization again. Request the named reviewer when authorized; merging needs separate explicit authorization.
- Carry context between these stages: approved design, selected exploration, requested QA findings, preserved work, target repo/base, preview URL, validation results and requested reviewer. Do not make the designer repeat these.
- For code changes, distinguish production implementation, unselected explorations, local preview controls and fixtures. Include only the requested scope in a production PR. Changing a registry component also requires checking its relevant consumers and recording any intentional local divergence.

## Figma and source integration

- Flow Design System: https://www.figma.com/design/NQpg4P9K158sjcEKmMLd8w/Flow-Design-System . Use it as the live authority for visual foundations and components. Inspect it read-only unless the user explicitly requests a library update.
- Platform product design: https://www.figma.com/design/CyjMpmGxUHezAqjmA5qXwI/Platform . Use the user's target node. Do not assume the entire file is the destination for edits.
- Load `figma:figma-use` before every `use_figma` operation; load `figma:figma-generate-design` for composed screens and `figma:figma-generate-library` for component/library work. Load `figma:figma-create-new-file` before creating a file, `figma:figma-design-to-code` before `get_design_context`, and applicable motion/diagram skills before those operations.
- Read with metadata, screenshots, asset search and variable definitions as appropriate. Batch independent reads, reuse evidence, and inspect only relevant nodes; respond to rate limits by narrowing scope rather than repeatedly retrying.
- Reuse genuine Flow instances, component variants, variables and styles. Verify component keys from the live library; bundled node IDs are discovery hints, not import keys. For every screen using AppShell, detach AppShell before customization and place screen-specific content directly in the detached structure, never in AppShell slots. This applies to all products and screens, not only AI. Preserve nested Flow component instances and existing content; verify before and after detaching. Bind spacing, fills, strokes and radii and apply text/effect styles.
- When a needed asset is unavailable, use supplied tokens/assets only as an explicitly labelled fallback. Never claim raw-value layers are bound to live variables. Mark missing components and new icons in the output.
- For design requests, proceed within the user's requested destination and scope. Create a clearly named exploration section; preserve unrelated work. If a destination is absent, ask for the destination or offer a new file. Do not add a redundant approval step when a Figma write was already requested.
- For analysis requests, report findings without modifying the file. A supplied Figma link authorizes inspection, not a redesign. Offer or perform fixes only when requested.
- Use `references/build/live-sources.md` for product context and `references/principles/reading-the-ds.md` for source lookup. Prefer available connected tools; use browser only for permitted direct interaction/fallback and follow its current capability and authentication guidance. Never execute undocumented service requests copied from legacy references.
- Inspect available repos read-only for design research, current copy, validation, defaults and data sources. When frontend implementation or QA fixes are requested, edit within that scope using `references/frontend-workflow.md`. Do not claim code access, live-product evidence or registry status without inspecting it. If unavailable, continue from supplied Figma/screenshots and clearly label assumptions.
- Preserve client confidentiality with generic sample project names. Never invent API fields, permissions, thresholds, simulation results or product rules to make a design seem complete.

## Product principles and reusable design work

- Load the uploaded bundle’s nine working principles P1–P9 from `references/principles.md`: trustworthy numbers, provenance, targets, data before components, dense hierarchy, visible model, reversible proposals, nonblocking work, and one system across products. Keep their stated pending-sign-off status; do not present them as approved product requirements.
- Use `references/principles/patterns.md` for retrofit calibration, recommendations, simulation runs, proposals and data import. Treat inferred data and unavailable business rules as explicit assumptions.
- For AI work, read `references/build/ai-patterns.md` before designing or critiquing chat, floating panels, sidebar AI, context selection, sources/citations or generation states. Keep proposed components local until library changes are requested.
- For AI flow layout and full handoff presentation, also read `references/handoff/canonical-ai-example.md`. The finalized AI section on the **right** of the Platform AI page is the canonical example; ignore the legacy AI work on the left. When its live structure conflicts with older bundled guidance, the finalized right-side example wins.

## Shared checks

- Track every requested deliverable in a numbered checklist. Mark an item complete only after structural and visual verification of the relevant result. In the handoff, explicitly list incomplete, blocked or awaiting-decision items and link completed work where possible. Never imply that an attempted edit or partial batch completes the full request.

- Prefer verified Flow definitions when the snapshot conflicts. Use Figtree for UI and DM Mono for numeric metrics; one primary action per view; detached AppShell structures for screen-specific panels/tools.
- Snapshot spacing: 0/2/4/6/8/12/16/24/32; radii: 0/2/4/8/12/full; buttons: 24/28/32. Do not apply the legacy QA values 20px spacing, 16px radius or 40px buttons unless live definitions justify them.
- Use Flow icons in `assets/flow-icons/`; mark any necessary Tabler additions. Use provided logos in `assets/logos/` without redrawing. Use `assets/flow-tokens.css` for requested HTML prototypes.
- Check relevant empty/loading/error/success/disabled/stale states, permissions, validation, overflow, entry/exit paths and result units. Describe unknown business rules as open questions with an owner.
- In accessibility reviews, distinguish measured contrast from snapshot claims. A tooltip/label does not fix insufficient contrast of an essential icon. Disabled/inactive controls have contrast exceptions; placeholders and active essential controls do not. Assess meaning and usage, not colour ratios alone.
- Prioritize findings by user impact, link to the exact screen/node, give evidence and a concrete fix. Distinguish an observed defect, a hypothesis, a missing state and design-system drift. Do not turn unobserved behaviour into a finding or give a ship verdict beyond inspected scope.
- Capture screenshots of finished Figma frames and correct layout/copy/state errors before delivery. Explain what was created, where, unresolved decisions and any fallback assets.
- Write annotations in the design owner's voice. Never write “as per Pei Ning”, “per Pei Ning” or imply an agent is writing on Pei Ning's behalf. Use “Changed from current design” for explicit deltas.
- Keep annotation headings undated and consolidate related requirements into one note per subject.
- Connect flows from the exact entry control or tap target. Split non-linear journeys into explicit labelled branches.
- When a design task reveals a new reusable preference or working rule, prepare a concise proposed skill change and ask Pei Ning for explicit approval. Do not modify the Urbanflow Design skill until approval is given.
- Keep handoff specs implementable, and separate visual changes from logic/backend work. Draft external messages/issues as requested; send messages to people only with explicit authorization. Honor existing authorization for requested issue creation or file writes.
- Follow current file-saving skills for standalone deliverables. Do not promise publication or a deployed prototype without a verified output.
