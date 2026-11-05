# How Pei Ning works

Follow this checklist for every design task.

1. Take the brief from PM or engineering. Capture the goal, users, scope, entry and exit points, data, permissions, constraints and success criteria.
2. Review the current product, target Figma frames, design rules and relevant code before designing. Record what is current versus proposed. Inspect hidden layers before declaring content missing: in Figma Plugin API reads, include invisible instance children with `figma.skipInvisibleInstanceChildren = false` where needed. Prefer a targeted visibility, text or property edit; do not recreate content, detach components or reset overrides merely because an initial traversal omitted it.
3. Use Mobbin or relevant product references before creating samples when a known pattern exists. Ask Pei Ning for a reference only when the interaction or visual direction is materially unclear.
4. Create sample directions and the key states needed to evaluate the idea. Keep exploration clearly separated from final work.
5. Apply Flow specifications: genuine components, variables, text/effect styles, auto layout for UI containers, clear hierarchy, accessibility and product vocabulary.
6. Manage component scope deliberately:
   - Detach AppShell before customizing any screen that uses it. Never put screen-specific content in AppShell slots. Preserve nested Flow instances and verify all existing screen content survives.
   - Keep new components local on the current page while a design is being explored.
   - For any helper component used only to replace a component slot, keep it local and name it with a `.` prefix plus CamelCase without `/` (for example, `.ModalContentRenameChat`). Apply this to every slot, not only AI slots. Do not promote it as a standalone library component solely because the slot requires a component instance.
   - If Pei Ning provides an approved local component board for the task, reuse those components. Do not replace them with library components or recreated look-alikes unless explicitly requested.
   - Promote a component only after Pei Ning explicitly approves/finalises it, unless the task explicitly requests promotion.
   - Reusable across products: promote to the global Flow Design System.
   - In Flow Design System, every feature page uses the child-arrow prefix `↪` and belongs in the feature-page group below `Shell`, including `↪ AI` when shared by urbanflow and Flux. Keep unrelated pages in their existing order. See `references/principles/reading-the-ds.md` for page organisation.
   - After promotion, replace local instances with the published Flow instances and verify the result.
   - For Flow icon maintenance, flatten outline icon geometry while preserving its visible stroke treatment and transparent background. Do not automatically change genuinely filled, mixed fill/stroke, or stateful icons; identify and report them for confirmation first.
7. Arrange annotated journeys as a tree:
   - Use a dark annotation title for the main flow.
   - Use a Light annotation title for each numbered subflow and each leaf action/state.
   - Start parent, child and leaf annotation titles at the same x-position. Do not indent child titles.
   - Extend each parent title to the right edge of its rightmost child title so the branch reads as one bounded row.
   - Separate sibling subflows vertically. Arrange each subflow's screens horizontally from left to right.
   - Keep component boards, annotation titles, notes, screens and connectors from overlapping. When content grows, move all later related content together so hierarchy, spacing and connector alignment remain intact.
   - Number main flows, decimal subflows and leaf screens consistently. Keep leaf actions/states in interaction order.
   - Use yellow connectors only when the transition is caused by a user tap or explicit interaction.
   - For automatic state changes, add the next clearly titled state without a connector. Use vertical separation when beginning a distinct branch.
   - Start every connector from the exact highlighted tap target. Use a no-fill yellow-stroke rectangle with an 8px radius, not a frame. Keep targets and connectors outside UI frames as page-level objects above screens in stacking order. Remove legacy targets/connectors that have no meaningful interaction.
   - Place non-obvious logic or requirements below the relevant screen in an independent Flow `Annotation note` instance.
8. Add requirements, behaviour, logic, data, new/changed copy, engineering effort and open questions. Check missing flows, edge cases and unresolved decisions with Pei Ning.
9. Write as Pei Ning/design owner. Never write “as per Pei Ning”, “per Pei Ning” or third-person agent attribution. Use “Changed from current design” for deltas.
10. Do not add dated annotation headings such as `UPDATED 13 OCT`. Consolidate related requirements into one note per subject. Do not repeat visual specifications already obvious in Figma, such as routine padding, radius or colour values. Annotate exceptions and non-obvious implementation constraints only.
   - Use the published Flow Design System `Annotation note` component for requirements, decisions and behavioural notes. Do not recreate it locally.
   - Keep annotation notes as independent, movable instances. Do not group unrelated notes or screens inside a shared annotation frame.
11. Show component states visually beside the primary state in component/specimen areas. Use annotation text only for behaviour or rules that cannot be deduced from the visuals.
   - Put local-component specifications and variant labels directly beside their specimens as simple text layers, not label frames or requirement annotation notes. Reserve requirement notes for PM/engineering logic and UI behavior near the relevant screens.
   - Do not wrap existing Flow Action List/Action Item/Text field compositions in duplicate local menu components. Reuse the genuine Flow instances in the screen composition; flag a missing capability instead of inventing a parallel component.
12. Screenshot and inspect the completed flow. Check component provenance, connector continuity, clipping, spacing, copy, accessibility, all required states and handoff completeness before delivery.
13. Maintain a numbered coverage table: request → screen/requirement link → structural and visual verification → status. Distinguish attempted, verified, incomplete, blocked, awaiting-decision and intentionally deferred work. Record explicit keep/defer decisions and do not repeatedly flag them as defects. End with verified outcomes and explicit unfinished items; never silently drop a task or treat one successful edit as completion of the whole batch.
14. Check transitions across screens and annotations for consistent preservation of chat, unsent draft, attached files, selected context, scroll position and ongoing operations. Compare requirements against each other, not just against individual screenshots. Place message-action requirements beside the completed response that exposes those actions.
